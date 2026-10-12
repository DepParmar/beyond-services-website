import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import useMediaQuery, { RICH_MOTION_QUERY } from '../../hooks/useMediaQuery'
import './IvoryPanel.css'

/**
 * The page's light chapter. As it scrolls in, the panel opens from a slightly
 * inset sheet to full bleed, so the switch from ink to ivory reads as one move
 * rather than a hard cut. Desktop only; elsewhere it is simply full width.
 */
export default function IvoryPanel({ children }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const rich = useMediaQuery(RICH_MOTION_QUERY) && !reduce
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'start 0.25'] })
  const inset = useTransform(scrollYProgress, [0, 1], [3, 0])
  const clipPath = useTransform(inset, (x) => `inset(0 ${x}% 0 ${x}%)`)

  return (
    <motion.div ref={ref} className="ivory-panel" style={rich ? { clipPath } : undefined}>
      {children}
    </motion.div>
  )
}
