import { motion } from 'motion/react'
import { RevealLabel, RevealLines } from '../motion/RevealText'
import { stagger } from '../../lib/motion'
import './SectionIntro.css'

/**
 * The standard opening of every section: a gold-ruled eyebrow, a display
 * heading revealed line by line, and optional supporting copy.
 *
 * It owns the `hidden` / `visible` orchestration, so a section only has to drop
 * it in. `align` switches between the default left column and a wide two-column
 * split where the supporting copy sits beside the heading.
 *
 * @param {{
 *   label: string,
 *   lines: Array<string | { text: string, emphasis?: boolean }>,
 *   supporting?: string,
 *   align?: 'start' | 'split',
 *   as?: 'h2' | 'h3',
 *   id?: string,
 *   tone?: 'dark' | 'light',
 *   className?: string,
 *   children?: import('react').ReactNode,
 * }} props
 */
export default function SectionIntro({
  label,
  lines,
  supporting,
  align = 'start',
  as = 'h2',
  id,
  tone = 'dark',
  className = '',
  children,
}) {
  return (
    <motion.div
      className={`section-intro section-intro--${align} section-intro--${tone} ${className}`.trim()}
      variants={stagger(0.1)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
    >
      <div className="section-intro__head">
        <RevealLabel className="section-intro__label">{label}</RevealLabel>
        <RevealLines as={as} id={id} lines={lines} className="section-intro__heading t-h2" />
      </div>
      {(supporting || children) && (
        <div className="section-intro__aside">
          {supporting && (
            <motion.p
              className="section-intro__supporting t-body-lg"
              variants={{ hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0 } }}
            >
              {supporting}
            </motion.p>
          )}
          {children}
        </div>
      )}
    </motion.div>
  )
}
