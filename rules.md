# E-Cell REC ABN – Styling & Design System Rules

## Design System Tokens

### 1. Color Palette
- **Primary / Brand Accent**: Indigo (`#4F46E5`, `indigo-600` / `indigo-400`)
- **Secondary Accents**: Purple (`#9333EA`), Emerald (`#10B981`), Amber (`#F59E0B`)
- **Dark Theme Surface**: Deep Obsidian (`#0a0a0a` / `#0a0f1e`), Dark Card (`bg-dark-card/40` with `backdrop-blur-3xl`)
- **Light Theme Surface**: Ultra Light Off-White (`#F9FAFB`), White Glass (`bg-white/60` with `backdrop-blur-3xl`)

### 2. Glassmorphism Standard
- **Borders**: `border border-white/60 dark:border-white/10`
- **Shadows**:
  - `shadow-premium` / `dark:shadow-premium-dark`
  - Hover: `hover:shadow-premium-hover` / `dark:hover:shadow-premium-dark-hover`
- **Backdrop Blur**: `backdrop-blur-xl` / `backdrop-blur-3xl`

### 3. Typography Hierarchy
- **Display Headings**: Font Display (`font-display font-bold tracking-tight text-balance`)
- **Body & Paragraphs**: Font Sans (`font-sans font-medium leading-relaxed`)
- **Badges & Overlines**: Font Mono (`font-mono font-bold tracking-widest uppercase text-xs`)

### 4. Layout Shift (CLS) Reduction Rules
- Every `<img>` and `<iframe>` must have explicit width/height or Tailwind aspect ratio (`aspect-video`, `aspect-square`, `h-64`, etc.).
- Reserve minimum heights on dynamic containers (`min-h-[...]`).
- Pre-render skeleton or fallback UI for all asynchronous assets.

### 5. Accessibility & Motion Rules
- All icon buttons must provide `aria-label` or descriptive text.
- Focus outlines must use `outline-none focus-visible:ring-2 focus-visible:ring-indigo-500`.
- All canvas animations must listen to `prefers-reduced-motion` and `document.visibilityState`.
