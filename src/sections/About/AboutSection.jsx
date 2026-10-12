import { motion } from 'motion/react'
import SectionIntro from '../../components/ui/SectionIntro'
import AboutCollage from '../../components/ui/AboutCollage'
import ScrollReveal from '../../components/motion/ScrollReveal'
import CTAButton from '../../components/CTAButton/CTAButton'
import { ABOUT, APPROACH, HOME_COLLAGE, LINKS } from '../../content/site'
import './AboutSection.css'

/**
 * About Beyond Service — one editorial chapter carrying Who We Are, the
 * mission, the vision, the supporting strengths and the standards statement.
 *
 * The left column is the layered collage rather than a single photograph: the
 * same component, the same two supplied images and the same figures plate the
 * /about page uses, so the image treatment is one system across both pages.
 *
 * The standards block is typography-led by design: no certification, award or
 * compliance badge has been supplied, so none is drawn.
 */
export default function AboutSection() {
  return (
    <section className="section about" aria-labelledby="about-heading">
      <div className="container">
        <SectionIntro
          id="about-heading"
          label={ABOUT.label}
          lines={ABOUT.headingLines}
          align="split"
          tone="light"
        />

        <div className="about__grid">
          <div className="about__figure">
            <AboutCollage
              primary={HOME_COLLAGE.primary}
              secondary={HOME_COLLAGE.secondary}
              ghost={HOME_COLLAGE.ghost}
              metrics={APPROACH.metrics.slice(0, 2)}
            />
          </div>

          <ScrollReveal className="about__body" stagger={0.1}>
            <ScrollReveal.Item as="p" className="about__lead t-body-lg">
              {ABOUT.body}
            </ScrollReveal.Item>

            <ScrollReveal.Item as="div" className="about__pillars">
              {[ABOUT.mission, ABOUT.vision].map((pillar) => (
                <div key={pillar.title} className="about__pillar">
                  <h3 className="about__pillar-title t-label">{pillar.title}</h3>
                  <p className="about__pillar-text t-body">{pillar.text}</p>
                </div>
              ))}
            </ScrollReveal.Item>

            <ScrollReveal.Item as="ul" className="about__strengths">
              {ABOUT.strengths.map((item) => (
                <li key={item} className="about__strength t-body">
                  {item}
                </li>
              ))}
            </ScrollReveal.Item>

            <ScrollReveal.Item as="div">
              <CTAButton href={LINKS.about} variant="secondary" arrow className="about__cta">
                Learn more about us
              </CTAButton>
            </ScrollReveal.Item>
          </ScrollReveal>
        </div>

        <motion.div
          className="about__standards"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7 }}
        >
          <h3 className="about__standards-title">{ABOUT.standards.title}</h3>
          <p className="about__standards-text t-body">{ABOUT.standards.text}</p>
        </motion.div>
      </div>
    </section>
  )
}
