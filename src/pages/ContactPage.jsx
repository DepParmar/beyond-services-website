import Header from '../components/Header/Header'
import Footer from '../components/layout/Footer'
import PageHero from '../components/layout/PageHero'
import ScrollReveal from '../components/motion/ScrollReveal'
import QuoteForm from '../sections/Contact/QuoteForm'
import LocationContact from '../sections/Contact/LocationContact'
import { CONTACT_PAGE, telHref } from '../content/site'
import './ContactPage.css'

/** The three card kinds get a drawn mark each, in champagne. */
const MARKS = {
  call: (
    <path
      d="M4.5 3h3l1.5 3.5-2 1.2a10 10 0 0 0 4.3 4.3l1.2-2L16 11.5v3a1.5 1.5 0 0 1-1.6 1.5A12.5 12.5 0 0 1 3 4.6 1.5 1.5 0 0 1 4.5 3Z"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinejoin="round"
    />
  ),
  email: (
    <>
      <rect x="2.5" y="4.5" width="15" height="11" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <path d="M2.5 5.5 10 11l7.5-5.5" fill="none" stroke="currentColor" strokeWidth="1.2" />
    </>
  ),
  visit: (
    <>
      <path
        d="M10 17s5.5-5.2 5.5-9A5.5 5.5 0 0 0 4.5 8c0 3.8 5.5 9 5.5 9Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <circle cx="10" cy="8" r="2" fill="none" stroke="currentColor" strokeWidth="1.2" />
    </>
  ),
}

/** Turns a card line into a `tel:` or `mailto:` link where one applies. */
function CardLine({ kind, line }) {
  if (kind === 'call') {
    return (
      <a className="contact-page__card-link" href={telHref(line)}>
        {line}
      </a>
    )
  }
  if (kind === 'email') {
    return (
      <a className="contact-page__card-link" href={`mailto:${line}`}>
        {line}
      </a>
    )
  }
  return <span>{line}</span>
}

/**
 * /contact — the three contact routes, the full quote form, and the office.
 *
 * The form is the site's existing QuoteForm, not a second implementation, so
 * validation, the accessible error handling and the honest submission
 * behaviour are identical to /get-quote and the homepage. It still never
 * reports a submission it did not make: with no endpoint configured it hands
 * the completed enquiry to the visitor's mail client and says so.
 *
 * The map and the full address block are the existing LocationContact
 * section, reused for the same reason.
 *
 * Business hours here are the ones Beyond Service publishes. The imported
 * design system lists different hours and labels one number 24/7; neither is
 * confirmed, so neither is published. See docs/implementation-status.md.
 */
export default function ContactPage() {
  const { hero, cards, talkFirst, privacyNote, hours } = CONTACT_PAGE

  return (
    <>
      <Header pinned />

      <main id="main" tabIndex={-1}>
        <PageHero label={hero.label} lines={hero.headingLines} supporting={hero.supporting} meta={hero.meta} />

        {/* --- Call / Email / Visit --- */}
        <section className="section contact-page__routes" aria-labelledby="contact-routes-heading">
          <div className="container">
            <h2 id="contact-routes-heading" className="visually-hidden">
              How to reach Beyond Service
            </h2>

            <ScrollReveal as="ul" className="contact-page__cards" stagger={0.1} amount={0.3}>
              {cards.map((card) => (
                <ScrollReveal.Item as="li" key={card.kind} className="contact-page__card">
                  <span className="contact-page__mark" aria-hidden="true">
                    <svg viewBox="0 0 20 20" width="20" height="20">
                      {MARKS[card.kind]}
                    </svg>
                  </span>
                  <h3 className="contact-page__card-title t-label">{card.title}</h3>

                  {card.kind === 'visit' ? (
                    <address className="contact-page__card-lines">
                      {card.lines.map((line) => (
                        <span key={line}>{line}</span>
                      ))}
                    </address>
                  ) : (
                    <p className="contact-page__card-lines">
                      {card.lines.map((line) => (
                        <CardLine key={line} kind={card.kind} line={line} />
                      ))}
                    </p>
                  )}

                  <p className="contact-page__card-note t-caption">{card.note}</p>
                </ScrollReveal.Item>
              ))}
            </ScrollReveal>

            <p className="contact-page__talk t-body">{talkFirst}</p>
          </div>
        </section>

        {/* --- The quote form, anchored so service CTAs can deep-link --- */}
        <div id="quote" className="contact-page__form-anchor">
          <QuoteForm />
          <div className="container">
            <p className="contact-page__privacy t-caption">{privacyNote}</p>
          </div>
        </div>

        {/* --- Hours --- */}
        <section className="section contact-page__hours" aria-labelledby="contact-hours-heading">
          <div className="container">
            <div className="contact-page__hours-grid">
              <h2 id="contact-hours-heading" className="contact-page__hours-heading">
                {hours.heading}
              </h2>
              <div className="contact-page__hours-body">
                <dl className="contact-page__hours-list">
                  {hours.rows.map((row) => (
                    <div key={row.day} className="contact-page__hours-row">
                      <dt className="contact-page__hours-day t-body">{row.day}</dt>
                      <dd className="contact-page__hours-value t-body">{row.value}</dd>
                    </div>
                  ))}
                </dl>
                <p className="contact-page__hours-note t-caption">{hours.note}</p>
              </div>
            </div>
          </div>
        </section>

        {/* --- Office, map and directions --- */}
        <LocationContact />
      </main>

      <Footer />
    </>
  )
}
