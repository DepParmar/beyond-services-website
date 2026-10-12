import { motion } from 'motion/react'
import SectionIntro from '../../components/ui/SectionIntro'
import ScrollReveal from '../../components/motion/ScrollReveal'
import DrawRule from '../../components/ui/DrawRule'
import PendingPanel from '../../components/ui/PendingPanel'
import CTAButton from '../../components/CTAButton/CTAButton'
import { RevealLines } from '../../components/motion/RevealText'
import { stagger } from '../../lib/motion'
import { INDUSTRIES } from '../../content/site'
import './IndustriesSection.css'

/**
 * Industries We Serve.
 *
 * Typography-led by choice. The Services grid immediately above is carried by
 * photography, and no industry imagery has been supplied — so rather than
 * repeat a service photograph against a sector it does not depict, or invent
 * one, this section is built from an index, hairline rules and the approved
 * copy. That also gives the homepage a deliberate change of texture between two
 * image-heavy sections.
 *
 * The six categories are stated, not linked: no industry pages exist, and the
 * brief rules out inventing them. They are therefore plain list items with no
 * hover affordance that would imply a destination.
 */
export default function IndustriesSection() {
  const { categories, closing, cta } = INDUSTRIES

  return (
    <section className="section industries" aria-labelledby="industries-heading">
      <div className="container">
        <SectionIntro
          id="industries-heading"
          label={INDUSTRIES.label}
          lines={INDUSTRIES.headingLines}
          supporting={INDUSTRIES.supporting}
          align="split"
        >
          <motion.div
            className="industries__cta"
            variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
          >
            <CTAButton href={cta.href} variant="secondary" arrow>
              {cta.label}
            </CTAButton>
          </motion.div>
        </SectionIntro>

        {categories.length > 0 ? (
          <ScrollReveal as="ul" className="industries__list" stagger={0.07} amount={0.15}>
            {categories.map((industry, i) => (
              <ScrollReveal.Item as="li" key={industry.name} className="industries__item">
                <span className="industries__num t-label" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="industries__name">{industry.name}</span>
                {industry.text && <span className="industries__text t-body">{industry.text}</span>}
              </ScrollReveal.Item>
            ))}
          </ScrollReveal>
        ) : (
          <PendingPanel
            title="The industry categories for this section have not been approved yet."
            note="Beyond Service's verified sectors will be listed here once supplied. Nothing is shown in the meantime, because an invented industry portfolio would misrepresent the company."
          />
        )}

        {/* The closing statement doubles as the hand-off into the next section. */}
        <motion.div
          className="industries__closing"
          variants={stagger(0.12)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          <DrawRule className="industries__closing-rule" duration={1.2} />
          <RevealLines
            as="p"
            lines={closing.headingLines}
            className="industries__closing-heading"
          />
          <motion.p
            className="industries__closing-text"
            variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
          >
            {closing.text}
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}
