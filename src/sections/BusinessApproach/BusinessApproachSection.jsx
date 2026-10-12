import SectionIntro from '../../components/ui/SectionIntro'
import RelationshipDiagram from '../../components/ui/RelationshipDiagram'
import ScrollReveal from '../../components/motion/ScrollReveal'
import MetricCounter from '../../components/MetricCounter/MetricCounter'
import { APPROACH } from '../../content/site'
import './BusinessApproachSection.css'

/**
 * Our Business Approach — the statement, the relationship it describes, and
 * the four approved company figures, in one section.
 *
 * The centre of the section is the diagram rather than a photograph: the
 * claim is structural — Beyond Service sits between the client and the
 * provider network — and a drawn relationship says that in one read where a
 * stock handshake only decorates it. The same diagram component runs on
 * /about, from the same data, so the two cannot drift.
 *
 * The metrics live here rather than in a separate numbers section, so the
 * claim and its evidence are read together.
 */
export default function BusinessApproachSection() {
  return (
    <section className="section approach" aria-labelledby="approach-heading">
      <div className="container">
        <SectionIntro
          id="approach-heading"
          label={APPROACH.label}
          lines={APPROACH.headingLines}
          supporting={APPROACH.supporting}
          align="split"
          tone="light"
        />

        <div className="approach__diagram">
          <RelationshipDiagram data={APPROACH.relationship} tone="light" />
        </div>

        <ScrollReveal as="ul" className="approach__metrics" stagger={0.12} amount={0.4}>
          {APPROACH.metrics.map((metric) => (
            <ScrollReveal.Item as="li" key={metric.label} className="approach__metric">
              <MetricCounter value={metric.value} suffix={metric.suffix} label={metric.label} />
            </ScrollReveal.Item>
          ))}
        </ScrollReveal>
      </div>
    </section>
  )
}
