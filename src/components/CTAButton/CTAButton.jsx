import { Link } from '../../router/router'
import './CTAButton.css'

/**
 * Link-styled-as-button. Every CTA on the site navigates, so it renders a link:
 * a client-routed <Link> for internal paths ("/..."), a plain <a> otherwise.
 * `arrow` adds a trailing chevron that eases forward on hover (opt-in).
 */
export default function CTAButton({
  href,
  variant = 'primary',
  size = 'md',
  block = false,
  arrow = false,
  className = '',
  children,
  ...props
}) {
  const classes = ['cta', `cta--${variant}`, `cta--${size}`, block && 'cta--block', arrow && 'cta--arrow', className]
    .filter(Boolean)
    .join(' ')

  const inner = (
    <>
      <span className="cta__label">{children}</span>
      {arrow && (
        <svg className="cta__arrow" viewBox="0 0 16 16" width="15" height="15" aria-hidden="true">
          <path d="M3 8h9M8.5 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </>
  )

  const internal = typeof href === 'string' && href.startsWith('/')
  if (internal) {
    return (
      <Link to={href} className={classes} {...props}>
        {inner}
      </Link>
    )
  }
  return (
    <a href={href} className={classes} {...props}>
      {inner}
    </a>
  )
}
