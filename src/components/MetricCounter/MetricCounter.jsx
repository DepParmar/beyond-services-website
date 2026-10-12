import { useEffect, useRef } from 'react'
import { animate, useInView, useReducedMotion } from 'motion/react'
import { EASE_OUT } from '../../lib/motion'
import './MetricCounter.css'

/**
 * A metric that counts up once, the first time it is mostly in view.
 * The final value is always in the accessibility tree; the counting digits are
 * presentational. Width is reserved for the final value, so nothing shifts.
 * (Named MetricCounter, not StatCounter: the old filename matched tracker
 * blocklists and was dropped by privacy extensions with ERR_BLOCKED_BY_CLIENT.)
 * @param {{ value: number, suffix?: string, label: string, size?: 'md' | 'xl', className?: string, duration?: number }} props
 */
export default function MetricCounter({ value, suffix = '', label, size = 'md', className = '', duration = 1.8 }) {
  const ref = useRef(null)
  const digitsRef = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const reduce = useReducedMotion()

  useEffect(() => {
    const el = digitsRef.current
    if (!inView || reduce) {
      if (reduce) el.textContent = String(value)
      return
    }
    const controls = animate(0, value, {
      duration,
      ease: EASE_OUT,
      onUpdate: (latest) => {
        el.textContent = String(Math.round(latest))
      },
    })
    return () => controls.stop()
  }, [inView, reduce, value, duration])

  return (
    <div ref={ref} className={`stat stat--${size} ${className}`.trim()}>
      <p className="stat__figure" aria-hidden="true">
        <span ref={digitsRef} className="stat__digits" style={{ minWidth: `${String(value).length}ch` }}>
          {reduce ? value : 0}
        </span>
        <span className="stat__suffix">{suffix}</span>
      </p>
      <p className="stat__label">
        <span className="visually-hidden">
          {value}
          {suffix}{' '}
        </span>
        {label}
      </p>
    </div>
  )
}
