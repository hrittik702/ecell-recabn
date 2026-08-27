# Codebase Action Plan — E-Cell REC ABN

**Project:** `ecell-recabn`  
**Date:** August 27, 2026  
**Companion Report:** [`CODEBASE_AUDIT.md`](file:///C:/Users/Hritt/Documents/ecell-recabn/CODEBASE_AUDIT.md)  

---

## Phase A — Critical (Immediate Fixes)

### Task A.1: Update Firestore Security Rules for Task Collection
- **Files Affected:** [`firestore.rules`](file:///C:/Users/Hritt/Documents/ecell-recabn/firestore.rules)
- **Reason:** Prevent production task permission rejections for admin and user profiles.
- **Risk:** Low (adds authorization without removing existing user rules).
- **Expected Benefit:** 100% reliable task CRUD in production environments.
- **Dependencies:** None.
- **Status:** `Fixed`

---

## Phase B — High Impact (Stability & Routing)

### Task B.1: Implement Catch-All 404 Route Handling
- **Files Affected:** [`src/App.jsx`](file:///C:/Users/Hritt/Documents/ecell-recabn/src/App.jsx)
- **Reason:** Prevent blank screen failures when visitors land on unmapped URLs.
- **Risk:** Zero.
- **Expected Benefit:** Seamless fallback and error-free routing.
- **Dependencies:** None.
- **Status:** `Fixed`

### Task B.2: Clean Dead Links in Footer
- **Files Affected:** [`src/components/Footer.jsx`](file:///C:/Users/Hritt/Documents/ecell-recabn/src/components/Footer.jsx)
- **Reason:** `/incubation` and `/startup-guide` routes do not exist.
- **Risk:** Low.
- **Expected Benefit:** Prevents dead-end navigation for visitors.
- **Dependencies:** Task B.1.
- **Status:** `Fixed`

---

## Phase C — Medium (Animation & Cleanup)

### Task C.1: Fix Hero Parallax Target & StatCounter Cleanup
- **Files Affected:** [`src/components/Hero.jsx`](file:///C:/Users/Hritt/Documents/ecell-recabn/src/components/Hero.jsx)
- **Reason:** Attach `.hero-bg` class and add proper tween cleanup to prevent memory leaks during page navigation.
- **Risk:** Low.
- **Expected Benefit:** Smooth parallax backdrop and clean memory footprint.
- **Dependencies:** None.
- **Status:** `Fixed`

### Task C.2: Correct Tailwind Typo in Timeline
- **Files Affected:** [`src/components/Timeline.jsx`](file:///C:/Users/Hritt/Documents/ecell-recabn/src/components/Timeline.jsx)
- **Reason:** Fix `border-white/50/60` typo.
- **Risk:** Zero.
- **Expected Benefit:** Clean Tailwind build and correct border styling.
- **Dependencies:** None.
- **Status:** `Fixed`

---

## Phase D — Polish (Asset Hygiene & SEO/PWA)

### Task D.1: Clean Duplicate Assets & Whitespace Filenames
- **Files Affected:** Root `assets/`, `public/assets/`
- **Reason:** Eliminate redundant root `/assets` duplicate directory and remove unencoded whitespace filenames.
- **Risk:** Low.
- **Expected Benefit:** Smaller repo size and robust asset delivery on strict CDNs.
- **Dependencies:** None.
- **Status:** `Fixed`

### Task D.2: PWA Web App Manifest & Advanced SEO Optimization
- **Files Affected:** [`public/manifest.json`](file:///C:/Users/Hritt/Documents/ecell-recabn/public/manifest.json), [`public/robots.txt`](file:///C:/Users/Hritt/Documents/ecell-recabn/public/robots.txt), [`public/sitemap.xml`](file:///C:/Users/Hritt/Documents/ecell-recabn/public/sitemap.xml), [`index.html`](file:///C:/Users/Hritt/Documents/ecell-recabn/index.html)
- **Reason:** Support standalone PWA installability on mobile/desktop and optimize crawlability for Google/Bing bots.
- **Risk:** Zero.
- **Expected Benefit:** Native app feel on mobile, rich search indexing.
- **Dependencies:** None.
- **Status:** `Fixed`

### Task D.3: Global Rich Toast Notification System
- **Files Affected:** [`src/App.jsx`](file:///C:/Users/Hritt/Documents/ecell-recabn/src/App.jsx), [`src/components/Footer.jsx`](file:///C:/Users/Hritt/Documents/ecell-recabn/src/components/Footer.jsx)
- **Reason:** Unify contact form and portal feedback into a single, high-performance toast container.
- **Risk:** Zero.
- **Expected Benefit:** Instant visual feedback on contact inquiries and member profile actions.
- **Dependencies:** None.
- **Status:** `Fixed`
