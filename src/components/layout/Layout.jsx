import './Layout.css'

// Centred content column, 1280px max with fluid side gutters.
export function Container({ as: Tag = 'div', className = '', children, ...props }) {
  return (
    <Tag className={`container ${className}`.trim()} {...props}>
      {children}
    </Tag>
  )
}

// Full-width band with the shared vertical rhythm. `tone` switches the surface.
export function Section({ id, tone = 'dark', className = '', children, ...props }) {
  const toneClass = tone === 'light' ? 'section--light' : tone === 'surface' ? 'section--surface' : ''
  return (
    <section id={id} className={['section', toneClass, className].filter(Boolean).join(' ')} {...props}>
      {children}
    </section>
  )
}

// Section heading: optional label, serif title, optional intro paragraph (max 60ch).
export function SectionHeading({ label, title, intro, as: Heading = 'h2', align = 'start', className = '' }) {
  return (
    <header className={`section-heading section-heading--${align} ${className}`.trim()}>
      {label && <p className="section-heading__label t-label">{label}</p>}
      <Heading className="section-heading__title t-h2">{title}</Heading>
      {intro && <p className="section-heading__intro t-body-lg">{intro}</p>}
    </header>
  )
}
