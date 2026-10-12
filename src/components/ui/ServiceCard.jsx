import { motion } from 'motion/react'
import ImageReveal from '../motion/ImageReveal'
import { Link } from '../../router/router'
import { reveal } from '../../lib/motion'
import './ServiceCard.css'

/**
 * One service in the editorial grid, shared by the homepage section and the
 * /services overview so both read as the same system.
 *
 * Per the layout direction, the face of a card carries only its number and
 * name. The one-line descriptor appears on the larger cards, where there is
 * room for it to sit without crowding the image — never on every card.
 *
 * Three services carry no photograph: the supplied ELV, Civil Interior and
 * Cooling images show the wrong subject or another company's branding, so they
 * are withheld rather than published as Beyond Service work. Those render as
 * typography-led plates — a composed treatment, not an apology for a gap.
 * Restoring `image` in site.js switches a card back to photography.
 *
 * @param {{
 *   card: object,
 *   index?: number,
 *   showText?: boolean,
 *   eager?: boolean,
 * }} props
 */
export default function ServiceCard({ card, index = 0, showText = false, eager = false }) {
  const hasImage = Boolean(card.image)

  return (
    <motion.div
      className="svc-card-wrap"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={reveal.up}
    >
      <Link
        to={card.href}
        className={`svc-card${hasImage ? '' : ' svc-card--plate'}`}
        aria-label={`${card.name} — explore service`}
      >
        {hasImage ? (
          <>
            <ImageReveal
              from="up"
              scale
              duration={1.1}
              delay={(index % 3) * 0.06}
              className="svc-card__media"
            >
              <img
                src={card.image}
                alt={card.alt}
                loading={eager ? 'eager' : 'lazy'}
                decoding="async"
                className="svc-card__img"
                style={{ objectPosition: card.focus }}
              />
            </ImageReveal>
            <span className="svc-card__scrim" aria-hidden="true" />
          </>
        ) : (
          <span className="svc-card__ghost" aria-hidden="true">
            {card.num}
          </span>
        )}

        <span className="svc-card__body">
          <span className="svc-card__num">{card.num}</span>
          <span className="svc-card__name">{card.name}</span>
          {/* A plate has no photograph to carry meaning, so it always keeps its
              description; a photographed card only shows one when it is large. */}
          {(showText || !hasImage) && <span className="svc-card__text">{card.text}</span>}
          <span className="svc-card__cue" aria-hidden="true">
            <span className="svc-card__cue-line" />
            <svg viewBox="0 0 16 16" width="14" height="14">
              <path
                d="M3 8h9M8.5 4l4 4-4 4"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </span>
      </Link>
    </motion.div>
  )
}
