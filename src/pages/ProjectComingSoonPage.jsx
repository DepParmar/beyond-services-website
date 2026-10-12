import Header from '../components/Header/Header'
import Footer from '../components/layout/Footer'
import CTAButton from '../components/CTAButton/CTAButton'
import { RevealLabel, RevealLines } from '../components/motion/RevealText'
import { motion, useReducedMotion } from 'motion/react'
import { stagger, EASE_IN_OUT, EASE_OUT } from '../lib/motion'
import { Link } from '../router/router'
import { LINKS, PROJECTS } from '../content/site'
import './ProjectComingSoonPage.css'

/**
 * /projects/<slug> — the view behind every project tile.
 *
 * No detailed case study has been approved for any of the four entries, so
 * this says so plainly rather than inventing scope, dates, values or outcomes.
 * It carries the project's real title and category from the source listing and
 * nothing else.
 *
 * The composition beside it is a sequence of outlined frames that draw their
 * borders once, slowly, and then rest. It is architectural rather than busy:
 * five frames, one at a time, no loop, no spinner.
 *
 * @param {{ project: object }} props
 */
export default function ProjectComingSoonPage({ project }) {
  const { comingSoon } = PROJECTS

  // Return the visitor to where they came from, so the portfolio reappears at
  // the scroll position they left. A deep link with no history goes home.
  const handleBack = (event) => {
    if (typeof window === 'undefined') return
    if (window.history.length > 1) {
      event.preventDefault()
      window.history.back()
    }
    // Otherwise the Link's own handler navigates to the homepage.
  }

  return (
    <>
      <Header pinned />

      <main id="main" tabIndex={-1}>
        <section className="pcs" aria-labelledby="pcs-title">
          <div className="container pcs__grid">
            <motion.div
              className="pcs__copy"
              variants={stagger(0.1)}
              initial="hidden"
              animate="visible"
            >
              <motion.nav
                className="pcs__crumbs"
                aria-label="Breadcrumb"
                variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
              >
                <Link to={LINKS.home} className="pcs__crumb" onClick={handleBack}>
                  {comingSoon.back}
                </Link>
              </motion.nav>

              <RevealLabel className="pcs__label">{comingSoon.label}</RevealLabel>

              <RevealLines
                as="h1"
                id="pcs-title"
                lines={[project.title]}
                className="pcs__title"
              />

              <motion.p
                className="pcs__meta t-caption"
                variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
              >
                <span>{project.category}</span>
                {project.scope && (
                  <>
                    <span className="pcs__sep" aria-hidden="true" />
                    <span>{project.scope}</span>
                  </>
                )}
                <span className="pcs__sep" aria-hidden="true" />
                <span>{project.region}</span>
              </motion.p>

              <motion.p
                className="pcs__status"
                variants={{ hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0 } }}
              >
                {comingSoon.status}
              </motion.p>

              <motion.p
                className="pcs__text"
                variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
              >
                {comingSoon.text}
              </motion.p>

              <motion.div
                className="pcs__actions"
                variants={{ hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0 } }}
              >
                <CTAButton href={LINKS.quote} variant="primary" arrow>
                  Discuss a requirement
                </CTAButton>
                <CTAButton href={LINKS.services} variant="secondary">
                  Explore services
                </CTAButton>
              </motion.div>
            </motion.div>

            <FrameSequence />
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}

// Five frames, drawn once in sequence. Sizes and offsets are deliberate rather
// than concentric, so the result reads as a plan rather than a target.
const FRAMES = [
  { x: 10, y: 24, w: 168, h: 168, accent: false },
  { x: 96, y: 10, w: 200, h: 200, accent: true },
  { x: 150, y: 120, w: 130, h: 130, accent: false },
  { x: 36, y: 150, w: 96, h: 96, accent: false },
  { x: 214, y: 196, w: 72, h: 72, accent: false },
]

function FrameSequence() {
  const reduce = useReducedMotion()

  return (
    <div className="pcs__figure" aria-hidden="true">
      <svg viewBox="0 0 310 290" className="pcs__svg" focusable="false">
        {/* Two hairlines anchoring the composition. */}
        <motion.line
          x1="10" y1="276" x2="296" y2="276"
          className="pcs__rule"
          initial={reduce ? false : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: reduce ? 0 : 1.1, delay: 0.1, ease: EASE_IN_OUT }}
        />
        <motion.line
          x1="10" y1="10" x2="10" y2="276"
          className="pcs__rule"
          initial={reduce ? false : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: reduce ? 0 : 1.1, delay: 0.25, ease: EASE_IN_OUT }}
        />

        {FRAMES.map((f, i) => (
          <motion.rect
            key={i}
            x={f.x}
            y={f.y}
            width={f.w}
            height={f.h}
            className={`pcs__frame${f.accent ? ' pcs__frame--accent' : ''}`}
            initial={reduce ? false : { pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: f.accent ? 0.9 : 0.55 }}
            transition={{
              pathLength: { duration: reduce ? 0 : 1.5, delay: reduce ? 0 : 0.45 + i * 0.28, ease: EASE_IN_OUT },
              opacity: { duration: reduce ? 0 : 0.8, delay: reduce ? 0 : 0.45 + i * 0.28, ease: EASE_OUT },
            }}
          />
        ))}
      </svg>
    </div>
  )
}
