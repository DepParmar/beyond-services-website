import SectionIntro from '../../components/ui/SectionIntro'
import ScrollReveal from '../../components/motion/ScrollReveal'
import ImageReveal from '../../components/motion/ImageReveal'
import Accordion from '../../components/ui/Accordion'
import CTAButton from '../../components/CTAButton/CTAButton'
import { CAREERS, FAQ } from '../../content/site'
import './CareersFaqSection.css'

/**
 * Careers & FAQ — one homepage section holding two clearly separated parts.
 *
 * No vacancy, salary, benefit or hiring timeline is stated: only the approved
 * career categories, labelled as categories rather than open roles. There is no
 * application form, because no recruitment workflow exists — the call to action
 * is an honest email enquiry to the approved company address.
 */
export default function CareersFaqSection() {
  return (
    <section className="section careers" aria-labelledby="careers-heading">
      <div className="container">
        {/* --- Careers --- */}
        <SectionIntro
          id="careers-heading"
          label={CAREERS.label}
          lines={CAREERS.headingLines}
          align="split"
          tone="light"
        />

        <div className="careers__grid">
          <ImageReveal className="careers__figure" from="up" duration={1.2} scale>
            <img
              className="careers__image"
              src={CAREERS.image.src}
              width={CAREERS.image.width}
              height={CAREERS.image.height}
              alt={CAREERS.image.alt}
              loading="lazy"
              decoding="async"
            />
          </ImageReveal>

          <ScrollReveal className="careers__copy" stagger={0.1}>
            <ScrollReveal.Item as="h3" className="careers__subheading">
              {CAREERS.subheading}
            </ScrollReveal.Item>

            {CAREERS.body.map((paragraph) => (
              <ScrollReveal.Item as="p" key={paragraph.slice(0, 40)} className="careers__para t-body">
                {paragraph}
              </ScrollReveal.Item>
            ))}
          </ScrollReveal>
        </div>

        {/* Culture highlights */}
        <ScrollReveal as="ul" className="careers__culture" stagger={0.09} amount={0.25}>
          {CAREERS.culture.map((item) => (
            <ScrollReveal.Item as="li" key={item.title} className="careers__culture-item">
              <h4 className="careers__culture-title t-label">{item.title}</h4>
              <p className="careers__culture-text t-body">{item.text}</p>
            </ScrollReveal.Item>
          ))}
        </ScrollReveal>

        {/* Career categories — explicitly not vacancies */}
        <ScrollReveal className="careers__roles" variant="up" amount={0.3}>
          <ul className="careers__role-list">
            {CAREERS.categories.map((role) => (
              <li key={role} className="careers__role t-body">
                {role}
              </li>
            ))}
          </ul>
          <p className="careers__roles-note t-caption">{CAREERS.categoriesNote}</p>
          <CTAButton href={CAREERS.cta.href} variant="secondary" arrow className="careers__cta">
            {CAREERS.cta.label}
          </CTAButton>
          <p className="careers__cta-note t-caption">{CAREERS.cta.note}</p>
        </ScrollReveal>

        {/* --- FAQ --- */}
        <div className="careers__faq" id="faq">
          <SectionIntro
            id="faq-heading"
            label={FAQ.label}
            lines={FAQ.headingLines}
            as="h3"
            align="split"
            tone="light"
          />
          <Accordion items={FAQ.items} tone="light" />
        </div>
      </div>
    </section>
  )
}
