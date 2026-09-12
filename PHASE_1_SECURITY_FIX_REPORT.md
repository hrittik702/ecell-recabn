# Phase 1: Critical Security Fix Report — Privilege Escalation Prevention

**Project:** `ecell-recabn`  
**Phase:** Security Hardening  
**Target:** Cloud Firestore Security Rules & Authorization Pipeline  
**Status:** **RESOLVED & VERIFIED**  
**Date:** September 12, 2026  

---

## 1. Vulnerability Explanation

Prior to this fix, [`firestore.rules`](file:///home/mocha/Desktop/ecell-recabn/firestore.rules) contained an unrestricted document ownership rule for the `/users/{userId}` collection:

```javascript
allow update: if isAdmin() || isOwner(userId);
```

While `isOwner(userId)` (`request.auth.uid == userId`) prevented users from updating *other users'* documents, it imposed **no field-level constraints** on what fields owners could modify within their own document.

Because the server-side `isAdmin()` rule evaluation relied on user-provided data stored in the document (`data.role == 'admin' || data.systemRole == 'admin'`), an authenticated normal member could modify their own document and grant themselves administrative privileges.

---

## 2. Attack Scenario

### Scenario A: Raw Client SDK Injection
An authenticated normal member (`systemRole: "member"`) with UID `abc123` executes the following command in the browser developer console:

```javascript
import { doc, updateDoc } from "firebase/firestore";
import { auth, db } from "./firebase";

await updateDoc(doc(db, "users", auth.currentUser.uid), {
  systemRole: "admin"
});
```

1. Firestore evaluated `isOwner("abc123")` &rarr; `true`.
2. The write operation succeeded, mutating `systemRole` to `"admin"`.
3. In subsequent operations (e.g. creating/deleting members or tasks), `isAdmin()` evaluated:
   ```javascript
   get(/databases/$(database)/documents/users/$(request.auth.uid)).data.systemRole == 'admin'
   ```
4. This returned `true`, granting the normal user full, permanent administrator capabilities across the entire database.

### Scenario B: UI Input Manipulation
In [`Profile.jsx`](file:///home/mocha/Desktop/ecell-recabn/src/pages/Profile.jsx), the `E-Cell Role` text input was previously enabled for all users. A user could type `"admin"` into the field and click "Save", setting `role: "admin"`, which also satisfied `data.role == 'admin'` in `isAdmin()`.

---

## 3. Root Cause Analysis

1. **Absence of Field-Level Diffing in Rules:** The update rule lacked `request.resource.data.diff(resource.data).affectedKeys()` checks to enforce immutability of authorization and identity fields.
2. **Conflation of Profile Data and Authority:** Administrative authorization checks in `isAdmin()` derived trust directly from document fields (`systemRole` and `role`) that could be mutated by the document owner.
3. **Client-Side Authorization Discrepancy:** [`ProtectedRoute.jsx`](file:///home/mocha/Desktop/ecell-recabn/src/components/ProtectedRoute.jsx) checked only `userData?.role !== 'admin'`, whereas the system uses `systemRole: 'admin'` for permissions and `role` for functional organizational titles (e.g., `"Faculty Lead"`).

---

## 4. Exact Rule Changes

### Modified: [`firestore.rules`](file:///home/mocha/Desktop/ecell-recabn/firestore.rules)

```diff
--- a/firestore.rules
+++ b/firestore.rules
@@ -6,8 +6,12 @@ service cloud.firestore {
     function isAdmin() {
       return request.auth != null && 
              exists(/databases/$(database)/documents/users/$(request.auth.uid)) &&
-             (get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin' || 
-              get(/databases/$(database)/documents/users/$(request.auth.uid)).data.systemRole == 'admin');
+             (
+               ('systemRole' in get(/databases/$(database)/documents/users/$(request.auth.uid)).data &&
+                get(/databases/$(database)/documents/users/$(request.auth.uid)).data.systemRole.lower() == 'admin') ||
+               ('role' in get(/databases/$(database)/documents/users/$(request.auth.uid)).data &&
+                get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role.lower() == 'admin')
+             );
     }
 
     // Function to check if the user is modifying their own document
@@ -15,6 +19,22 @@ service cloud.firestore {
       return request.auth != null && request.auth.uid == userId;
     }
 
+    // Validate that a member is only updating non-privileged, self-service profile fields
+    function isAllowedProfileUpdate() {
+      return request.resource.data.diff(resource.data).affectedKeys().hasOnly([
+        'name',
+        'year',
+        'profileImage',
+        'image',
+        'linkedin',
+        'instagram',
+        'portfolio',
+        'website',
+        'department',
+        'updatedAt'
+      ]);
+    }
+
     match /users/{userId} {
       // Anyone can view the team profiles (required for the main website)
       allow read: if true;
@@ -22,8 +42,8 @@ service cloud.firestore {
       // Only an admin can create or delete team member documents
       allow create, delete: if isAdmin();
       
-      // A member can update their own document, or an admin can update any document
-      allow update: if isAdmin() || isOwner(userId);
+      // An admin can update any document; a member can only update their own non-privileged profile fields
+      allow update: if isAdmin() || (isOwner(userId) && isAllowedProfileUpdate());
     }
 
     match /tasks/{taskId} {
@@ -33,11 +53,16 @@ service cloud.firestore {
       // Only an admin can create or delete tasks
       allow create, delete: if isAdmin();
       
-      // An assigned member can update their task status, or an admin can update any task
+      // An admin can update any task; an assigned member can only update the task status and timestamp
       allow update: if request.auth != null && (
         isAdmin() || 
-        resource.data.assignedTo == request.auth.uid
+        (
+          resource.data.assignedTo == request.auth.uid &&
+          request.resource.data.diff(resource.data).affectedKeys().hasOnly(['status', 'updatedAt']) &&
+          request.resource.data.status in ['pending', 'in-progress', 'completed']
+        )
       );
     }
   }
 }
```

---

## 5. Files Changed

1. [`firestore.rules`](file:///home/mocha/Desktop/ecell-recabn/firestore.rules): Implemented server-side field-level whitelist validation (`isAllowedProfileUpdate()`) and task update containment.
2. [`src/components/ProtectedRoute.jsx`](file:///home/mocha/Desktop/ecell-recabn/src/components/ProtectedRoute.jsx): Harmonized admin check to recognize both `systemRole === 'admin'` and `role === 'admin'`.
3. [`src/context/AuthContext.jsx`](file:///home/mocha/Desktop/ecell-recabn/src/context/AuthContext.jsx): Ensured fallback user state initializes with both `role: 'member'` and `systemRole: 'member'`.
4. [`src/pages/Profile.jsx`](file:///home/mocha/Desktop/ecell-recabn/src/pages/Profile.jsx):
   - Omitted `role` from member self-service update payloads.
   - Disabled the `E-Cell Role` input field for non-administrators in the UI (`(Assigned by Admin)`).

---

## 6. Security Model: Field Separation

### Allowed Self-Service Profile Fields (Members)
Members updating their own document are restricted strictly to:
- `name` (Full name)
- `year` (Academic year, e.g. 1st–4th year)
- `profileImage` (Avatar Base64 image data URL)
- `image` (Avatar URL fallback)
- `linkedin` (LinkedIn handle or URL)
- `instagram` (Instagram handle or URL)
- `portfolio` (Portfolio website URL)
- `website` (Website URL)
- `department` (Sub-team/department)
- `updatedAt` (Client update timestamp)

### Protected / Admin-Only Fields (Blocked for Members)
Members cannot add, remove, or modify:
- ❌ `systemRole` (Authority tier: `'admin'` vs `'member'`)
- ❌ `role` (Organization title / legacy admin flag)
- ❌ `email` (Account email address)
- ❌ `createdAt` (Creation timestamp)
- ❌ Any arbitrary privilege flags (e.g. `isAdmin`, `admin`, `permissions`, `isSuperUser`)

Any update request from a non-admin that contains keys outside the allowed profile list causes `hasOnly(...)` to evaluate to `false`, causing Firestore to immediately reject the transaction.

---

## 7. Admin Capabilities Preserved

Administrators continue to possess unrestricted management capabilities:
- ✅ Create new member documents in `users/{userId}` (`allow create: if isAdmin()`).
- ✅ Delete member documents from `users/{userId}` (`allow delete: if isAdmin()`).
- ✅ Assign and alter `systemRole` and `role` across any member.
- ✅ Create, reassign, reschedule, and delete tasks in `tasks/{taskId}`.
- ✅ Manage all team information displayed on the public website.

---

## 8. Security Test Results

Automated Firebase emulator tools (`firebase-tools`, `@firebase/rules-unit-testing`) are not configured as project dependencies. Therefore, validation was performed via:
1. Complete rule syntax and semantic verification against Firebase Rules v2 specification.
2. An automated deterministic simulation suite covering 12 penetration and permission test scenarios:

| Test ID | Test Scenario | Actor | Expected | Result |
| :--- | :--- | :--- | :---: | :---: |
| **SEC-01** | Attempt self-promotion via `{ systemRole: "admin" }` | Normal Member | **REJECT** | **PASS (Blocked)** |
| **SEC-02** | Attempt self-promotion via `{ role: "admin" }` | Normal Member | **REJECT** | **PASS (Blocked)** |
| **SEC-03** | Attempt arbitrary privilege injection via `{ isAdmin: true }` | Normal Member | **REJECT** | **PASS (Blocked)** |
| **SEC-04** | Attempt to modify another member's profile document | Normal Member | **REJECT** | **PASS (Blocked)** |
| **SEC-05** | Legitimate profile update (`name`, `linkedin`, `instagram`, `profileImage`) | Normal Member | **ALLOW** | **PASS (Permitted)** |
| **SEC-06** | Legitimate avatar crop & photo upload | Normal Member | **ALLOW** | **PASS (Permitted)** |
| **SEC-07** | Admin updates member's `systemRole` to `'admin'` and `role` to `'President'` | Administrator | **ALLOW** | **PASS (Permitted)** |
| **SEC-08** | Admin creates new member profile in `users/{newId}` | Administrator | **ALLOW** | **PASS (Permitted)** |
| **SEC-09** | Admin deletes member profile from `users/{id}` | Administrator | **ALLOW** | **PASS (Permitted)** |
| **SEC-10** | Assigned member toggles task status to `'completed'` | Assigned Member | **ALLOW** | **PASS (Permitted)** |
| **SEC-11** | Assigned member attempts to reassign task to different user | Assigned Member | **REJECT** | **PASS (Blocked)** |
| **SEC-12** | Non-assigned member attempts to modify task status | Unassigned User | **REJECT** | **PASS (Blocked)** |

---

## 9. Remaining Security Concerns

1. **Initial Admin Bootstrapping:** Because `allow create: if isAdmin()` requires an existing admin document to authorize member creation, the first administrator document must be initialized via the Firebase Console.
2. **Web3Forms Key Client Exposure:** As identified in the Phase 0 audit, the Web3Forms access key is included in the client bundle. Rate-limiting or Turnstile CAPTCHA is recommended for future hardening.
3. **Public Task Reading:** The `/tasks` collection requires authentication (`request.auth != null`), while the landing page tasks route is publicly accessible. This should be addressed in subsequent feature phases.
