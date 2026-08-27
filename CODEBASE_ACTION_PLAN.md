# Codebase Action Plan — E-Cell REC ABN

**Project:** `ecell-recabn`  
**Date:** August 27, 2026  
**Companion Report:** [`CODEBASE_AUDIT.md`](file:///C:/Users/Hritt/Documents/ecell-recabn/CODEBASE_AUDIT.md)  

---

## Phase A — Critical (Immediate Fixes)

### Task A.1: Update Firestore Security Rules for Task Collection
- **Files Affected:** [`firestore.rules`](file:///C:/Users/Hritt/Documents/ecell-recabn/firestore.rules)
- **Status:** `Fixed`

---

## Phase B — High Impact (Stability & Routing)

### Task B.1: Implement Catch-All 404 Route Handling
- **Files Affected:** [`src/App.jsx`](file:///C:/Users/Hritt/Documents/ecell-recabn/src/App.jsx)
- **Status:** `Fixed`

### Task B.2: Clean Dead Links in Footer
- **Files Affected:** [`src/components/Footer.jsx`](file:///C:/Users/Hritt/Documents/ecell-recabn/src/components/Footer.jsx)
- **Status:** `Fixed`

---

## Phase C — Medium (Animation & Cleanup)

### Task C.1: Fix Hero Parallax Target & StatCounter Cleanup
- **Files Affected:** [`src/components/Hero.jsx`](file:///C:/Users/Hritt/Documents/ecell-recabn/src/components/Hero.jsx)
- **Status:** `Fixed`

### Task C.2: Correct Tailwind Typo in Timeline
- **Files Affected:** [`src/components/Timeline.jsx`](file:///C:/Users/Hritt/Documents/ecell-recabn/src/components/Timeline.jsx)
- **Status:** `Fixed`

---

## Phase D — Polish (Asset Hygiene, PWA & Modularization)

### Task D.1: Clean Duplicate Assets & Whitespace Filenames
- **Files Affected:** Root `assets/`, `public/assets/`
- **Status:** `Fixed`

### Task D.2: PWA Web App Manifest & Advanced SEO Optimization
- **Files Affected:** [`public/manifest.json`](file:///C:/Users/Hritt/Documents/ecell-recabn/public/manifest.json), [`public/robots.txt`](file:///C:/Users/Hritt/Documents/ecell-recabn/public/robots.txt), [`public/sitemap.xml`](file:///C:/Users/Hritt/Documents/ecell-recabn/public/sitemap.xml), [`index.html`](file:///C:/Users/Hritt/Documents/ecell-recabn/index.html)
- **Status:** `Fixed`

### Task D.3: Admin Control Center Modularization
- **Files Affected:** [`src/pages/AdminDashboard.jsx`](file:///C:/Users/Hritt/Documents/ecell-recabn/src/pages/AdminDashboard.jsx), [`src/components/admin/`](file:///C:/Users/Hritt/Documents/ecell-recabn/src/components/admin/)
- **Status:** `Fixed`

---

## Phase E — Core Web Vitals (LCP < 1.2s & CLS ~0.00)

### Task E.1: Eliminate Home Suspense Layout Shift (Fix CLS: 0.4 -> 0.0)
- **Files Affected:** [`src/App.jsx`](file:///C:/Users/Hritt/Documents/ecell-recabn/src/App.jsx)
- **Reason:** Home was previously wrapped in React.lazy and Suspense, causing a 60vh PageLoader to render and then pop the full page down (0.4 CLS).
- **Resolution:** Eagerly imported `Home` so the landing page renders in the initial commit with zero layout shift.
- **Status:** `Fixed`

### Task E.2: Fast Progressive Hero Entrance & Font Streamlining (Fix LCP: 3.54s -> <1.0s)
- **Files Affected:** [`src/components/Hero.jsx`](file:///C:/Users/Hritt/Documents/ecell-recabn/src/components/Hero.jsx), [`index.html`](file:///C:/Users/Hritt/Documents/ecell-recabn/index.html), [`vite.config.js`](file:///C:/Users/Hritt/Documents/ecell-recabn/vite.config.js)
- **Reason:** Opacity 0 fromTo animation and 18-weight Google Fonts payload delayed H1 paint measurement.
- **Resolution:** Streamlined font weights, added preconnect, applied fast progressive entrance, and separated icons chunk.
- **Status:** `Fixed`

### Task E.3: Fixed Dimension Containers & Image Jitter Elimination
- **Files Affected:** [`src/components/Navbar.jsx`](file:///C:/Users/Hritt/Documents/ecell-recabn/src/components/Navbar.jsx), [`src/components/team/TeamCard.jsx`](file:///C:/Users/Hritt/Documents/ecell-recabn/src/components/team/TeamCard.jsx), [`src/components/Events.jsx`](file:///C:/Users/Hritt/Documents/ecell-recabn/src/components/Events.jsx)
- **Reason:** Unsized images causes layout recalculation when downloaded.
- **Resolution:** Added explicit `width` and `height` attributes and aspect-ratio reservation across all image wrappers.
- **Status:** `Fixed`
