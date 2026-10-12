import Header from '../components/Header/Header'
import Footer from '../components/layout/Footer'
import SectionIntro from '../components/ui/SectionIntro'
import Accordion from '../components/ui/Accordion'
import PendingPanel from '../components/ui/PendingPanel'
import DrawRule from '../components/ui/DrawRule'
import ScrollReveal from '../components/motion/ScrollReveal'
import ImageReveal from '../components/motion/ImageReveal'
import { RevealLabel, RevealLines } from '../components/motion/RevealText'
import CTAButton from '../components/CTAButton/CTAButton'
import { motion } from 'motion/react'
import { stagger } from '../lib/motion'
import { Link } from '../router/router'
import { SERVICE_DETAILS, getRelated } from '../content/services'
import { CONTACT_INFO, LINKS, telHref } from '../content/site'
import './ServiceDetailPage.css'

/**
 * One reusable template for all nine /services/* detail pages.
 *
 * Every section is driven by the service record in `content/services.js`, so
 * there is a single implementation rather than nine near-copies. Sections that
 * the source does not supply are omitted rather than padded: PDF B carries no
 * benefits block and no secondary gallery, so neither is invented here.
 *
 * The main image is always square. Where the available photograph does not
 * honestly depict the service, the square keeps its dimensions and states what
 * it is waiting for, which holds the layout steady and avoids publishing a
 * misleading picture.
 *
 * @param {{ service: import('../content/services').Service }} props
 */
export default function ServiceDetailPage({ service }) {
  const related = getRelated(service)
  const hasImage = Boolean(service.image)

  return (
    <>
      <Header pinned />

      <main id="main" tabIndex={-1}>
        {/* --- A. Service hero --------------------------------------------- */}
        <section className="svc-hero" aria-labelledby="svc-title">
          <div className="container">
            <motion.div
              className="svc-hero__grid"
              variants={stagger(0.1)}
              initial="hidden"
              animate="visible"
            >
              <div className="svc-hero__copy">
                <motion.nav
                  className="svc-hero__crumbs"
                  aria-label="Breadcrumb"
                  variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
                >
                  <Link to={LINKS.services} className="svc-hero__crumb">
                    All services
                  </Link>
                  <span className="svc-hero__crumb-sep" aria-hidden="true">
                    /
                  </span>
                  <span className="svc-hero__crumb svc-hero__crumb--current">{service.name}</span>
                </motion.nav>

                <RevealLabel className="svc-hero__label">
                  Service {service.num} · {service.region}
                </RevealLabel>

                <RevealLines
                  as="h1"
                  id="svc-title"
                  lines={[service.name]}
                  className="svc-hero__title"
                />

                <motion.p
                  className="svc-hero__tagline"
                  variants={{ hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0 } }}
                >
                  {service.tagline}
                </motion.p>

                <motion.div
                  className="svc-hero__actions"
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
              </div>

              {/* The square. 1:1 at every width, image or not. */}
              <div className="svc-hero__figure">
                <div className="svc-square">
                  {hasImage ? (
                    <ImageReveal from="up" duration={1.2} scale className="svc-square__reveal">
                      <img
                        className="svc-square__img"
                        src={service.image.src}
                        alt={service.image.alt}
                        style={{ objectPosition: service.image.focus }}
                        width="1000"
                        height="1000"
                        decoding="async"
                      />
                    </ImageReveal>
                  ) : (
                    <div className="svc-square__pending">
                      <PendingPanel
                        title="Service photograph pending"
                        note={`Awaiting ${service.imageNeeded}. No stand-in image is shown, so nothing here misrepresents this service.`}
                      />
                    </div>
                  )}

                  {/* Glass category tag floating on the square. */}
                  <motion.span
                    className="svc-square__tag"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.75, duration: 0.6 }}
                  >
                    {service.name}
                  </motion.span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* --- Body: service rail + content -------------------------------- */}
        <div className="svc-body">
          <div className="container svc-body__grid">
            {/* Section 11 — the all-services selector. */}
            <nav className="svc-rail" aria-label="All services">
              <p className="svc-rail__title t-label">All services</p>
              <ul className="svc-rail__list">
                {SERVICE_DETAILS.map((s) => {
                  const isActive = s.slug === service.slug
                  return (
                    <li key={s.slug}>
                      <Link
                        to={s.href}
                        className="svc-rail__link"
                        data-active={isActive || undefined}
                        aria-current={isActive ? 'page' : undefined}
                      >
                        <span className="svc-rail__num">{s.num}</span>
                        <span className="svc-rail__name">{s.name}</span>
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </nav>

            <div className="svc-main">
              {/* --- B. Overview ------------------------------------------- */}
              <section className="svc-section" aria-labelledby="svc-overview-heading">
                <SectionIntro
                  id="svc-overview-heading"
                  label="Service overview"
                  lines={['What This Service Covers.']}
                />
                <ScrollReveal className="svc-prose" variant="up" amount={0.25}>
                  <p className="svc-prose__lead">{service.overview}</p>
                </ScrollReveal>
              </section>

              {/* --- C. Key capabilities ----------------------------------- */}
              <section className="svc-section" aria-labelledby="svc-caps-heading">
                <SectionIntro
                  id="svc-caps-heading"
                  label="Key capabilities"
                  lines={['What We Deliver.']}
                />
                <ScrollReveal as="ul" className="svc-caps" stagger={0.08} amount={0.2}>
                  {service.capabilities.map((cap) => (
                    <ScrollReveal.Item as="li" key={cap} className="svc-cap">
                      <span className="svc-cap__marker" aria-hidden="true">
                        <svg viewBox="0 0 14 14" width="11" height="11">
                          <path
                            d="M2.5 7.5l3 3 6-6.5"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                      <span className="svc-cap__text">{cap}</span>
                    </ScrollReveal.Item>
                  ))}
                </ScrollReveal>
              </section>

              {/* --- E. Two-step process ----------------------------------- */}
              <section className="svc-section" aria-labelledby="svc-process-heading">
                <SectionIntro
                  id="svc-process-heading"
                  label="Our 2-step process"
                  lines={['How The Work Runs.']}
                />
                <div className="svc-process">
                  <div className="svc-process__line" aria-hidden="true">
                    <DrawRule orientation="vertical" duration={1.1} />
                  </div>
                  <ol className="svc-process__list">
                    {service.process.map((step, i) => (
                      <motion.li
                        key={step.num}
                        className="svc-step"
                        initial={{ opacity: 0, y: 22 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.65, delay: 0.2 + i * 0.22 }}
                      >
                        <span className="svc-step__num" aria-hidden="true">
                          {step.num}
                        </span>
                        <div className="svc-step__body">
                          <h3 className="svc-step__title">{step.title}</h3>
                          <p className="svc-step__text t-body">{step.text}</p>
                        </div>
                      </motion.li>
                    ))}
                  </ol>
                </div>
              </section>

              {/* --- H. FAQs ----------------------------------------------- */}
              <section className="svc-section" aria-labelledby="svc-faq-heading">
                <SectionIntro
                  id="svc-faq-heading"
                  label="Frequently asked questions"
                  lines={['Common Questions.']}
                />
                <ScrollReveal variant="up" amount={0.15}>
                  <Accordion items={service.faqs} className="svc-faq" />
                </ScrollReveal>
              </section>
            </div>
          </div>
        </div>

        {/* --- I. Related services ------------------------------------------ */}
        {related.length > 0 && (
          <section className="section svc-related" aria-labelledby="svc-related-heading">
            <div className="container">
              <SectionIntro
                id="svc-related-heading"
                label="Related services"
                lines={['Often Needed Alongside.']}
                align="split"
              />
              <ScrollReveal as="ul" className="svc-related__list" stagger={0.1} amount={0.3}>
                {related.map((r) => (
                  <ScrollReveal.Item as="li" key={r.slug} className="svc-related__item">
                    <Link to={r.href} className="svc-related__link">
                      <span className="svc-related__num t-label">{r.num}</span>
                      <span className="svc-related__name">{r.name}</span>
                      <span className="svc-related__text t-caption">{r.tagline}</span>
                      <svg
                        className="svc-related__arrow"
                        viewBox="0 0 16 16"
                        width="15"
                        height="15"
                        aria-hidden="true"
                      >
                        <path
                          d="M3 8h9M8.5 4l4 4-4 4"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </Link>
                  </ScrollReveal.Item>
                ))}
              </ScrollReveal>
            </div>
          </section>
        )}

        {/* --- J. Final CTA -------------------------------------------------- */}
        <section className="section svc-cta" aria-labelledby="svc-cta-heading">
          <div className="container">
            <motion.div
              className="svc-cta__panel"
              variants={stagger(0.1)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.4 }}
            >
              <RevealLabel className="svc-cta__label">Ready to get started?</RevealLabel>
              <RevealLines
                as="h2"
                id="svc-cta-heading"
                lines={['Let’s Discuss Your', `${service.name} Requirement.`]}
                className="svc-cta__heading"
              />
              <motion.div
                className="svc-cta__actions"
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              >
                <CTAButton href={LINKS.quote} variant="primary" arrow>
                  Request a quote
                </CTAButton>
                <CTAButton href={LINKS.contact} variant="secondary">
                  Contact us
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
