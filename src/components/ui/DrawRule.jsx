import { motion, useReducedMotion } from 'motion/react'
import { EASE_IN_OUT } from '../../lib/motion'
import './DrawRule.css'

/**
 * A champagne hairline that draws itself as it enters view.
 *
 * Horizontal rules grow from their start edge, vertical ones from the top.
 * Purely decorative, so it is hidden from assistive technology; under reduced
 * motion it is simply present at full length rather than animating.
 *
 * @param {{
 *   orientation?: 'horizontal' | 'vertical',
 *   delay?: number,
 *   duration?: number,
 *   className?: string,
 *   tone?: 'accent' | 'border',
 * }} props
 */
export default function DrawRule({
  orientation = 'horizontal',
  delay = 0,
  duration = 0.9,
  className = '',
  tone = 'accent',
}) {
  const reduce = useReducedMotion()
  const axis = orientation === 'vertical' ? 'scaleY' : 'scaleX'

  return (
    <motion.span
      aria-hidden="true"
      className={`draw-rule draw-rule--${orientation} draw-rule--${tone} ${className}`.trim()}
      initial={reduce ? false : { [axis]: 0 }}
      whileInView={{ [axis]: 1 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: reduce ? 0 : duration, delay, ease: EASE_IN_OUT }}
    />
  )
}
