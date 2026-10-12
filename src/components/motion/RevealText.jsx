import { motion } from 'motion/react'
import { EASE_OUT } from '../../lib/motion'
import './RevealText.css'

// Typography reveals. They animate through the parent's `hidden` / `visible`
// variants, so a section orchestrates its own sequence with stagger().
// Under reduced motion, MotionConfig drops the transforms and only opacity remains.

const lineGroup = (stagger) => ({
  hidden: {},
  visible: { transition: { staggerChildren: stagger } },
})

const line = {
  hidden: { y: '108%' },
  visible: { y: '0%', transition: { duration: 0.95, ease: EASE_OUT } },
}

const label = {
  hidden: { opacity: 0, letterSpacing: '0.24em' },
  visible: { opacity: 1, letterSpacing: '0.03em', transition: { duration: 0.9, ease: EASE_OUT } },
}

/**
 * Small section label: fades in while its tracking tightens.
 * @param {{ as?: 'p' | 'span' | 'h2', className?: string, id?: string, children: import('react').ReactNode }} props
 */
export function RevealLabel({ as = 'p', className = '', id = undefined, children }) {
  const Tag = motion[as]
  return (
    <Tag id={id} className={`reveal-label t-label ${className}`.trim()} variants={label}>
      {children}
    </Tag>
  )
}

/**
 * Display heading revealed line by line, each line rising from behind a mask.
 * Lines are blocks, so a long line still wraps naturally on narrow screens.
 * A line may be `{ text, emphasis }`; emphasis sets it in the display italic.
 * @param {{
 *   as?: 'h1' | 'h2' | 'h3' | 'p',
 *   lines: Array<string | { text: string, emphasis?: boolean }>,
 *   className?: string,
 *   stagger?: number,
 *   id?: string,
 * }} props
 */
export function RevealLines({ as = 'h2', lines, className = '', stagger = 0.12, id = undefined }) {
  const Tag = motion[as]
  return (
    <Tag id={id} className={`reveal-lines ${className}`.trim()} variants={lineGroup(stagger)}>
      {lines.map((entry) => {
        const { text, emphasis } = typeof entry === 'string' ? { text: entry, emphasis: false } : entry
        return (
          <span key={text} className="reveal-lines__mask">
            <motion.span className={`reveal-lines__line${emphasis ? ' is-emphasis' : ''}`} variants={line}>
              {text}
            </motion.span>{' '}
          </span>
        )
      })}
    </Tag>
  )
}
