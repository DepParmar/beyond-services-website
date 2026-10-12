import { useState } from 'react'
import SectionIntro from '../../components/ui/SectionIntro'
import ScrollReveal from '../../components/motion/ScrollReveal'
import VideoOverlay from '../../components/ui/VideoOverlay'
import { OVERVIEW_VIDEO } from '../../content/site'
import './OverviewVideoSection.css'

/**
 * Company Overview Video — a compact CTA, not a page-height placeholder.
 *
 * The section used to reserve a full 16:9 block for a film nobody had asked
 * to watch, which left a 720px empty rectangle in the middle of the page. It
 * is now one bar: the title, a short line, and a play control. Pressing it
 * opens the film in a dedicated overlay view with its own close action, and
 * the page position underneath is untouched, so closing returns the reader
 * exactly where they were.
 *
 * Nothing is requested from YouTube until that press, so the embed stays off
 * the initial page load and no visitor who never plays the film is handed to
 * a third party. Sound only ever starts from the visitor's own click.
 *
 * Clearing `OVERVIEW_VIDEO.embed` and `url` returns the bar to an inert
 * state; it never shows a play control that does nothing.
 */
export default function OverviewVideoSection() {
  const { url, embed, title, cta } = OVERVIEW_VIDEO
  const [open, setOpen] = useState(false)
  const ready = Boolean(embed)

  return (
    <section className="section overview" aria-labelledby="overview-heading">
      <div className="container">
        <SectionIntro
          id="overview-heading"
          label={OVERVIEW_VIDEO.label}
          lines={OVERVIEW_VIDEO.headingLines}
          supporting={OVERVIEW_VIDEO.supporting}
          align="split"
        />

        <ScrollReveal className="overview__bar" variant="up" amount={0.4}>
          <span className="overview__corner overview__corner--tl" aria-hidden="true" />
          <span className="overview__corner overview__corner--br" aria-hidden="true" />

          <span className="overview__text">
            <span className="overview__title">{title}</span>
            <span className="overview__meta t-caption">
              {ready ? 'Company overview film · opens in a dedicated view' : 'Film not yet supplied'}
            </span>
          </span>

          {ready ? (
            <button type="button" className="overview__play" onClick={() => setOpen(true)}>
              <span className="overview__play-mark" aria-hidden="true">
                <svg viewBox="0 0 40 40" width="40" height="40">
                  <circle cx="20" cy="20" r="19" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.55" />
                  <path d="M16.5 13.5v13L27 20z" fill="currentColor" />
                </svg>
              </span>
              <span className="overview__play-label t-label">{cta}</span>
            </button>
          ) : (
            <span className="overview__play overview__play--inert t-label">Not yet available</span>
          )}
        </ScrollReveal>

        {ready && url && (
          <p className="overview__fallback t-caption">
            Prefer YouTube?{' '}
            <a href={url} target="_blank" rel="noopener noreferrer">
              Open the film there
              <span className="visually-hidden"> — opens in a new tab</span>
            </a>
            .
          </p>
        )}
      </div>

      {ready && (
        <VideoOverlay open={open} onClose={() => setOpen(false)} embed={embed} url={url} title={title} />
      )}
    </section>
  )
}
