import Header from '../components/Header/Header'
import Footer from '../components/layout/Footer'
import PageHero from '../components/layout/PageHero'
import QuoteForm from '../sections/Contact/QuoteForm'
import LocationContact from '../sections/Contact/LocationContact'
import ScrollReveal from '../components/motion/ScrollReveal'
import { CONTACT_INFO, QUOTE_PAGE, telHref } from '../content/site'
import './QuotePage.css'

/**
 * /get-quote — the destination for every "Get a Quote" control on the site.
 *
 * Before this page existed the header's primary call to action resolved to a
 * generic "page is being prepared" placeholder, which is the one link on a
 * B2B site that must never be a dead end.
 *
 * The form itself is the same QuoteForm the homepage runs, so there is one
 * implementation of the fields, the validation and the submission status. It
 * still tells the truth about submission: no endpoint is configured for this
 * project, so it never claims an enquiry was sent, and instead hands the
 * completed enquiry to the visitor's mail client.
 */
export default function QuotePage() {
  return (
    <>
      <Header pinned />

      <main id="main" tabIndex={-1}>
        <PageHero
          label={QUOTE_PAGE.hero.label}
          lines={QUOTE_PAGE.hero.headingLines}
          supporting={QUOTE_PAGE.hero.supporting}
        />

        {/* The three things a visitor wants to know before filling a form in. */}
        <section className="section quote-page__assurance" aria-label="What happens next">
          <div className="container">
            <ScrollReveal as="ol" className="quote-page__steps" stagger={0.1} amount={0.3}>
              {QUOTE_PAGE.steps.map((step, i) => (
                <ScrollReveal.Item as="li" key={step.title} className="quote-page__step">
                  <span className="quote-page__step-num t-label" aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h2 className="quote-page__step-title">{step.title}</h2>
                  <p className="quote-page__step-text t-body">{step.text}</p>
                </ScrollReveal.Item>
              ))}
            </ScrollReveal>

            <p className="quote-page__direct t-body">
              Prefer to talk first? Call{' '}
              <a href={telHref(CONTACT_INFO.phones[0])}>{CONTACT_INFO.phones[0]}</a> or email{' '}
              <a href={`mailto:${CONTACT_INFO.email}`}>{CONTACT_INFO.email}</a>.
            </p>
          </div>
        </section>

        <QuoteForm />
        <LocationContact />
      </main>

      <Footer />
    </>
  )
}
