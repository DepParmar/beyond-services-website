import Header from '../components/Header/Header'
import Footer from '../components/layout/Footer'
import PageHero from '../components/layout/PageHero'
import IvoryPanel from '../components/layout/IvoryPanel'
import SectionIntro from '../components/ui/SectionIntro'
import AboutCollage from '../components/ui/AboutCollage'
import RelationshipDiagram from '../components/ui/RelationshipDiagram'
import SignatureBlock from '../components/ui/SignatureBlock'
import ScrollReveal from '../components/motion/ScrollReveal'
import { RevealLabel, RevealLines } from '../components/motion/RevealText'
import MetricCounter from '../components/MetricCounter/MetricCounter'
import CTAButton from '../components/CTAButton/CTAButton'
import { motion } from 'motion/react'
import { stagger } from '../lib/motion'
import { Link } from '../router/router'
import {
  ABOUT,
  ABOUT_PAGE,
  APPROACH,
  CONTACT_INFO,
  EXPERTISE,
  LINKS,
  SERVICE_PAGES,
  telHref,
} from '../content/site'
import './AboutPage.css'

/* Three line icons for the strengths, drawn in the same 24px / 1.6-stroke
   language as the existing Icons.jsx set rather than pulling in a new pack. */
const iconProps = {
  viewBox: '0 0 24 24',
  width: 16,
  height: 16,
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

const TeamIcon = () => (
  <svg {...iconProps}>
    <circle cx="9" cy="8" r="3.2" />
    <path d="M3.5 19a5.5 5.5 0 0 1 11 0" />
    <path d="M16 5.6a3.2 3.2 0 0 1 0 6.3M17.5 14.2A5.5 5.5 0 0 1 20.5 19" />
  </svg>
)

const NetworkIcon = () => (
  <svg {...iconProps}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M3.5 12h17M12 3.5c2.2 2.3 3.4 5.4 3.4 8.5s-1.2 6.2-3.4 8.5c-2.2-2.3-3.4-5.4-3.4-8.5s1.2-6.2 3.4-8.5z" />
  </svg>
)

const TimelyIcon = () => (
  <svg {...iconProps}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 7v5.2l3.4 2" />
  </svg>
)

const FEATURE_ICONS = [TeamIcon, NetworkIcon, TimelyIcon]

/**
 * /about — the dedicated About page.
 *
 * Told at full length from the approved facts: who the company is, what it
 * works towards, how it works, the four supplied figures, the nine service
 * capabilities, the standards commitment, leadership, and a closing CTA.
 *
 * It inherits the header, footer, tokens, motion vocabulary and CTA language
 * from the shared components, which is what keeps it reading as the same
 * organisation as the homepage. No biography, qualification, award or company
 * history is invented anywhere on this page.
 */
export default function AboutPage() {
  return (
    <>
      <Header pinned />

      <main id="main" tabIndex={-1}>
        <PageHero
          label={ABOUT_PAGE.hero.label}
          lines={ABOUT_PAGE.hero.headingLines}
          meta={ABOUT_PAGE.hero.meta}
        />

        {/* --- The light chapter: one editorial spread.
             The collage holds the left column; the heading, introduction,
             mission, vision and the three strengths read down the right. --- */}
        <IvoryPanel>
          <section className="section about-page__who" aria-labelledby="who-heading">
            <div className="container">
              <div className="about-page__spread">
                <div className="about-page__visual">
                  <AboutCollage
                    primary={ABOUT_PAGE.collage.primary}
                    secondary={ABOUT_PAGE.collage.secondary}
                    ghost={ABOUT_PAGE.collage.ghost}
                    metrics={APPROACH.metrics.slice(0, 2)}
                  />
                </div>

                <motion.div
                  className="about-page__editorial"
                  variants={stagger(0.1)}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.25 }}
                >
                  <RevealLabel className="about-page__eyebrow">
                    {ABOUT_PAGE.whoWeAre.label}
                  </RevealLabel>

                  <RevealLines
                    as="h2"
                    id="who-heading"
                    lines={ABOUT_PAGE.whoWeAre.headingLines}
                    className="about-page__display"
                  />

                  <motion.p
                    className="about-page__lead"
                    variants={{ hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0 } }}
                  >
                    {ABOUT_PAGE.whoWeAre.body}
                  </motion.p>

                  <motion.div
                    className="about-page__pillars"
                    variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}
                  >
                    {[ABOUT.mission, ABOUT.vision].map((pillar) => (
                      <motion.div
                        key={pillar.title}
                        className="about-page__pillar-card"
                        variants={{ hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0 } }}
                      >
                        <h3 className="about-page__pillar-title t-label">{pillar.title}</h3>
                        <p className="about-page__pillar-text">{pillar.text}</p>
                      </motion.div>
                    ))}
                  </motion.div>

                  <motion.ul
                    className="about-page__features"
                    variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
                  >
                    {ABOUT.strengths.map((item, i) => {
                      const Icon = FEATURE_ICONS[i] ?? FEATURE_ICONS[0]
                      return (
                        <motion.li
                          key={item}
                          className="about-page__feature"
                          variants={{ hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0 } }}
                        >
                          <span className="about-page__feature-icon" aria-hidden="true">
                            <Icon />
                          </span>
                          <span className="about-page__feature-label">{item}</span>
                        </motion.li>
                      )
                    })}
                  </motion.ul>
                </motion.div>
              </div>
            </div>
          </section>
        </IvoryPanel>

        {/* --- Business approach: the relationship, then the figures --- */}
        <section className="section about-page__approach" aria-labelledby="approach-heading">
          <div className="container">
            <SectionIntro
              id="approach-heading"
              label={APPROACH.label}
              lines={APPROACH.headingLines}
              supporting={APPROACH.supporting}
              align="split"
            />

            <RelationshipDiagram data={ABOUT_PAGE.relationship} />

            <ScrollReveal as="ul" className="about-page__metrics" stagger={0.12} amount={0.35}>
              {APPROACH.metrics.map((metric) => (
                <ScrollReveal.Item as="li" key={metric.label} className="about-page__metric">
                  <MetricCounter value={metric.value} suffix={metric.suffix} label={metric.label} />
                </ScrollReveal.Item>
              ))}
            </ScrollReveal>
          </div>
        </section>

        {/* --- Service capabilities --- */}
        <section className="section about-page__capabilities" aria-labelledby="capabilities-heading">
          <div className="container">
            <SectionIntro
              id="capabilities-heading"
              label="Service capabilities"
              lines={['Nine Verticals.', 'One Point of Contact.']}
              supporting={EXPERTISE.supporting}
              align="split"
            />

            <ScrollReveal as="ul" className="about-page__caps" stagger={0.06} amount={0.12}>
              {SERVICE_PAGES.map((service, i) => (
                <ScrollReveal.Item as="li" key={service.href} className="about-page__cap">
                  <Link to={service.href} className="about-page__cap-link">
                    <span className="about-page__cap-num t-label">{String(i + 1).padStart(2, '0')}</span>
                    <span className="about-page__cap-name">{service.name}</span>
                    <svg className="about-page__cap-arrow" viewBox="0 0 16 16" width="15" height="15" aria-hidden="true">
                      <path d="M3 8h9M8.5 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Link>
                </ScrollReveal.Item>
              ))}
            </ScrollReveal>

            <ScrollReveal className="about-page__caps-cta" variant="up" amount={0.4}>
              <CTAButton href={LINKS.services} variant="secondary" arrow>
                Explore services
              </CTAButton>
            </ScrollReveal>
          </div>
        </section>

        {/* --- Commitment --- */}
        <section className="section about-page__commitment" aria-labelledby="commitment-heading">
          <div className="container">
            <motion.div
              className="about-page__commitment-panel"
              variants={stagger(0.1)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.35 }}
            >
              <RevealLabel className="about-page__commitment-label">{ABOUT_PAGE.commitment.label}</RevealLabel>
              <RevealLines
                as="h2"
                id="commitment-heading"
                lines={ABOUT_PAGE.commitment.headingLines}
                className="about-page__commitment-title"
              />
              <motion.p
                className="about-page__commitment-text t-body-lg"
                variants={{ hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0 } }}
              >
                {ABOUT_PAGE.commitment.text}
              </motion.p>

              <motion.ul
                className="about-page__pillars"
                variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } } }}
              >
                {ABOUT_PAGE.commitment.pillars.map((pillar) => (
                  <motion.li
                    key={pillar}
                    className="about-page__pillar t-label"
                    variants={{ hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0 } }}
                  >
                    {pillar}
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
          </div>
        </section>

        {/* --- Leadership: the same compact signature block the homepage runs,
             so the treatment is identical on both pages. --- */}
        <section className="section about-page__leadership" aria-labelledby="leadership-heading">
          <div className="container">
            <h2 id="leadership-heading" className="visually-hidden">
              Leadership and company figures
            </h2>
            <SignatureBlock tone="dark" />
            <p className="about-page__leaders-note t-caption">
              Leadership biographies and photographs will be added once supplied.
            </p>
          </div>
        </section>

        {/* --- Final CTA --- */}
        <section className="section about-page__cta" aria-labelledby="about-cta-heading">
          <div className="container">
            <motion.div
              className="about-page__cta-inner"
              variants={stagger(0.1)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.4 }}
            >
              <RevealLabel className="about-page__cta-label">Ready to get started?</RevealLabel>
              <RevealLines
                as="h2"
                id="about-cta-heading"
                lines={["Let's Discuss How We Can", 'Elevate Your Business.']}
                className="about-page__cta-heading"
              />
              <motion.div
                className="about-page__cta-actions"
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
