# 16 — Contact page and footer

## /contact — page meta

- **`<title>`**: Contact Beyond Service — Request a Quote, Find Our Office
- **Meta description**: Get in touch with Beyond Service for facility, civil, MEP, ELV, fire, cooling and project management services across India. Request a quote or visit our Surat office.

## Contact page section order

1. Hero banner (compact)
2. Three-up contact card row (Call, Email, Visit)
3. Request a quotation form
4. Office map
5. Business hours and response commitments
6. Footer

---

## 1. Hero banner

**Breadcrumb:** Home / Contact

**Eyebrow:** CONTACT · 24/7 PHONE AVAILABLE

**Headline (`page-h1`):**
Let's discuss your facility.

**Lead:**
From a single-site fix to a PAN India maintenance programme — tell us the scope and we'll come back within one business day.

---

## 2. Three-up contact row

Three cards, equal weight.

### Call

**Primary:** +91 79847 87910 (business hours)
**24/7 line:** +91 97260 07759

### Email

connect@beyondservice.co.in

For vendor queries: connect@beyondservice.co.in (or vendors@beyondservice.co.in if confirmed).

### Visit

Beyond Service
6th Floor, 619, Vesu Main Road
Near S D Jain School, Vesu
Surat, Gujarat 395007, India

---

## 3. Request a quotation form

Mirror of the homepage quote form (see `03-homepage.md` §11) but with the full field set — no abbreviated version here. Anchor `#quote` so service CTAs can deep-link.

Add a short note above the form:

> **Prefer to talk?** Call us at +91 79847 87910 during business hours or +91 97260 07759 for after-hours queries.

Below the form, add a privacy micro-copy line (`body-sm`, `text-muted`):

> Beyond Service uses this information to respond to your request. We don't share it with third parties. See our privacy policy for the full statement.

---

## 4. Office map

Embedded map pinned to the Vesu, Surat office. Static image fallback when scripts are blocked or fail.

- Map provider: pick between Google Maps embed (familiar) or OpenStreetMap (lighter). Google is simpler for most visitors.
- Static fallback: a pre-rendered PNG of the map area with the pin, served from the asset store.
- `aria-label`: "Map showing Beyond Service office at 6th Floor, 619, Vesu Main Road, Vesu, Surat, Gujarat 395007".

Below the map, a one-line direction prompt:

> **Nearest landmark:** S D Jain Modern School, Vesu. Metered taxis and app rides reach the office directly.

---

## 5. Business hours and response commitments

Two-column block.

### Business hours

| Day | Hours |
|---|---|
| Monday – Saturday | 09:00 – 18:00 IST |
| Sunday | Closed |

### Response commitments

- **Quote requests via the form** — initial response within 1 business day.
- **After-hours and emergency calls** — +91 97260 07759 is the 24/7 line.
- **Vendor applications** — initial acknowledgment within 1 business day; screening within 7 business days.

**VERIFY** the 24/7 label against the posted business hours before publishing — the content library flags this as an open resolution item.

---

# Footer specification

Shared across every page.

## Structure

Four columns on desktop (≥1024px), stacked on mobile. Dark surface (`surface-inverse` = ink-900 charcoal) with cream text.

### Column 1 — Brand

- **Logo** (Beyond Service wordmark). Use the real asset when supplied.
- **Short statement:**
  Surat-based project management and repair & maintenance company delivering reliable services to corporate clients across PAN India.
- Social icons (only if accounts exist and are maintained). VERIFY which platforms Beyond Service maintains an active presence on.

### Column 2 — Services

A compressed list of all nine, linking to each detail page. Use the full names:

1. Civil Project & R&M Work
2. MEP Services
3. ELV Services
4. Civil Interior Services
5. Cooling System Services
6. Fire & Safety Services
7. Industrial Equipment Services
8. Logistic Services
9. Project Management

### Column 3 — Company

- About Us → `/about`
- Vendor Registration → `/vendor-registration`
- Team → `/team` (hide until roster confirmed)
- Contact → `/contact`
- Privacy policy → `/privacy`
- Terms of use → `/terms`

### Column 4 — Reach us

**Call:**
+91 79847 87910 (Mon–Sat)
+91 97260 07759 (24/7)

**Email:**
connect@beyondservice.co.in

**Visit:**
6th Floor, 619, Vesu Main Road, near S D Jain School, Vesu, Surat, Gujarat 395007

**Hours:**
Monday – Saturday, 09:00 – 18:00
Sunday closed

---

## Footer bottom bar

A thin bottom bar below the four columns.

Left: `© 2026 Beyond Service. All rights reserved.`
Right: `Surat, India`

Keep the bottom bar minimal — no additional nav, no newsletter signup, no payment-method icons. The dark footer with one accent champagne divider between the columns and the bottom bar is enough.

---

## Newsletter signup (optional, deprioritised)

The content library suggests a newsletter signup. Hold on this until Beyond Service confirms they have the editorial capacity to send a newsletter. A dead subscribe form that no one receives is worse than no form at all.

If kept:

- Place on the About page footer area, not globally.
- Field: `Enter your email address`.
- Submit: `Subscribe`.
- Microcopy: `One update a quarter. Unsubscribe anytime.`
- Wire to a real email provider (e.g., Mailchimp, Sendgrid). Confirm the recipient and double-opt-in flow.

---

## Footer accessibility

- Minimum 4.5:1 text contrast on dark surface (champagne 300 on ink-900 passes AA for body text and large text).
- Link underlines on hover, not permanent (keeps the footer calm). Underline on `focus-visible` for keyboard users.
- Address is marked up with `<address>`; phone and email use `tel:` and `mailto:` schemes.
