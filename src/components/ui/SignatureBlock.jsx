import { motion } from 'motion/react'
import ImageReveal from '../motion/ImageReveal'
import MetricCounter from '../MetricCounter/MetricCounter'
import { RevealLabel, RevealLines } from '../motion/RevealText'
import { stagger } from '../../lib/motion'
import { SIGNATURE_BLOCK } from '../../content/site'
import './SignatureBlock.css'

/**
 * The compact signature-and-figures block, used identically on Home and About.
 *
 * It replaces the full-height standalone Leadership section: the same approved
 * statement, the two leadership names and the real supplied signature, folded
 * into one ruled band alongside the four approved company figures. One
 * component, one data source, so the two pages cannot drift apart.
 *
 * The signature is Anurag Khandelwal's own supplied asset and is captioned as
 * his. Nothing here is a drawn or generated signature, and it is never paired
 * with a quotation he did not give.
 *
 * @param {{ tone?: 'dark' | 'light' }} props
 */
export default function SignatureBlock({ tone = 'light' }) {
  const { label, headingLines, supporting, people, signature, metrics } = SIGNATURE_BLOCK

  return (
    <motion.aside
      className={`sigblock sigblock--${tone}`}
      aria-label="Leadership and company figures"
      variants={stagger(0.1)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
    >
      {/* Drawn corner brackets, the section-marking device used after the hero. */}
      <span className="sigblock__corner sigblock__corner--tl" aria-hidden="true" />
      <span className="sigblock__corner sigblock__corner--br" aria-hidden="true" />

      <div className="sigblock__copy">
        <RevealLabel className="sigblock__label">{label}</RevealLabel>
        <RevealLines as="h3" lines={headingLines} className="sigblock__heading" />
        <motion.p
          className="sigblock__text t-body"
          variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
        >
          {supporting}
        </motion.p>
        <motion.ul
          className="sigblock__people"
          variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
        >
          {people.map((person) => (
            <li key={person.name} className="sigblock__person">
              {person.name}
            </li>
          ))}
        </motion.ul>
      </div>

      <figure className="sigblock__signature">
        <ImageReveal from="left" duration={1.2}>
          <img
            className="sigblock__signature-img"
            src={signature.src}
            width={signature.width}
            height={signature.height}
            alt={signature.alt}
            loading="lazy"
            decoding="async"
          />
        </ImageReveal>
        <figcaption className="sigblock__signature-caption t-caption">{signature.owner}</figcaption>
      </figure>

      <motion.ul
        className="sigblock__metrics"
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } } }}
      >
        {metrics.map((metric) => (
          <motion.li
            key={metric.label}
            className="sigblock__metric"
            variants={{ hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0 } }}
          >
            <MetricCounter value={metric.value} suffix={metric.suffix} label={metric.label} />
          </motion.li>
        ))}
      </motion.ul>
    </motion.aside>
  )
}
