import Header from '../components/Header/Header'
import Footer from '../components/layout/Footer'
import PageHero from '../components/layout/PageHero'
import ScrollReveal from '../components/motion/ScrollReveal'
import CTAButton from '../components/CTAButton/CTAButton'
import { CONTACT_INFO, TEAM, TEAM_PAGE } from '../content/site'
import './TeamPage.css'

/**
 * /team — the supplied roster, and nothing beyond it.
 *
 * The imported design system records two conflicting rosters. Roster A is the
 * nine names and employee codes Beyond Service supplied directly to this
 * project, already published on the homepage. Roster B is five names the
 * design system itself identifies as suspected theme placeholder content.
 * There is no genuine conflict to resolve: Roster B is not published anywhere
 * on this site and is not published here.
 *
 * What is still missing for these nine is job titles, responsibility
 * statements, photographs and individual consent to be named publicly. None
 * of those is invented. The page states plainly that they are outstanding,
 * and the cards carry a name and a code only.
 */
export default function TeamPage() {
  const { hero, roster, culture, cta } = TEAM_PAGE
  const careersMailto = `mailto:${CONTACT_INFO.email}?subject=${encodeURIComponent(cta.secondarySubject)}`

  return (
    <>
      <Header pinned />

      <main id="main" tabIndex={-1}>
        <PageHero label={hero.label} lines={hero.headingLines} supporting={hero.supporting} meta={hero.meta} />

        {/* --- The roster --- */}
        <section className="section team-page__roster" aria-labelledby="team-roster-heading">
          <div className="container">
            <h2 id="team-roster-heading" className="team-page__heading">
              {roster.heading}
            </h2>
            <p className="team-page__note t-body">{roster.note}</p>

            <ScrollReveal as="ul" className="team-page__grid" stagger={0.06} amount={0.12}>
              {TEAM.members.map((member) => (
                <ScrollReveal.Item as="li" key={member.code} className="team-page__card">
                  <span className="team-page__code t-label">{member.code}</span>
                  <h3 className="team-page__name">{member.name}</h3>
                  {member.role && <p className="team-page__role t-caption">{member.role}</p>}
                </ScrollReveal.Item>
              ))}
            </ScrollReveal>
          </div>
        </section>

        {/* --- Culture --- */}
        <section className="section team-page__culture" aria-labelledby="team-culture-heading">
          <div className="container">
            <div className="team-page__culture-inner">
              <h2 id="team-culture-heading" className="team-page__heading">
                {culture.heading}
              </h2>
              <p className="team-page__culture-text t-body-lg">{culture.text}</p>
            </div>
          </div>
        </section>

        {/* --- Vendor and careers --- */}
        <section className="section team-page__cta" aria-labelledby="team-cta-heading">
          <div className="container">
            <h2 id="team-cta-heading" className="team-page__cta-heading">
              {cta.heading}
            </h2>
            <p className="team-page__cta-text t-body">{cta.text}</p>
            <div className="team-page__cta-row">
              <CTAButton href={cta.primary.href} variant="primary" arrow>
                {cta.primary.label}
              </CTAButton>
              <CTAButton href={careersMailto} variant="secondary">
                Write to us about careers
              </CTAButton>
            </div>
            {/* The design system suggests a careers@ inbox; it is not
                confirmed to exist, so this routes to the published address
                with a subject line instead. */}
            <p className="team-page__cta-note t-caption">
              Careers enquiries go to {CONTACT_INFO.email}. There is no separate careers inbox.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
