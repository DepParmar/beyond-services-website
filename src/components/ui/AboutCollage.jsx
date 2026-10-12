import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import useMediaQuery, { RICH_MOTION_QUERY } from '../../hooks/useMediaQuery'
import { EASE_OUT } from '../../lib/motion'
import './AboutCollage.css'

/**
 * The About page's layered image composition.
 *
 * Two photographs overlap inside a drawn champagne frame, with outlined
 * display letters sitting behind them and a graphite figures plate anchoring
 * the lower right. Positions are percentages of the collage box, so the whole
 * arrangement scales as one piece rather than drifting apart between widths.
 *
 * Motion, in the order it plays: the frame draws itself, the two photographs
 * wipe up in sequence, then the plate settles. On desktop the two photographs
 * also drift at slightly different rates as the section passes, which is what
 * gives the group its depth — it is a few pixels, not a parallax ride.
 *
 * Under reduced motion every element is simply present, and the drift is off.
 * On narrow screens the collage restacks and the overlap is dropped entirely.
 *
 * @param {{
 *   primary: { src: string, alt: string, focus?: string },
 *   secondary: { src: string, alt: string, focus?: string },
 *   metrics?: { value: number, suffix?: string, label: string }[],
 *   ghost?: [string, string],
 * }} props
 */
export default function AboutCollage({ primary, secondary, metrics = [], ghost = ['BS', 'About'] }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const rich = useMediaQuery(RICH_MOTION_QUERY) && !reduce

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  // Opposed, deliberately small drifts: the pair separates by ~34px across the
  // whole pass, which reads as depth rather than movement.
  const driftA = useTransform(scrollYProgress, [0, 1], [18, -16])
  const driftB = useTransform(scrollYProgress, [0, 1], [-14, 20])

  const rise = (delay) => ({
    hidden: { opacity: 0, y: 26 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.9, delay, ease: EASE_OUT },
    },
  })

  return (
    <motion.div
      ref={ref}
      className="collage"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      {/* Outlined display letters, sitting behind everything. */}
      <motion.span
        className="collage__ghost collage__ghost--mark"
        aria-hidden="true"
        variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 1.2 } } }}
      >
        {ghost[0]}
      </motion.span>
      <motion.span
        className="collage__ghost collage__ghost--word"
        aria-hidden="true"
        variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 1.2, delay: 0.2 } } }}
      >
        {ghost[1]}
      </motion.span>

      {/* The champagne frame draws itself before the photographs arrive. */}
      <motion.span
        className="collage__frame"
        aria-hidden="true"
        variants={{
          hidden: { clipPath: 'inset(0 100% 0 0)' },
          visible: { clipPath: 'inset(0 0% 0 0)', transition: { duration: 1.1, ease: EASE_OUT } },
        }}
      />

      {/* Upper photograph — the smaller of the two. */}
      <motion.figure
        className="collage__shot collage__shot--b"
        variants={rise(0.18)}
        style={rich ? { y: driftB } : undefined}
      >
        <img
          src={secondary.src}
          alt={secondary.alt}
          loading="lazy"
          decoding="async"
          style={{ objectPosition: secondary.focus }}
        />
      </motion.figure>

      {/* Lower photograph — the anchor of the group. */}
      <motion.figure
        className="collage__shot collage__shot--a"
        variants={rise(0.34)}
        style={rich ? { y: driftA } : undefined}
      >
        <img
          src={primary.src}
          alt={primary.alt}
          loading="lazy"
          decoding="async"
          style={{ objectPosition: primary.focus }}
        />
      </motion.figure>

      {/* The figures plate. */}
      {metrics.length > 0 && (
        <motion.div className="collage__plate" variants={rise(0.52)}>
          {metrics.map((m) => (
            <div className="collage__stat" key={m.label}>
              {/* The approved figure already carries its own "+" suffix, so the
                  plate adds no second one. */}
              <span className="collage__stat-figure">
                {m.value}
                {m.suffix}
              </span>
              <span className="collage__stat-label">{m.label}</span>
            </div>
          ))}
        </motion.div>
      )}

      {/* The hairline closing the composition on the right. */}
      <motion.span
        className="collage__rule"
        aria-hidden="true"
        variants={{
          hidden: { scaleY: 0 },
          visible: { scaleY: 1, transition: { duration: 1, delay: 0.3, ease: EASE_OUT } },
        }}
      />
    </motion.div>
  )
}
