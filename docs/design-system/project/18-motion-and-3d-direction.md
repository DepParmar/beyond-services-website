# 18 — Motion and 3D direction

Motion vocabulary, 3D scene concept and performance rules. Treat this as the spec; don't invent additional animations or 3D elements beyond what's defined here.

---

## Part 1 — Motion vocabulary

### Durations (reference the motion tokens; see §Durations below)

| Token | Value | Where |
|---|---|---|
| `duration-xs` | 120ms | Icon state swaps, chip taps |
| `duration-sm` | 200ms | Hover, focus, input affordances |
| `duration-md` | 320ms | Card and modal entrances, FAQ accordion |
| `duration-lg` | 520ms | Section reveals on scroll |
| `duration-xl` | 720ms | Hero entrance choreography |

### Easings

| Token | Curve | Where |
|---|---|---|
| `ease-standard` | `cubic-bezier(0.2, 0, 0, 1)` | Default enter/exit |
| `ease-decelerate` | `cubic-bezier(0.0, 0, 0.2, 1)` | Deceleration into rest. Hero reveals, stat count-up |
| `ease-accelerate` | `cubic-bezier(0.4, 0, 1, 1)` | Exits |
| `ease-emphasized` | `cubic-bezier(0.16, 1, 0.3, 1)` | Impactful reveals — section hero only |

(The design-system token file cannot store motion as tokens — see format spec. The values above are the canonical reference and should be exposed as CSS custom properties in the implementation.)

### Durations in CSS

```css
:root {
  --duration-xs: 120ms;
  --duration-sm: 200ms;
  --duration-md: 320ms;
  --duration-lg: 520ms;
  --duration-xl: 720ms;
  --ease-standard: cubic-bezier(0.2, 0, 0, 1);
  --ease-decelerate: cubic-bezier(0, 0, 0.2, 1);
  --ease-accelerate: cubic-bezier(0.4, 0, 1, 1);
  --ease-emphasized: cubic-bezier(0.16, 1, 0.3, 1);
}
```

### Pattern library

**Hero entrance.** On first paint: eyebrow fades up (opacity 0→1, translateY 8px→0, `duration-md`, `ease-decelerate`), then headline (delay 80ms, `duration-xl`, `ease-emphasized`), then lead (delay 160ms, `duration-lg`), then CTAs (delay 220ms, `duration-md`). All elements end at 1.0 opacity and translateY 0.

**Section reveal.** Each section fades up on scroll-into-view (threshold 20% visible): opacity 0→1, translateY 12px→0, `duration-lg`, `ease-decelerate`. Children stagger by 60ms.

**Card hover.** `transform: translateY(-2px)` + shadow upgrade from `shadow-sm` to `shadow-md`, 200ms `ease-standard`. Champagne border fades in via `border-color` transition. Do not scale cards (`scale(1.02)` breaks pixel grid).

**Button hover.** Background colour transition 160ms `ease-standard`. Primary buttons also deepen their shadow by `shadow-xs → shadow-sm`.

**FAQ accordion.** Height animates with `grid-template-rows: 0fr → 1fr` (modern approach, works in all evergreen browsers), 320ms `ease-standard`. Icon rotates 180°.

**Modal / dialog.** Backdrop fades in (`duration-sm`); dialog scales from 0.96 to 1.0 with opacity 0→1 (`duration-md`, `ease-decelerate`). Reverse on close (`ease-accelerate`).

**Stat count-up.** Numbers animate from 0 to target over 800ms, `ease-decelerate`. On reduced-motion, render final value immediately.

### Rules

- **Never hijack scroll.** No scroll-locked storytelling, no scrolljacking.
- **Never animate every element on every section.** Pick what to emphasise; let the rest sit.
- **No bounce easings on business content.** Playful easings undermine credibility here.
- **Reduce not remove.** On `prefers-reduced-motion: reduce`, keep opacity and small transforms but drop larger movement and auto-play. Count-up animations resolve to final values immediately.

---

## Part 2 — 3D scene direction

### The one 3D moment

Beyond Service is a facility management and project execution business. The 3D moment is a quiet signature in the hero that reads as **architectural precision**, not as a graphics demo.

**Chosen direction:** a minimalist architectural model of a composite corporate facility — a mid-rise commercial building with a visible mechanical rooftop, hinting at the MEP, ELV, cooling and fire-safety systems the company services. Rendered in flat champagne-on-charcoal (surface-inverse base, champagne accent lines for building edges), lit with a single soft key light from the top-right.

Rejected directions:

- A spinning globe or planet-India visualisation — read as travel-industry cliché.
- A particle network of connected nodes — read as crypto or AI product.
- A floating service icon system — too close to SaaS onboarding art.
- A detailed photorealistic datacenter interior — misrepresents our scope (we service, we don't own data centres).

### Scene composition

- **Camera.** Fixed slight 3/4 angle. Minimal auto-rotation — ±2° wobble over 12 seconds, triggered by pointer movement, damped. No continuous spinning.
- **Lighting.** One warm directional light at 35° elevation from top-right, intensity 0.9. One fill light at the opposite side, intensity 0.25, cool-neutral. One ambient light at 0.15.
- **Materials.** Matte, non-metallic. Base material: `#17191a` (ink-800). Edge accent: `#b99a63` (champagne-500) on building outlines and the rooftop MEP block. No glass, no reflections, no glow.
- **Camera depth of field.** Subtle — slight blur on the background rooftop systems, sharp focus on the building face.
- **Pointer parallax.** The model shifts up to 6px on pointer move. Disabled on touch devices. Disabled under `prefers-reduced-motion`.

### Interaction rules

- The 3D canvas never blocks button clicks, keyboard navigation or text selection. The hero copy sits in a layer *above* the canvas (`position: relative; z-index: 10`), the canvas sits at `z-index: 0`.
- The 3D canvas must not consume more than 25% of the hero's visual weight. The copy is the hero; the model is the accent.
- Clicks on the canvas do nothing. It is decorative. Do not add tooltips, labels or hover highlights.

### Technical implementation

**Libraries.** `three@0.168.0` + `@react-three/fiber@8.17.6` + `@react-three/drei@9.112.1`. Pin exact versions. Do not pull `@react-three/postprocessing` for this build — the effect is not needed and it ships significant extra JS.

**Asset format.** Model as a single `.glb` file, under 400 KB after Draco compression. Textures baked into vertex colours; no texture atlases.

**Loading.** Lazy-load the entire 3D bundle. The hero copy renders first; the canvas mounts after the main thread is idle (`requestIdleCallback` with a `setTimeout` fallback). While unmounted, show a static dark panel with a thin champagne outline — the fallback is intentional, not a loading state.

**Performance budget.**

- The 3D bundle must not exceed 180 KB gzipped.
- First Contentful Paint must not regress by more than 150ms with 3D included.
- Target 60fps on mid-range mobile (iPhone 11 / Samsung A54 class). If frame rate drops below 45fps for 2 seconds, pause auto-rotation.
- Disable the canvas entirely on devices reporting `prefers-reduced-motion: reduce` or when the user's device memory (via `navigator.deviceMemory`) is ≤ 2GB.
- Pause the render loop when the canvas is not in the viewport (`IntersectionObserver`).

**Fallback.** If WebGL fails or the scene errors on mount, replace with a static architectural line illustration (SVG), same framing, same colours. Do not retry WebGL.

### Why one 3D moment, not many

The master prompt explored a 3D-heavy website. We're deliberately restraining. Reasons:

1. B2B facility clients audit for substance, not spectacle. A single confident 3D element reads premium; a 3D element in every section reads as a startup trying too hard.
2. Performance is a reliability signal for a facility services company. Jank undermines the "we deliver on time" message.
3. Dark hero + 3D accent is the signature. Repeating it below weakens the hero.

### Alternative, if the one-scene direction tests poorly

If stakeholder review wants more 3D, add a secondary 3D element at the "Our footprint" section — a stylised minimal map of India with champagne dots at the states covered. Same material language, same restraint. Still no third 3D moment.

---

## Part 3 — Animation accessibility checklist

- [ ] Every scroll-triggered animation has a non-animated resting state the user can reach via `prefers-reduced-motion`.
- [ ] No animation runs longer than 2 seconds without user interaction.
- [ ] No flashing content faster than 3Hz (seizure risk).
- [ ] The 3D canvas has an accessible label (`aria-label="Architectural rendering of a corporate facility"`) and does not trap focus.
- [ ] Count-up animations expose the final value to assistive technology (`aria-live="polite"` with the final value, not the intermediate values).
- [ ] FAQ accordion changes announce correctly (`aria-expanded`).
