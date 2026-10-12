import Header from '../components/Header/Header'
import Footer from '../components/layout/Footer'
import PageHero from '../components/layout/PageHero'
import ServiceGrid from '../components/ui/ServiceGrid'
import ScrollReveal from '../components/motion/ScrollReveal'
import { RevealLabel, RevealLines } from '../components/motion/RevealText'
import CTAButton from '../components/CTAButton/CTAButton'
import { motion } from 'motion/react'
import { stagger } from '../lib/motion'
import { CONTACT_INFO, LINKS, SERVICE_CARDS, SERVICES_PAGE, telHref } from '../content/site'
import './ServicesPage.css'

/**
 * /services — the dedicated overview.
 *
 * The same editorial stacked composition as the homepage section, given room
 * to breathe: the page has its own hero, so the grid reclaims the first row's
 * intro slot and opens on a wider card instead.
 *
 * Each card links to the service's existing detail route; nothing about those
 * nine pages is restated here.
 */
export default function ServicesPage() {
  return (
    <>
      <Header pinned />

      <main id="main" tabIndex={-1}>
        <PageHero
          label={SERVICES_PAGE.hero.label}
          lines={SERVICES_PAGE.hero.headingLines}
          meta={SERVICES_PAGE.hero.meta}
        />

        <section className="section services-page__grid-section" aria-labelledby="services-all">
          <div className="container">
            <ScrollReveal className="services-page__lead" variant="up" amount={0.4}>
              <h2 id="services-all" className="visually-hidden">
                All nine services
              </h2>
              <p className="services-page__lead-text">{SERVICES_PAGE.supporting}</p>
            </ScrollReveal>

            <ServiceGrid cards={SERVICE_CARDS} />
          </div>
        </section>

        <section className="section services-page__cta" aria-labelledby="services-cta-heading">
          <div className="container">
            <motion.div
              className="services-page__cta-inner"
              variants={stagger(0.1)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.4 }}
            >
              <RevealLabel className="services-page__cta-label">Ready to get started?</RevealLabel>
              <RevealLines
                as="h2"
                id="services-cta-heading"
                lines={['Tell Us What You Need.', 'We’ll Take It From There.']}
                className="services-page__cta-heading"
              />
              <motion.div
                className="services-page__cta-actions"
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              >
                <CTAButton href={LINKS.quote} variant="primary" arrow>
                  Request a quote
                </CTAButton>
                <CTAButton href={telHref(CONTACT_INFO.phones[0])} variant="secondary">
                  Call the team
                  <span className="visually-hidden"> — {CONTACT_INFO.phones[0]}</span>
                </CTAButton>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
