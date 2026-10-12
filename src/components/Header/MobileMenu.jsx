import { useEffect, useRef } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import CTAButton from '../CTAButton/CTAButton'
import { ClockIcon, MailIcon, PhoneIcon, SocialIcon } from '../Icons'
import { Link, usePath } from '../../router/router'
import { CONTACT_INFO, CTA, NAV_ITEMS } from '../../content/site'
import { EASE_IN_OUT, EASE_OUT } from '../../lib/motion'

const FOCUSABLE = 'a[href], button:not([disabled])'
const telHref = (phone) => `tel:${phone.replace(/[^+\d]/g, '')}`

/**
 * Full-screen navigation for phones and tablets. While open it is modal:
 * the page behind is inert, scroll is locked, Tab stays inside the menu and
 * its toggle, and Escape closes it and returns focus to the toggle.
 */
export default function MobileMenu({ id, open, onClose, toggleRef }) {
  const reduce = useReducedMotion()
  const path = usePath()
  const panelRef = useRef(null)

  useEffect(() => {
    if (!open) return
    const main = document.getElementById('main')
    const root = document.documentElement
    const toggle = toggleRef.current
    main?.setAttribute('inert', '')
    root.setAttribute('data-scroll-lock', '')

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
        return
      }
      if (event.key !== 'Tab') return
      // Cycle focus through the toggle and the menu's own links.
      const items = [toggle, ...panelRef.current.querySelectorAll(FOCUSABLE)]
      const first = items[0]
      const last = items[items.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      } else if (!items.includes(document.activeElement)) {
        event.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKeyDown)

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      main?.removeAttribute('inert')
      root.removeAttribute('data-scroll-lock')
      toggle?.focus({ preventScroll: true })
    }
  }, [open, onClose, toggleRef])

  const item = reduce
    ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: 18 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_OUT } },
      }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={panelRef}
          id={id}
          className="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          initial={reduce ? { opacity: 0 } : { opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
          animate={reduce ? { opacity: 1 } : { opacity: 1, clipPath: 'inset(0 0 0% 0)' }}
          exit={reduce ? { opacity: 0 } : { opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
          transition={{ duration: reduce ? 0.2 : 0.55, ease: EASE_IN_OUT }}
          onAnimationComplete={(def) => {
            // Move focus in once the panel is open, landing on the first link.
            if (typeof def === 'object' && 'opacity' in def && def.opacity === 1) panelRef.current?.querySelector('a')?.focus({ preventScroll: true })
          }}
        >
          <motion.div
            className="container mobile-menu__inner"
            initial="hidden"
            animate="visible"
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.05, delayChildren: 0.15 } } }}
          >
            <nav aria-label="Mobile">
              <ul className="mobile-menu__links">
                {NAV_ITEMS.map((link) => (
                  <motion.li key={link.href} variants={item}>
                    <Link
                      to={link.href}
                      className="mobile-menu__link"
                      aria-current={path === link.href ? 'page' : undefined}
                      onClick={onClose}
                    >
                      {link.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </nav>

            <div className="mobile-menu__foot">
              <motion.div className="mobile-menu__actions" variants={item}>
                <CTAButton href={CTA.quote.href} block onClick={onClose}>
                  {CTA.quote.label}
                </CTAButton>
                <CTAButton href={CTA.vendor.href} variant="secondary" block onClick={onClose}>
                  {CTA.vendor.label}
                </CTAButton>
              </motion.div>

              <motion.div className="mobile-menu__contact" variants={item}>
                <a className="mobile-menu__contact-item" href={`mailto:${CONTACT_INFO.email}`}>
                  <MailIcon />
                  {CONTACT_INFO.email}
                </a>
                {CONTACT_INFO.phones.map((phone) => (
                  <a key={phone} className="mobile-menu__contact-item" href={telHref(phone)}>
                    <PhoneIcon />
                    {phone}
                  </a>
                ))}
                <p className="mobile-menu__contact-item mobile-menu__contact-item--muted">
                  <ClockIcon />
                  Working Hours: {CONTACT_INFO.hours}
                </p>
                <ul className="mobile-menu__socials">
                  {CONTACT_INFO.socials.map((social) => (
                    <li key={social.label}>
                      <a
                        className="mobile-menu__social"
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Beyond Service on ${social.label}`}
                        onClick={onClose}
                      >
                        <SocialIcon name={social.icon} />
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
