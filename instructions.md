# E-Cell REC ABN – Platform Instructions & Roadmap

## Architecture Guidelines
- **Framework**: React 18 with Vite
- **Styling**: Tailwind CSS with custom glassmorphism design tokens
- **Animations**: GSAP with ScrollTrigger
- **Backend & Auth**: Firebase Auth + Firestore
- **Performance Thresholds**:
  - Initial JS bundle < 100 KB gzipped
  - Cumulative Layout Shift (CLS) = 0
  - First Input Delay / INP < 50ms
  - 100% Mobile & Desktop viewport responsiveness

## Core Functional Modules
1. **Public Landing Page**:
   - `Navbar`: Sticky glassmorphic navigation with theme toggle, active intersection observer, and mobile drawer.
   - `Hero`: High-impact typography, quick stats banner, and call-to-action triggers.
   - `About`: Mission, Vision 2026, YouTube intro video, and 4-step Innovation Pipeline.
   - `Events`: Portfolio Bento grid for national achievements & summit showcases.
   - `Timeline`: Interactive 3D milestone roadmap for NEC 2026 with urgency indicators.
   - `Team`: Interactive executive board showcase with role descriptions and social handles.
   - `Footer`: Embedded Web3Forms outreach portal, resource links, and copyright statement.

2. **Member & Admin Portal**:
   - `AuthContext`: Real-time auth state synchronization with role-based access control (`member` vs `admin`).
   - `Tasks`: Actionable task board with dynamic status tracking (`pending`, `in-progress`, `completed`).
   - `Profile`: User avatar cropping, personal stats, and social connection management.
   - `AdminDashboard`: Member roster control, task delegation, and submission management.
