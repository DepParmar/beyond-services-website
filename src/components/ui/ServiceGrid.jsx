import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import ServiceCard from './ServiceCard'
import './ServiceGrid.css'

/**
 * The editorial stacked-card composition, shared by the homepage Services
 * section and the /services overview.
 *
 * The rhythm follows the supplied structural reference: an intro block sitting
 * in the first row beside the opening cards, then rows whose card widths and
 * heights deliberately differ, with one wide featured card near the middle. It
 * is a placed 12-column grid rather than a column-flow masonry, so the visual
 * order matches the DOM order — which keeps tab order and screen-reader order
 * honest, something multi-column masonry cannot guarantee.
 *
 * `withIntro` reserves the first slot for the section's own heading block. The
 * overview page has its own hero, so it passes `false` and the cards reclaim
 * that space.
 *
 * `layout="rows"` is the other arrangement: the nine verticals as two
 * horizontal lanes, numbered straight through and divided by a hairline. The
 * homepage uses it, because the section's job there is to show that the nine
 * verticals are one complete set — which an asymmetric composition obscures.
 * The lanes counter-travel as the section enters and leaves the viewport,
 * while the cards stay landscape editorial tiles.
 *
 * @param {{
 *   cards: object[],
 *   withIntro?: boolean,
 *   layout?: 'editorial' | 'rows',
 *   children?: import('react').ReactNode,
 * }} props
 */
export default function ServiceGrid({ cards, withIntro = false, layout = 'editorial', children }) {
  const reduce = useReducedMotion()
  const gridRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: gridRef,
    offset: ['start end', 'end start'],
  })
  const left = useTransform(scrollYProgress, [0, 1], ['0%', '-12%'])
  const right = useTransform(scrollYProgress, [0, 1], ['0%', '12%'])

  if (layout === 'rows') {
    const rows = [cards.slice(0, 5), cards.slice(5)]

    return (
      <div ref={gridRef} className="svc-grid svc-grid--rows">
        {rows.map((row, rowIndex) => (
          <div className="svc-grid__lane" key={rowIndex}>
            <motion.div
              className="svc-grid__track"
              style={!reduce ? { x: rowIndex % 2 === 1 ? right : left } : undefined}
            >
              {row.map((card, cardIndex) => {
                const index = rowIndex * 3 + cardIndex
                return (
                  <div key={card.href} className="svc-grid__cell">
                    <ServiceCard card={card} index={index} showText eager={index < 3} />
                  </div>
                )
              })}
            </motion.div>
          </div>
        ))}
      </div>
    )
  }

  // Column spans per card, in service order. Each row sums to twelve.
  //
  // The featured six-column slot sits third in its row rather than second, so
  // it falls on Fire & Safety. Services 03–05 are the three whose photographs
  // are withheld, and handing the largest card on the page to a card with no
  // image would make the composition's strongest moment its emptiest. The
  // plates take narrow slots, where they read as deliberate typographic cards.
  const spans = withIntro
    ? [3, 3, 3, /* row 2 */ 3, 3, 6, /* row 3 */ 4, 5, 3]
    : [5, 4, 3, /* row 2 */ 3, 3, 6, /* row 3 */ 4, 5, 3]

  // Only the wide cards carry their descriptor line.
  const wide = new Set(spans.flatMap((s, i) => (s >= 5 ? [i] : [])))

  return (
    <div className={`svc-grid${withIntro ? ' svc-grid--with-intro' : ''}`}>
      {withIntro && <div className="svc-grid__intro">{children}</div>}

      {cards.map((card, i) => (
        <div key={card.href} className="svc-grid__cell" data-span={spans[i] ?? 4}>
          <ServiceCard
            card={card}
            index={i}
            showText={wide.has(i)}
            eager={!withIntro && i < 2}
          />
        </div>
      ))}
    </div>
  )
}
