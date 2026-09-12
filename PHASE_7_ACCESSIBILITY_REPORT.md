# Phase 7: Accessibility & Semantic HTML Report

## Executive Summary
In Phase 7, a comprehensive accessibility (a11y) and semantic HTML audit was conducted across the `ecell-recabn` codebase. All improvements strictly preserve the existing visual design, layout styling, Tailwind classes, and component behaviors while achieving WCAG 2.1 AA compliance standards for landmarks, keyboard navigation, focus indicators, modal/drawer dismissal, form labeling, and motion sensitivity.

---

## 1. Primary Landmark Architecture: Elimination of Nested `<main>`

### Finding
In the original codebase:
* `src/App.jsx` rendered `<main id="main-content">` wrapping the top-level `<Routes>`.
* `src/pages/Home.jsx` wrapped all sections in `<main className="relative z-10">`.

According to HTML5 / WAI-ARIA specifications, a document must not contain more than one visible `<main>` landmark without hiding the others. Having `<main>` nested inside another `<main>` violates screen reader navigation structures.

### Solution
* In `src/pages/Home.jsx`, the redundant `<main className="relative z-10">` was replaced with `<div className="relative z-10">`.
* `src/App.jsx` retains the sole authoritative `<main id="main-content">` landmark, with skip-link compatibility.

---

## 2. Component-by-Component Audit & Remediations

| Component | Issues Identified | Resolution Applied |
| :--- | :--- | :--- |
| **`src/pages/Home.jsx`** | Nested `<main>` landmark. | Converted to `<div className="relative z-10">` preserving layout and z-indexing. |
| **`src/components/Starfield.jsx`** | `<canvas>` not marked as decorative; canvas screen readers might attempt to interpret. | Added `aria-hidden="true"` to `<canvas>`. |
| **`src/components/Hero.jsx`** | Scroll indicator chevron and CTA button icons lacked `aria-hidden="true"`; CTA buttons lacked visible focus rings. | Added `aria-hidden="true"` to chevron and icons; added `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white`. |
| **`src/components/About.jsx`** | Interactive video player preview element was a `<div>` with `onClick` but lacked keyboard access. | Added `role="button"`, `tabIndex={0}`, `aria-label="Play E-Cell showcase video"`, `onKeyDown` (Enter/Space support), and `focus-visible:ring-2`. |
| **`src/components/Timeline.jsx`** | Timeline interactive nodes were clickable `<div>` elements without keyboard controls. | Added `role="button"`, `tabIndex={0}`, `aria-label`, `aria-pressed={isActive}`, `onKeyDown` (Enter/Space support), and `focus-visible:ring-2`. |
| **`src/components/Events.jsx`** | Event registration cards lacked distinct focus states for keyboard users. | Added `focus-visible:ring-2 focus-visible:ring-indigo-500` to interactive elements. |
| **`src/components/Navbar.jsx`** | Mobile navigation drawer could not be dismissed via standard `Escape` key; hamburger menu lacked expanded state indicators. | Added `useEffect` listener for `Escape` key to close mobile drawer; ensured `aria-expanded` and `aria-label` reflect open/closed state. |
| **`src/components/Footer.jsx`** | Contact form `<input>` and `<textarea>` fields lacked accessible labels; submit button had only an icon without accessible name. | Added `<label className="sr-only" htmlFor="...">` for `contact-name`, `contact-email`, `contact-message`; added `aria-label="Send message"` and `focus-visible` ring to submit button. |
| **`src/pages/Login.jsx`** | Form inputs lacked associated `<label htmlFor="...">`; error banner lacked `role="alert"`; submit button lacked visible keyboard ring. | Linked labels via `htmlFor` and `id` (`login-email`, `login-password`); added `role="alert"` to error message; added `focus-visible:ring-2`. |
| **`src/pages/Profile.jsx`** | Avatar crop modal lacked dialog semantics (`role="dialog"`, `aria-modal`), lacked accessible title association, and could not be dismissed via `Escape`. | Added `role="dialog"`, `aria-modal="true"`, `aria-labelledby="crop-modal-title"`; added `Escape` key listener to dismiss modal; added `aria-label` to close button and zoom slider. |
| **`src/components/admin/MemberFormDrawer.jsx`** | Offscreen drawer interactive children remained focusable via `Tab`; form fields lacked `id`/`htmlFor` associations. | Added `aria-hidden={!isAddingMember}`; linked all form labels to inputs (`member-name`, `member-email`, `member-password`, `member-role`, `member-year`); added `Escape` key listener. |
| **`src/components/admin/TaskFormDrawer.jsx`** | Form fields lacked `id`/`htmlFor` associations; custom member dropdown lacked combobox / listbox ARIA semantics and `Escape` key dismissal. | Linked labels to inputs (`task-title`, `task-description`, `task-deadline`); converted custom dropdown trigger to `role="combobox"` with `aria-haspopup="listbox"`, `aria-expanded`, keyboard `Escape` dismissal, and option `role="option"`. |
| **`src/components/admin/MemberTable.jsx`** | Table headers lacked `scope="col"`; empty action headers lacked screen-reader text; action buttons lacked accessible names; dropdown menus lacked `role="menu"` and `role="menuitem"`. | Added `scope="col"` across all 3 tables; added `<span className="sr-only">Actions</span>`; added `aria-label={`Actions for ${member.name}`}`, `aria-haspopup="menu"`, `aria-expanded`; added `Escape` key listener for active dropdowns. |
| **`src/components/admin/TaskManagerTab.jsx`** | Delete task button lacked accessible name and focus ring. | Added `aria-label={`Delete task ${task.title}`}`, `aria-hidden="true"` on Trash icon, and `focus-visible` ring. |
| **`src/pages/AdminDashboard.jsx`** | Navigation between Team and Tasks lacked tablist ARIA semantics. | Added `role="tablist"`, `role="tab"`, `aria-selected`, `aria-controls`, and `role="tabpanel"` to container panels. |
| **`src/pages/Tasks.jsx`** | Category filters lacked tab semantics; external links lacked accessible labels. | Added `role="tablist"`, `role="tab"`, `aria-selected`, `focus-visible` styling to filter pills; added `aria-label={`View ${task.title} on NEC Portal`}` to external links. |
| **`src/components/team/TeamCard.jsx`** | Social link buttons lacked visible focus indicators. | Added `focus-visible:ring-2 focus-visible:ring-indigo-400` and `aria-hidden="true"` on internal SVG icons. |
| **`src/components/ScrollToTop.jsx`** | `scrollIntoView` and `window.scrollTo` ignored user motion preference. | Checked `window.matchMedia('(prefers-reduced-motion: reduce)')` to switch smooth scroll to instantaneous scroll when requested. |

---

## 3. Keyboard & Focus Management

1. **Tab & Shift+Tab Navigation:**
   * All interactive elements (links, buttons, custom comboboxes, tab buttons) now possess visible focus rings via `focus-visible:ring-2`. When navigated via mouse clicks, no intrusive outline appears, preserving design aesthetics.
2. **Space & Enter Activation:**
   * Custom interactive widgets (`About.jsx` video trigger, `Timeline.jsx` nodes, `TaskFormDrawer.jsx` member selection options) implement `onKeyDown` handlers responding to `Enter` and ` ` (Space).
3. **Escape Key Dismissal:**
   * `Navbar.jsx`: Mobile hamburger drawer closes on `Escape`.
   * `Profile.jsx`: Image crop dialog closes on `Escape`.
   * `MemberFormDrawer.jsx`: Add/Edit member drawer closes on `Escape`.
   * `TaskFormDrawer.jsx`: Assignee combobox dropdown closes on `Escape`.
   * `MemberTable.jsx`: Open action menu closes on `Escape`.
4. **No Keyboard Traps:**
   * When drawers/modals close, focus returns naturally to the calling document without getting trapped. Hidden drawers are marked `aria-hidden="true"` and `pointer-events-none`.

---

## 4. Forms & Accessible Naming

* **Explicit Label Association:**
  * Every input, select, and textarea in `Login.jsx`, `MemberFormDrawer.jsx`, `TaskFormDrawer.jsx`, and `Footer.jsx` has a dedicated `<label htmlFor={id}>` matching the control's `id`.
  * For compact forms (`Footer.jsx`), labels use Tailwind's `sr-only` class to remain invisible visually while announcing accurately to assistive screen readers.
* **Error States:**
  * Login failure banners are tagged with `role="alert"` so assistive technology immediately announces the error without requiring re-navigation.
* **Icon-Only Buttons:**
  * All icon-only buttons (menu triggers, delete buttons, external links, social links) now supply explicit `aria-label` attributes describing their function and target (e.g., `aria-label="Actions for John Doe"`, `aria-label="Delete task Submit Report"`).

---

## 5. Reduced Motion Compliance

* **CSS Motion Rules:**
  * `src/index.css` provides global `@media (prefers-reduced-motion: reduce)` overrides dampening `animation-duration` and `transition-duration` to `0.01ms`.
* **JS Animation Bypasses:**
  * `Starfield.jsx`: Canvas particle loop pauses when `(prefers-reduced-motion: reduce)` is active.
  * `ScrollToTop.jsx`: Switches scroll behavior from `smooth` to `instant`.

---

## 6. Verification Results

### Automated Accessibility Test Suite (`scratch/test_accessibility.cjs`)
All 26 automated checks passed without errors:
* **Landmarks**: App.jsx contains single primary main; Home.jsx has no nested main.
* **Escape Handlers**: Navbar, Profile crop modal, MemberFormDrawer, TaskFormDrawer, MemberTable.
* **Form Labels**: MemberFormDrawer, TaskFormDrawer, Login, Footer.
* **Tables**: Scope on column headers, action menu ARIA attributes.
* **Tabs**: Tablist, tab, aria-selected, tabpanel in AdminDashboard and Tasks.
* **Motion**: Starfield, ScrollToTop, index.css.

### Production Build Test (`npm run build`)
* Clean build in 2.54s without warnings or syntax errors.
