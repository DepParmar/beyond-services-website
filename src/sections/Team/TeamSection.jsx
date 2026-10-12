import SectionIntro from '../../components/ui/SectionIntro'
import ScrollReveal from '../../components/motion/ScrollReveal'
import SignatureBlock from '../../components/ui/SignatureBlock'
import { TEAM } from '../../content/site'
import './TeamSection.css'

/**
 * Our Team.
 *
 * The nine supplied names, each with the employee code exactly as given. The
 * personal email addresses on the supplied sheet are deliberately not
 * published: they are personal data, and a public roster is the wrong place
 * for them. No job title, biography or portrait is invented — the one role
 * shown is the one that was supplied.
 *
 * Portraits have not been supplied, so each card carries a drawn placeholder
 * frame with the person's initials rather than a stock face. The frames are
 * the real card geometry at the real aspect ratio, so dropping photographs in
 * later is a data change and not a layout change: add `photo` to a member in
 * site.js and the frame becomes an image.
 *
 * The standalone Leadership section that used to sit here has been folded into
 * the shared SignatureBlock below, which Home and About now both run.
 */

/** Initials for the placeholder frame: one letter for a single name, two otherwise. */
function initials(name) {
  const parts = name.trim().split(/\s+/)
  return (parts.length > 1 ? parts[0][0] + parts[parts.length - 1][0] : parts[0][0]).toUpperCase()
}

export default function TeamSection() {
  return (
    <section id="team" className="section team" aria-labelledby="team-heading">
      <div className="container">
        <SectionIntro
          id="team-heading"
          label={TEAM.label}
          lines={TEAM.headingLines}
          supporting={TEAM.supporting}
          align="split"
          tone="light"
        />

        <ScrollReveal as="ul" className="team__grid" stagger={0.07} amount={0.15}>
          {TEAM.members.map((member) => (
            <ScrollReveal.Item as="li" key={member.code} className="team__card">
              <div className="team__portrait">
                {member.photo ? (
                  <img
                    className="team__photo"
                    src={member.photo}
                    alt={`Portrait of ${member.name}.`}
                    loading="lazy"
                    decoding="async"
                  />
                ) : (
                  <>
                    <span className="team__initials" aria-hidden="true">
                      {initials(member.name)}
                    </span>
                    <span className="team__portrait-note t-caption">Photo to follow</span>
                  </>
                )}
                <span className="team__corner team__corner--tl" aria-hidden="true" />
                <span className="team__corner team__corner--br" aria-hidden="true" />
              </div>

              <div className="team__meta">
                <span className="team__code t-label">{member.code}</span>
                <h3 className="team__name">{member.name}</h3>
                {member.role && <p className="team__role t-caption">{member.role}</p>}
              </div>
            </ScrollReveal.Item>
          ))}
        </ScrollReveal>

        <p className="team__note t-caption">{TEAM.note}</p>

        <SignatureBlock tone="light" />
      </div>
    </section>
  )
}
