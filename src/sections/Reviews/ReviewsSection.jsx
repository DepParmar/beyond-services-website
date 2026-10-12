import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import SectionIntro from '../../components/ui/SectionIntro'
import PendingPanel from '../../components/ui/PendingPanel'
import { EASE_OUT } from '../../lib/motion'
import { REVIEWS } from '../../content/site'
import './ReviewsSection.css'

const pad = (n) => String(n).padStart(2, '0')

/**
 * Client Reviews — an editorial slider holding exactly three positions.
 *
 * The three supplied review references never reached this project, so nothing
 * is published: an unverified testimonial attributed to a named client would be
 * a fabrication. Adding up to three `{ quote, name, detail }` entries to
 * `REVIEWS.entries` in site.js publishes them.
 *
 * No reviewer portraits are shown, by instruction, even once entries exist.
 */
export default function ReviewsSection() {
  const entries = REVIEWS.entries.slice(0, REVIEWS.maxEntries)
  const count = entries.length
  const [index, setIndex] = useState(0)
  const reduce = useReducedMotion()

  const go = (next) => setIndex(((next % count) + count) % count)

  return (
    <section className="section reviews" aria-labelledby="reviews-heading">
      <div className="container">
        <SectionIntro
          id="reviews-heading"
          label={REVIEWS.label}
          lines={REVIEWS.headingLines}
          align="split"
          tone="light"
        />

        {count === 0 ? (
          <PendingPanel
            tone="light"
            title="Approved client reviews have not been supplied to this project."
            note="Up to three verified reviews will appear here. Nothing is shown until the exact wording and attribution are confirmed, so that no testimonial is published on a client's behalf without approval."
          />
        ) : (
          <div
            className="reviews__slider"
            role="group"
            aria-roledescription="carousel"
            aria-label="Client reviews"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'ArrowLeft') {
                e.preventDefault()
                go(index - 1)
              } else if (e.key === 'ArrowRight') {
                e.preventDefault()
                go(index + 1)
              }
            }}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.blockquote
                key={index}
                className="reviews__quote"
                initial={reduce ? { opacity: 0 } : { opacity: 0, y: 18 }}
                animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, y: -12 }}
                transition={{ duration: 0.45, ease: EASE_OUT }}
              >
                <p className="reviews__text">{entries[index].quote}</p>
                <footer className="reviews__attrib">
                  <cite className="reviews__name">{entries[index].name}</cite>
                  {entries[index].detail && <span className="reviews__detail t-caption">{entries[index].detail}</span>}
                </footer>
              </motion.blockquote>
            </AnimatePresence>

            <div className="reviews__bar">
              <p className="reviews__index t-label">
                <span className="reviews__index-current">{pad(index + 1)}</span>
                <span aria-hidden="true"> / </span>
                <span>{pad(count)}</span>
              </p>
              <div className="reviews__controls">
                <button type="button" className="reviews__ctrl" aria-label="Previous review" onClick={() => go(index - 1)}>
                  <svg viewBox="0 0 16 16" width="15" height="15" aria-hidden="true">
                    <path d="M10 2.5 4.5 8l5.5 5.5" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <button type="button" className="reviews__ctrl" aria-label="Next review" onClick={() => go(index + 1)}>
                  <svg viewBox="0 0 16 16" width="15" height="15" aria-hidden="true">
                    <path d="M6 2.5 11.5 8 6 13.5" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
