import { motion } from 'motion/react'
import ScrollReveal from '../../components/motion/ScrollReveal'
import { RevealLabel, RevealLines } from '../../components/motion/RevealText'
import { stagger } from '../../lib/motion'
import { QUALITY } from '../../content/site'
import './QualitySection.css'

/**
 * Our Commitment — Quality & Credentials.
 *
 * Composed as a centred editorial panel inside a thin frame with drawn corner
 * brackets, rather than as a flat left-aligned list: the statement is the
 * whole section, so it is given a deliberate composition and real whitespace
 * instead of being left to read as a text box.
 *
 * No certification, accreditation, award or audit has been supplied or
 * verified for Beyond Service, so none is shown. There is no badge wall and no
 * logo strip here, because an unverified certification mark is the single most
 * damaging thing a corporate site can publish.
 *
 * What the section does carry is the quality commitment itself, broken into
 * the three things the approved copy actually claims, and a line stating
 * plainly that no credential is being claimed. That reads as deliberate rather
 * than thin, and it stays true.
 */
export default function QualitySection() {
  return (
    <section className="section quality" aria-labelledby="quality-heading">
      <div className="container">
        <motion.div
          className="quality__panel"
          variants={stagger(0.12)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <span className="quality__corner quality__corner--tl" aria-hidden="true" />
          <span className="quality__corner quality__corner--tr" aria-hidden="true" />
          <span className="quality__corner quality__corner--bl" aria-hidden="true" />
          <span className="quality__corner quality__corner--br" aria-hidden="true" />

          <RevealLabel className="quality__label">{QUALITY.label}</RevealLabel>

          <RevealLines as="h2" id="quality-heading" lines={QUALITY.headingLines} className="quality__heading" />

          <motion.p
            className="quality__lead t-body-lg"
            variants={{ hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0 } }}
          >
            {QUALITY.supporting}
          </motion.p>

          <ScrollReveal as="ul" className="quality__list" stagger={0.1} amount={0.2}>
            {QUALITY.pillars.map((pillar, i) => (
              <ScrollReveal.Item as="li" key={pillar.title} className="quality__item">
                <span className="quality__num t-label" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="quality__title">{pillar.title}</h3>
                <p className="quality__text t-body">{pillar.text}</p>
              </ScrollReveal.Item>
            ))}
          </ScrollReveal>
        </motion.div>

        <ScrollReveal className="quality__note t-caption" variant="up" amount={0.5}>
          {QUALITY.note}
        </ScrollReveal>
      </div>
    </section>
  )
}
