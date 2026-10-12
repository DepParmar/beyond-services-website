import SectionIntro from '../../components/ui/SectionIntro'
import ScrollReveal from '../../components/motion/ScrollReveal'
import CTAButton from '../../components/CTAButton/CTAButton'
import { WHAT_WE_OFFER } from '../../content/site'
import './WhatWeOfferSection.css'

const { featured } = WHAT_WE_OFFER

/**
 * What We Offer — a compact feature on one capability (ELV), deliberately
 * unlike both the expertise slider and the full services catalogue.
 *
 * Typography-led: the only ELV photograph supplied belongs to the ELV service
 * card, and the brief forbids reusing a photograph across sections.
 */
export default function WhatWeOfferSection() {
  return (
    <section className="section offer" aria-labelledby="offer-heading">
      <div className="container">
        <SectionIntro
          id="offer-heading"
          label={WHAT_WE_OFFER.label}
          lines={WHAT_WE_OFFER.headingLines}
          supporting={WHAT_WE_OFFER.supporting}
          align="split"
        />

        <ScrollReveal className="offer__feature" stagger={0.1} amount={0.3}>
          <ScrollReveal.Item as="div" className="offer__feature-head">
            <p className="offer__eyebrow t-label">{featured.eyebrow}</p>
            <h3 className="offer__title">{featured.title}</h3>
          </ScrollReveal.Item>

          <ScrollReveal.Item as="div" className="offer__feature-body">
            <p className="offer__text t-body-lg">{featured.text}</p>

            <ul className="offer__systems" aria-label="ELV systems">
              {featured.systems.map((system) => (
                <li key={system} className="offer__system t-label">
                  {system}
                </li>
              ))}
            </ul>

            <CTAButton href={featured.cta.href} variant="secondary" arrow className="offer__cta">
              {featured.cta.label}
            </CTAButton>
          </ScrollReveal.Item>
        </ScrollReveal>
      </div>
    </section>
  )
}
