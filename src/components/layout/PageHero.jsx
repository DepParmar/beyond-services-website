import { motion } from 'motion/react'
import { RevealLabel, RevealLines } from '../motion/RevealText'
import { stagger } from '../../lib/motion'
import './PageHero.css'

/**
 * The opening band for every interior page. Deliberately quieter than the home
 * hero — no film, no scene story — so an interior page announces itself without
 * competing with the home page's cinematic opening.
 *
 * Every future route inherits this, which is what keeps the pages feeling like
 * one organisation.
 *
 * @param {{ label: string, lines: Array<string | { text: string, emphasis?: boolean }>, supporting?: string, meta?: string, id?: string }} props
 */
export default function PageHero({ label, lines, supporting, meta, id = 'page-heading' }) {
  return (
    <section className="page-hero" aria-labelledby={id}>
      <div className="container">
        <motion.div className="page-hero__inner" variants={stagger(0.1)} initial="hidden" animate="visible">
          <RevealLabel className="page-hero__label">{label}</RevealLabel>

          <RevealLines as="h1" id={id} lines={lines} className="page-hero__heading" />

          {supporting && (
            <motion.p
              className="page-hero__supporting t-body-lg"
              variants={{ hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0 } }}
            >
              {supporting}
            </motion.p>
          )}

          {meta && (
            <motion.p
              className="page-hero__meta t-caption"
              variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
            >
              {meta}
            </motion.p>
          )}
        </motion.div>
      </div>
    </section>
  )
}
