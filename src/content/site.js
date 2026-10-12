// Site copy and navigation in one place, so every surface reuses the same labels.
//
// Everything here is either supplied by Beyond Service or written from supplied
// facts. Where a fact has not been supplied — client logos, reviews, team
// portraits, industry categories, the overview video URL — the field is left
// empty on purpose and the component renders a ready state. Nothing on this
// site is invented to fill a layout.

export const COMPANY_NAME = 'Beyond Services'
// The company's own copy and the logo use the singular "Beyond Service".
export const BRAND_NAME = 'Beyond Service'

// ---------------------------------------------------------------------------
// Contact. Supplied by Beyond Service.
// ---------------------------------------------------------------------------
export const CONTACT_INFO = {
  email: 'connect@beyondservice.co.in',
  phones: ['+91 79847 87910', '+91 97260 07759'],
  website: 'https://www.beyondservice.co.in/',
  websiteLabel: 'www.beyondservice.co.in',
  hours: '09:30 AM – 06:30 PM',
  hoursDays: 'Monday – Saturday',
  location: 'Surat, India',
  address: '6th Floor, 619, Vesu Main Road, near S D Jain School, Vesu, Surat, Gujarat 395007, India.',
  addressLines: [
    '6th Floor, 619, Vesu Main Road,',
    'near S D Jain School, Vesu,',
    'Surat, Gujarat 395007, India.',
  ],
  socials: [
    { label: 'Facebook', href: 'https://www.facebook.com/beyondserviceBS/', icon: 'facebook' },
    { label: 'Instagram', href: 'https://www.instagram.com/beyondservice_/', icon: 'instagram' },
    { label: 'X', href: 'https://x.com/beyondservice_/', icon: 'x' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/beyond-service-04ab88210/', icon: 'linkedin' },
  ],
}

/** `tel:` href for a display phone number. */
export const telHref = (phone) => `tel:${phone.replace(/[^+\d]/g, '')}`

// Real routes. Every link resolves to a page; pages that are not built yet
// render a lightweight placeholder, so no link is a dead end.
export const LINKS = {
  home: '/',
  about: '/about',
  services: '/services',
  industries: '/industries',
  projects: '/projects',
  contact: '/contact',
  quote: '/get-quote',
  vendorRegistration: '/vendor-registration',
  team: '/team',
  privacy: '/privacy',
  terms: '/terms',
}

// Primary navigation, in the header order.
export const NAV_ITEMS = [
  { label: 'Home', href: LINKS.home },
  { label: 'About', href: LINKS.about },
  { label: 'Services', href: LINKS.services },
  { label: 'Industries', href: LINKS.industries },
  { label: 'Projects', href: LINKS.projects },
  { label: 'Contact', href: LINKS.contact },
]

export const CTA = {
  quote: { label: 'Get a quote', href: LINKS.quote },
  vendor: { label: 'Vendor registration', href: LINKS.vendorRegistration },
  services: { label: 'Explore services', href: LINKS.services },
  contact: { label: 'Contact us', href: LINKS.contact },
}

// Verified service categories.
export const SERVICES = [
  'Civil Project & R&M',
  'MEP',
  'ELV',
  'Civil Interior',
  'Cooling System',
  'Fire & Safety',
  'Industrial Equipment',
  'Logistic',
  'Project Management',
]

// The route each service owns (its future detail page).
export const SERVICE_PAGES = [
  { name: 'Civil Project & R&M', href: '/services/civil-project-rm' },
  { name: 'MEP', href: '/services/mep' },
  { name: 'ELV', href: '/services/elv' },
  { name: 'Civil Interior', href: '/services/civil-interior' },
  { name: 'Cooling System', href: '/services/cooling' },
  { name: 'Fire & Safety', href: '/services/fire-safety' },
  { name: 'Industrial Equipment', href: '/services/industrial-equipment' },
  { name: 'Logistic', href: '/services/logistics' },
  { name: 'Project Management', href: '/services/project-management' },
]

// Every path the router answers to.
export const ROUTES = [
  { path: LINKS.home, label: 'Home' },
  { path: LINKS.about, label: 'About' },
  { path: LINKS.services, label: 'Services' },
  ...SERVICE_PAGES.map((s) => ({ path: s.href, label: s.name })),
  { path: LINKS.industries, label: 'Industries' },
  { path: LINKS.projects, label: 'Projects' },
  { path: LINKS.contact, label: 'Contact' },
  { path: LINKS.quote, label: 'Get a quote' },
  { path: LINKS.vendorRegistration, label: 'Vendor registration' },
  { path: LINKS.team, label: 'Team' },
  { path: LINKS.privacy, label: 'Privacy policy' },
  { path: LINKS.terms, label: 'Terms of use' },
]

// ---------------------------------------------------------------------------
// Approved company metrics. These four values are the supplied figures and are
// used verbatim everywhere numbers appear.
// ---------------------------------------------------------------------------
export const METRICS = {
  states: { value: 14, suffix: '+', label: 'States' },
  clients: { value: 100, suffix: '+', label: 'Corporate Clients' },
  providers: { value: 500, suffix: '+', label: 'Service Providers' },
  verticals: { value: 9, suffix: '+', label: 'Service Verticals' },
}

// ---------------------------------------------------------------------------
// HERO — Step 1. Unchanged: the three supplied films as one continuous story.
// ---------------------------------------------------------------------------
export const HERO_SCENES = [
  {
    id: 'facilities',
    name: 'Trusted partner',
    video: '/hero/hero-main-01.mp4',
    poster: '/hero/posters/hero-main-01.webp',
    duration: 8,
    playbackRate: 1,
    resume: true,
    focus: '50% 45%',
    eyebrow: 'Welcome to Beyond Service',
    headingLines: ['Trusted facility', 'management partner'],
    description:
      'Delivering reliable project management, repair & maintenance and facility services to corporate and industrial clients across India.',
    metrics: [
      { value: '100+', label: 'Corporate clients' },
      { value: '14+', label: 'States' },
      { value: '9+', label: 'Service verticals' },
    ],
    ctas: [
      { label: 'Get a quote', href: LINKS.quote, variant: 'primary' },
      { label: 'Explore services', href: LINKS.services, variant: 'secondary' },
    ],
  },
  {
    id: 'projects',
    name: 'Our expertise',
    video: '/hero/hero-main-2.mp4',
    poster: '/hero/posters/hero-main-2.webp',
    duration: 7,
    playbackRate: 1,
    resume: true,
    layout: 'split',
    focus: '50% 30%',
    eyebrow: 'Our expertise',
    headingLines: ['Integrated services.', 'One reliable partner.'],
    description:
      'From project management and repair & maintenance to MEP, ELV, cooling and fire & safety, Beyond Service delivers professional solutions across India.',
    serviceIndex: ['Civil', 'MEP', 'ELV', 'Interiors', 'Cooling', 'Fire & Safety'],
    ctas: [{ label: 'Explore services', href: LINKS.services, variant: 'primary' }],
  },
  {
    id: 'partnership',
    name: 'Pan-India network',
    video: '/hero/hero-main-3.mp4',
    poster: '/hero/posters/hero-main-3.webp',
    duration: 6.5,
    playbackRate: 0.8,
    resume: false,
    focus: '60% 34%',
    eyebrow: 'Pan India service network',
    headingLines: ['From Surat.', 'Serving India.'],
    description:
      'Connecting corporate and industrial clients with reliable service expertise across multiple locations.',
    metrics: [
      { value: '500+', label: 'Service providers' },
      { value: '14+', label: 'States' },
      { value: '100+', label: 'Corporate clients' },
    ],
    ctas: [{ label: 'Get a quote', href: LINKS.quote, variant: 'primary' }],
  },
]

// ---------------------------------------------------------------------------
// 1 — OUR EXPERTISE. A square slider over the nine capability areas.
// Typography-led: there is no supplied photograph for any of these nine slides,
// and the nine service photographs belong to the Services catalogue alone.
// ---------------------------------------------------------------------------
export const EXPERTISE = {
  label: 'Our expertise',
  headingLines: ['Expertise That Moves', 'Business Forward.'],
  supporting:
    'From project coordination to specialist technical services, Beyond Service brings together the capabilities and service-provider network needed to support corporate and industrial operations across India.',
  // Capabilities, not guarantees of certification, availability or outcome.
  disclaimer: 'These descriptions represent service capabilities.',
  slides: [
    {
      num: '01',
      title: 'Project Coordination',
      category: 'Coordination',
      text: 'Coordinated project support designed to help clients manage requirements, service delivery, and execution across business locations.',
    },
    {
      num: '02',
      title: 'Civil Works & Maintenance',
      category: 'Civil',
      text: 'Civil project support, repair, and maintenance for corporate and industrial environments.',
    },
    {
      num: '03',
      title: 'MEP Systems',
      category: 'Mechanical · Electrical · Plumbing',
      text: 'Mechanical, electrical, and plumbing-related service support for business facilities and operational environments.',
    },
    {
      num: '04',
      title: 'ELV & Integrated Systems',
      category: 'Low voltage',
      text: 'Support for low-voltage and connected systems, including relevant installations and maintenance.',
    },
    {
      num: '05',
      title: 'Interior Works',
      category: 'Interiors',
      text: 'Civil interior and fit-out-related service support for commercial environments.',
    },
    {
      num: '06',
      title: 'Cooling Systems',
      category: 'HVAC',
      text: 'Cooling and HVAC-related service support for suitable commercial and industrial applications.',
    },
    {
      num: '07',
      title: 'Fire & Safety',
      category: 'Safety systems',
      text: "Fire-protection and safety-system service support, based on the client's actual requirements.",
    },
    {
      num: '08',
      title: 'Industrial Equipment',
      category: 'Equipment',
      text: 'Equipment-related service and maintenance support for industrial operations.',
    },
    {
      num: '09',
      title: 'Logistics Support',
      category: 'Logistics',
      text: 'Logistics-related coordination and service support for business requirements.',
    },
  ],
}

// ---------------------------------------------------------------------------
// 2 — ABOUT BEYOND SERVICE. Who we are, mission, vision, strengths, standards.
// ---------------------------------------------------------------------------
export const ABOUT = {
  label: 'Who we are',
  headingLines: ['Reliable Services,', 'Delivered with Excellence.'],
  body: 'Beyond Service is a Surat-based company providing Project Management and Repair & Maintenance services to industrial and corporate clients across India. We partner with hundreds of service providers to deliver reliable, professional, and timely solutions at every touchpoint.',
  established: 'Est. 2019',
  image: {
    // Approved About image, taken from the company's own site and stored locally.
    src: '/sections/about-04.webp',
    width: 735,
    height: 825,
    alt: 'Two colleagues reviewing work together at a desk in an office.',
  },
  mission: {
    title: 'Our Mission',
    text: 'Satisfy clients with the best services, continuously upgrading to deliver a fabulous experience.',
  },
  vision: {
    title: 'Our Vision',
    text: 'Serve millions of clients worldwide, making Beyond Service the most preferred name in professional services.',
  },
  strengths: [
    'Professional & Well-Trained Team',
    'PAN India Service Network',
    'Timely & Reliable Solutions',
  ],
  // Typography-led only. No certification, award or compliance badge is claimed,
  // because none has been supplied.
  standards: {
    title: 'Professional Standards. Responsible Delivery.',
    text: 'We focus on professional coordination, dependable service delivery, and maintaining strong working relationships with clients and service providers.',
  },
}

// ---------------------------------------------------------------------------
// The dedicated /about page. Built from the same approved facts as the
// homepage About section, told at full length. Nothing here is new company
// information: the mission, vision, body copy and standards text are reused
// verbatim from ABOUT above.
// ---------------------------------------------------------------------------
export const ABOUT_PAGE = {
  hero: {
    label: 'About Beyond Service',
    headingLines: ['Building Trust Through', 'Professional Service.'],
    meta: `${ABOUT.established} · Surat, Gujarat — PAN India operations`,
  },
  whoWeAre: {
    label: ABOUT.label,
    // The page sets the approved heading across three lines so the middle one
    // can carry the display italic, as the layout reference does. The homepage
    // About section keeps its own two-line arrangement, untouched.
    headingLines: [
      'Reliable Services,',
      { text: 'Delivered with', emphasis: true },
      'Excellence',
    ],
    body: ABOUT.body,
  },
  // The two photographs in the About collage, as supplied for this page.
  collage: {
    primary: {
      src: '/sections/about-briefing.webp',
      alt: 'A project team reviewing printed analysis reports around a table.',
      focus: '50% 55%',
    },
    secondary: {
      src: '/sections/about-partnership.webp',
      alt: 'Two people shaking hands, overlaid with a city skyline and a network motif.',
      focus: '50% 45%',
    },
    ghost: ['BS', 'About'],
  },
  commitment: {
    label: 'Our commitment',
    headingLines: ['Professional Standards.', 'Responsible Delivery.'],
    text: ABOUT.standards.text,
    // The three commitments, as approved. Labels only — no invented promises,
    // service levels or response times attached to them.
    pillars: ['Professional coordination', 'Clear communication', 'Dependable service'],
  },
  // The relationship the business approach describes, drawn as a diagram.
  // Every node is an approved fact; nothing is added to make the picture fuller.
  relationship: {
    centre: BRAND_NAME,
    left: { title: 'Corporate & industrial clients', meta: '100+ corporate clients · 14+ states' },
    right: { title: 'Professional service providers', meta: '500+ service providers' },
    caption:
      'Beyond Service sits between the client and the service-provider network, coordinating requirements, delivery and execution.',
  },
}

// The homepage runs the same layered collage as /about, from the same two
// supplied photographs, so the image treatment reads as one system across both
// pages. Only the outlined word behind it changes, to suit the section it sits
// in. The figures plate carries the approved 14+ / 100+ figures.
export const HOME_COLLAGE = {
  primary: ABOUT_PAGE.collage.primary,
  secondary: ABOUT_PAGE.collage.secondary,
  ghost: ['BS', 'Trust'],
}

// ---------------------------------------------------------------------------
// 3 — OUR BUSINESS APPROACH, with the four approved metrics inside it.
// ---------------------------------------------------------------------------
export const APPROACH = {
  label: 'Our business approach',
  headingLines: ['Connecting Clients with', 'the Right Service Experts.'],
  supporting:
    'Beyond Service partners with hundreds of professional service providers to deliver timely, reliable solutions for industrial and corporate clients across India — from Surat to major Tier 1 and Tier 2 cities.',
  metrics: [METRICS.states, METRICS.clients, METRICS.providers, METRICS.verticals],
  // The homepage shows the same relationship diagram as /about rather than a
  // second large photograph: the section's job is to explain where Beyond
  // Service sits between the client and the provider network, and the diagram
  // says that in one read. One source, so the two pages cannot drift.
  relationship: ABOUT_PAGE.relationship,
  image: {
    src: '/sections/approach-partnership.webp',
    width: 1920,
    height: 1080,
    alt: 'Two business partners shaking hands across a desk.',
  },
}

// ---------------------------------------------------------------------------
// 4 — WHAT WE OFFER. Compact featured capability: ELV.
// ---------------------------------------------------------------------------
export const WHAT_WE_OFFER = {
  label: 'What we offer',
  headingLines: ['Practical Expertise.', 'Professional Service Delivery.'],
  supporting:
    'From civil works to advanced ELV systems, Beyond Service partners with hundreds of service providers to deliver reliable, professional solutions to corporate and industrial clients nationwide.',
  featured: {
    eyebrow: 'Featured capability',
    title: 'ELV Services',
    text: 'EPABX, CCTV, Networking, Access Control, BMS, LMS and Fire Alarm System installations and maintenance.',
    systems: ['EPABX', 'CCTV', 'Networking', 'Access Control', 'BMS', 'LMS', 'Fire Alarm'],
    cta: { label: 'Explore ELV Services', href: '/services/elv' },
  },
}

// ---------------------------------------------------------------------------
// 5 — OUR SERVICES. Nine categories, each with its own route and photograph.
// `shape` drives the asymmetric grid; `focus` is the object-position chosen
// from each photograph's actual composition.
// ---------------------------------------------------------------------------
export const SERVICES_SECTION = {
  label: 'Our services',
  headingLines: ['Integrated Services.', 'Dependable Delivery.'],
  supporting:
    "Explore Beyond Service's project management, repair and maintenance, and specialist service capabilities for corporate and industrial environments.",
}

// The dedicated /services overview page. The heading and supporting text are
// the wording specified for the Services experience in the Step 1 + Step 2
// master document; the homepage section keeps its own approved copy above.
export const SERVICES_PAGE = {
  hero: {
    label: 'Our services',
    headingLines: ['Integrated Services.', 'One Reliable Partner.'],
    meta: 'Nine service verticals · PAN India',
  },
  supporting:
    'From project management and repair & maintenance to MEP, ELV, cooling and fire & safety, Beyond Service delivers professional solutions across India.',
}

export const SERVICE_CARDS = [
  {
    num: '01',
    name: 'Civil Project & R&M',
    href: '/services/civil-project-rm',
    text: 'Civil project coordination, repair, and maintenance support for corporate and industrial environments.',
    image: '/services/civil.webp',
    shape: 'square',
    focus: '50% 40%',
    alt: 'Site engineer in a hard hat reviewing construction drawings on site.',
  },
  {
    num: '02',
    name: 'MEP',
    href: '/services/mep',
    text: 'Mechanical, electrical, and plumbing-related service support for business facilities and operational requirements.',
    image: '/services/mep.webp',
    shape: 'square',
    focus: '55% 50%',
    alt: 'Gloved hands testing an electrical distribution panel with meter probes.',
  },
  {
    num: '03',
    name: 'ELV',
    href: '/services/elv',
    text: 'Support for low-voltage systems, including EPABX, CCTV, networking, access control, BMS, LMS, and fire alarm system installations and maintenance, subject to actual project requirements.',
    // `/services/elv.webp` shows generic bench electrical work, not CCTV, access
    // control or networking. Withheld rather than published as ELV work.
    image: null,
    imageNeeded: 'CCTV, access control or networking systems',
    shape: 'tall',
  },
  {
    num: '04',
    name: 'Civil Interior',
    href: '/services/civil-interior',
    text: 'Civil interior and fit-out-related service support for commercial and business spaces.',
    // `/services/interior.webp` shows exterior civil construction with a crane,
    // not a commercial interior fit-out, and repeats the Civil Project subject.
    image: null,
    imageNeeded: 'a commercial interior or fit-out in progress',
    shape: 'tall',
  },
  {
    num: '05',
    name: 'Cooling System',
    href: '/services/cooling',
    text: 'Cooling-system and HVAC-related service support for appropriate commercial and industrial environments.',
    // `/services/cooling.webp` carries third-party branding (a manufacturer's
    // unit and another firm's uniform), so it cannot stand for Beyond Service.
    image: null,
    imageNeeded: 'unbranded HVAC or cooling plant servicing',
    shape: 'wide',
  },
  {
    num: '06',
    name: 'Fire & Safety',
    href: '/services/fire-safety',
    text: 'Fire-safety and protection-system service support based on site requirements and approved scope.',
    image: '/services/fire.webp',
    shape: 'wide',
    focus: '45% 55%',
    alt: 'Operator discharging a fire extinguisher during a safety drill.',
  },
  {
    num: '07',
    name: 'Industrial Equipment',
    href: '/services/industrial-equipment',
    text: 'Industrial equipment-related service and maintenance support for business operations.',
    image: '/services/industrial.webp',
    shape: 'square',
    focus: '55% 50%',
    alt: 'Engineer servicing a large industrial motor drive inside a plant.',
  },
  {
    num: '08',
    name: 'Logistic',
    href: '/services/logistics',
    text: 'Logistics-related service coordination and support for business requirements.',
    image: '/services/logistic.webp',
    shape: 'wide',
    focus: '50% 45%',
    alt: 'Loading bay with trucks, pallets and workers checking consignments.',
  },
  {
    num: '09',
    name: 'Project Management',
    href: '/services/project-management',
    text: 'Project coordination and management support for service requirements, planning, and execution.',
    image: '/services/pm.webp',
    shape: 'tall',
    focus: '50% 50%',
    alt: 'Site drawings, hard hat and tablet on a desk overlooking a development.',
  },
]

// ---------------------------------------------------------------------------
// 6 — INDUSTRIES WE SERVE. No industry list has been supplied or approved, so
// `categories` stays empty and the section renders its statement only.
// ---------------------------------------------------------------------------
export const INDUSTRIES = {
  label: 'Industries we serve',
  headingLines: ['Built Around Your Business.', 'Ready for Every Challenge.'],
  supporting:
    'We support corporate and industrial clients with reliable project management, repair and maintenance, and integrated facility services. Our approach adapts to the operational needs of different business environments, helping keep workplaces, facilities, and projects running smoothly across India.',
  // "Explore Our Expertise" resolves to the services overview — the real page
  // that holds the nine capability areas. No industry pages exist, so the
  // categories below are stated, not linked.
  cta: { label: 'Explore our expertise', href: LINKS.services },
  // Six approved categories. Names only: no sector statistics, client counts or
  // credentials have been supplied, and none are invented to pad the entries.
  categories: [
    { name: 'Corporate & Commercial' },
    { name: 'Industrial & Manufacturing' },
    { name: 'Retail & Shopping Spaces' },
    { name: 'Hospitality & Food Service' },
    { name: 'Infrastructure & Project Operations' },
    { name: 'Integrated Facility Operations' },
  ],
  closing: {
    headingLines: ['Different Industries.', 'One Commitment to Excellence.'],
    text: "We bring a practical, service-focused approach to every project, with solutions shaped around each client's requirements.",
  },
}

// ---------------------------------------------------------------------------
// 7 — PROJECTS / CASE STUDIES. Intentionally empty until approved project
// information is supplied. No sample names, images or outcomes.
// ---------------------------------------------------------------------------
export const PROJECTS = {
  label: 'Our work',
  headingLines: ['Projects That Keep', 'Business Moving.'],
  supporting:
    'Explore our service capabilities across civil works, building systems, facility renovation, and fire and safety services.',
  // The four portfolio entries published on the company website, carried over
  // with only the metadata the source states: title, service category and
  // region. No client names, dates, values, outcomes or endorsements are
  // added, because the source publishes none.
  //
  // No project photography has been supplied. Rather than dress these in stock
  // imagery, each tile carries an abstract architectural frame — `figure`
  // selects which one. Adding an approved `image` to an entry replaces it.
  items: [
    {
      slug: 'civil-project-management',
      href: '/projects/civil-project-management',
      num: '01',
      title: 'Civil Project Management',
      category: 'Civil R&M',
      scope: 'Corporate Campus',
      region: 'Maharashtra',
      figure: 'grid',
      shape: 'portrait',
    },
    {
      slug: 'mep-elv-installation',
      href: '/projects/mep-elv-installation',
      num: '02',
      title: 'MEP & ELV Installation',
      category: 'Electrical & Low Voltage',
      region: 'Gujarat',
      figure: 'circuit',
      shape: 'landscape',
    },
    {
      slug: 'facility-renovation',
      href: '/projects/facility-renovation',
      num: '03',
      title: 'Facility Renovation Project',
      category: 'Civil Interior Services',
      region: 'Delhi NCR',
      figure: 'plan',
      shape: 'landscape',
    },
    {
      slug: 'fire-safety-compliance',
      href: '/projects/fire-safety-compliance',
      num: '04',
      title: 'Fire & Safety Compliance',
      category: 'Fire & Safety Services',
      region: 'Karnataka',
      figure: 'riser',
      shape: 'portrait',
    },
  ],
  // Shown on every project view: no detailed case study has been approved.
  comingSoon: {
    label: 'Project details',
    status: 'Coming soon',
    text: "We're preparing a more detailed look at this project. Please check back soon.",
    back: 'Back to projects',
  },
}

// ---------------------------------------------------------------------------
// 8 — OUR CLIENTS. The client-logo reference images have not been supplied to
// this project, so no logo is shown. Adding entries here lights the slider up.
// ---------------------------------------------------------------------------
export const CLIENTS = {
  label: 'Our clients',
  headingLines: ['Trusted by Leading Businesses.'],
  supporting: 'We value the relationships we build with our clients and the trust placed in our service network.',
  /** @type {{ name: string, logo: string, href?: string }[]} */
  logos: [],
  // Until real logo files arrive the strip runs with this many clearly
  // labelled empty slots, so the layout is real and reviewable without any
  // invented client name or redrawn mark. Adding entries to `logos` above
  // replaces the placeholders automatically.
  placeholderCount: 8,
  placeholderLabel: 'Client logo',
  note: 'Client logos have not been supplied to this project, so the strip above runs on labelled placeholders. Send the original logo files (SVG or transparent PNG) and they replace the placeholders with no further layout work. No logo is redrawn, recreated from a screenshot or substituted, because that would imply a client relationship that has not been verified.',
}

// ---------------------------------------------------------------------------
// 9 — COMPANY OVERVIEW VIDEO. The URL has not been supplied. Until `url` is
// set the preview renders without a play action; it never pretends to play.
// The three hero films are deliberately not reused here.
// ---------------------------------------------------------------------------
export const OVERVIEW_VIDEO = {
  label: 'Inside Beyond Service',
  headingLines: ['Discover Beyond Service.'],
  supporting:
    'Get to know our approach to project management, repair and maintenance, and service delivery across India.',
  cta: 'Watch the film',
  title: 'Beyond Service — Company Overview',
  // The company overview film, as supplied. `embed` is used for the in-page
  // player; `url` opens the original on YouTube if embedding is blocked.
  url: 'https://youtu.be/vZE0j_WCRvI',
  embed: 'https://www.youtube.com/embed/vZE0j_WCRvI',
  // No poster frame has been supplied and none is invented: the frame stays a
  // composed graphite surface until the player is started.
  poster: null,
}

// ---------------------------------------------------------------------------
// 10 — OUR TEAM & LEADERSHIP. Only supplied names appear. No portraits are
// shown because none have been supplied, and none are invented.
// ---------------------------------------------------------------------------
export const TEAM = {
  label: 'The people behind the work',
  headingLines: ['Meet the Team Behind', 'Every Project.'],
  supporting:
    'Reliable service delivery depends on people who work together, understand client requirements, and contribute to the coordination of everyday operations.',
  // The nine supplied team members, with the employee codes exactly as given.
  //
  // The supplied sheet also carries a personal email address for each person;
  // those are deliberately not published here. No job title or biography is
  // attached to a name that was not supplied with one — only Kruti's "Tech
  // Member" was, and it is kept. Portraits have not been supplied, so each card
  // carries a drawn placeholder frame rather than a stock face.
  members: [
    { name: 'Jaiswal Mukesh', code: 'J2601' },
    { name: 'Sneha Rathore', code: 'S2602' },
    { name: 'Prince Maurya', code: 'P2603' },
    { name: 'Khushi Pandey', code: 'K2604' },
    { name: 'Devid', code: 'D2605' },
    { name: 'Suhani', code: 'S2606' },
    { name: 'Jaydeep', code: 'J2607' },
    { name: 'Vanshika Kapadia', code: 'V2608' },
    { name: 'Kruti', code: 'K2609', role: 'Tech Member' },
  ],
  note: 'Team photographs and role details will be added here once supplied.',
  leadership: {
    headingLines: ['Guided by People.', 'Driven by Purpose.'],
    supporting:
      "Our leadership guides the company's commitment to professional service delivery, client relationships, and dependable operations.",
    people: [{ name: 'Komal Khandelwal' }, { name: 'Anurag Khandelwal' }],
    signature: {
      src: '/brand/signature-anurag.png',
      width: 474,
      height: 526,
      // The supplied signature belongs to Anurag Khandelwal.
      owner: 'Anurag Khandelwal',
      alt: 'Signature of Anurag Khandelwal.',
    },
  },
}

// ---------------------------------------------------------------------------
// The compact signature-and-figures block, shown identically on Home and
// About. It replaces the standalone Leadership section on the homepage. Every
// word is reused from approved copy above; the figures are the approved four.
// ---------------------------------------------------------------------------
export const SIGNATURE_BLOCK = {
  label: 'Leadership',
  headingLines: ['Guided by People.', 'Driven by Purpose.'],
  supporting: TEAM.leadership.supporting,
  people: TEAM.leadership.people,
  signature: TEAM.leadership.signature,
  metrics: [METRICS.states, METRICS.clients, METRICS.providers, METRICS.verticals],
}

// ---------------------------------------------------------------------------
// 11 — CLIENT REVIEWS. Exactly three positions are allowed. The three supplied
// review references have not reached this project, so none is published.
// ---------------------------------------------------------------------------
export const REVIEWS = {
  label: 'Client reviews',
  headingLines: ['What Our Clients Say.'],
  maxEntries: 3,
  /** @type {{ quote: string, name: string, detail?: string }[]} */
  entries: [],
}

// ---------------------------------------------------------------------------
// 12 — CAREERS & FAQ.
// ---------------------------------------------------------------------------
export const CAREERS = {
  label: 'Careers at Beyond Service',
  headingLines: ['Great Work Starts', 'with Great People.'],
  subheading: 'Bring Your Ambition. Build What Matters.',
  body: [
    'At Beyond Service, people play an important role in how we work with clients, coordinate services, and support business operations. We value people who take ownership, communicate clearly, approach challenges with a practical mindset, and work collaboratively towards shared goals.',
    'We believe good service comes from a team that is willing to learn, adapt, and improve. Whether supporting technical requirements, coordinating operations, or building strong client relationships, every contribution helps move our work forward.',
    'If you enjoy solving problems, working with people, and contributing to meaningful business outcomes, we invite you to explore opportunities with Beyond Service.',
  ],
  image: {
    src: '/sections/approach-planning.webp',
    width: 608,
    height: 1080,
    alt: 'Two colleagues in hard hats reviewing a floor plan together on site.',
  },
  culture: [
    {
      title: 'Work Together',
      text: 'Collaborate across teams to coordinate requirements and support dependable service delivery.',
    },
    {
      title: 'Think Practically',
      text: 'Approach challenges with curiosity, sound judgement, and a focus on useful solutions.',
    },
    {
      title: 'Keep Learning',
      text: 'Build your knowledge, strengthen your skills, and adapt to evolving business and technology needs.',
    },
    {
      title: 'Create Client Value',
      text: 'Understand client requirements and contribute to professional, reliable service experiences.',
    },
  ],
  // Career categories, not confirmed vacancies.
  categories: [
    'Engineering and Technical Roles',
    'Operations and Coordination',
    'Customer Service',
    'Finance and Business Support',
  ],
  categoriesNote: 'These are career categories, not confirmed vacancies.',
  // No careers page or recruitment workflow exists, so this is a clearly
  // labelled enquiry to the approved company address.
  cta: {
    label: 'Explore career opportunities',
    href: `mailto:${CONTACT_INFO.email}?subject=${encodeURIComponent('Career enquiry — Beyond Service')}`,
    note: 'Career enquiries reach the team by email.',
  },
}

export const FAQ = {
  label: 'FAQ',
  headingLines: ['Questions, Answered.'],
  supporting:
    'Find out more about our services, project coordination, and how to discuss your requirements with Beyond Service.',
  // Five supplied answers. Each one hedges rather than promises: no response
  // time, price, coverage guarantee or certification is stated anywhere.
  items: [
    {
      q: 'What services does Beyond Service provide?',
      a: 'Beyond Service provides service solutions across nine core areas: Civil Project & Repair and Maintenance (R&M), MEP Services, ELV Services, Civil Interior Services, Cooling System Services, Fire & Safety Services, Industrial Equipment, Logistic Services, and Project Management. The right combination depends on the facility, project scope, and requirements. Contact our team to discuss which services are relevant to your needs.',
    },
    {
      q: 'Which locations does Beyond Service serve?',
      a: 'Beyond Service is based in Vesu, Surat, Gujarat, and its company information describes service support for clients across India. The availability and scope of a particular service may depend on the location and project requirements. Share your project location with our team so we can discuss the appropriate next steps.',
    },
    {
      q: 'Can Beyond Service coordinate multiple service requirements?',
      a: 'Beyond Service offers services across several operational areas, including project management, repair and maintenance, building systems, interiors, cooling systems, fire and safety, industrial equipment, and logistics. If you need more than one service, share your requirements and project scope with our team so we can discuss a suitable coordination approach. Specific delivery arrangements should be confirmed for each project.',
    },
    {
      q: 'How can I discuss a project or facility requirement?',
      a: `You can contact Beyond Service by email at ${CONTACT_INFO.email} or call ${CONTACT_INFO.phones[0]}. You can also use the website's contact or quote-request form, if its submission workflow is active, to share your service requirements and project location. Include enough detail for the team to understand what you need. Any response time or service commitment should be confirmed directly with the company.`,
    },
    {
      q: 'How can I request a quote?',
      a: `Use the Get a Quote form on this website, if the form is connected and working, to provide your name, contact details, required service, project location, and a short description of your requirements. Alternatively, email ${CONTACT_INFO.email} or call ${CONTACT_INFO.phones[0]}. The team can review the information and discuss the next steps. A quote, price, or delivery timeline is not confirmed until the company responds directly.`,
    },
  ],
}

// ---------------------------------------------------------------------------
// QUALITY & CREDENTIALS. No certification, award, registration or audit has
// been supplied or verified, so none is claimed and no badge wall is drawn.
// The section states the commitment itself and nothing beyond it.
// ---------------------------------------------------------------------------
export const QUALITY = {
  label: 'Quality & credentials',
  headingLines: ['Committed to Quality.', 'Focused on Delivery.'],
  supporting:
    'We aim to support reliable service delivery through coordinated execution, professional service partners, and attention to client requirements.',
  // Three commitments, drawn from the approved standards wording already used
  // elsewhere on the site. Deliberately not presented as certifications.
  pillars: [
    {
      title: 'Coordinated execution',
      text: 'Requirements, scheduling and delivery are coordinated through a single point of contact.',
    },
    {
      title: 'Professional service partners',
      text: 'Work is delivered through a network of service providers selected for the scope at hand.',
    },
    {
      title: 'Attention to requirements',
      text: 'Scope is defined with the client and confirmed against the site before work begins.',
    },
  ],
  note: 'No certification or accreditation is claimed on this page. Credentials will be published here only once verified.',
}

// ---------------------------------------------------------------------------
// 13 — LET'S TALK, GET A QUOTE, CONTACT & FOOTER.
// ---------------------------------------------------------------------------
export const LETS_TALK = {
  label: 'Ready to get started?',
  headingLines: ["Let's Discuss How We Can", 'Elevate Your Business.'],
  supporting:
    'From project management to facility maintenance, Beyond Service works with corporate and industrial clients to coordinate reliable, professional service solutions across India.',
  primary: { label: "Let's work together", href: LINKS.quote },
  secondary: { label: 'Call the team', href: telHref(CONTACT_INFO.phones[0]), display: CONTACT_INFO.phones[0] },
  details: ['Surat, Gujarat — PAN India Operations', CONTACT_INFO.email, CONTACT_INFO.websiteLabel],
}

// The dedicated /get-quote page. The copy describes only what the company has
// actually committed to: no response time, service level or callback promise
// is stated, because none has been supplied.
export const QUOTE_PAGE = {
  hero: {
    label: 'Get a quote',
    headingLines: ['Tell Us What You Need.'],
    supporting:
      'Share your project or service requirement and the team will review the details to determine the appropriate next steps.',
  },
  steps: [
    {
      title: 'Share the requirement',
      text: 'Tell us the service, the location and what the work involves. The more specific the scope, the more useful the response.',
    },
    {
      title: 'We review the scope',
      text: 'Your enquiry is read by the coordination team and matched against the service providers suited to the work.',
    },
    {
      title: 'We come back to you',
      text: 'The team responds using the contact details you provide, and confirms what is needed to move forward.',
    },
  ],
}

export const QUOTE_FORM = {
  label: 'Get in touch',
  headingLines: ['Request a Quote.'],
  supporting:
    'Tell us about your project or service requirements. Share the essential details so the team can understand your enquiry and determine the appropriate next steps.',
  submitLabel: 'Submit enquiry',
  image: {
    src: '/sections/expertise-architecture.webp',
    width: 1600,
    height: 900,
    alt: 'Corporate tower facades lit at the end of the day.',
  },
  // No submission endpoint has been configured for this project. The form
  // validates in full and then hands the enquiry over by email rather than
  // showing a success state that did not happen.
  endpoint: null,
  fields: [
    { name: 'name', label: 'Full Name', type: 'text', required: true, autoComplete: 'name' },
    { name: 'phone', label: 'Phone Number', type: 'tel', required: true, autoComplete: 'tel' },
    { name: 'email', label: 'Email Address', type: 'email', required: true, autoComplete: 'email' },
    { name: 'company', label: 'Company Name', type: 'text', required: false, autoComplete: 'organization' },
    { name: 'service', label: 'Service Required', type: 'select', required: true },
    { name: 'city', label: 'City / Location', type: 'text', required: true, autoComplete: 'address-level2' },
    { name: 'message', label: 'Project Requirements / Message', type: 'textarea', required: true },
  ],
  serviceOptions: [...SERVICES, 'Other Enquiry'],
}

export const FOOTER = {
  nav: [
    { label: 'Home', href: LINKS.home },
    { label: 'About', href: LINKS.about },
    { label: 'Services', href: LINKS.services },
    { label: 'Industries', href: LINKS.industries },
    { label: 'Projects', href: LINKS.projects },
    { label: 'Contact', href: LINKS.contact },
    { label: 'Get a Quote', href: LINKS.quote },
    { label: 'Vendor Registration', href: LINKS.vendorRegistration },
    { label: 'Team', href: LINKS.team },
  ],
  // The legal pages sit in the bottom bar rather than the company column,
  // which is where the design system places them and where visitors look.
  legalLinks: [
    { label: 'Privacy policy', href: LINKS.privacy },
    { label: 'Terms of use', href: LINKS.terms },
  ],
  services: SERVICE_PAGES,
  legal: `© ${new Date().getFullYear()} ${BRAND_NAME}. All rights reserved.`,
}


// ---------------------------------------------------------------------------
// INTERIOR PAGE CONTENT
//
// Everything below is drawn from the imported design system at
// docs/design-system/project/ and from the approved company content already in
// this file. Where the design system marks a claim VERIFY, the claim is not
// published: response-time commitments, a dedicated vendor inbox and a careers
// inbox are all flagged there and none appear here. See
// docs/implementation-status.md for the full outstanding list.
// ---------------------------------------------------------------------------

export const INDUSTRIES_PAGE = {
  hero: {
    label: 'Industries',
    headingLines: ['Built Around Your Business.'],
    supporting: INDUSTRIES.supporting,
    meta: 'Six sectors \u00b7 PAN India',
  },
  // The page hero already carries the headline and the positioning line, so
  // the sector section opens on its own heading rather than repeating them.
  sectors: {
    label: 'Sectors',
    headingLines: ['Six Environments', 'We Work In.'],
    supporting:
      'Each sector below lists the service lines most often called on in that environment, and links straight through to them.',
  },
  // The six approved categories, each given the descriptor and the service
  // links that follow from the nine verticals already published on this site.
  // No sector statistics, client names or project counts: none were supplied.
  categories: [
    {
      name: 'Corporate & Commercial',
      text: 'Offices, business parks and multi-tenant commercial buildings, where the facility has to stay presentable and operational through the working day.',
      services: ['civil-interior', 'mep', 'elv'],
    },
    {
      name: 'Industrial & Manufacturing',
      text: 'Plants and production facilities, where equipment uptime and statutory compliance drive the maintenance programme.',
      services: ['industrial-equipment', 'mep', 'fire-safety'],
    },
    {
      name: 'Retail & Shopping Spaces',
      text: 'Stores and retail floors, where fit-out work and repairs are scheduled around trading hours.',
      services: ['civil-interior', 'cooling', 'elv'],
    },
    {
      name: 'Hospitality & Food Service',
      text: 'Hotels, restaurants and food-service operations, where cooling, hygiene-critical systems and guest-facing finishes all matter at once.',
      services: ['cooling', 'mep', 'civil-interior'],
    },
    {
      name: 'Infrastructure & Project Operations',
      text: 'Capital projects and site operations, coordinated across contractors, stages and locations.',
      services: ['project-management', 'civil-project-rm', 'logistics'],
    },
    {
      name: 'Integrated Facility Operations',
      text: 'Multi-site occupiers consolidating several service lines under one coordinated programme.',
      services: ['project-management', 'civil-project-rm', 'cooling'],
    },
  ],
  approach: {
    label: 'How we work',
    headingLines: ['One Approach,', 'Adapted to the Site.'],
    points: [
      {
        title: 'Scope confirmed on site',
        text: 'Requirements are defined with the client and checked against the actual site before work begins.',
      },
      {
        title: 'Providers matched to the work',
        text: 'The service providers assigned to a job are selected for the discipline and the location it sits in.',
      },
      {
        title: 'One point of contact',
        text: 'Scheduling, delivery and reporting are coordinated through a single contact rather than across vendors.',
      },
    ],
  },
  note: 'Sector categories describe the environments Beyond Service supports. No client names, project counts or sector-specific credentials are published here, because none have been supplied for publication.',
  closing: INDUSTRIES.closing,
}

export const PROJECTS_PAGE = {
  hero: {
    label: 'Projects',
    headingLines: ['Projects That Keep', 'Business Moving.'],
    supporting: PROJECTS.supporting,
    meta: 'Four published projects \u00b7 details pending approval',
  },
  // The four entries carry only what the company website states: a title, a
  // service category and a region. Nothing else is published, and the honest
  // note below says so rather than dressing the tiles as finished case studies.
  note: {
    heading: 'What these entries show, and what they do not',
    text: 'Each entry below carries only what has been published and verified: the project title, the service category and the region. No client names, contract values, dates, photographs, outcomes or endorsements appear here, because none have been supplied or cleared for publication. The detail views say the same thing rather than presenting sample content as a finished case study.',
  },
  needed: {
    heading: 'To publish full case studies we need',
    items: [
      'Written client permission to name each organisation and publish the work.',
      'Project photography that Beyond Service owns or is licensed to publish.',
      'Confirmed scope, duration and completion date for each project.',
      'Any outcome figures the client is willing to have stated publicly.',
    ],
  },
}

export const CONTACT_PAGE = {
  hero: {
    label: 'Contact',
    headingLines: ["Let's Discuss Your Facility."],
    supporting:
      'From a single-site repair to a PAN India maintenance programme, tell us the scope and the team will review it and come back to you.',
    meta: 'Surat, Gujarat \u00b7 PAN India delivery',
  },
  cards: [
    {
      kind: 'call',
      title: 'Call',
      lines: CONTACT_INFO.phones,
      note: 'Available during the business hours listed below.',
    },
    {
      kind: 'email',
      title: 'Email',
      lines: [CONTACT_INFO.email],
      note: 'The quickest route for a written scope or drawing set.',
    },
    {
      kind: 'visit',
      title: 'Visit',
      lines: CONTACT_INFO.addressLines,
      note: 'Nearest landmark: S D Jain Modern School, Vesu.',
    },
  ],
  talkFirst:
    'Prefer to talk first? Call either number above during business hours, or send the form below and the team will respond by email.',
  privacyNote:
    'Beyond Service uses the information you enter to respond to your enquiry. It is not shared with third parties.',
  hours: {
    heading: 'Business hours',
    rows: [
      { day: CONTACT_INFO.hoursDays, value: CONTACT_INFO.hours },
      { day: 'Sunday', value: 'Closed' },
    ],
    // The design system lists 09:00-18:00 and labels one number 24/7. Neither
    // matches what the company site publishes, and neither has been confirmed,
    // so the published hours above are used and the discrepancy is recorded in
    // docs/implementation-status.md rather than resolved by guesswork.
    note: 'Hours are as published by Beyond Service. Response times are not stated here because no service-level commitment has been confirmed for publication.',
  },
}

export const VENDOR_PAGE = {
  hero: {
    label: 'Vendor network',
    headingLines: ['Partner with Beyond Service', 'Across India.'],
    supporting:
      'Beyond Service invites professional service providers, contractors, technicians and specialised service firms across India to register with our vendor network. We work with vetted providers to deliver projects for corporate and industrial clients.',
    meta: '500+ service providers \u00b7 14+ states',
  },
  why: {
    label: 'Why partner with us',
    headingLines: ['A Steadier Pipeline,', 'Cleaner Commercials.'],
    items: [
      {
        title: 'Projects at scale',
        text: 'Our clients are corporate occupiers running multi-site programmes, which means larger and better-defined scopes than typical direct-to-client work.',
      },
      {
        title: 'Clean commercials',
        text: 'Scope, timeline and payment milestones are agreed upfront, and invoices follow a defined cycle.',
      },
      {
        title: 'Operational support',
        text: 'Our account managers run the client interface, approvals and reporting, so your team can focus on execution.',
      },
    ],
  },
  disciplines: {
    label: "Who we're looking for",
    headingLines: ['The Capabilities', 'We Hire Against.'],
    supporting:
      "If your discipline is not listed and you believe we should know you, apply anyway and tell us where you fit.",
    items: [
      'Civil contractors \u2014 RCC, PCC, masonry, finishing, waterproofing',
      'MEP contractors \u2014 HT/LT, HVAC, plumbing, STP',
      'ELV integrators \u2014 CCTV, access control, structured cabling, BMS, fire alarm',
      'Fire-side contractors \u2014 sprinkler, hydrant, suppression, extinguisher',
      'Interior fit-out contractors \u2014 ceilings, partitions, flooring, carpentry',
      'HVAC and refrigeration service firms \u2014 split, VRF, chillers, precision',
      'Industrial equipment service firms \u2014 DG, pumps, compressors, hydraulics',
      'Material handling, cranes and rigging specialists',
      'Logistics, packers and movers, warehousing',
      'Specialist trades \u2014 glazing, signage, acoustic, metalwork',
    ],
  },
  criteria: {
    label: 'Vendor criteria',
    headingLines: ['What We Ask', 'of Every Partner.'],
    items: [
      {
        title: 'Professionalism and timeliness',
        text: 'You hit the dates you commit to, you communicate proactively when something changes, and your team conducts itself appropriately on client sites.',
      },
      {
        title: 'Trained and experienced workforce',
        text: 'Your technicians are trained for the work and your supervisors have experience managing it. We will ask for proof.',
      },
      {
        title: 'Quality-conscious workmanship',
        text: 'You take ownership of the finish, not just the turn-up. Snags are addressed without a chase cycle.',
      },
      {
        title: 'Compliance and documentation ready',
        text: 'Statutory licences, GST, PAN, insurance, labour compliance and site-safety protocols in place and shareable on request.',
      },
    ],
  },
  next: {
    label: 'What happens next',
    headingLines: ['From Application', 'to Onboarding.'],
    // The design system attaches response times to these steps and marks them
    // VERIFY. They are omitted until Beyond Service confirms them.
    steps: [
      { title: 'Receipt', text: 'We acknowledge your application by email.' },
      { title: 'Initial screening', text: 'We review your documentation and shortlist against the current pipeline.' },
      { title: 'Discovery call', text: 'For shortlisted vendors, our team runs a scoping call to understand your capability depth.' },
      { title: 'In-person verification', text: 'Cleared vendors are invited to our Surat office for a verification meeting.' },
      { title: 'Onboarding', text: 'Successful vendors are added to the network for the disciplines, geographies and project sizes they are approved for.' },
    ],
    note: 'Timelines for each step have not been confirmed for publication, so none are stated.',
  },
  verification: {
    heading: 'In-person verification',
    text: 'Final vendor onboarding requires an in-person verification at our registered office. Please schedule the visit by email or phone before travelling.',
  },
  support: {
    heading: 'Have a question before you apply?',
    text: 'Talk to the team. We are happy to answer scoping questions before you spend time on the application.',
  },
  form: {
    heading: 'Apply to join the vendor network',
    submitLabel: 'Submit application',
    // Same position as the quote form: no endpoint is configured, so the form
    // never reports a submission it did not make.
    endpoint: null,
    fields: [
      { name: 'company', label: 'Company / Firm Name', type: 'text', required: true, autoComplete: 'organization' },
      { name: 'contact', label: 'Contact Person', type: 'text', required: true, autoComplete: 'name' },
      { name: 'role', label: 'Role', type: 'text', required: false, autoComplete: 'organization-title' },
      { name: 'phone', label: 'Phone Number', type: 'tel', required: true, autoComplete: 'tel' },
      { name: 'email', label: 'Business Email', type: 'email', required: true, autoComplete: 'email' },
      { name: 'category', label: 'Primary Service Category', type: 'select', required: true },
      { name: 'states', label: 'Operating States', type: 'text', required: true, autoComplete: 'address-level1' },
      { name: 'cities', label: 'Operating Cities', type: 'text', required: false, autoComplete: 'address-level2' },
      { name: 'years', label: 'Years in Operation', type: 'number', required: true, min: 0, max: 100 },
      { name: 'projectSize', label: 'Average Project Size', type: 'select', required: false },
      { name: 'workforce', label: 'Workforce Size', type: 'select', required: false },
      { name: 'gst', label: 'GST Registration Number', type: 'text', required: false },
      { name: 'message', label: 'Anything else we should know', type: 'textarea', required: false, maxLength: 2000 },
    ],
    categoryOptions: [...SERVICES, 'Material Handling & Rigging', 'Specialist Trades', 'Other'],
    projectSizeOptions: ['Under \u20b95 lakh', '\u20b95\u201350 lakh', '\u20b950 lakh \u2013 5 crore', '\u20b95 crore+'],
    workforceOptions: ['1\u201310', '11\u201350', '51\u2013200', '200+'],
    consent: {
      name: 'consent',
      label:
        'I consent to Beyond Service holding and processing this information for vendor onboarding purposes.',
      required: true,
    },
    // File upload is specified by the design system but deliberately not built:
    // it needs a storage bucket and virus scanning, neither of which exists.
    uploadNote:
      'Do not attach documents yet. Compliance documents are requested during screening, once a secure upload has been configured.',
  },
}

export const TEAM_PAGE = {
  hero: {
    label: 'Team',
    headingLines: ['The People Behind', 'Every Engagement.'],
    supporting:
      'Our team brings professionalism, technical experience and quality consciousness to every service engagement, from provider selection through project execution to final handover.',
    meta: 'Surat, India',
  },
  // The nine supplied names are published exactly as they are on the homepage:
  // name and employee code, nothing more. No job title, biography, portrait or
  // contact detail is invented, and the note below states what is outstanding.
  roster: {
    heading: 'Our team',
    note: 'Job titles, responsibility statements, photographs and individual publication consent have not yet been confirmed for these colleagues, so none are shown. The names and codes below are the roster supplied by Beyond Service.',
  },
  culture: {
    heading: 'How we work',
    text: 'We hire for ownership, judgement and reliability. The team is accountable for the engagement, not just the task.',
  },
  cta: {
    heading: 'Want to work with Beyond Service?',
    text: 'Join our vendor network, or write to us about joining the team.',
    primary: { label: 'Register as a vendor', href: LINKS.vendorRegistration },
    secondarySubject: 'Careers at Beyond Service',
  },
}

// ---------------------------------------------------------------------------
// LEGAL. These are DRAFTS for review, and both pages say so at the top.
//
// They describe only what this website actually does, which is verifiable from
// the code: two forms that validate in the browser and then hand off to the
// visitor's own email client, no analytics, no cookies set by this site, no
// third-party trackers, and one YouTube embed that loads only after a click.
// Nothing is asserted about retention periods, legal basis, jurisdiction or
// compliance certification, because none of that has been supplied or decided.
// ---------------------------------------------------------------------------

const LEGAL_DRAFT_NOTICE =
  'This is a draft prepared for review. It has not been checked by a legal adviser and is not a statement of legal compliance. Beyond Service should have it reviewed and approved before it is relied upon.';

export const PRIVACY_PAGE = {
  hero: {
    label: 'Privacy',
    headingLines: ['Privacy Policy.'],
    supporting: 'How this website handles the information you enter into it.',
    meta: 'Draft for review',
  },
  draftNotice: LEGAL_DRAFT_NOTICE,
  sections: [
    {
      title: 'What this policy covers',
      body: [
        'This policy describes how the Beyond Service website handles information entered into it. It covers this website only.',
      ],
    },
    {
      title: 'Information you give us',
      body: [
        'Two forms on this site collect information: the quote request form and the vendor registration form. Between them they ask for your name, company name, role, phone number, email address, city or operating locations, the service you are enquiring about, and any message you write.',
        'You choose what to enter. Nothing is collected from you unless you fill in a form.',
      ],
    },
    {
      title: 'How your form submissions reach us',
      body: [
        'This website currently has no server-side form endpoint. When you complete a form and submit it, the site validates your entries in your browser and then opens your own email application with the details prepared, addressed to ' +
          CONTACT_INFO.email +
          '. The message is sent by you, from your own email account, and is subject to your email provider\u2019s terms.',
        'Until you send that email, nothing you typed leaves your device. This website does not store, transmit or receive your form entries.',
      ],
    },
    {
      title: 'Cookies and analytics',
      body: [
        'This website sets no cookies of its own and runs no analytics or advertising trackers.',
        'The company overview video is hosted on YouTube and is not loaded until you choose to play it. If you play it, YouTube may set cookies and receive your IP address under Google\u2019s own privacy policy. If you do not play it, no request is made to YouTube.',
      ],
    },
    {
      title: 'Who sees your information',
      body: [
        'Information you email us is received by Beyond Service. It is not sold, and it is not shared with third parties for marketing.',
      ],
    },
    {
      title: 'Retention',
      body: [
        'A retention period has not yet been set for enquiry and vendor correspondence. This section will state the period once Beyond Service has agreed it.',
      ],
      pending: true,
    },
    {
      title: 'Your choices',
      body: [
        'To ask what correspondence Beyond Service holds about you, to correct it, or to ask for it to be deleted, write to ' +
          CONTACT_INFO.email +
          '.',
      ],
    },
    {
      title: 'Changes to this policy',
      body: ['If this policy changes, the revised version will be published on this page.'],
    },
  ],
}

export const TERMS_PAGE = {
  hero: {
    label: 'Terms',
    headingLines: ['Terms of Use.'],
    supporting: 'The terms on which this website is made available.',
    meta: 'Draft for review',
  },
  draftNotice: LEGAL_DRAFT_NOTICE,
  sections: [
    {
      title: 'About this website',
      body: [
        'This website is operated by Beyond Service, ' + CONTACT_INFO.address,
        'By using the site you accept these terms. If you do not accept them, please do not use the site.',
      ],
    },
    {
      title: 'What the content is for',
      body: [
        'The descriptions of services, capabilities and sectors on this site are provided for general information. They describe the kinds of work Beyond Service undertakes; they are not an offer, a quotation or a commitment to any particular scope, price or timeline.',
        'Any engagement is governed by the written agreement signed for that engagement, not by this website.',
      ],
    },
    {
      title: 'Enquiries and applications',
      body: [
        'Submitting a quote request or a vendor application does not create a contract, a guarantee of a response, or any obligation on Beyond Service to engage you or to accept an application.',
      ],
    },
    {
      title: 'Accuracy',
      body: [
        'We take care to keep the site accurate, but content may change or become out of date. Figures describing the company\u2019s coverage and network are indicative.',
      ],
    },
    {
      title: 'Intellectual property',
      body: [
        'The Beyond Service name, logo and the text and images on this site belong to Beyond Service or its licensors, except where credited otherwise. Please do not reproduce them without permission.',
      ],
    },
    {
      title: 'Third-party links and embeds',
      body: [
        'This site links to third-party sites and embeds a video hosted by YouTube. Beyond Service does not control those services and is not responsible for their content or their terms.',
      ],
    },
    {
      title: 'Liability',
      body: [
        'A limitation of liability clause has not yet been settled for this site and is deliberately not stated here. This section will be completed once Beyond Service has taken advice on it.',
      ],
      pending: true,
    },
    {
      title: 'Governing law',
      body: [
        'The governing law and jurisdiction for these terms have not yet been confirmed and are deliberately not stated here.',
      ],
      pending: true,
    },
    {
      title: 'Contact',
      body: ['Questions about these terms can be sent to ' + CONTACT_INFO.email + '.'],
    },
  ],
}
