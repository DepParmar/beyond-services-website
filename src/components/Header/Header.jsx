import { useCallback, useEffect, useRef, useState } from 'react'
import { motion, useMotionValueEvent, useReducedMotion, useScroll } from 'motion/react'
import Logo from '../Logo'
import CTAButton from '../CTAButton/CTAButton'
import MobileMenu from './MobileMenu'
import { ClockIcon, MailIcon, SocialIcon } from '../Icons'
import { Link, usePath } from '../../router/router'
import { CONTACT_INFO, CTA, LINKS, NAV_ITEMS } from '../../content/site'
import { EASE_OUT, stagger } from '../../lib/motion'
import './Header.css'

const COMPACT_AFTER = 24 // px of scroll before the header turns solid and compact
const DESKTOP_QUERY = '(min-width: 1024px)'

const enter = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE_OUT } },
}

/**
 * Global header, part of the hero. On the home page `revealed` plays its entrance
 * once the intro hands off and `logoRef` is the landing target for the flying logo.
 * On every other page `pinned` keeps it solid and visible from the first paint.
 */
export default function Header({ revealed = false, logoRef, logoHidden = false, pinned = false }) {
  const reduce = useReducedMotion()
  const path = usePath()
  const [compact, setCompact] = useState(pinned)
  const [menuOpen, setMenuOpen] = useState(false)
  const toggleRef = useRef(null)
  // Stable so the menu's modal effect does not re-run on unrelated header renders.
  const closeMenu = useCallback(() => setMenuOpen(false), [])
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (y) => {
    if (pinned) return
    const next = y > COMPACT_AFTER
    if (next !== compact) setCompact(next)
  })

  // The menu is a mobile/tablet pattern: close it if the viewport grows to desktop.
  useEffect(() => {
    if (!menuOpen) return
    const mq = window.matchMedia(DESKTOP_QUERY)
    const onChange = (e) => e.matches && setMenuOpen(false)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [menuOpen])

  const shown = pinned || revealed
  const state = shown ? 'visible' : 'hidden'
  const itemVariants = reduce ? { hidden: { opacity: 0 }, visible: { opacity: 1 } } : enter

  return (
    <header
      className="site-header"
      data-compact={compact || undefined}
      data-menu-open={menuOpen || undefined}
      data-revealed={shown || undefined}
      data-pinned={pinned || undefined}
    >
      <div className="site-header__topbar" aria-label="Contact">
        <div className="container site-header__topbar-inner">
          {/* Email left, working hours centre, social links right. No phone numbers here. */}
          <a className="site-header__top-item" href={`mailto:${CONTACT_INFO.email}`}>
            <MailIcon className="site-header__top-icon" />
            {CONTACT_INFO.email}
          </a>
          <span className="site-header__top-item site-header__top-item--hours">
            <ClockIcon className="site-header__top-icon" />
            Working Hours: {CONTACT_INFO.hours}
          </span>
          <ul className="site-header__socials">
            {CONTACT_INFO.socials.map((social) => (
              <li key={social.label}>
                <a
                  className="site-header__social"
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Beyond Service on ${social.label}`}
                >
                  <SocialIcon name={social.icon} />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <motion.div
        className="container site-header__inner"
        initial="hidden"
        animate={state}
        variants={stagger(0.06, 0.15)}
      >
        <Link to={LINKS.home} className="site-header__brand" aria-label="Beyond Services, home">
          <Logo ref={logoRef} alt="" className="site-header__logo" style={{ opacity: logoHidden ? 0 : 1 }} />
        </Link>

        <nav className="site-header__nav" aria-label="Primary">
          <ul className="site-header__links">
            {NAV_ITEMS.map((item) => (
              <motion.li key={item.href} variants={itemVariants}>
                <Link
                  to={item.href}
                  className="site-header__link"
                  aria-current={path === item.href ? 'page' : undefined}
                >
                  {item.label}
                </Link>
              </motion.li>
            ))}
          </ul>
        </nav>

        <motion.div className="site-header__actions" variants={itemVariants}>
          <CTAButton href={CTA.quote.href} size="sm" className="site-header__cta">
            {CTA.quote.label}
          </CTAButton>
          <button
            ref={toggleRef}
            type="button"
            className="site-header__toggle"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span className="site-header__toggle-bars" aria-hidden="true">
              <span />
              <span />
            </span>
          </button>
        </motion.div>
      </motion.div>

      <MobileMenu id="mobile-menu" open={menuOpen} onClose={closeMenu} toggleRef={toggleRef} />
    </header>
  )
}
