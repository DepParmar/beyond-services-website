import { useReducedMotion } from 'motion/react'
import './LogoMarquee.css'

/**
 * One horizontal logo strip.
 *
 * The track holds the real list once, then an `aria-hidden` clone of it, and
 * slides by exactly half its width — which is why the loop has no seam and no
 * JavaScript measuring anything. The animation is pure CSS, so it runs off the
 * compositor and costs nothing per frame.
 *
 * Accessibility, in the order it matters:
 * - `prefers-reduced-motion` stops the slide entirely; the strip becomes a
 *   normally scrollable row, which is the useful fallback rather than a
 *   truncated one.
 * - The strip pauses on hover and on keyboard focus anywhere inside it, so a
 *   link never slides out from under a pointer or a focus ring.
 * - It is a labelled, focusable scroll region, so a keyboard user can read
 *   along it with the arrow keys without chasing moving content.
 * - The clone is hidden from assistive tech, so every logo is announced once.
 *
 * @param {{
 *   items: { name: string, logo?: string, href?: string, placeholder?: boolean }[],
 *   label: string,
 *   speed?: number,
 * }} props
 */
export default function LogoMarquee({ items, label, speed = 46 }) {
  const reduce = useReducedMotion()

  const cell = (item, index, clone) => {
    const inner = item.placeholder ? (
      <span className="logo-cell__frame logo-cell__frame--pending">
        <span className="logo-cell__corner logo-cell__corner--tl" aria-hidden="true" />
        <span className="logo-cell__corner logo-cell__corner--br" aria-hidden="true" />
        <span className="logo-cell__pending-label">{item.name}</span>
      </span>
    ) : (
      <span className="logo-cell__frame">
        <img className="logo-cell__img" src={item.logo} alt={item.name} loading="lazy" decoding="async" />
      </span>
    )

    return (
      <li className="logo-cell" key={`${clone ? 'c' : 'o'}-${item.name}-${index}`}>
        {item.href && !item.placeholder ? (
          <a className="logo-cell__link" href={item.href} target="_blank" rel="noopener noreferrer">
            {inner}
            <span className="visually-hidden">{item.name} — opens in a new tab</span>
          </a>
        ) : (
          inner
        )}
      </li>
    )
  }

  return (
    <div
      className="marquee"
      // A focusable, labelled scroll region: keyboard users read the strip
      // with the arrow keys instead of waiting for it to come round again.
      tabIndex={0}
      role="group"
      aria-label={label}
      data-static={reduce ? '' : undefined}
    >
      <ul className="marquee__track" style={reduce ? undefined : { animationDuration: `${speed}s` }}>
        {items.map((item, i) => cell(item, i, false))}
      </ul>
      {!reduce && (
        <ul className="marquee__track" aria-hidden="true" style={{ animationDuration: `${speed}s` }}>
          {items.map((item, i) => cell(item, i, true))}
        </ul>
      )}
    </div>
  )
}
