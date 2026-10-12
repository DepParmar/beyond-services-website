import Header from '../components/Header/Header'
import Footer from '../components/layout/Footer'
import PageHero from '../components/layout/PageHero'
import SectionIntro from '../components/ui/SectionIntro'
import ScrollReveal from '../components/motion/ScrollReveal'
import HonestForm from '../components/ui/HonestForm'
import CTAButton from '../components/CTAButton/CTAButton'
import { CONTACT_INFO, VENDOR_PAGE, telHref } from '../content/site'
import './VendorRegistrationPage.css'

/**
 * /vendor-registration — the vendor application.
 *
 * The form is HonestForm, the same component and the same submission rules as
 * the quote form: it validates in full, and with no endpoint configured it
 * hands the completed application to the applicant's own mail client rather
 * than showing a success state for a submission that never happened.
 *
 * Three things the imported specification asks for are deliberately not here,
 * because shipping them would make a promise the project cannot keep:
 *
 * - Document upload. It needs a storage bucket and virus scanning; a file
 *   input that drops the file on submit is worse than no input at all.
 * - Response-time commitments. The spec marks every one of them VERIFY.
 * - A dedicated vendors@ inbox. Not confirmed, so the general address is used.
 *
 * All three are recorded in docs/implementation-status.md.
 */
export default function VendorRegistrationPage() {
  const { hero, why, disciplines, criteria, next, verification, support, form } = VENDOR_PAGE

  return (
    <>
      <Header pinned />

      <main id="main" tabIndex={-1}>
        <PageHero label={hero.label} lines={hero.headingLines} supporting={hero.supporting} meta={hero.meta} />

        {/* --- Why partner --- */}
        <section className="section vendor__why" aria-labelledby="vendor-why-heading">
          <div className="container">
            <SectionIntro
              id="vendor-why-heading"
              label={why.label}
              lines={why.headingLines}
              align="split"
            />
            <ScrollReveal as="ul" className="vendor__why-grid" stagger={0.1} amount={0.25}>
              {why.items.map((item, i) => (
                <ScrollReveal.Item as="li" key={item.title} className="vendor__why-card">
                  <span className="vendor__num t-label" aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="vendor__card-title">{item.title}</h3>
                  <p className="vendor__card-text t-body">{item.text}</p>
                </ScrollReveal.Item>
              ))}
            </ScrollReveal>
          </div>
        </section>

        {/* --- Disciplines --- */}
        <section className="section vendor__disciplines" aria-labelledby="vendor-disciplines-heading">
          <div className="container">
            <SectionIntro
              id="vendor-disciplines-heading"
              label={disciplines.label}
              lines={disciplines.headingLines}
              supporting={disciplines.supporting}
              align="split"
            />
            <ScrollReveal as="ul" className="vendor__disciplines-list" stagger={0.05} amount={0.1}>
              {disciplines.items.map((item) => (
                <ScrollReveal.Item as="li" key={item} className="vendor__discipline t-body">
                  {item}
                </ScrollReveal.Item>
              ))}
            </ScrollReveal>
          </div>
        </section>

        {/* --- Criteria --- */}
        <section className="section vendor__criteria" aria-labelledby="vendor-criteria-heading">
          <div className="container">
            <SectionIntro
              id="vendor-criteria-heading"
              label={criteria.label}
              lines={criteria.headingLines}
              align="split"
            />
            <ScrollReveal as="ol" className="vendor__criteria-list" stagger={0.1} amount={0.2}>
              {criteria.items.map((item, i) => (
                <ScrollReveal.Item as="li" key={item.title} className="vendor__criterion">
                  <span className="vendor__num t-label" aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="vendor__card-title">{item.title}</h3>
                  <p className="vendor__card-text t-body">{item.text}</p>
                </ScrollReveal.Item>
              ))}
            </ScrollReveal>
          </div>
        </section>

        {/* --- The application --- */}
        <section className="section vendor__form-section" aria-labelledby="vendor-form-heading">
          <div className="container">
            <h2 id="vendor-form-heading" className="vendor__form-heading">
              {form.heading}
            </h2>

            <div className="vendor__form-wrap">
              <HonestForm
                fields={form.fields}
                options={{
                  category: form.categoryOptions,
                  projectSize: form.projectSizeOptions,
                  workforce: form.workforceOptions,
                }}
                consent={form.consent}
                submitLabel={form.submitLabel}
                endpoint={form.endpoint}
                to={CONTACT_INFO.email}
                subjectFor={(v) => `Vendor application — ${v.company || 'Unnamed firm'}`}
                handoffNote="This site has no submission endpoint configured, so it cannot store or deliver your application itself."
              >
                <p className="hform__note t-caption">{form.uploadNote}</p>
              </HonestForm>
            </div>
          </div>
        </section>

        {/* --- What happens next --- */}
        <section className="section vendor__next" aria-labelledby="vendor-next-heading">
          <div className="container">
            <SectionIntro
              id="vendor-next-heading"
              label={next.label}
              lines={next.headingLines}
              align="split"
            />
            <ScrollReveal as="ol" className="vendor__steps" stagger={0.08} amount={0.2}>
              {next.steps.map((step, i) => (
                <ScrollReveal.Item as="li" key={step.title} className="vendor__step">
                  <span className="vendor__step-num t-label" aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="vendor__card-title">{step.title}</h3>
                  <p className="vendor__card-text t-body">{step.text}</p>
                </ScrollReveal.Item>
              ))}
            </ScrollReveal>
            <p className="vendor__note t-caption">{next.note}</p>
          </div>
        </section>

        {/* --- Verification visit and support --- */}
        <section className="section vendor__closing" aria-labelledby="vendor-closing-heading">
          <div className="container">
            <div className="vendor__closing-grid">
              <div className="vendor__panel">
                <h2 id="vendor-closing-heading" className="vendor__panel-title">
                  {verification.heading}
                </h2>
                <p className="vendor__card-text t-body">{verification.text}</p>
                <address className="vendor__address">
                  <span>Beyond Service</span>
                  {CONTACT_INFO.addressLines.map((line) => (
                    <span key={line}>{line}</span>
                  ))}
                </address>
                <p className="vendor__card-text t-body">
                  {CONTACT_INFO.hoursDays}, {CONTACT_INFO.hours}. Sunday closed.
                </p>
              </div>

              <div className="vendor__panel">
                <h2 className="vendor__panel-title">{support.heading}</h2>
                <p className="vendor__card-text t-body">{support.text}</p>
                <div className="vendor__panel-cta">
                  <CTAButton href={telHref(CONTACT_INFO.phones[0])} variant="primary">
                    Call {CONTACT_INFO.phones[0]}
                  </CTAButton>
                  <CTAButton href={`mailto:${CONTACT_INFO.email}`} variant="secondary">
                    Email the team
                  </CTAButton>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
