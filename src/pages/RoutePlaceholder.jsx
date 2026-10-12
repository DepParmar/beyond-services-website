import CTAButton from '../components/CTAButton/CTAButton'
import { Link } from '../router/router'
import { CTA, COMPANY_NAME } from '../content/site'
import './RoutePlaceholder.css'

/**
 * Lightweight page for a route whose full content is not built yet. It keeps the
 * architecture connected — every nav link lands on a real, branded page rather
 * than a dead end — and reads as intentional, not broken.
 */
export default function RoutePlaceholder({ title, known }) {
  return (
    <section className="placeholder">
      <div className="container placeholder__inner">
        <p className="placeholder__eyebrow">{COMPANY_NAME}</p>
        <h1 className="placeholder__title">{title}</h1>
        <p className="placeholder__body">
          {known
            ? 'This page is being prepared. In the meantime, our team is ready to help with any project, repair and maintenance or facility requirement.'
            : "We couldn't find that page. It may have moved, or the address may be incomplete."}
        </p>
        <div className="placeholder__actions">
          <CTAButton href={CTA.quote.href} arrow>
            {CTA.quote.label}
          </CTAButton>
          <Link to="/" className="placeholder__back">
            Back to home
          </Link>
        </div>
      </div>
    </section>
  )
}
