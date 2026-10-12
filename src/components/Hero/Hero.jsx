import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import CTAButton from '../CTAButton/CTAButton'
import HeroMediaSequence from './HeroMediaSequence'
import { HERO_SCENES } from '../../content/site'
import useMediaQuery, { RICH_MOTION_QUERY } from '../../hooks/useMediaQuery'
import { EASE_OUT } from '../../lib/motion'
import './Hero.css'

const COUNT = HERO_SCENES.length
const pad = (n) => String(n).padStart(2, '0')

// One shared reveal language for the copy. The picture leads; the words follow.
const group = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.18 } },
  exit: { transition: { staggerChildren: 0.04, staggerDirection: -1 } },
}
const eyebrow = {
  hidden: { opacity: 0, y: 12, letterSpacing: '0.3em' },
  show: { opacity: 1, y: 0, letterSpacing: '0.18em', transition: { duration: 0.7, ease: EASE_OUT } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.4, ease: EASE_OUT } },
}
// The headline staggers its own masked lines.
const headGroup = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.04 } },
  exit: { transition: { staggerChildren: 0.06, staggerDirection: -1 } },
}
const headLine = {
  hidden: { y: '112%', opacity: 0 },
  show: { y: '0%', opacity: 1, transition: { duration: 0.95, ease: EASE_OUT } },
  exit: { y: '-112%', opacity: 0, transition: { duration: 0.6, ease: EASE_OUT } },
}
const rise = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE_OUT } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.4, ease: EASE_OUT } },
}
const riseSmall = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_OUT } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.35, ease: EASE_OUT } },
}

/** The copy for one scene. Re-keyed per scene, so every advance replays the reveal. */
function SceneCopy({ scene, show }) {
  return (
    <motion.div
      className="hero__scene-copy"
      data-layout={scene.layout === 'split' ? 'split' : 'full'}
      variants={group}
      initial="hidden"
      animate={show ? 'show' : 'hidden'}
      exit="exit"
    >
      <motion.p className="hero__eyebrow" variants={eyebrow}>
        {scene.eyebrow}
      </motion.p>

      <motion.h1 className="hero__headline" variants={headGroup}>
        {scene.headingLines.map((lineText) => (
          <span key={lineText} className="hero__line-mask">
            <motion.span className="hero__line" variants={headLine}>
              {lineText}
            </motion.span>
          </span>
        ))}
      </motion.h1>

      <motion.p className="hero__desc" variants={rise}>
        {scene.description}
      </motion.p>

      {scene.metrics && (
        <motion.ul className="hero__metrics" variants={group}>
          {scene.metrics.map((metric) => (
            <motion.li key={metric.label} className="hero__metric" variants={riseSmall}>
              <span className="hero__metric-value">{metric.value}</span>
              <span className="hero__metric-label">{metric.label}</span>
            </motion.li>
          ))}
        </motion.ul>
      )}

      {scene.serviceIndex && (
        <motion.ul className="hero__index" variants={group} aria-label="Service verticals">
          {scene.serviceIndex.map((name) => (
            <motion.li key={name} className="hero__index-item" variants={riseSmall}>
              {name}
            </motion.li>
          ))}
        </motion.ul>
      )}

      <motion.div className="hero__actions" variants={rise}>
        {scene.ctas.map((cta) => (
          <CTAButton key={cta.label} href={cta.href} variant={cta.variant} arrow={cta.variant === 'primary'}>
            {cta.label}
          </CTAButton>
        ))}
      </motion.div>
    </motion.div>
  )
}

/**
 * Opening hero. `started` flips true when the intro hands off; until then the
 * first film's poster is in place and nothing plays. The three films are one
 * continuous story: each scene brings its own copy, picture and progress.
 */
export default function Hero({ started }) {
  const reduce = useReducedMotion()
  const heroRef = useRef(null)
  const progressRefs = useRef([])
  const [index, setIndex] = useState(0)
  const [inView, setInView] = useState(true)
  const [pageVisible, setPageVisible] = useState(true)

  // Pause the films when the hero is scrolled away or the tab is hidden.
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.1 })
    observer.observe(heroRef.current)
    const onVisibility = () => setPageVisible(document.visibilityState === 'visible')
    document.addEventListener('visibilitychange', onVisibility)
    return () => {
      observer.disconnect()
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  const go = useCallback((i) => setIndex(((i % COUNT) + COUNT) % COUNT), [])
  const next = useCallback(() => setIndex((i) => (i + 1) % COUNT), [])

  const playing = started && inView && pageVisible && !reduce

  // Scroll depth: the film eases into a slight push-in and drifts up, the copy
  // lifts and fades, and the frame settles into the next section's ink — so the
  // hero hands over rather than ending. Scale is desktop-only to keep phones light.
  const rich = useMediaQuery(RICH_MOTION_QUERY)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const mediaY = useTransform(scrollYProgress, [0, 1], ['0%', '8%'])
  const mediaScale = useTransform(scrollYProgress, [0, 1], [1, 1.05])
  const copyY = useTransform(scrollYProgress, [0, 1], [0, -80])
  const copyOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0])
  const shade = useTransform(scrollYProgress, [0.12, 0.82], [0, 1])

  const scene = HERO_SCENES[index]
  const split = scene.layout === 'split'

  return (
    <section
      ref={heroRef}
      className="hero"
      aria-label="Introduction"
      data-scene={scene.id}
      data-layout={split ? 'split' : 'full'}
    >
      <motion.div
        className="hero__media"
        style={reduce ? undefined : rich ? { y: mediaY, scale: mediaScale } : { y: mediaY }}
      >
        <HeroMediaSequence
          scenes={HERO_SCENES}
          index={index}
          started={started}
          playing={playing}
          reduce={reduce}
          onAdvance={next}
          progressRefs={progressRefs}
        />
      </motion.div>
      <div className="hero__top-scrim" aria-hidden="true" />
      <motion.div className="hero__exit-shade" aria-hidden="true" style={{ opacity: reduce ? 0 : shade }} />

      <motion.div className="hero__body" style={reduce ? undefined : { y: copyY, opacity: copyOpacity }}>
        <div className="container hero__content">
          <div className="hero__stage">
            <AnimatePresence initial={false}>
              <SceneCopy key={scene.id} scene={scene} show={started} />
            </AnimatePresence>
          </div>
        </div>

        <div className="container hero__bar">
          <div className="hero__indicator" aria-hidden="true">
            <span className="hero__indicator-current">{pad(index + 1)}</span>
            <span className="hero__indicator-sep">/</span>
            <span className="hero__indicator-total">{pad(COUNT)}</span>
          </div>

          <ol className="hero__progress" aria-label="Hero scenes">
            {HERO_SCENES.map((s, i) => (
              <li key={s.id}>
                <button
                  type="button"
                  className="hero__scene-button"
                  aria-current={i === index ? 'step' : undefined}
                  aria-label={`Show scene ${i + 1} of ${COUNT}: ${s.name}`}
                  onClick={() => go(i)}
                >
                  <span className="hero__track" aria-hidden="true">
                    <span
                      ref={(el) => {
                        progressRefs.current[i] = el
                      }}
                      className="hero__fill"
                    />
                  </span>
                </button>
              </li>
            ))}
          </ol>

          <div className="hero__scroll-cue" aria-hidden="true">
            <span>Scroll</span>
            <span className="hero__scroll-line" />
          </div>
        </div>
      </motion.div>
    </section>
  )
}
