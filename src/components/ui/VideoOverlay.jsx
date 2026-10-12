import { useCallback, useEffect, useRef } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import './VideoOverlay.css'

/**
 * A dedicated view for one film, over the page.
 *
 * It is a real modal, which means four things it would be easy to skip:
 * Escape closes it; focus moves into it on open and returns to whatever opened
 * it on close; Tab is held inside it while it is open; and the page underneath
 * is locked without losing its scroll position — the lock compensates for the
 * scrollbar width, so the page behind does not jump sideways as it opens.
 *
 * The player is mounted only while the overlay is open, so closing it actually
 * stops playback rather than muting a hidden iframe, and nothing is requested
 * from YouTube until someone asks to watch. `autoplay` here always follows the
 * visitor's own click, so no sound ever starts on a page load.
 *
 * @param {{
 *   open: boolean,
 *   onClose: () => void,
 *   embed: string,
 *   url?: string,
 *   title: string,
 * }} props
 */
export default function VideoOverlay({ open, onClose, embed, url, title }) {
  const panelRef = useRef(null)
  const closeRef = useRef(null)
  const returnRef = useRef(null)
  const reduce = useReducedMotion()

  const handleKeyDown = useCallback(
    (event) => {
      if (event.key === 'Escape') {
        event.stopPropagation()
        onClose()
        return
      }
      if (event.key !== 'Tab') return

      // Keep Tab inside the dialog.
      const focusables = panelRef.current?.querySelectorAll(
        'a[href], button:not([disabled]), iframe, [tabindex]:not([tabindex="-1"])',
      )
      if (!focusables || focusables.length === 0) return
      const first = focusables[0]
      const last = focusables[focusables.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    },
    [onClose],
  )

  useEffect(() => {
    if (!open) return

    returnRef.current = document.activeElement
    const root = document.documentElement
    const body = document.body
    // Compensate for the scrollbar so the page behind does not shift.
    const gap = window.innerWidth - root.clientWidth
    const prevOverflow = body.style.overflow
    const prevPadding = body.style.paddingRight
    body.style.overflow = 'hidden'
    if (gap > 0) body.style.paddingRight = `${gap}px`

    const id = requestAnimationFrame(() => closeRef.current?.focus())

    return () => {
      cancelAnimationFrame(id)
      body.style.overflow = prevOverflow
      body.style.paddingRight = prevPadding
      // Return focus to whatever opened the overlay, so the reading position
      // is restored and not just the scroll offset.
      const target = returnRef.current
      if (target && typeof target.focus === 'function') target.focus({ preventScroll: false })
    }
  }, [open])

  const fade = reduce ? { duration: 0 } : { duration: 0.32, ease: [0.16, 1, 0.3, 1] }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="vov"
          role="dialog"
          aria-modal="true"
          aria-label={title}
          onKeyDown={handleKeyDown}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={fade}
        >
          {/* The scrim is a real button so a pointer click outside closes, and
              it is hidden from assistive tech, which has Escape and the close
              control instead. */}
          <button type="button" className="vov__scrim" aria-hidden="true" tabIndex={-1} onClick={onClose} />

          <motion.div
            ref={panelRef}
            className="vov__panel"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 18, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.99 }}
            transition={fade}
          >
            <div className="vov__bar">
              <p className="vov__title">{title}</p>
              {/* The visible label is dropped on narrow screens, so the name
                  is carried by aria-label at every width. */}
              <button
                ref={closeRef}
                type="button"
                className="vov__close"
                onClick={onClose}
                aria-label="Close the video"
              >
                <span className="vov__close-label t-label" aria-hidden="true">
                  Close
                </span>
                <svg viewBox="0 0 16 16" width="15" height="15" aria-hidden="true">
                  <path
                    d="M4 4l8 8M12 4l-8 8"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>

            <div className="vov__frame">
              <iframe
                className="vov__player"
                src={`${embed}?autoplay=1&rel=0&modestbranding=1`}
                title={title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>

            {url && (
              <p className="vov__fallback t-caption">
                <a href={url} target="_blank" rel="noopener noreferrer">
                  Open the film on YouTube
                </a>{' '}
                if the player does not load here.
              </p>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
