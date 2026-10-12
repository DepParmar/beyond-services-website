import { motion, useReducedMotion } from 'motion/react'
import { EASE_IN_OUT, EASE_OUT } from '../../lib/motion'

const HIDDEN = {
  left: 'inset(0% 100% 0% 0%)',
  right: 'inset(0% 0% 0% 100%)',
  up: 'inset(100% 0% 0% 0%)',
  down: 'inset(0% 0% 100% 0%)',
}

/**
 * Wipes media into view with a clip-path mask, optionally settling from a slight zoom.
 * Pass `active` to drive it from state; leave it undefined to reveal on scroll.
 *
 * The in-view trigger lives on the unclipped outer element: browsers treat an
 * element clipped to nothing as not intersecting, so a mask can never watch itself.
 * @param {{
 *   from?: 'left' | 'right' | 'up' | 'down',
 *   active?: boolean,
 *   duration?: number,
 *   delay?: number,
 *   scale?: boolean,
 *   className?: string,
 *   children: import('react').ReactNode,
 * }} props
 */
export default function ImageReveal({ from = 'right', active, duration = 1.2, delay = 0, scale = false, className, children }) {
  const reduce = useReducedMotion()
  const wipe = { duration: reduce ? 0.4 : duration, ease: EASE_IN_OUT }
  const mask = reduce
    ? { hidden: { opacity: 0, transition: wipe }, visible: { opacity: 1, transition: { ...wipe, delay } } }
    : {
        hidden: { clipPath: HIDDEN[from], transition: wipe },
        visible: { clipPath: 'inset(0% 0% 0% 0%)', transition: { ...wipe, delay } },
      }
  const zoom = {
    hidden: { scale: 1.12 },
    visible: { scale: 1, transition: { duration: duration + 0.6, delay, ease: EASE_OUT } },
  }

  const trigger =
    active !== undefined
      ? { animate: active ? 'visible' : 'hidden' }
      : { whileInView: 'visible', viewport: { once: true, amount: 0.25 } }

  return (
    <motion.div className={className} initial="hidden" {...trigger}>
      <motion.div className="image-reveal__mask" style={{ height: '100%' }} variants={mask}>
        {scale && !reduce ? (
          <motion.div style={{ height: '100%' }} variants={zoom}>
            {children}
          </motion.div>
        ) : (
          children
        )}
      </motion.div>
    </motion.div>
  )
}
