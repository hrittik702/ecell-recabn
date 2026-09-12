# Phase 4 Tasks Public/Private Data Access Report

## 1. Overview & Problem Description

The `/tasks` page on the E-Cell REC Ambedkar Nagar portal serves as both:
1. A public-facing board showing official tasks assigned for the National Entrepreneurship Challenge (NEC 2026).
2. A live task board for authenticated team members and administrators.

### Old Behavior
- In `firestore.rules`, the `tasks` collection read access is restricted to authenticated users:
  ```firestore-security-rules
  match /tasks/{taskId} {
    allow read: if request.auth != null;
    ...
  }
  ```
- However, `Tasks.jsx` called `getAllTasks()` unconditionally on component mount inside `useEffect`.
- When an unauthenticated visitor visited `/tasks`, `getAllTasks()` attempted to fetch from Firestore without `request.auth`.
- Firestore promptly rejected the query with a `FirebaseError: Missing or insufficient permissions.`
- `Tasks.jsx` caught the error and fell back to static tasks, but only after generating a noisy and predictable permission error in the console.

---

## 2. New Behavior

- **Unauthenticated Visitor**:
  - The static curated task catalog (`tasksData`) is displayed immediately.
  - Zero Firestore queries are attempted.
  - Zero permission errors or console warnings are generated.
- **Authenticated Member**:
  - Once auth resolves (`currentUser` is present), `getAllTasks()` is called.
  - Live tasks are fetched from Firestore and merged with the curated task catalog.
- **Admin**:
  - Full task visibility and management behavior is preserved.
- **Slow Auth Initialization**:
  - While `authLoading` is `true`, the static curated task catalog is rendered immediately so visitors see content without delay.
  - Firestore query is deferred until auth resolves, preventing race conditions or premature queries.
- **Error Handling**:
  - If an authenticated Firestore query fails (e.g. network offline, Firestore down, or unexpected permission failure), the failure is caught, actionable diagnostics are logged via `console.error`, and the static curated catalog is preserved.

---

## 3. Authentication & Access Logic

In [`src/pages/Tasks.jsx`](file:///home/mocha/Desktop/ecell-recabn/src/pages/Tasks.jsx):

```javascript
const { currentUser, loading: authLoading } = useAuth();
const [allTasks, setAllTasks] = useState(tasksData);
const [loading, setLoading] = useState(false);

useEffect(() => {
  // 1. Defer querying if Firebase auth is still resolving
  if (authLoading) {
    return;
  }

  // 2. Unauthenticated visitors: strictly display curated static tasks.
  // Do NOT query Firestore, preventing predictable permission denial.
  if (!currentUser) {
    setAllTasks(tasksData);
    setLoading(false);
    return;
  }

  // 3. Authenticated members and admins: query live Firestore tasks
  let isMounted = true;
  const fetchLiveTasks = async () => {
    try {
      setLoading(true);
      const remote = await getAllTasks();
      if (!isMounted) return;

      if (!remote || remote.length === 0) {
        setAllTasks(tasksData);
        return;
      }

      // Format and merge live Firestore tasks with static catalog
      const formattedRemote = remote.map(t => ({
        ...t,
        category: t.category || 'Ignite Propel',
        status: t.status === 'completed' ? 'Completed' : 'In Progress'
      }));

      setAllTasks(prev => {
        const remoteIds = new Set(formattedRemote.map(r => r.id));
        const filteredDefaults = tasksData.filter(d => !remoteIds.has(d.id));
        return [...formattedRemote, ...filteredDefaults];
      });
    } catch (err) {
      if (err?.code === 'permission-denied') {
        console.error("Firestore permission denied: Authenticated user cannot read tasks collection.", err);
      } else if (err?.code === 'unavailable') {
        console.error("Firestore unavailable: Network connection issue or offline.", err);
      } else {
        console.error("Error fetching live tasks from Firestore for authenticated user:", err);
      }
      if (isMounted) {
        setAllTasks(tasksData);
      }
    } finally {
      if (isMounted) setLoading(false);
    }
  };

  fetchLiveTasks();
  return () => { isMounted = false; };
}, [currentUser, authLoading]);
```

---

## 4. Firestore Security Alignment

- `firestore.rules` remained unchanged and **unweakened**.
- Unauthenticated reads to `/tasks` remain strictly forbidden in the security rules:
  ```firestore-security-rules
  match /tasks/{taskId} {
    allow read: if request.auth != null;
    allow create, delete: if isAdmin();
    allow update: if request.auth != null && (
      isAdmin() || 
      (
        resource.data.assignedTo == request.auth.uid &&
        request.resource.data.diff(resource.data).affectedKeys().hasOnly(['status', 'updatedAt']) &&
        request.resource.data.status in ['pending', 'in-progress', 'completed']
      )
    );
  }
  ```
- Public visitors are served the static curated task catalog client-side, eliminating the need to expose private internal task documents to unauthenticated traffic.

---

## 5. Files Changed

1. **[`src/pages/Tasks.jsx`](file:///home/mocha/Desktop/ecell-recabn/src/pages/Tasks.jsx)**
   - Imported `useAuth` from `../context/AuthContext`.
   - Added conditional execution gating based on `authLoading` and `currentUser`.
   - Prevented unnecessary network calls and permission errors for unauthenticated visitors.
   - Enhanced error diagnostics (`permission-denied`, `unavailable`) while maintaining static fallback.
   - Added dependency array `[currentUser, authLoading]` so logins/logouts reactively update the task list.

---

## 6. Test Matrix Results

All 6 test scenarios were verified using the simulation suite (`scratch/test_rbac_and_tasks.cjs`):

| Test # | Scenario | Expected Behavior | Actual Result | Status |
|---|---|---|---|---|
| **1** | Logged out &rarr; `/tasks` | Show curated static catalog, 0 Firestore calls, 0 errors | Static catalog rendered, 0 queries, 0 errors | **PASS** |
| **2** | Authenticated member &rarr; `/tasks` | Query Firestore tasks and merge with static catalog | Remote tasks merged, live status updated | **PASS** |
| **3** | Authenticated admin &rarr; `/tasks` | Query Firestore tasks, preserve admin task operations | Remote tasks merged, management intact | **PASS** |
| **4** | Slow auth initialization | Static catalog shown immediately; no premature query | Curated tasks shown, query deferred until auth | **PASS** |
| **5** | Firestore unavailable | Log diagnostic error, fallback to static catalog | Diagnostic logged, static tasks preserved | **PASS** |
| **6** | Firestore permission denied | Log specific permission diagnostic, fallback to static | Diagnostic logged, static tasks preserved | **PASS** |

---

## 7. Production Build Verification

`npm run build` completed successfully with Vite 5:
- Transformation: 1471 modules transformed
- Chunks: `Tasks-qShiLte7.js` (16.33 kB)
- Exit code: 0 in 2.54s
