# 20 — Implementation and verification

How to use this system to build the website, plus the verification register of everything still open.

---

## Part 1 — Implementation handoff

### Scope of this system

This design system holds:

- Design tokens (colour, type, spacing, radius, shadow, opacity, blur, z-index) as the final values for the redesign.
- Complete copy for every public page, section by section.
- Component inventory with anatomy, props and token bindings.
- Motion vocabulary and the 3D scene brief.
- The verification register of what is still open.

It does **not** hold:

- The actual React / Next.js source code.
- CMS schema, if content ultimately moves out of the repo.
- A hosted staging URL.
- Playwright tests.
- Any secrets, API keys or deployment configuration.

Those live in the project repository and must be built by an engineering session with repo access.

### Recommended stack

- **Framework:** React with Vite or Next.js. If the existing Beyond Service repository uses one of these, continue with it. Do not migrate between frameworks for aesthetic reasons.
- **Styling:** Tailwind CSS with the Beyond Service tokens exposed as CSS custom properties. Each token in `tokens.json` becomes a `--<token-name>` CSS variable and (for colour, spacing, type) a Tailwind theme extension.
- **Animation:** Framer Motion for in-view reveals and modal transitions. Keep bundle size in check — do not pull every helper.
- **3D:** `three` + `@react-three/fiber` + `@react-three/drei`, pinned to the exact versions in `18-motion-and-3d-direction.md`.
- **Form backend:** server action, API route or a form service (Formspree, Resend, Postmark). Confirm Beyond Service's preference. The quote and vendor forms must write to a real inbox or CRM, with inbound confirmation to the submitter.
- **Analytics:** respect visitor consent. Simple Analytics or Plausible is sufficient for a corporate site; avoid Google Analytics unless Beyond Service already uses it elsewhere.
- **Hosting:** anywhere that supports SSR/SSG. The site is content-dominant and SEO-sensitive, so prefer static generation per route with ISR for the quote form and dynamic routes.

### Token-to-CSS pipeline

The Design System artifact generates a `tokens.css` automatically from `tokens.json` once published. The engineering repository has two options:

1. **Fetch at build time.** Pull `tokens.css` from the artifact as a build step, write it into the repo, commit, build. This keeps the artifact authoritative.
2. **Mirror by hand.** Copy tokens into a `src/styles/tokens.css` file in the repo. Simpler, but duplicates the source of truth — only use this if the Beyond Service team wants to edit tokens in-repo rather than in the design system.

Option 1 is preferable.

### Component build order

Build components in this order so dependencies resolve naturally:

1. Base — Button, IconButton, Input, Checkbox, Chip, Divider.
2. Navigation — Breadcrumb, Header, MobileMenu.
3. Content — SectionHeader, StatBand, ServiceCard, TestimonialCard, FAQAccordion.
4. Forms — QuoteForm, VendorForm.
5. Compositions — Hero, DarkCtaStrip, DownloadsPanel.
6. Page assemblies — Homepage, About, Services index, nine service pages, Vendor, Contact.
7. 3D — HeroScene (last; do not block page builds on 3D).

### Routing and SEO

See `02-information-architecture.md` for the full route list, 301 redirect map, and per-page SEO.

### Accessibility baseline

- Target WCAG 2.2 AA across the site.
- Keyboard navigation must reach every interactive element in a logical order.
- Every image needs meaningful alt text; decorative images get empty alt (`alt=""`).
- Form fields have programmatic labels, not just placeholders.
- Colour contrast confirmed in both themes using the audit checklist in `01-brand-foundations.md`.
- `prefers-reduced-motion` honoured globally; see `18-motion-and-3d-direction.md`.

### Performance budget

- First Contentful Paint ≤ 1.8s on mid-range mobile over 4G.
- Largest Contentful Paint ≤ 2.5s.
- Cumulative Layout Shift ≤ 0.05.
- Total JavaScript ≤ 180KB gzipped for the homepage.
- 3D bundle lazy-loaded, cannot regress FCP by more than 150ms.

### Playwright test matrix

Run these on every PR and in production smoke tests:

- Homepage renders without console errors.
- Every nav link routes to a `200` page.
- Service dropdown opens on hover, focus and click. Closes on Escape.
- Mobile menu opens, is keyboard-navigable, closes on backdrop click.
- Quote form validates and submits (hit a test endpoint).
- Vendor form validates, uploads a file, submits (test endpoint).
- Each of the 9 service pages loads with correct `<title>` and canonical.
- Each 301 redirect from the old `/service-details/*` URL returns 301 and lands correctly.
- The 3D canvas does not block interaction with the hero CTAs.
- `prefers-reduced-motion: reduce` disables scroll-reveal and 3D animation.
- All image alts are present and non-empty where appropriate.

### Launch checklist

- [ ] All verification items in Part 2 resolved or explicitly deferred.
- [ ] Real logo asset uploaded to `assets/Logos/`.
- [ ] Real client logos uploaded with written permission on file.
- [ ] Real brochure PDFs uploaded with correct URLs on service pages.
- [ ] Quote form delivers to the correct inbox and is tested end-to-end.
- [ ] Vendor form delivers to the correct inbox, including attachments.
- [ ] 24/7 phone number verified against the posted business hours.
- [ ] All testimonials have written permission.
- [ ] Current team roster confirmed (or team page remains unlinked).
- [ ] Metrics (14+/100+/500+/9+) confirmed as still accurate at launch.
- [ ] Fire NOC claim ("100+ corporate clients achieved fire NOC compliance") verified.
- [ ] Google My Business and other listings reviewed for consistency with the launched contact details.
- [ ] 404 page designed, built and tested.
- [ ] Sitemap and robots.txt generated with correct URLs.
- [ ] Analytics consent flow confirmed with legal counsel.

---

## Part 2 — Verification register

Every claim or asset that must be confirmed with Beyond Service before launch.

### Metrics and claims

| # | Claim | Source | Status |
|---|---|---|---|
| 1 | 14+ states covered | Homepage, About, Impact band | VERIFY current |
| 2 | 100+ corporate clients | Homepage, About, every service page | VERIFY current |
| 3 | 500+ service providers | Homepage, About, service pages | VERIFY current |
| 4 | 9+ service verticals | Homepage, About | OK — nine named verticals supplied |
| 5 | "Plan 2025 — 100 Corporates · 100 Cities" badge | Homepage business approach | OUTDATED — replace with current year's target or remove |
| 6 | 24-hour mobilisation claim ("500+ vetted service providers ready to mobilize within 24 hours") | Original hero slide 2 | VERIFY whether true across all 14 states or only in Tier 1 cities |
| 7 | "Our team will get back to you within 24 hours" (quote form) | Homepage form | VERIFY SLA |
| 8 | "100+ corporate clients achieve fire NOC compliance" | Fire & Safety page | VERIFY exact number and scope |
| 9 | Testimonials from Tata, Infosys, Adani executives | Homepage testimonials | VERIFY authorisation from each individual and company |
| 10 | Specific brands named as certified partners (Hikvision, Daikin, Cummins etc.) | Service pages | VERIFY the formal partnership or certified-installer status for each named brand |

### Content gaps

| # | Gap | Where |
|---|---|---|
| G1 | FAQ answers not visible in source material | Civil R&M (Q2, Q3), MEP (Q2, Q3), ELV (Q2, Q3), Civil Interior (Q2, Q3), Cooling (Q2, Q3), Fire & Safety (Q2, Q3), Industrial Equipment (Q2, Q3), Logistics (Q2, Q3), Project Management (Q2, Q3). Our drafts are flagged VERIFY. |
| G2 | Project card details for the Delhi NCR project | Homepage projects section |
| G3 | Complete and permissioned client logo list | Homepage trusted clients strip |
| G4 | Downloadable brochure URLs | Service pages, downloads panel |
| G5 | Approved team roster, titles, bios, photos | Team page |
| G6 | Confirmed social accounts for the footer | Footer |

### Operational

| # | Item | Note |
|---|---|---|
| O1 | 24/7 phone label vs. posted Mon–Sat hours | Reconcile; decide what the site should say |
| O2 | Dedicated vendor inbox vs. shared `connect@beyondservice.co.in` | Confirm. Create `vendors@` if volume justifies it |
| O3 | Dedicated careers inbox | Confirm. Add if a careers programme exists |
| O4 | Naming consistency: "Cooling System Services" vs "Cooling System / HVAC Services" | Pick one and use it everywhere |
| O5 | Beyond Service's approved form backend / CRM | Confirm which system quote and vendor forms should write to |
| O6 | Hosting target | Confirm with Beyond Service IT |

### Visual

| # | Item | Note |
|---|---|---|
| V1 | Real Beyond Service logo in SVG | Needed for `assets/Logos/`. Current colour and alternative dark/light versions |
| V2 | Approved brand font files or Google Fonts selection | Confirmed to use Plus Jakarta Sans + Inter from Google Fonts — Beyond Service to approve |
| V3 | Real facility photographs | For the hero and service pages. If not available, approve the use of licensed architectural photography and provide credits |
| V4 | 3D model file | We propose a minimal architectural model; Beyond Service to approve the concept and sign off on the model asset |
| V5 | Approved OG image for social sharing | Needed per page type |

---

## Part 3 — Parts of the master prompt we chose not to do

Honest list of where the design system diverges from the master build prompt, with the reason.

1. **No full React/Vite build in this artifact.** The design system is a specification. The React implementation requires repo access — see Part 1 for the handoff.
2. **One 3D moment rather than several.** B2B facility clients audit for substance over spectacle. See `18-motion-and-3d-direction.md` §Part 3 for the reasoning and the escalation path if stakeholders want more.
3. **Charcoal + champagne, not navy + amber.** The master prompt deferred to a palette-you-will-supply; the supplied content document specifies the charcoal + champagne redesign. The current site's navy + amber (documented in the audit PDF) is treated as the brand's legacy, not the new direction.
4. **Team page shipped as "coming soon".** The roster has two conflicting lists in the source. We will not publish names and titles until Beyond Service confirms them in writing.
5. **"& many more services" line dropped from the homepage services section.** The nine verticals are exhaustive for this organisation; the "& many more" phrasing is a template remnant that weakens the shortlist.
6. **Newsletter deferred.** A dead signup form that nobody receives is worse than none; add only if Beyond Service confirms the editorial capacity to send one.
7. **No invented testimonials, awards, certifications, project photos or team titles.** Everything flagged VERIFY stays flagged until the Beyond Service team confirms.

---

## Part 4 — Final report (per the master prompt §21)

As requested in the master prompt, a concise and truthful statement of what was done.

1. **What was audited.** The current Beyond Service website content (via the supplied `Beyond_Service_Full_Website_Content_and_FAQs.docx`), the supplied UI/UX audit PDF (which documents the current navy + amber brand), the master build prompt itself and the empty Design System artifact.
2. **Skills and tools used.** Available in this session: Claude Code tools for reading the docx and PDF; the Artifact tool for publishing to the Design System artifact; standard web search was not needed because the supplied materials covered scope and copy. Not available in this session: `Context7`, `Playwright`, `TypeScript LSP`, `UI UX Pro Max`, `Taste Skill`, and `Frontend Design` (the latter is available as an Anthropic skill but was not materially used because the design decisions were content-driven, not generative). We did not pretend to run any tool we did not actually use.
3. **Design-system decisions implemented.** Charcoal + champagne palette with light-primary / dark-alternate themes; Plus Jakarta Sans + Inter typography (Google Fonts); comprehensive spacing, radius, shadow, opacity, blur, z-index token sets; semantic colour tokens derived from the palette primitives.
4. **Pages and components completed.** Content library for every page in `/`, `/about`, `/services`, nine `/services/<slug>` pages, `/vendor-registration`, `/team` (with publish-blocker notes), `/contact`. Component inventory with anatomy and token bindings. Motion and 3D direction defined.
5. **3D and motion.** Single hero 3D moment with explicit performance budget and fallback; motion vocabulary with durations and easings; reduced-motion rules.
6. **Original assets and content preserved.** All verified claims and copy from the source document were preserved; the source PDF (`Beyond_Service_UIUX_Audit_and_Website_Prompt.pdf`) is retained as a reference asset in the artifact; everything requiring verification is flagged, nothing was fabricated.
7. **Interactions and backend integrations.** Specified, not built. Form backend, analytics and hosting are engineering decisions and must be wired by a session with repo access.
8. **Build and browser tests.** None executed. Playwright not run; no live site exists in this session's environment to test against. Playwright test matrix specified in Part 1.
9. **Missing assets or remaining blockers.** See Part 2 (Verification register).
10. **How to run the project locally.** Not applicable — there is no local React project in this environment. The engineering handoff is to a session or team that has access to the Beyond Service repository.
