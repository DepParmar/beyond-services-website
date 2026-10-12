import { motion } from 'motion/react'
import { RevealLabel, RevealLines } from '../../components/motion/RevealText'
import CTAButton from '../../components/CTAButton/CTAButton'
import { stagger } from '../../lib/motion'
import { LETS_TALK } from '../../content/site'
import './LetsTalk.css'

/**
 * Let's Talk — the final call to action, set on deep black with the champagne
 * accent held to the rule and the primary button.
 */
export default function LetsTalk() {
  return (
    <section className="section lets-talk" aria-labelledby="lets-talk-heading">
      <div className="container">
        <motion.div
          className="lets-talk__inner"
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.35 }}
        >
          <RevealLabel className="lets-talk__label">{LETS_TALK.label}</RevealLabel>

          <RevealLines
            as="h2"
            id="lets-talk-heading"
            lines={LETS_TALK.headingLines}
            className="lets-talk__heading"
          />

          <motion.p
            className="lets-talk__supporting t-body-lg"
            variants={{ hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0 } }}
          >
            {LETS_TALK.supporting}
          </motion.p>

          <motion.div
            className="lets-talk__actions"
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
          >
            <CTAButton href={LETS_TALK.primary.href} variant="primary" arrow>
              {LETS_TALK.primary.label}
            </CTAButton>
            <CTAButton href={LETS_TALK.secondary.href} variant="secondary">
              {LETS_TALK.secondary.label}
              <span className="visually-hidden"> — {LETS_TALK.secondary.display}</span>
            </CTAButton>
          </motion.div>

          <motion.ul
            className="lets-talk__details"
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
          >
            {LETS_TALK.details.map((detail) => (
              <li key={detail} className="lets-talk__detail t-caption">
                {detail}
              </li>
            ))}
          </motion.ul>
        </motion.div>
      </div>
    </section>
  )
}
