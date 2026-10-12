# 19 — Team

The team page is **not ready to publish**. Two unresolved issues block it. This file states what we have, what we need, and the exact copy that can go live once resolved.

---

## Current state (do not publish)

### Conflict 1 — two different rosters

The source content document carries two conflicting rosters:

**Roster A** — supplied directly to this project. Appears to be an operational roster (names + staff IDs):

- Jaiswal Mukesh (J2601)
- Sneha Rathore (S2602)
- Prince Maurya (P2603)
- Khushi Pandey (K2604)
- Devid (D2605)
- Suhani (S2606)
- Jaydeep (J2607)
- Vanshika Kapadia (V2608)
- Kruti (K2609)

**Roster B** — appeared in an earlier draft:

- Archer Graham
- Amelia Clover
- Beckett Hayden
- Julian Wyat
- Sophia Mercer

Roster B does not match the operational roster above and reads like placeholder content from a theme. We flag Roster B as suspected template content and recommend removing it from any source document.

**Action required.** Beyond Service to confirm which names should appear on the public site. In our experience, public team pages for B2B service companies usually show 3–6 named leaders rather than the full operational roster — but the client decides.

### Conflict 2 — titles, bios and photographs

For any name that will be published, we need:

- Approved job title.
- A one-line responsibility statement (not a bio).
- A professional headshot in the same lighting and framing style across the whole team (consistency is more credible than bio length).
- Written confirmation that the person consents to being published by name on the site.

Do not invent titles or bios. Do not re-use stock photos.

---

## When the above is resolved, publish this

### Page meta

- **`<title>`**: Team — Beyond Service
- **Meta description**: Meet the Beyond Service leadership — the team behind projects for 100+ corporate clients across 14+ Indian states.

### Section order

1. Hero banner (compact)
2. Leadership grid
3. Culture statement (optional)
4. Vendor and careers CTA
5. Footer

### 1. Hero banner

**Breadcrumb:** Home / Team

**Eyebrow:** TEAM · SURAT, INDIA

**Headline (`page-h1`):**
The people behind every engagement.

**Lead:**
Our team brings professionalism, technical experience and quality consciousness to every service engagement — from vendor selection through project execution to final handover.

### 2. Leadership grid

A 3-up or 4-up card grid. Each card:

- Portrait (3:4 aspect) in consistent lighting.
- Name (`section-h3`).
- Role (`body-sm`, `text-muted`).
- One-line responsibility (`body-sm`, `text-secondary`).
- Optional link to LinkedIn — only if the person wants it linked.

**No long bios.** Keep each entry under 40 words beyond the name.

### 3. Culture statement (optional)

One short section. Keep it operational, not corporate-poetic.

**Heading:** How we work.

**Body:**
We hire for ownership, judgement and reliability. Our team is accountable for the engagement, not just the task — because our clients' facilities are too important for anything less.

### 4. Vendor and careers CTA

A single dark CTA strip at the end.

**Heading:** Want to work with Beyond Service?

**Body:** Join our team or our vendor network.

**Primary CTA:** Register as a Vendor → `/vendor-registration`
**Secondary CTA:** Careers → `mailto:careers@beyondservice.co.in` (VERIFY the careers inbox before linking; if there isn't a dedicated inbox, use `connect@beyondservice.co.in` with the subject suggestion "Careers at Beyond Service").

---

## Nav behaviour until published

- The `/team` route exists but is unlinked from the primary nav and footer.
- If a visitor types the URL directly, show a short page saying "Team information coming soon" with the vendor and careers CTA. Do not stand up placeholder cards.

---

## Founder signature imagery

The source material references a founder-signature image. If Beyond Service wants this on the About or Team page, we need:

- The actual signature image (SVG preferred for crisp rendering).
- Approval to publish the signature.
- A short attribution line (name and title) to accompany it.

If any of the above is missing, omit the signature. A plain mission statement reads more credible than an unsigned signature image.
