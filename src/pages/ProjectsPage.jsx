import Header from '../components/Header/Header'
import Footer from '../components/layout/Footer'
import PageHero from '../components/layout/PageHero'
import SectionIntro from '../components/ui/SectionIntro'
import ScrollReveal from '../components/motion/ScrollReveal'
import ProjectFigure from '../components/ui/ProjectFigure'
import CTAButton from '../components/CTAButton/CTAButton'
import { Link } from '../router/router'
import { LINKS, PROJECTS, PROJECTS_PAGE } from '../content/site'
import './ProjectsPage.css'

/**
 * /projects — the published project list.
 *
 * The four entries are the ones the company website publishes, and they carry
 * only what it states: a title, a service category and a region. There are no
 * client names, values, dates, photographs, outcomes or testimonials here,
 * because none have been supplied or cleared.
 *
 * The honest note sits above the list rather than below it, so nobody reads
 * these as finished case studies first and finds the caveat afterwards. Each
 * tile uses the drawn ProjectFigure rather than stock photography — a tile
 * that looks like a real photographed project it is not would be the exact
 * failure mode this page has to avoid.
 *
 * Adding an approved `image`, client name and outcome to an entry in
 * PROJECTS.items is all that is needed to turn one into a real case study.
 */
export default function ProjectsPage() {
  const { hero, note, needed } = PROJECTS_PAGE

  return (
    <>
      <Header pinned />

      <main id="main" tabIndex={-1}>
        <PageHero label={hero.label} lines={hero.headingLines} supporting={hero.supporting} meta={hero.meta} />

        {/* --- What this page is, stated before the list --- */}
        <section className="section projects-page__note-band" aria-labelledby="projects-note-heading">
          <div className="container">
            <div className="projects-page__note">
              <h2 id="projects-note-heading" className="projects-page__note-heading">
                {note.heading}
              </h2>
              <p className="projects-page__note-text t-body">{note.text}</p>
            </div>
          </div>
        </section>

        {/* --- The four published projects --- */}
        <section className="section projects-page__list" aria-labelledby="projects-list-heading">
          <div className="container">
            <SectionIntro
              id="projects-list-heading"
              label={PROJECTS.label}
              lines={PROJECTS.headingLines}
              supporting={PROJECTS.supporting}
              align="split"
            />

            <ScrollReveal as="ul" className="projects-page__grid" stagger={0.1} amount={0.15}>
              {PROJECTS.items.map((project) => (
                <ScrollReveal.Item as="li" key={project.slug} className="projects-page__item">
                  <Link className="projects-page__card" to={project.href}>
                    <span className="projects-page__figure" aria-hidden="true">
                      <ProjectFigure variant={project.figure} />
                    </span>

                    <span className="projects-page__body">
                      <span className="projects-page__num t-label">{project.num}</span>
                      <span className="projects-page__title">{project.title}</span>
                      <span className="projects-page__meta t-caption">
                        {[project.category, project.scope, project.region].filter(Boolean).join(' · ')}
                      </span>
                      <span className="projects-page__cue" aria-hidden="true">
                        View project
                        <svg viewBox="0 0 16 16" width="13" height="13">
                          <path
                            d="M3 8h9M8.5 4l4 4-4 4"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.4"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                    </span>
                  </Link>
                </ScrollReveal.Item>
              ))}
            </ScrollReveal>
          </div>
        </section>

        {/* --- Exactly what is still required --- */}
        <section className="section projects-page__needed" aria-labelledby="projects-needed-heading">
          <div className="container">
            <div className="projects-page__needed-inner">
              <h2 id="projects-needed-heading" className="projects-page__needed-heading">
                {needed.heading}
              </h2>
              <ul className="projects-page__needed-list">
                {needed.items.map((item) => (
                  <li key={item} className="projects-page__needed-item t-body">
                    {item}
                  </li>
                ))}
              </ul>
              <div className="projects-page__needed-cta">
                <CTAButton href={LINKS.contact} variant="primary" arrow>
                  Talk to us about your project
                </CTAButton>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
