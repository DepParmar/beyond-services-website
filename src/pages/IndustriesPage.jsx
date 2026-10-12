import Header from '../components/Header/Header'
import Footer from '../components/layout/Footer'
import PageHero from '../components/layout/PageHero'
import SectionIntro from '../components/ui/SectionIntro'
import ScrollReveal from '../components/motion/ScrollReveal'
import CTAButton from '../components/CTAButton/CTAButton'
import { Link } from '../router/router'
import { INDUSTRIES, INDUSTRIES_PAGE, LINKS } from '../content/site'
import { SERVICE_DETAILS } from '../content/services'
import './IndustriesPage.css'

const BY_SLUG = Object.fromEntries(SERVICE_DETAILS.map((s) => [s.slug, s]))

/**
 * /industries — the sectors Beyond Service supports.
 *
 * Each category carries a descriptor of the operating environment and links
 * to the service pages that actually exist for it, so the page is a real
 * route into the catalogue rather than a list of sector names.
 *
 * Deliberately absent: client names, sector statistics, project counts and
 * sector-specific credentials. None were supplied, and a sector page is the
 * easiest place in a B2B site to imply a client list that does not exist.
 */
export default function IndustriesPage() {
  const { hero, sectors, categories, approach, note, closing } = INDUSTRIES_PAGE

  return (
    <>
      <Header pinned />

      <main id="main" tabIndex={-1}>
        <PageHero label={hero.label} lines={hero.headingLines} supporting={hero.supporting} meta={hero.meta} />

        {/* --- The six sectors --- */}
        <section className="section industries-page__sectors" aria-labelledby="sectors-heading">
          <div className="container">
            <SectionIntro
              id="sectors-heading"
              label={sectors.label}
              lines={sectors.headingLines}
              supporting={sectors.supporting}
              align="split"
            />

            <ScrollReveal as="ul" className="industries-page__grid" stagger={0.08} amount={0.15}>
              {categories.map((category, i) => (
                <ScrollReveal.Item as="li" key={category.name} className="industries-page__card">
                  <span className="industries-page__num t-label" aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="industries-page__name">{category.name}</h3>
                  <p className="industries-page__text t-body">{category.text}</p>

                  <ul className="industries-page__links" aria-label={`Services for ${category.name}`}>
                    {category.services
                      .map((slug) => BY_SLUG[slug])
                      .filter(Boolean)
                      .map((service) => (
                        <li key={service.slug}>
                          <Link className="industries-page__link" to={service.href}>
                            {service.name}
                            <svg viewBox="0 0 16 16" width="13" height="13" aria-hidden="true">
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
                        </li>
                      ))}
                  </ul>
                </ScrollReveal.Item>
              ))}
            </ScrollReveal>

            <p className="industries-page__note t-caption">{note}</p>
          </div>
        </section>

        {/* --- How the approach adapts --- */}
        <section className="section industries-page__approach" aria-labelledby="industries-approach-heading">
          <div className="container">
            <SectionIntro
              id="industries-approach-heading"
              label={approach.label}
              lines={approach.headingLines}
              align="split"
            />

            <ScrollReveal as="ol" className="industries-page__points" stagger={0.1} amount={0.3}>
              {approach.points.map((point, i) => (
                <ScrollReveal.Item as="li" key={point.title} className="industries-page__point">
                  <span className="industries-page__point-num t-label" aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="industries-page__point-title">{point.title}</h3>
                  <p className="industries-page__point-text t-body">{point.text}</p>
                </ScrollReveal.Item>
              ))}
            </ScrollReveal>
          </div>
        </section>

        {/* --- Closing --- */}
        <section className="section industries-page__closing" aria-labelledby="industries-closing-heading">
          <div className="container">
            <SectionIntro
              id="industries-closing-heading"
              lines={closing.headingLines}
              supporting={closing.text}
              align="centre"
            />
            <div className="industries-page__cta">
              <CTAButton href={LINKS.services} variant="primary" arrow>
                {INDUSTRIES.cta.label}
              </CTAButton>
              <CTAButton href={LINKS.quote} variant="secondary">
                Get a quote
              </CTAButton>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
