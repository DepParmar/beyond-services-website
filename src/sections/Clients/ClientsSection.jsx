import SectionIntro from '../../components/ui/SectionIntro'
import LogoMarquee from '../../components/ui/LogoMarquee'
import { CLIENTS } from '../../content/site'
import './ClientsSection.css'

/**
 * Trusted Clients — one horizontal logo strip.
 *
 * No client logo file has been supplied to this project, so the strip runs on
 * clearly labelled empty slots. Nothing here is a redrawn mark, a logo lifted
 * from a screenshot, or an invented company name: that would assert a client
 * relationship nobody has verified.
 *
 * The strip itself is finished. Adding `{ name, logo, href? }` entries to
 * `CLIENTS.logos` in site.js replaces the placeholders with the real marks and
 * drops the note underneath — no layout work is left to do. `href` is optional
 * on purpose, because a cell should only link out when its official
 * destination is known.
 */
export default function ClientsSection() {
  const { logos, placeholderCount, placeholderLabel, note } = CLIENTS
  const pending = logos.length === 0

  const items = pending
    ? Array.from({ length: placeholderCount }, (_, i) => ({
        name: `${placeholderLabel} ${i + 1}`,
        placeholder: true,
      }))
    : logos

  return (
    <section className="section clients" aria-labelledby="clients-heading">
      <div className="container">
        <SectionIntro
          id="clients-heading"
          label={CLIENTS.label}
          lines={CLIENTS.headingLines}
          supporting={CLIENTS.supporting}
          align="split"
        />

        <LogoMarquee
          items={items}
          label={pending ? 'Client logo placeholders' : 'Client logos'}
          speed={pending ? 54 : 46}
        />

        {pending && <p className="clients__note t-caption">{note}</p>}
      </div>
    </section>
  )
}
