import { motion, useReducedMotion } from 'motion/react'
import DrawRule from './DrawRule'
import { EASE_OUT } from '../../lib/motion'
import './RelationshipDiagram.css'

const node = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE_OUT } },
}

/**
 * The business-approach relationship, drawn.
 *
 * Three nodes — the client, Beyond Service, the provider network — with the
 * connecting rules drawing inward toward the centre as the diagram enters view.
 * Every label is an approved fact; nothing is added to balance the picture.
 *
 * It is real text in a real list, not an SVG illustration, so it stays
 * readable, selectable and screen-reader friendly, and it restacks vertically
 * on narrow screens. The rules are decorative and hidden from assistive tech.
 *
 * `tone="light"` is the variant for the soft-white editorial panels; the
 * default is the dark ground.
 *
 * @param {{
 *   data: { centre: string, left: object, right: object, caption: string },
 *   tone?: 'dark' | 'light',
 * }} props
 */
export default function RelationshipDiagram({ data, tone = 'dark' }) {
  const reduce = useReducedMotion()

  return (
    <figure className={`rel${tone === 'light' ? ' rel--light' : ''}`}>
      <motion.div
        className="rel__row"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        transition={{ staggerChildren: reduce ? 0 : 0.14 }}
      >
        <motion.div className="rel__node" variants={node}>
          <p className="rel__node-title">{data.left.title}</p>
          <p className="rel__node-meta t-caption">{data.left.meta}</p>
        </motion.div>

        <div className="rel__link" aria-hidden="true">
          <DrawRule delay={0.25} duration={0.7} />
        </div>

        <motion.div className="rel__node rel__node--centre" variants={node}>
          <p className="rel__node-title rel__node-title--centre">{data.centre}</p>
          <p className="rel__node-meta t-caption">Coordination &amp; delivery</p>
        </motion.div>

        <div className="rel__link" aria-hidden="true">
          <DrawRule delay={0.45} duration={0.7} />
        </div>

        <motion.div className="rel__node" variants={node}>
          <p className="rel__node-title">{data.right.title}</p>
          <p className="rel__node-meta t-caption">{data.right.meta}</p>
        </motion.div>
      </motion.div>

      <figcaption className="rel__caption t-caption">{data.caption}</figcaption>
    </figure>
  )
}
