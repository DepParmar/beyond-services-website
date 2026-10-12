// Shared motion vocabulary. Every animated component draws from these values so
// timing stays consistent across the site.

/** @type {[number, number, number, number]} */
export const EASE_OUT = [0.16, 1, 0.3, 1]
/** @type {[number, number, number, number]} */
export const EASE_IN_OUT = [0.65, 0, 0.35, 1]

export const DURATION = {
  fast: 0.18,
  base: 0.32,
  reveal: 0.8,
  slow: 1.1,
}

const transition = (duration = DURATION.reveal, delay = 0) => ({ duration, delay, ease: EASE_OUT })

// Reveal variants share the `hidden` / `visible` keys so they compose with stagger().
export const reveal = {
  fade: {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: transition() },
  },
  up: {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: transition() },
  },
  slide: {
    hidden: { opacity: 0, x: -32 },
    visible: { opacity: 1, x: 0, transition: transition() },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.96 },
    visible: { opacity: 1, scale: 1, transition: transition(DURATION.slow) },
  },
  // Line-by-line text reveal: each line rises from behind a clipping mask.
  text: {
    hidden: { opacity: 0, y: '0.6em' },
    visible: { opacity: 1, y: 0, transition: transition(0.9) },
  },
}

// A reveal variant whose entrance waits `delay` seconds (variant transitions
// take precedence over a component's `transition` prop, so delay goes here).
export const withDelay = (variant, delay) => ({
  ...variant,
  visible: { ...variant.visible, transition: { ...variant.visible.transition, delay } },
})

export const stagger = (each = 0.08, delayChildren = 0) => ({
  hidden: {},
  visible: { transition: { staggerChildren: each, delayChildren } },
})

// A hairline rule that draws in from the left (use with transform-origin: left).
export const ruleDraw = {
  hidden: { scaleX: 0 },
  visible: { scaleX: 1, transition: { duration: 0.9, ease: EASE_IN_OUT } },
}
