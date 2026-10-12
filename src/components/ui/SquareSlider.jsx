import { useCallback, useEffect, useId, useRef, useState } from 'react'
import { useReducedMotion } from 'motion/react'
import './SquareSlider.css'

const SWIPE_THRESHOLD = 48 // px of travel before a drag commits to a slide change

/**
 * Square-cell slider used for the expertise story and the client wall.
 *
 * The track is a flex row translated by whole slides, so cells keep their
 * square ratio and neighbouring slides stay partly visible on wide screens.
 * It is driveable by the controls, the arrow keys, and touch/pointer drag.
 *
 * Accessibility: the viewport is a labelled carousel group, each cell is a
 * labelled slide, and `inertInactive` takes off-screen interactive content out
 * of the tab order. Autoplay, when enabled, exposes a pause control, stops on
 * hover and focus, and never starts under `prefers-reduced-motion`.
 *
 * @param {{
 *   items: unknown[],
 *   renderItem: (item: unknown, index: number, isActive: boolean) => import('react').ReactNode,
 *   label: string,
 *   slideLabel?: (item: unknown, index: number) => string,
 *   loop?: boolean,
 *   autoPlayMs?: number,
 *   inertInactive?: boolean,
 *   tone?: 'dark' | 'light',
 *   className?: string,
 * }} props
 */
export default function SquareSlider({
  items,
  renderItem,
  label,
  slideLabel,
  loop = false,
  autoPlayMs = 0,
  inertInactive = false,
  tone = 'dark',
  className = '',
}) {
  const count = items.length
  const reduce = useReducedMotion()
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const [held, setHeld] = useState(false) // hover / focus within
  const [drag, setDrag] = useState(0)
  const viewportRef = useRef(null)
  const pointer = useRef(null)
  const trackId = useId()

  const clamp = useCallback(
    (i) => (loop ? ((i % count) + count) % count : Math.max(0, Math.min(count - 1, i))),
    [loop, count],
  )
  const go = useCallback((i) => setIndex(clamp(i)), [clamp])
  const next = useCallback(() => setIndex((i) => clamp(i + 1)), [clamp])
  const prev = useCallback(() => setIndex((i) => clamp(i - 1)), [clamp])

  const atStart = !loop && index === 0
  const atEnd = !loop && index === count - 1

  // Arrow keys move the slider while focus is inside it.
  const onKeyDown = (event) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault()
      prev()
    } else if (event.key === 'ArrowRight') {
      event.preventDefault()
      next()
    } else if (event.key === 'Home') {
      event.preventDefault()
      go(0)
    } else if (event.key === 'End') {
      event.preventDefault()
      go(count - 1)
    }
  }

  // Autoplay. Only runs when asked for, motion is allowed, and nothing is
  // holding it: a hover, a focus inside, or the pause control.
  const running = autoPlayMs > 0 && !reduce && !paused && !held
  useEffect(() => {
    if (!running) return
    const timer = setTimeout(() => setIndex((i) => clamp(i + 1)), autoPlayMs)
    return () => clearTimeout(timer)
  }, [running, autoPlayMs, index, clamp])

  // Pointer drag. Captured on the viewport so a swipe works on touch and mouse.
  const onPointerDown = (event) => {
    if (event.pointerType === 'mouse' && event.button !== 0) return
    pointer.current = { id: event.pointerId, x: event.clientX, y: event.clientY, axis: null }
  }

  const onPointerMove = (event) => {
    const p = pointer.current
    if (!p || p.id !== event.pointerId) return
    const dx = event.clientX - p.x
    const dy = event.clientY - p.y
    // Decide once whether this gesture is horizontal; a vertical swipe scrolls.
    if (p.axis === null) {
      if (Math.abs(dx) < 8 && Math.abs(dy) < 8) return
      p.axis = Math.abs(dx) > Math.abs(dy) ? 'x' : 'y'
      if (p.axis === 'x') event.currentTarget.setPointerCapture?.(event.pointerId)
    }
    if (p.axis !== 'x') return
    setDrag(dx)
  }

  const endDrag = (event) => {
    const p = pointer.current
    if (!p || p.id !== event.pointerId) return
    pointer.current = null
    const dx = p.axis === 'x' ? event.clientX - p.x : 0
    setDrag(0)
    if (dx <= -SWIPE_THRESHOLD) next()
    else if (dx >= SWIPE_THRESHOLD) prev()
  }

  const progress = count > 1 ? (index + 1) / count : 1
  const pad = (n) => String(n).padStart(2, '0')

  return (
    <div
      className={`sq-slider sq-slider--${tone} ${className}`.trim()}
      data-dragging={drag !== 0 || undefined}
      onMouseEnter={() => setHeld(true)}
      onMouseLeave={() => setHeld(false)}
      onFocusCapture={() => setHeld(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setHeld(false)
      }}
    >
      <div
        ref={viewportRef}
        className="sq-slider__viewport"
        role="group"
        aria-roledescription="carousel"
        aria-label={label}
        tabIndex={0}
        onKeyDown={onKeyDown}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
      >
        <ul
          id={trackId}
          className="sq-slider__track"
          style={{ '--i': index, '--drag': `${drag}px` }}
          aria-live={autoPlayMs > 0 ? 'off' : 'polite'}
        >
          {items.map((item, i) => {
            const isActive = i === index
            return (
              <li
                key={slideLabel ? slideLabel(item, i) : i}
                className="sq-slider__slide"
                data-active={isActive || undefined}
                role="group"
                aria-roledescription="slide"
                aria-label={`${pad(i + 1)} of ${pad(count)}${slideLabel ? `: ${slideLabel(item, i)}` : ''}`}
                // Keeps off-screen links and buttons out of the tab order.
                inert={inertInactive && !isActive ? '' : undefined}
              >
                {renderItem(item, i, isActive)}
              </li>
            )
          })}
        </ul>
      </div>

      <div className="sq-slider__bar">
        <p className="sq-slider__index t-label">
          <span className="sq-slider__index-current">{pad(index + 1)}</span>
          <span className="sq-slider__index-sep" aria-hidden="true">
            /
          </span>
          <span className="sq-slider__index-total">{pad(count)}</span>
        </p>

        <div className="sq-slider__track-line" aria-hidden="true">
          <span className="sq-slider__fill" style={{ transform: `scaleX(${progress})` }} />
        </div>

        <div className="sq-slider__controls">
          {autoPlayMs > 0 && !reduce && (
            <button
              type="button"
              className="sq-slider__ctrl"
              aria-label={paused ? `Resume ${label}` : `Pause ${label}`}
              onClick={() => setPaused((p) => !p)}
            >
              <svg viewBox="0 0 16 16" width="13" height="13" aria-hidden="true">
                {paused ? (
                  <path d="M4.5 2.5v11l9-5.5z" fill="currentColor" />
                ) : (
                  <g fill="currentColor">
                    <rect x="3.5" y="2.5" width="3" height="11" />
                    <rect x="9.5" y="2.5" width="3" height="11" />
                  </g>
                )}
              </svg>
            </button>
          )}
          <button
            type="button"
            className="sq-slider__ctrl"
            aria-label="Previous slide"
            aria-controls={trackId}
            disabled={atStart}
            onClick={prev}
          >
            <svg viewBox="0 0 16 16" width="15" height="15" aria-hidden="true">
              <path d="M10 2.5 4.5 8l5.5 5.5" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            type="button"
            className="sq-slider__ctrl"
            aria-label="Next slide"
            aria-controls={trackId}
            disabled={atEnd}
            onClick={next}
          >
            <svg viewBox="0 0 16 16" width="15" height="15" aria-hidden="true">
              <path d="M6 2.5 11.5 8 6 13.5" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
