# 17 — Components and patterns

The component inventory. Each entry: anatomy, props, variants, accessibility notes and the tokens it binds to. Treat this as the engineering spec — if a component is built that doesn't match this, the component is wrong, not the spec.

## Base layer

### Button

**Variants:** `primary`, `secondary`, `ghost`, `link`, `destructive`.
**Sizes:** `sm` (32px tall), `md` (40px), `lg` (48px).
**States:** `default`, `hover`, `active`, `focus-visible`, `disabled`, `loading`.

**Tokens:**

- Primary fill: `accent-primary` (champagne); hover swaps to `accent-hover` (the other approved champagne shade); text `text-inverse`.
- Secondary: `surface-inverse` fill, `text-inverse` text, 1px `border-strong` border; hover adds `shadow-sm`.
- Ghost: transparent fill, `text-primary` text; hover `surface-sunken` fill.
- Link: no fill, `text-link` text, underline on hover with `accent-primary`.
- Destructive: `status-error` fill, `text-inverse` text.
- Radius: `radius-md` (8px). Padding: `space-3 space-6` for md.
- Focus ring: `focus-ring` 2px, 2px offset in the matching theme's champagne.
- Pressed / active state: applied in the component layer with `transform: translateY(1px)` and `opacity: 0.92`. No separate colour token — this keeps the palette strictly to the 9 approved base colours.

**Icon slot:** supports a leading or trailing icon. 16px (sm/md) or 20px (lg). Icon colour inherits text colour.

### IconButton

Square variant of Button. Sizes 32/40/48. Use for close buttons, scroll-to-top, dropdown triggers. Always provide `aria-label`.

### Input

**Types:** text, email, tel, textarea, select.
**States:** `default`, `focus`, `error`, `disabled`.
**Tokens:** `surface-raised` fill, 1px `border-default`, `radius-md`, padding `space-3 space-4`, text `text-primary`. Focus: 1px `border-accent` + `focus-ring` shadow. Error: 1px `status-error`, helper text `status-error`.

**Label:** always above the input, `label` type style. Required marker: a champagne asterisk after the label text.

### Checkbox / Radio

20px box, `radius-sm`. Unchecked: 1px `border-strong`. Checked: `accent-primary` fill with inverse tick. Focus: `focus-ring`. Pair with label on the right.

### Chip / Badge

Pill shape, `radius-pill`. Variants:

- `neutral`: `surface-sunken` fill, `text-primary` text.
- `accent`: `accent-soft` fill, `text-accent` text.
- `success`, `warning`, `error`: paired soft fill and solid text from status tokens.

Height 24 (sm) or 28 (md). Padding `space-1 space-3`.

### Divider

1px line in `border-subtle` or `border-default`. Horizontal or vertical. No decorative gradient dividers.

## Navigation

### Header (NavBar)

Fixed top, 72px tall on desktop, 56px on mobile. Logo left, nav centre, CTA right.

**Behaviour:**

- Sticky on scroll. At `y=0`, transparent background and no shadow when over a dark hero. At `y>8px`, `surface-raised` background with `blur-md` backdrop and `shadow-sm`.
- Services dropdown opens on hover and focus. Closes on Escape, outside click, blur.
- Mobile: slide-in sheet from the right, max-width 420px, with the services accordion collapsed by default.

**Tokens:** nav links `nav` type style, `text-primary`. Active route: 2px `accent-primary` underline, 4px below the baseline. Hover: `text-accent`.

### Breadcrumb

See `02-information-architecture.md`.

### Pagination

Not required for launch — no paginated content.

## Content

### SectionHeader

The repeated block above every section. Three parts:

1. Eyebrow (`eyebrow`, `text-accent`, uppercase, letter-spaced).
2. Headline (`section-h1` or `page-h1`).
3. Optional lead (`lead`, `text-secondary`), max 2 lines preferred.

**Alignment:** left-aligned by default. Centre only in dark CTA strips.

### StatBand

A horizontal band of 3–4 stats. Each stat has a value (`stat-value`) and a label (`stat-label`).

**Variants:**

- `onCanvas`: on the cream canvas, no background, separated by thin dividers.
- `onDark`: on `surface-inverse`, no dividers, generous whitespace.

**Animation:** count-up on scroll-into-view, 800ms, `ease-decelerate`. Respect `prefers-reduced-motion` — render final value immediately when set.

### ServiceCard

The core card for every service in grids. Fixed aspect on desktop (380×420px target), fluid on mobile.

**Anatomy:**

- Thin champagne accent corner (top-left or top-right), 32px square.
- Discipline number (`eyebrow`, `text-muted`) e.g. "01".
- Service title (`section-h2`).
- Descriptor (`body`, `text-secondary`), 2 lines max.
- Separator (1px `border-subtle`).
- Capability tags (3 chips, `neutral` variant).
- Footer CTA: "Explore →" in `text-primary`, hover `text-accent`.

**States:** rest `shadow-sm`; hover lifts to `shadow-md` with 1px `border-accent`; focus adds `focus-ring`.

### DarkCtaStrip

The reusable call-to-action strip. `surface-inverse` background with champagne accent elements. Lives at the end of most pages.

**Anatomy:** eyebrow, headline (`section-h1`), lead, primary + secondary CTA.
**Padding:** `space-16 space-6` mobile, `space-24 space-12` desktop.

### DownloadsPanel

Service pages list downloadable brochures or specs. Each row: file icon, name, size, download link. VERIFY all file URLs before shipping — never list a file we don't actually host.

### FAQAccordion

Each FAQ is a disclosure. Rules:

- Question is a `button` with `aria-expanded`.
- One expanded at a time by default; configurable to multi-expand.
- 1px `border-subtle` between items. No rounded container needed.
- Icon: 16px chevron, rotates 180° on expand, 200ms `ease-standard`.
- Expanded panel height animates with `ease-standard` 320ms. Respect reduced motion.

### TestimonialCard

Quote mark glyph (large, champagne) at the top-left.
Quote body (`body-lg`, italic optional).
Attribution block: name (`section-h3`), role + company (`body-sm`, `text-muted`).
Border: 1px `border-subtle`. No photo — unless Beyond Service supplies verified portraits.

### QuoteForm

See `03-homepage.md` §11 for fields.

**Layout:** two-column form on desktop (name/company, email/phone paired), single column on mobile. Service and location full-width. Message full-width.

**States:**

- Default: all fields enabled, submit active.
- Loading: form disabled, submit button shows spinner and "Submitting…" label.
- Success: form replaced by a success card with the reference ID.
- Error: inline red banner, form remains editable, submit re-enabled.

**Validation:** inline on blur for required fields and format. Error text appears directly under the field in `status-error`.

### Modal / Dialog

Centred, `surface-raised`, `radius-xl`, `shadow-lg`. Backdrop `surface-overlay` (70% ink) with optional `blur-lg`. Focus trapped. Close on Escape or backdrop click. Return focus to the trigger on close.

## Composition patterns

### Hero (homepage)

- Full-bleed dark surface.
- Left: eyebrow, headline, lead, two CTAs.
- Right: 3D canvas or architectural photograph with champagne accent panel. See `18-motion-and-3d-direction.md`.

### Hero (service pages and About)

Compact variant — half the vertical weight. Breadcrumb at the top. No 3D canvas — too heavy for a non-homepage header.

### Three-up card grid

Standard across About, Services and Vendor Registration. Equal-weight cards, 24px gap on desktop, 16px on mobile. On tablet, drop to two columns.

### Nine-up service grid

3×3 on desktop with 24px gap. Each card uses the full ServiceCard. On tablet it's 2×5 (last card full-width or dropped). On mobile, single column stack. Lazy-load off-screen cards.

### Vertical process stepper

Service pages and About use this for the two-step and five-step processes. Each step: number (large champagne, `stat-value`), title (`section-h2`), body (`body`). Steps separated by a 1px `border-subtle` with 32px padding.

---

## Component checklist for engineering

Before marking a component done, confirm:

- [ ] All token references are through CSS variables defined by `tokens.json`, not hardcoded values.
- [ ] Both themes (light and dark) render correctly.
- [ ] Focus visible on every interactive element.
- [ ] All text passes 4.5:1 contrast (3:1 for ≥24px text).
- [ ] Keyboard-only navigation reaches every interactive element in a sensible order.
- [ ] Reduced-motion variant exists for every animated component.
- [ ] The component works at 320px viewport width without horizontal scroll.
