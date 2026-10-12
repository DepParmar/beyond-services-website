import SectionIntro from '../../components/ui/SectionIntro'
import ServiceRail from '../../components/ui/ServiceRail'
import { EXPERTISE } from '../../content/site'
import './ExpertiseSection.css'

/**
 * Our Expertise — the nine capability areas on a compact horizontal rail.
 *
 * It used to be a slider of near-square cells, which meant a 500px-tall card
 * for three lines of copy and a carousel to drive before the reader could see
 * the rest of the list. The rail carries the same nine areas in a strip about
 * a third of that height: the whole set is scannable, and flicking through it
 * costs one gesture.
 *
 * The cells are typography-led on purpose: the nine service photographs belong
 * to the Services catalogue, and no separate expertise photography has been
 * supplied. Rather than repeat a picture or invent one, each cell is built
 * from its index numeral, a hairline rule and the approved copy.
 */
function ExpertiseCell(slide) {
  return (
    <article className="xp-cell">
      <span className="xp-cell__ghost" aria-hidden="true">
        {slide.num}
      </span>
      <div className="xp-cell__top">
        <span className="xp-cell__num t-label">{slide.num}</span>
        <span className="xp-cell__category t-caption">{slide.category}</span>
      </div>
      <div className="xp-cell__body">
        <h3 className="xp-cell__title">{slide.title}</h3>
        <p className="xp-cell__text t-body">{slide.text}</p>
      </div>
    </article>
  )
}

export default function ExpertiseSection() {
  return (
    <section className="section expertise" aria-labelledby="expertise-heading">
      <div className="container">
        <SectionIntro
          id="expertise-heading"
          label={EXPERTISE.label}
          lines={EXPERTISE.headingLines}
          supporting={EXPERTISE.supporting}
          align="split"
        />

        <ServiceRail
          className="expertise__rail"
          items={EXPERTISE.slides}
          itemKey={(slide) => slide.num}
          renderItem={ExpertiseCell}
          label="Our expertise"
          hint={`${EXPERTISE.slides.length} capability areas — scroll or use the arrows`}
        />

        <p className="expertise__note t-caption">{EXPERTISE.disclaimer}</p>
      </div>
    </section>
  )
}
