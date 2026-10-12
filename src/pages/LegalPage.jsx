import Header from '../components/Header/Header'
import Footer from '../components/layout/Footer'
import PageHero from '../components/layout/PageHero'
import ScrollReveal from '../components/motion/ScrollReveal'
import './LegalPage.css'

/**
 * The shared shell for /privacy and /terms.
 *
 * Both pages open with a visible draft notice, because both are drafts. They
 * describe only what this website verifiably does — two forms that validate
 * in the browser and hand off to the visitor's own mail client, no cookies
 * set by this site, no analytics, and one YouTube embed that is not requested
 * until someone presses play.
 *
 * Sections marked `pending` are the decisions nobody has made yet: retention
 * period, limitation of liability, governing law. They are rendered as open
 * items rather than filled with plausible-sounding boilerplate, because an
 * invented retention period is a false statement about how personal data is
 * handled and an invented liability clause is worse.
 *
 * @param {{ page: object }} props
 */
export default function LegalPage({ page }) {
  const { hero, draftNotice, sections } = page

  return (
    <>
      <Header pinned />

      <main id="main" tabIndex={-1}>
        <PageHero label={hero.label} lines={hero.headingLines} supporting={hero.supporting} meta={hero.meta} />

        <section className="section legal" aria-labelledby="legal-heading">
          <div className="container">
            <h2 id="legal-heading" className="visually-hidden">
              {hero.headingLines.join(' ')}
            </h2>

            <p className="legal__draft" role="note">
              <strong>Draft.</strong> {draftNotice}
            </p>

            <ScrollReveal as="div" className="legal__body" stagger={0.06} amount={0.05}>
              {sections.map((section, i) => (
                <ScrollReveal.Item as="section" key={section.title} className="legal__section">
                  <h3 className="legal__section-title">
                    <span className="legal__section-num t-label" aria-hidden="true">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    {section.title}
                  </h3>

                  {section.body.map((paragraph) => (
                    <p key={paragraph.slice(0, 40)} className="legal__text t-body">
                      {paragraph}
                    </p>
                  ))}

                  {section.pending && (
                    <p className="legal__pending t-caption">
                      Open item — awaiting a decision from Beyond Service. Nothing is asserted here in the meantime.
                    </p>
                  )}
                </ScrollReveal.Item>
              ))}
            </ScrollReveal>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
