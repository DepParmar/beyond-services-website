import { useId, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { EASE_OUT } from '../../lib/motion'
import './Accordion.css'

/**
 * Accessible disclosure list. One panel open at a time; clicking the open
 * question closes it. Each header is a real button that owns its panel, and the
 * panel is a region labelled by that button, so screen readers announce the
 * pairing. Heights animate; under reduced motion they simply appear.
 *
 * @param {{ items: { q: string, a: string }[], tone?: 'dark' | 'light', className?: string }} props
 */
export default function Accordion({ items, tone = 'dark', className = '' }) {
  const [open, setOpen] = useState(null)
  const baseId = useId()
  const reduce = useReducedMotion()

  return (
    <div className={`accordion accordion--${tone} ${className}`.trim()}>
      {items.map((item, i) => {
        const isOpen = open === i
        const headerId = `${baseId}-h-${i}`
        const panelId = `${baseId}-p-${i}`
        return (
          <div key={item.q} className="accordion__item" data-open={isOpen || undefined}>
            <h3 className="accordion__heading">
              <button
                type="button"
                id={headerId}
                className="accordion__trigger"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
              >
                <span className="accordion__q">{item.q}</span>
                <span className="accordion__sign" aria-hidden="true">
                  <span className="accordion__sign-bar" />
                  <span className="accordion__sign-bar accordion__sign-bar--v" />
                </span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="panel"
                  id={panelId}
                  role="region"
                  aria-labelledby={headerId}
                  className="accordion__panel"
                  initial={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                  animate={reduce ? { opacity: 1 } : { height: 'auto', opacity: 1 }}
                  exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                  transition={{ duration: reduce ? 0.12 : 0.44, ease: EASE_OUT }}
                >
                  <p className="accordion__a t-body">{item.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}
