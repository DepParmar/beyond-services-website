import { useCallback, useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'motion/react'
import './ServiceRail.css'

/**
 * A compact horizontal rail.
 *
 * It replaces the page-height square-cell widget that used to carry the same
 * content: nine near-square cells meant nine screens of mostly empty card, and
 * the reader had to drive a carousel to see a list. This is one short strip
 * they can flick, drag-free, with the content at a readable size.
 *
 * It is a native scroll container, which is what makes it behave everywhere:
 * touch flick, trackpad swipe, shift-scroll and the arrow keys all work
 * without a line of gesture code, and `scroll-snap` keeps it landing on a
 * cell. The two buttons page it by one viewport for anyone who wants them,
 * and they disable at each end rather than wrapping silently.
 *
 * The strip clips its own overflow, so it can never widen the page.
 *
 * @param {{
 *   items: unknown[],
 *   renderItem: (item: unknown, index: number) => import('react').ReactNode,
 *   itemKey: (item: unknown, index: number) => string,
 *   label: string,
 *   hint?: string,
 *   className?: string,
 * }} props
 */
export default function ServiceRail({ items, renderItem, itemKey, label, hint, className = '' }) {
  const trackRef = useRef(null)
  const reduce = useReducedMotion()
  const [atStart, setAtStart] = useState(true)
  const [atEnd, setAtEnd] = useState(false)

  const sync = useCallback(() => {
    const el = trackRef.current
    if (!el) return
    const max = el.scrollWidth - el.clientWidth
    setAtStart(el.scrollLeft <= 2)
    // A sub-pixel layout can leave a pixel or two unreachable; 2px of slack
    // keeps the forward button from staying enabled at the true end.
    setAtEnd(el.scrollLeft >= max - 2)
  }, [])

  useEffect(() => {
    sync()
    const el = trackRef.current
    if (!el) return
    const observer = new ResizeObserver(sync)
    observer.observe(el)
    return () => observer.disconnect()
  }, [sync, items])

  const page = (direction) => {
    const el = trackRef.current
    if (!el) return
    el.scrollBy({
      left: direction * el.clientWidth * 0.86,
      // Paging animates by default, but not for a reader who has asked the
      // system for less motion.
      behavior: reduce ? 'auto' : 'smooth',
    })
  }

  return (
    <div className={`rail${className ? ` ${className}` : ''}`}>
      <ul
        ref={trackRef}
        className="rail__track"
        onScroll={sync}
        // A labelled, focusable scroll region: the arrow keys read along it.
        tabIndex={0}
        role="group"
        aria-label={label}
      >
        {items.map((item, i) => (
          <li className="rail__item" key={itemKey(item, i)}>
            {renderItem(item, i)}
          </li>
        ))}
      </ul>

      <div className="rail__controls">
        <p className="rail__hint t-caption">{hint ?? `${items.length} items — scroll or use the arrows`}</p>
        <div className="rail__buttons">
          <button
            type="button"
            className="rail__button"
            onClick={() => page(-1)}
            disabled={atStart}
            aria-label="Scroll back"
          >
            <svg viewBox="0 0 16 16" width="15" height="15" aria-hidden="true">
              <path
                d="M13 8H4M7.5 4l-4 4 4 4"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button
            type="button"
            className="rail__button"
            onClick={() => page(1)}
            disabled={atEnd}
            aria-label="Scroll forward"
          >
            <svg viewBox="0 0 16 16" width="15" height="15" aria-hidden="true">
              <path
                d="M3 8h9M8.5 4l4 4-4 4"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
