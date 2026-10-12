# 03 — Homepage

Full homepage copy and section order. All strings here are final unless a VERIFY note sits beside them.

## Section order

1. Hero
2. Impact band
3. About preview
4. Services overview
5. Business approach
6. Commitment to quality
7. Projects (selected)
8. Trusted clients (logo strip)
9. Testimonials
10. Video story
11. Request a quote
12. Contact and map
13. Footer

The nine services are shown as the primary content block. Everything else supports a visitor's decision to request a quotation.

---

## 1. Hero

**Eyebrow (`text-accent`, `eyebrow`):** INTEGRATED FACILITY MANAGEMENT · PAN INDIA

**Headline (`hero`):**
Facility and project execution,
delivered across India.

**Lead (`lead`, `text-secondary`):**
Beyond Service delivers civil, MEP, ELV, fire safety and cooling services to 100+ corporate clients across 14+ states. One account manager, 500+ vetted providers, nine engineering verticals.

**CTAs:**
- Primary: **Get a Quote** → `/contact#quote`
- Secondary: **Explore Our Services** → `/services`

**Hero media:** architectural or facility photograph with the 3D accent anchored to the right third of the composition. See `18-motion-and-3d-direction.md` for the 3D concept and layering spec.

**Behaviour:** copy is readable before the hero media or 3D canvas loads. Static text; no autoplay audio; no rotating carousel for launch. The three source slides collapse into one hero with a single statement — carousels dilute first impressions.

---

## 2. Impact band

A thin dark band directly under the hero, four stat tiles across. Dark surface so it reads as the floor of the hero rather than a separate section.

**Eyebrow:** OUR FOOTPRINT

| Value | Label |
|---|---|
| 14+ | States Covered |
| 100+ | Corporate Clients |
| 500+ | Service Providers |
| 9+ | Service Verticals |

VERIFY the exact numbers quarterly with Beyond Service's commercial team. Keep the `+` attached to the digits. Do not animate count-up on initial render — animate only when the band scrolls into view, and respect reduced motion.

---

## 3. About preview

**Eyebrow:** ABOUT · EST. 2019 · BEYOND SERVICE

**Section heading (`section-h1`):**
Reliable services, delivered with precision.

**Lead (`body-lg`):**
Beyond Service is a Surat-based company providing Project Management and Repair & Maintenance services to industrial and corporate clients across India. We partner with hundreds of vetted service providers to deliver reliable, professional, and timely solutions at every touchpoint.

**Three sub-points, as a short list:**

- **Professional, trained team.** Vendor professionals are inducted on quality, safety and client-facing conduct.
- **PAN India network.** 500+ providers across 14+ states, mobilised through a central account manager.
- **Timely, reliable delivery.** Milestones, weekly reporting, structured handover.

**CTA (link style, inline):** Read our full story → `/about`

---

## 4. Services overview

**Eyebrow:** OUR CAPABILITIES

**Heading (`section-h1`):**
Nine verticals. One account manager.

**Lead:**
From civil works to advanced ELV systems, Beyond Service partners with hundreds of providers to deliver reliable, professional solutions to corporate and industrial clients nationwide.

**Grid.** Nine service cards in a 3×3 grid on desktop, 2-up on tablet, 1-up on mobile. Each card uses the standard ServiceCard component (see `17-components-and-patterns.md`). Short labels used in cards:

| # | Card title | Card descriptor |
|---|---|---|
| 01 | Civil Project & R&M Work | Flooring, plumbing, painting, plastering, waterproofing, insulation, RCC/PCC and complete building structure services. |
| 02 | MEP Services | Comprehensive Mechanical, Electrical & Plumbing services tailored for industrial and corporate facilities. |
| 03 | ELV Services | EPABX, CCTV, networking, access control, BMS, LMS and fire alarm system installations and maintenance. |
| 04 | Civil Interior Services | Complete facility renovation including plumbing, electrical, glass and glazing, ceiling and fabrication works. |
| 05 | Cooling System Services | Installation, maintenance and repair of industrial and commercial cooling and HVAC systems. |
| 06 | Fire & Safety Services | Fire suppression, detection systems, safety audits and compliance services for corporate clients. |
| 07 | Industrial Equipment Services | Professional maintenance, repair and upkeep of industrial equipment ensuring zero downtime. |
| 08 | Logistic Services | End-to-end logistics management and coordination services for corporate and industrial clients. |
| 09 | Project Management | Reliable project planning, execution and oversight connecting clients with hundreds of trusted service providers. |

**Section footer link:** View all services → `/services`

The original site uses a card plus "& Many More Services Available Across PAN India" closing line. We drop that line — the nine verticals are exhaustive for this organisation and the "& many more" phrasing weakens the shortlist. Keep it only if confirmed by Beyond Service.

---

## 5. Business approach

A single-column prose section with a two-column stat follow-on. Lives on a cream canvas with a narrow champagne eyebrow bar on the left.

**Eyebrow:** HOW WE WORK

**Heading (`section-h1`):**
Connecting clients with the right service experts.

**Body (`body-lg`):**
We know how to manage services at national scale. Beyond Service partners with hundreds of professional providers to deliver timely, reliable solutions for industrial and corporate clients across India — from Surat to every major Tier 1 and Tier 2 city.

**Stat row (3-up):**

- 14+ States Covered
- 100+ Corporate Clients
- 9+ Service Verticals

**CTAs:**
- Primary: **Contact Us** → `/contact`
- Secondary: **Watch Overview** (video modal — see `18-motion-and-3d-direction.md`)

**"Plan 2025" badge.** The source copy mentions a "Plan 2025 — 100 Corporates · 100 Cities" badge. This dates from a prior year. Replace with a current year badge once Beyond Service confirms (e.g., "Plan 2027 — 150 Corporates · 50 Cities"). Until confirmed, omit the badge entirely rather than ship a stale one.

---

## 6. Commitment to quality

Short, honest, no boast. Pulls the original "proposed" quality copy from the content library and tightens it.

**Eyebrow:** QUALITY

**Heading (`section-h1`):**
Our commitment to quality.

**Body:**
We focus on professional execution, timely coordination and consistent quality checks throughout each engagement. From vendor selection to final inspection, our process is designed to support dependable delivery and clear communication.

**Four pillars (small cards or inline list):**

- **Vetted vendors only.** Every provider in our network is pre-qualified for competence, documentation and conduct.
- **Dedicated account manager.** One point of contact for the duration of the engagement.
- **Structured reporting.** Weekly dashboards, milestone updates, closeout documentation.
- **Independent quality checks.** Site audits at defined stages, not just at handover.

---

## 7. Projects (selected)

Shown only when Beyond Service supplies project cards with permission to publish. Until then, hide this section — do not stand up placeholders.

**Eyebrow:** SELECTED PROJECTS

**Heading:**
Work across India.

**Lead:**
From civil works to advanced MEP and ELV systems for top corporate clients.

**Card inventory (confirm before publishing):**

- Maharashtra — Civil Project Management / Civil R&M — Corporate Campus. VERIFY client name and permission.
- Gujarat — Electrical & Low Voltage / MEP & ELV Installation. VERIFY client name and permission.
- Delhi NCR — card referenced in source material; full details require live-page verification.

Project cards require: location, discipline, one-line brief, scope-list, and a hero image with Beyond Service's permission to publish. Do not use stock photographs for project cards.

---

## 8. Trusted clients

Logo strip. Three rules:

1. Display only logos we have written permission to use.
2. Grayscale by default; hover opens to full colour.
3. If there are fewer than six confirmed logos, drop this section rather than pad.

VERIFY the full client list with Beyond Service before building this section.

---

## 9. Testimonials

**Eyebrow:** WHAT OUR CLIENTS SAY

Three testimonial cards in a 3-up grid on desktop, 1-up on mobile.

The source content document carries three testimonials that need written permission:

- **Rajesh Mehta, Facilities Manager, Tata Group (Maharashtra).**
  "Beyond Service has been our go-to partner for all facility maintenance needs. Their team is professional, punctual, and always delivers quality work. We've expanded our engagement with them across multiple locations."

- **Priya Sharma, Operations Head, Infosys (Karnataka).**
  "What sets Beyond Service apart is their reliability. From civil repairs to ELV systems, they have the right experts for every job. Our corporate campus has never been better maintained."

- **Anil Kapoor, Project Director, Adani Group (Gujarat).**
  "We engaged Beyond Service for our MEP and fire safety compliance projects. The execution was seamless, on time and within budget. Highly recommend them for any industrial or corporate requirement."

**VERIFY** every testimonial: that the quoted person said it, that their company has signed off on being named, that the exact wording is approved. Do not ship any of them until these three facts are in writing. If verification fails, replace with case-study metrics (e.g., "17 sites across 5 states — civil + MEP AMC") that need no personal attribution.

---

## 10. Video story

**Eyebrow:** INSIDE BEYOND SERVICE

**Heading:**
A quick look at how we deliver.

**Body:**
Watch a two-minute walkthrough of our team, our provider network and a recent project.

**Behaviour:** a compact play card that opens a modal with the embedded YouTube video. No autoplay, no audio by default.

**Source video:** https://youtu.be/vZE0j_WCRvI
**Embed URL:** https://www.youtube.com/embed/vZE0j_WCRvI
**VERIFY** that this is the current approved video from Beyond Service; if not, swap for the current one.

---

## 11. Request a quote

**Eyebrow:** REQUEST QUOTATION

**Heading (`section-h1`):**
Tell us about your facility.

**Lead:**
Share your scope, location and timing. Our team will come back with a tailored proposal within one business day.

**Form fields.** Use the proposed set from the content library — more complete than the current form.

| Field | Required | Type |
|---|---|---|
| Full name | Yes | text |
| Company name | No | text |
| Business email | Yes | email with validation |
| Phone number | Yes | tel with +91 default prefix |
| Service required | Yes | select, one of the nine services, with "Multiple / unsure" |
| Project location | Yes | text with city autosuggest |
| Project details | Yes | textarea, 2000 char max |

**Submit label:** `Request Quotation` (not "Submit").

**Submission.** Wire to the real backend. Do not display success unless the request is accepted. On success, show an inline card with a "We've received your request. A member of our team will respond within one business day. Reference: BS-XXXXXX." On failure, show the error with a retry CTA and the direct phone number as fallback.

See `17-components-and-patterns.md` for the QuoteForm component anatomy.

---

## 12. Contact and map

Three columns on desktop, stacked on mobile:

1. **Call** — primary and 24/7 numbers.
2. **Email** — connect@beyondservice.co.in.
3. **Visit** — Surat office address, hours.

Below: an embedded map pinned to the Vesu office. Static image fallback when scripts fail. See `16-contact-and-footer.md` for the exact copy.

---

## 13. Footer

See `16-contact-and-footer.md` for the full four-column footer specification.

---

## Homepage SEO

- **`<title>`**: Beyond Service — Integrated Facility Management & Project Execution Across India
- **Meta description**: Beyond Service delivers civil, MEP, ELV, fire safety and cooling services to 100+ corporate clients across 14+ states in India. Request a quotation today.
- **OpenGraph image**: 1200×630. Beyond Service wordmark on a charcoal field with a champagne accent corner. No stock photography.
- **Structured data**: `Organization` on this page, `WebSite` with search action if site search exists (not required for launch).
