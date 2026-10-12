// ---------------------------------------------------------------------------
// Service detail content — the nine individual /services/* pages.
//
// Source: "Beyond_Services_Content_With_9_Images.pdf" (PDF B), pages 2–10, one
// page per service. Overviews, capability lists, the two-step process names
// and the FAQs are that document's content.
//
// Two deliberate editorial decisions, both recorded so they can be reversed:
//
//  1. PDF B frames several FAQ answers in the third person, about the source
//     document rather than to the reader ("The source lists…", "Beyond
//     describes…"). That phrasing belongs to a content guide, not a live page,
//     so the answers are given in the company's own voice. Every fact, figure
//     and hedge is carried over unchanged; nothing is added.
//
//  2. PDF B's nine embedded images are 199x131 thumbnails, and two carry stock
//     library UI burnt into the frame. They are unusable at hero size, so the
//     detail heroes draw on the project's existing high-resolution photography
//     instead. Where that photography does not honestly depict the service, the
//     image is withheld rather than published — see `imageStatus` below.
//
// `imageStatus` is one of:
//   'ok'      — the image depicts this service and is cleared for use.
//   'replace' — an image exists but misrepresents the service; flagged.
//   'missing' — nothing suitable exists; the hero renders a pending state.
// ---------------------------------------------------------------------------

export const SERVICE_DETAILS = [
  {
    num: '01',
    slug: 'civil-project-rm',
    href: '/services/civil-project-rm',
    name: 'Civil Project & R&M',
    tagline: 'Comprehensive civil maintenance for corporate and industrial facilities.',
    region: 'PAN India',
    overview:
      'Beyond Service delivers end-to-end civil repair and maintenance solutions for corporate and industrial facilities. The service covers routine upkeep and larger facility maintenance work, with an emphasis on timely execution, quality and minimal disruption.',
    capabilities: [
      'Full-scope civil works',
      'Waterproofing & insulation',
      'Interior & exterior finishing',
      'Flooring, plumbing, painting and plastering',
      'RCC/PCC and building-structure works',
      'Minimal downtime',
    ],
    process: [
      {
        num: '01',
        title: 'Site Assessment & Scope Definition',
        text: 'On-site inspection; scope documentation; timeline planning; budget estimation.',
      },
      {
        num: '02',
        title: 'Expert Execution & Handover',
        text: 'Vendor mobilization; quality monitoring; progress reporting; final inspection and sign-off.',
      },
    ],
    faqs: [
      {
        q: 'What types of civil works do you cover?',
        a: 'Civil repair and maintenance, flooring, plumbing, painting, plastering, waterproofing, insulation and building-structure work.',
      },
      {
        q: 'Do you handle preventive maintenance contracts?',
        a: 'Preventive maintenance and ongoing facility upkeep can be discussed based on the site and scope.',
      },
      {
        q: 'How quickly can you start work?',
        a: 'Start timelines depend on the site assessment, scope and mobilization requirements.',
      },
    ],
    image: {
      src: '/services/civil.webp',
      alt: 'Site engineer in a hard hat reviewing construction drawings on site.',
      focus: '50% 40%',
    },
    imageStatus: 'ok',
    related: ['project-management', 'civil-interior'],
  },

  {
    num: '02',
    slug: 'mep',
    href: '/services/mep',
    name: 'MEP Services',
    tagline: 'Mechanical, Electrical & Plumbing solutions for modern facilities.',
    region: 'PAN India',
    overview:
      'Our MEP division provides complete Mechanical, Electrical and Plumbing services for corporate campuses, industrial plants, retail chains and commercial buildings. From initial design coordination to installation, testing and commissioning, we handle the work end to end. We work with certified engineers and licensed contractors who follow IS and NBC standards, supporting safety compliance and energy efficiency.',
    capabilities: [
      'Electrical systems — HT/LT panels, wiring, earthing and power distribution',
      'Mechanical works',
      'Plumbing systems',
      'HVAC / mechanical systems',
      'Code-compliant installation, testing and commissioning',
    ],
    process: [
      {
        num: '01',
        title: 'Site Assessment & System Planning',
        text: 'Site inspection; requirement assessment; system design; BOQ and estimation.',
      },
      {
        num: '02',
        title: 'Installation, Testing & Commissioning',
        text: 'Installation; quality inspection; testing; final commissioning.',
      },
    ],
    faqs: [
      {
        q: 'Do you handle both new installations and retrofits?',
        a: 'We cover MEP installation and system work. The exact project scope is confirmed during the site assessment.',
      },
      {
        q: 'Are your electricians licensed?',
        a: 'We work with certified engineers and licensed contractors.',
      },
      {
        q: 'Can you coordinate MEP with ongoing civil works?',
        a: 'Coordination can be planned around the project scope and site schedule.',
      },
    ],
    image: {
      src: '/services/mep.webp',
      alt: 'Gloved hands testing an electrical distribution panel with meter probes.',
      focus: '55% 50%',
    },
    imageStatus: 'ok',
    related: ['elv', 'cooling'],
  },

  {
    num: '03',
    slug: 'elv',
    href: '/services/elv',
    name: 'ELV Services',
    tagline: 'Extra Low Voltage systems for smart, secure corporate environments.',
    region: 'PAN India',
    overview:
      'Beyond Service provides comprehensive ELV (Extra Low Voltage) solutions including CCTV surveillance, structured cabling, networking, access control, video door phones, PA systems, BMS and fire-alarm integration for commercial and industrial clients. The service material names leading brand ecosystems including Hikvision, Bosch, Honeywell, Legrand and Schneider.',
    capabilities: [
      'CCTV & surveillance',
      'Access-control systems',
      'Structured cabling and networking',
      'Video door phones and PA systems',
      'Building Management Systems (BMS)',
      'Fire-alarm integration',
    ],
    process: [
      {
        num: '01',
        title: 'Requirement Assessment & System Design',
        text: 'Requirement analysis; system design; BOQ preparation.',
      },
      {
        num: '02',
        title: 'Installation, Testing & Handover',
        text: 'Installation; system testing; integration checks; handover.',
      },
    ],
    faqs: [
      {
        q: 'Which CCTV brands do you work with?',
        a: 'We work with Hikvision, Dahua, Bosch, CP Plus and other leading brands.',
      },
      {
        q: 'Can you integrate ELV systems with existing infrastructure?',
        a: 'Integration requirements are assessed against the existing infrastructure.',
      },
      {
        q: 'Do you offer post-installation support?',
        a: 'Support requirements can be discussed during project scoping.',
      },
    ],
    // The available photograph shows generic bench electrical work — no CCTV,
    // access control or networking. Withheld rather than published as ELV work.
    image: null,
    imageStatus: 'missing',
    imageNeeded: 'CCTV, access control or structured-cabling work in progress',
    related: ['mep', 'fire-safety'],
  },

  {
    num: '04',
    slug: 'civil-interior',
    href: '/services/civil-interior',
    name: 'Civil Interior Services',
    tagline: 'Premium interior renovation for world-class corporate spaces.',
    region: 'PAN India',
    overview:
      'Beyond transforms corporate spaces through civil interior services including false ceilings, partition walls, glass and glazing, modular furniture installation, flooring (vinyl, wooden and carpet), painting, wallpaper and complete fit-out works. The service brings together skilled carpenters, civil contractors, glaziers and electricians for turnkey office refurbishments and new fit-outs.',
    capabilities: [
      'False ceiling works — grid, gypsum, POP and acoustic systems',
      'Partitions and glazing',
      'Modular furniture installation',
      'Flooring — vinyl, wooden and carpet',
      'Painting and wallpaper',
      'Turnkey office refurbishment and fit-outs',
    ],
    process: [
      {
        num: '01',
        title: 'Site Assessment & Design Coordination',
        text: 'Site inspection; requirement definition; layout and scope planning.',
      },
      {
        num: '02',
        title: 'Fit-out Execution & Handover',
        text: 'Coordinate trades; execute works; inspect finishes; complete handover.',
      },
    ],
    faqs: [
      {
        q: 'Do you provide turnkey interior solutions?',
        a: 'Yes — complete fit-outs and turnkey office refurbishment are part of the service.',
      },
      {
        q: 'Which interior works are covered?',
        a: 'Ceilings, partitions, glazing, furniture, flooring, painting, wallpaper and fit-out works.',
      },
      {
        q: 'What is the typical timeline for an office fit-out?',
        a: 'As an example, a 5,000 sq ft office is in the region of 4–6 weeks, depending on scope and material lead times.',
      },
    ],
    // The available photograph shows an exterior construction site with a crane,
    // not a commercial interior fit-out, and repeats the Civil Project subject.
    image: null,
    imageStatus: 'missing',
    imageNeeded: 'a commercial interior fit-out in progress — ceilings, partitions or glazing',
    related: ['civil-project-rm', 'mep'],
  },

  {
    num: '05',
    slug: 'cooling',
    href: '/services/cooling',
    name: 'Cooling System Services',
    tagline: 'HVAC and cooling solutions for optimal comfort and efficiency.',
    region: 'PAN India',
    overview:
      'Beyond Service provides installation, maintenance and AMC services for Split ACs, Cassette ACs, VRF/VRV systems, chillers, cooling towers, precision cooling for data centres and centralized HVAC systems. Its service material references engineers certified by leading brands including Daikin, Voltas, Blue Star, Carrier and Hitachi, with energy efficiency and applicable standards in focus.',
    capabilities: [
      'Split, cassette, ducted and VRF/VRV AC systems',
      'Central HVAC and chillers',
      'Cooling towers and precision cooling',
      'AMC and scheduled servicing',
      'Energy-efficient systems and smart controls',
      'Testing and performance verification',
    ],
    process: [
      {
        num: '01',
        title: 'Load Calculation & System Design',
        text: 'Heat-load calculation; site assessment; system selection; energy analysis.',
      },
      {
        num: '02',
        title: 'Installation, Testing & Commissioning',
        text: 'Equipment installation; refrigerant charging; controls programming; performance testing.',
      },
    ],
    faqs: [
      {
        q: 'Which AC brands do you install and service?',
        a: 'Daikin, Voltas, Blue Star, Carrier, Hitachi, LG, Samsung and others.',
      },
      {
        q: 'Do you offer AMC for existing cooling systems?',
        a: 'Yes — the service includes maintenance and AMC options.',
      },
      {
        q: 'Do you handle centralized HVAC?',
        a: 'We have experience with centralized HVAC for commercial buildings. Capacity and scope are confirmed for each project.',
      },
    ],
    // The available photograph carries another firm's uniform branding and a
    // manufacturer's unit, so it cannot stand for Beyond Service's own work.
    image: null,
    imageStatus: 'missing',
    imageNeeded: 'unbranded HVAC, chiller or cooling-plant servicing',
    related: ['mep', 'industrial-equipment'],
  },

  {
    num: '06',
    slug: 'fire-safety',
    href: '/services/fire-safety',
    name: 'Fire & Safety Services',
    tagline: 'Complete fire protection and safety compliance for your facility.',
    region: 'PAN India',
    overview:
      'Beyond Service delivers end-to-end fire and safety solutions including fire detection and alarm systems, sprinkler and clean-agent/COI suppression, fire hydrant systems, portable extinguisher supply, safety signage and compliance audits aligned with NBC and local fire NOC requirements.',
    capabilities: [
      'Detection and alarm systems',
      'Sprinkler, clean-agent and COI suppression',
      'Internal and external hydrant systems',
      'Portable extinguishers and safety signage',
      'Fire-risk assessment and compliance audits',
      'Fire NOC documentation support',
    ],
    process: [
      {
        num: '01',
        title: 'Fire Risk Assessment & Design',
        text: 'Site risk assessment; fire-load analysis; system design; compliance planning.',
      },
      {
        num: '02',
        title: 'Installation, Testing & Handover',
        text: 'Equipment installation; system testing; performance verification; final handover.',
      },
    ],
    faqs: [
      {
        q: 'Do you help with fire NOC applications?',
        a: 'Documentation and liaison for fire NOC approval are included.',
      },
      {
        q: 'What fire suppression systems do you install?',
        a: 'Sprinkler, clean-agent and COI-based systems.',
      },
      {
        q: 'Do you offer fire safety training?',
        a: 'Training requirements should be confirmed for the specific facility.',
      },
    ],
    // Published, but the photograph shows an extinguisher discharged against open
    // flames — firefighting, where the service is fire-protection systems.
    image: {
      src: '/services/fire.webp',
      alt: 'Operator discharging a fire extinguisher during a safety drill.',
      focus: '45% 55%',
    },
    imageStatus: 'replace',
    imageNeeded: 'hydrant, sprinkler riser or alarm-panel installation work',
    related: ['elv', 'industrial-equipment'],
  },

  {
    num: '07',
    slug: 'industrial-equipment',
    href: '/services/industrial-equipment',
    name: 'Industrial Equipment Services',
    tagline: 'Reliable equipment installation, maintenance and breakdown support.',
    region: 'PAN India',
    overview:
      'Beyond Service provides installation, preventive maintenance, breakdown repair and AMC services for industrial equipment including DG sets, motors, pumps, compressors, material-handling equipment, hydraulic systems, conveyors and utility equipment. Teams support manufacturing plants, warehouses, logistics hubs and heavy industrial facilities, with breakdown support intended to minimize downtime and production losses.',
    capabilities: [
      'DG sets and power equipment',
      'Motors and drives',
      'Pumps and compressors',
      'Material-handling equipment',
      'Hydraulic and conveyor systems',
      'Breakdown repair, preventive maintenance and AMC',
    ],
    process: [
      {
        num: '01',
        title: 'Equipment Assessment & Planning',
        text: 'Site inspection; equipment assessment; maintenance planning; spare-parts planning.',
      },
      {
        num: '02',
        title: 'Installation, Testing & Handover',
        text: 'Equipment installation; system testing; performance verification; handover.',
      },
    ],
    faqs: [
      {
        q: 'Which equipment do you service?',
        a: 'DG sets, motors, pumps, compressors, material-handling equipment, hydraulic systems, conveyors and other industrial utility equipment.',
      },
      {
        q: 'Do you provide preventive maintenance?',
        a: 'Yes — preventive maintenance and AMC services are explicitly included.',
      },
      {
        q: 'How fast do you respond to industrial breakdowns?',
        a: 'Within our service network we target 4 hours for critical breakdowns and 24 hours for standard breakdowns. Availability is confirmed for your location.',
      },
    ],
    image: {
      src: '/services/industrial.webp',
      alt: 'Engineer servicing a large industrial motor drive inside a plant.',
      focus: '55% 50%',
    },
    imageStatus: 'ok',
    related: ['cooling', 'logistics'],
  },

  {
    num: '08',
    slug: 'logistics',
    href: '/services/logistics',
    name: 'Logistic Services',
    tagline: 'End-to-end logistics management and coordination for corporate and industrial clients.',
    region: 'PAN India',
    overview:
      "Beyond Service's logistics offering covers coordination for corporate and industrial requirements, including office relocation, equipment transportation, warehousing and material handling. The service content also describes logistics coordination for large facility projects and pan-India coverage.",
    capabilities: [
      'Office relocation coordination',
      'Equipment and machinery transportation',
      'Warehousing support and temporary storage',
      'Loading, unloading and material handling',
      'Vendor coordination and move planning',
      'Logistics support for ongoing projects',
    ],
    process: [
      {
        num: '01',
        title: 'Survey & Move Planning',
        text: 'Site survey; move-plan creation; vendor coordination; risk assessment.',
      },
      {
        num: '02',
        title: 'Execution & Coordination',
        text: 'Coordinate transportation and handling; track progress; resolve issues; complete handover.',
      },
    ],
    faqs: [
      {
        q: 'Do you handle office relocation projects?',
        a: 'Yes — complete office relocation, including packing and transportation.',
      },
      {
        q: 'Can you move heavy industrial equipment?',
        a: 'Equipment transportation is included in the service capabilities.',
      },
      {
        q: 'Do you provide logistics support for ongoing projects?',
        a: 'Dedicated logistics coordination is available for large facility projects.',
      },
    ],
    image: {
      src: '/services/logistic.webp',
      alt: 'Loading bay with trucks, pallets and workers checking consignments.',
      focus: '50% 45%',
    },
    imageStatus: 'ok',
    related: ['industrial-equipment', 'project-management'],
  },

  {
    num: '09',
    slug: 'project-management',
    href: '/services/project-management',
    name: 'Project Management',
    tagline: 'Expert project oversight from planning to successful completion.',
    region: 'PAN India',
    overview:
      "Beyond Service's project management division acts as a trusted Project Management Consultant (PMC), overseeing planning, vendor management, quality control, cost management, timeline adherence and stakeholder reporting for facility projects. The team brings experience across civil, MEP, interior and industrial projects, with structured reporting through each stage.",
    capabilities: [
      'End-to-end project oversight',
      'Vendor and contractor management',
      'Quality and cost control',
      'Timeline and schedule management',
      'BOQ management, variation control and billing',
      'Stakeholder reporting and coordination',
    ],
    process: [
      {
        num: '01',
        title: 'Planning & Mobilization',
        text: 'Define scope; prepare schedule and budget; coordinate vendors and stakeholders.',
      },
      {
        num: '02',
        title: 'Execution Monitoring & Handover',
        text: 'Track progress and quality; manage issues; report status; coordinate completion and handover.',
      },
    ],
    faqs: [
      {
        q: 'What size projects do you manage?',
        a: 'Project scope and scale are confirmed during the initial discussion.',
      },
      {
        q: 'Do you act as PMC for projects we run internally?',
        a: 'The service is positioned as PMC support. The engagement model is confirmed for your project.',
      },
      {
        q: 'How do you handle multi-vendor coordination?',
        a: 'Vendor management and coordination are explicitly included in the service offering.',
      },
    ],
    image: {
      src: '/services/pm.webp',
      alt: 'Site drawings, hard hat and tablet on a desk overlooking a development.',
      focus: '50% 50%',
    },
    imageStatus: 'ok',
    related: ['civil-project-rm', 'logistics'],
  },
]

/** Look up one service by its route slug. */
export const getService = (slug) => SERVICE_DETAILS.find((s) => s.slug === slug)

/** Resolve a list of related slugs into full service records. */
export const getRelated = (service) =>
  (service.related || []).map(getService).filter(Boolean)
