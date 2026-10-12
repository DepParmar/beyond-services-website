import { motion } from 'motion/react'
import './PendingPanel.css'

/**
 * A clearly identified empty state for a section whose real content has not
 * been supplied yet — client logos, reviews, team portraits, project work.
 *
 * It deliberately does not imitate finished content: no placeholder cards, no
 * grey portrait circles, no sample names. It states what the section will hold
 * and what it is waiting for, so the page reads as unfinished-by-intent rather
 * than broken, and nobody mistakes it for real company information.
 *
 * @param {{ title: string, note: string, tone?: 'dark' | 'light' }} props
 */
export default function PendingPanel({ title, note, tone = 'dark' }) {
  return (
    <motion.div
      className={`pending pending--${tone}`}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.7 }}
    >
      <p className="pending__title">{title}</p>
      <p className="pending__note t-caption">{note}</p>
    </motion.div>
  )
}
