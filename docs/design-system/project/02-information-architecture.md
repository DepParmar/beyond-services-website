# 02 — Information architecture

Site map, URL structure, nav behaviour and breadcrumb rules.

## Site map

```
/                                 Homepage
/about                            About Us
/services                         Services index (9 cards)
/services/civil-rm                Civil Project & R&M Work
/services/mep                     MEP Services
/services/elv                     ELV Services
/services/civil-interior          Civil Interior Services
/services/cooling-systems         Cooling System Services
/services/fire-safety             Fire & Safety Services
/services/industrial-equipment    Industrial Equipment Services
/services/logistics               Logistic Services
/services/project-management      Project Management
/team                             Team (publish only after roster is confirmed; see 19-team.md)
/vendor-registration              Vendor Registration
/contact                          Contact and quote request
/privacy                          Privacy policy
/terms                            Terms of use
```

## URL rules

- Keep `/services/*` as the canonical pattern. The existing site uses `/service-details/<slug>`. For launch, serve the new paths and 301 the old ones:
  - `/service-details/civil-rm` → `/services/civil-rm`
  - `/service-details/mep` → `/services/mep`
  - `/service-details/elv` → `/services/elv`
  - `/service-details/civil-interior` → `/services/civil-interior`
  - `/service-details/cooling-systems` → `/services/cooling-systems`
  - `/service-details/fire-safety` → `/services/fire-safety`
  - `/service-details/industrial-equipment` → `/services/industrial-equipment`
  - `/service-details/logistics` → `/services/logistics`
  - `/service-details/project-management` → `/services/project-management`
- Keep the existing `/vendor-registration`, `/about` and `/contact` as-is.
- Use lowercase, hyphenated slugs. No trailing slash.

## Primary navigation

Left: logo. Centre: nav. Right: a single `Get a Quote` button and (on mobile) the menu toggle.

Nav items (in order):

1. Home
2. About
3. Services (dropdown — see below)
4. Vendor Registration
5. Contact

The nav item **Team** is intentionally omitted until the roster is confirmed. Add it between Vendor Registration and Contact once ready.

## Services dropdown

The services dropdown is a mega-menu, two columns on desktop, a single accordion group on mobile. It lists all nine services with their short descriptors.

| # | Nav label | Dropdown descriptor |
|---|---|---|
| 01 | Civil Project & R&M | Flooring, plumbing, painting, waterproofing, structural repairs. |
| 02 | MEP Services | Mechanical, Electrical, Plumbing for corporate and industrial facilities. |
| 03 | ELV Services | CCTV, access control, structured cabling, BMS and fire alarms. |
| 04 | Civil Interior | Fit-outs, ceilings, partitions, premium flooring and finishing. |
| 05 | Cooling System | HVAC install, AMC, VRF, precision cooling, chillers. |
| 06 | Fire & Safety | Detection, suppression, hydrant systems, NOC compliance. |
| 07 | Industrial Equipment | DG sets, pumps, compressors, 24/7 breakdown support. |
| 08 | Logistics | Corporate relocations, equipment moves, PAN India coordination. |
| 09 | Project Management | PMC services for civil, MEP, interior and industrial projects. |

Below the two columns, a footer row inside the dropdown reads **View all services →** and links to `/services`.

## Nav interaction

- Desktop dropdown opens on hover with a 100ms delay and on focus/click. It closes on `Escape`, outside click, or when focus leaves. Hover alone is not sufficient — the item is also a tab stop and `Enter` opens the panel.
- Mobile: full-screen slide-in sheet with the service accordion collapsed by default. The quote button is pinned to the bottom.
- Sticky behaviour: the header is fixed on scroll. It drops its shadow at scroll `y=0` and applies `shadow-sm` + 12px backdrop blur once `y>8px`. Do not shrink the logo on scroll.

## Breadcrumbs

Show breadcrumbs on every service detail page and on `/team`, `/vendor-registration`, `/contact`. Hide on `/`, `/about`, `/services`.

Format: `Home / Services / Civil Project & R&M Work`.

Breadcrumb spec:

- Font: Interface / `nav-sub`.
- Separator: a 1px vertical divider or a `/` with ample inline padding. One or the other — don't mix.
- Colour: `text-muted` for intermediate crumbs, `text-primary` for the current page.
- No trailing arrow or chevron.

## Related services strip

Every service detail page ends with a strip of six related services (the other eight minus the current, picked by relevance — see each service file for the ordering). Treat this as a navigation element, not a marketing promo. One row on desktop, horizontal scroll on mobile.

## Footer navigation

Four columns on desktop, stacked on mobile. See `16-contact-and-footer.md` for the full copy.

## Routing notes for the engineering team

- The site is content-heavy and SEO-sensitive. Prefer SSR / SSG per route.
- Every service page needs its own `<title>`, meta description, canonical and OpenGraph image. Copy for each lives in the service page's section file.
- Structured data: `Organization` on the root, `Service` per service page, `LocalBusiness` on `/contact`.
