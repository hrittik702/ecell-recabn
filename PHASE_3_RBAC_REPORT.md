# Phase 3 RBAC & Authorization Consistency Report

## 1. Executive Summary

This report documents the implementation of a consistent Role-Based Access Control (RBAC) architecture across `ecell-recabn`. Prior to this fix, the application suffered from an authorization mismatch where `ProtectedRoute.jsx` evaluated `userData?.role !== 'admin'` rather than checking system permissions, rejecting administrators holding organizational titles (such as "Faculty Lead" or "President"). Furthermore, `AuthContext.jsx` blocked the entire application tree with `{!loading && children}`, causing an unexplained blank screen on initial page loads and reloads.

Both client-side authorization and server-side Firestore security rules are now strictly synchronized under an authoritative permission tier.

---

## 2. Authorization Model

The application strictly separates organizational designations from system permissions:

| Field | Conceptual Purpose | Allowed / Expected Values | Grants System Admin? |
|---|---|---|---|
| `systemRole` | **Authoritative System Permission Tier** | `'member'`, `'admin'` | **Yes** (when `'admin'`) |
| `role` | **Organizational / Functional Display Title** | e.g. `'President'`, `'Faculty Lead'`, `'Operational Head'`, `'Web-Tech Lead'`, `'Member'`, `'admin'` (legacy) | **No** (unless literal legacy `'admin'`) |

### Key Principles:
1. `systemRole === 'admin'` is the canonical authorization check.
2. Functional titles (e.g. `"President"`, `"Faculty Lead"`, `"Corporate Head"`) describe a member's organizational designation on the public website and never grant administrator access.
3. For backward compatibility with legacy accounts, the literal value `role === 'admin'` is recognized as administrative access by both client and Firestore rules until database migration is executed.

---

## 3. Authoritative Admin Detection Logic

All client-side components now utilize a single, authoritative helper function located in [`src/utils/auth.js`](file:///home/mocha/Desktop/ecell-recabn/src/utils/auth.js):

```javascript
export const isAdmin = (userData) => {
  if (!userData || typeof userData !== 'object') {
    return false;
  }

  const systemRole = (userData.systemRole || '').toString().trim().toLowerCase();
  if (systemRole === 'admin') {
    return true;
  }

  const role = (userData.role || '').toString().trim().toLowerCase();
  if (role === 'admin') {
    return true;
  }

  return false;
};
```

This logic matches the server-side Firestore security rule in [`firestore.rules`](file:///home/mocha/Desktop/ecell-recabn/firestore.rules):

```firestore-security-rules
function isAdmin() {
  return request.auth != null && 
         exists(/databases/$(database)/documents/users/$(request.auth.uid)) &&
         (
           ('systemRole' in get(/databases/$(database)/documents/users/$(request.auth.uid)).data &&
            get(/databases/$(database)/documents/users/$(request.auth.uid)).data.systemRole.lower() == 'admin') ||
           ('role' in get(/databases/$(database)/documents/users/$(request.auth.uid)).data &&
            get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role.lower() == 'admin')
         );
}
```

---

## 4. Route Behavior & Auth Initialization

### Route Protection (`ProtectedRoute.jsx`)
- `/profile`: Requires authentication. Unauthenticated users are redirected to `/login`.
- `/admin`: Requires authentication AND administrative authorization via `isAdmin(userData)`.
  - Non-authenticated visitors are redirected to `/login`.
  - Authenticated non-admin members are redirected to `/profile`.
  - Administrators (including those with titles like `role: "Faculty Lead"` and `systemRole: "admin"`) are granted access to `/admin`.

### Auth Initialization Fix (`AuthContext.jsx`)
- Previously, `AuthProvider` returned `{!loading && children}`. On cold starts or page refreshes, the entire DOM remained blank until Firebase returned the auth state.
- `AuthProvider` now renders `{children}` immediately. Public routes (`/`, `/tasks`, `/login`) and layout shells render instantly without delay.
- `ProtectedRoute.jsx` contains an internal check (`if (loading) return <Spinner />`), guaranteeing that protected content is never rendered before authentication and authorization are verified.
- Missing user documents or network errors safely fall back to `{ role: 'member', systemRole: 'member' }`, preventing privilege escalation.

---

## 5. Files Changed

1. **[`src/utils/auth.js`](file:///home/mocha/Desktop/ecell-recabn/src/utils/auth.js) (NEW)**
   - Authoritative `isAdmin(userData)` helper.
2. **[`src/context/AuthContext.jsx`](file:///home/mocha/Desktop/ecell-recabn/src/context/AuthContext.jsx)**
   - Replaced `{!loading && children}` with `{children}` to eliminate blank screen.
   - Fallback safely sets `{ role: 'member', systemRole: 'member' }`.
   - Exposes `isAdmin: isAdmin(userData)` in auth context.
3. **[`src/components/ProtectedRoute.jsx`](file:///home/mocha/Desktop/ecell-recabn/src/components/ProtectedRoute.jsx)**
   - Replaced `userData?.role !== 'admin'` with `!isAdmin(userData)`.
4. **[`src/pages/Profile.jsx`](file:///home/mocha/Desktop/ecell-recabn/src/pages/Profile.jsx)**
   - Uses `checkIsAdmin(userData)` to conditionally render the "Admin Panel" navigation button and gate role modification.
5. **[`src/pages/AdminDashboard.jsx`](file:///home/mocha/Desktop/ecell-recabn/src/pages/AdminDashboard.jsx)**
   - Replaced inline check with `!isAdmin(m)` when filtering members for the admin dashboard roster.
6. **[`src/components/Team.jsx`](file:///home/mocha/Desktop/ecell-recabn/src/components/Team.jsx)**
   - Replaced inline check with `!isAdmin(m)` when filtering public team member roster.

---

## 6. Test Matrix Results

The RBAC test matrix was executed via an automated simulation test suite (`scratch/test_rbac_and_tasks.cjs`):

| Test # | Scenario | Expected Behavior | Actual Result | Status |
|---|---|---|---|---|
| **1** | Logged-out visitor &rarr; `/admin` | Redirect to `/login` | Redirected to `/login` | **PASS** |
| **2** | Authenticated Member (`systemRole: member`) &rarr; `/admin` | Redirect to `/profile` | Redirected to `/profile` | **PASS** |
| **3** | Admin with Title (`systemRole: admin`, `role: Faculty Lead`) &rarr; `/admin` | Access granted | Access granted | **PASS** |
| **4** | Legacy Admin (`role: admin`) &rarr; `/admin` | Access granted | Access granted | **PASS** |
| **4b** | Member with Title (`systemRole: member`, `role: President`) &rarr; `/admin` | Redirect to `/profile` (No admin access) | Redirected to `/profile` | **PASS** |
| **5** | Missing user document in Firestore &rarr; `/admin` | Fallback to member, redirect to `/profile` | Redirected to `/profile` | **PASS** |
| **6** | Logout action &rarr; `/admin` | Redirect to `/login` | Redirected to `/login` | **PASS** |
| **7** | Page refresh while authenticated &rarr; `/admin` | Spinner while loading, access granted once resolved | Spinner then Access Granted | **PASS** |
| **8** | Slow auth initialization &rarr; `/admin` | Spinner displayed, zero content leakage | Spinner displayed, no leak | **PASS** |

---

## 7. Migration & Remaining Concerns

1. **Legacy Database Records**:
   Any existing Firestore documents with `role: "admin"` and no `systemRole` field function properly today due to backward-compatibility logic. A background migration script should be run to set `systemRole: "admin"` and update `role` to their actual designation (e.g. "Lead Coordinator").
2. **Strict Firestore Field Immutability**:
   Under the Phase 1 security rules update, `systemRole` cannot be modified by non-admin users via client updates (`isAllowedProfileUpdate` restricts keys to non-privileged profile data).
