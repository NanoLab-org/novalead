# NovaLead — Full Audit

Consolidated from a code review + a live browser pass. Ordered by severity.
`[code]` = found by reading the source, `[browser]` = confirmed in a running browser.

---

## 🔴 P0 — Blockers (the branch does not build)

- [ ] **Duplicate `Formation`/`Category` types break the build** `[code]`
  `src/app/catalogue/page.tsx` declares each type twice (explicit object types at
  lines 8–24 **and** derived `typeof` versions at 26–27). `npm run build` fails:
  *"Duplicate identifier 'Formation'"*. → Delete lines 26–27 (keep the explicit types).
- [ ] **Navbar committed with mismatched JSX** `[code]`
  At HEAD a `<button>` is closed with `</Link>` (won't compile). The `</button>`
  fix is only an **uncommitted** local edit → commit it.

---

## 🟠 P1 — Broken routing & dead links

- [ ] **`/contact` is unreachable** `[code/browser]` — nothing links to it. Navbar
  "Contact" → `#contact`, which is the **footer** anchor, not the page. The whole
  406-line contact page is dark.
- [ ] **Navbar "Localisation" → `#location` is dead** `[code/browser]` — the Location
  section was removed from home, so that id no longer exists on any page.
- [ ] **Footer "Liens rapides": 3 of 4 broken** `[code/browser]` — built as
  `#${label.toLowerCase()}` → `#catalogue`, `#à propos` (space+accent, invalid),
  `#localisation` (wrong id). Only `#contact` works. → Use real routes.
- [ ] **Footer social icons** (`in`, `fb`) point to `href="#"` `[browser]` — placeholders.

**Suggested nav map:** Catalogue → `/catalogue` ✓ · À propos → `/apropos` ✓ ·
Localisation → `/contact` (or footer) · **Contact → `/contact`**.

---

## 🟠 P1 — Dead call-to-action buttons (no handlers)

- [ ] **Both "Nous contacter" buttons** (navbar + hero) are plain `<button>`s with no
  `onClick` — clicking does nothing `[browser]`. Primary conversion action for a
  training company. → Link to `/contact` (or `<Link>`-wrap).
- [ ] **"S'inscrire à cette formation"** on `/formations/[id]` — no handler, dead `[browser]`.
  Primary CTA on the page.
- [ ] **"S'inscrire" / "En savoir plus"** in the carousel/detail areas — check the same.

---

## 🟠 P1 — UX / behavior

- [ ] **Scroll-hijack navigation traps the user** `[code]` —
  `PageScrollNavigation.tsx` auto-navigates to `/apropos` when you scroll to the
  bottom of home, so the **footer (contact + map) is unreachable**; it also flashes
  `<body>` to `opacity:0` on every load, and excludes `/contact` & `/formations`
  from its order. → Gate to intentional gestures or remove.
- [ ] **Team carousel autoplay dies** after the first arrow click and never resumes
  `[code]` — `circular-testimonials.tsx:93` clears the interval; mount effect never
  recreates it.

---

## 🟡 P2 — Visual bugs

- [ ] **Insufficient clearance under the fixed navbar** `[browser]` — on scroll, section
  headings ("Nos formations phares", "Voir tout le catalogue") slide up and are
  clipped/overlapped behind the nav pill instead of stopping above it (home +
  catalogue). → Add top scroll padding / section spacing.
- [ ] **WhatsApp popup overflows the viewport right edge** `[browser]` — the message
  text and "Démarrer la conversation" button are cut off (confirmed at 1334px).
  `whattswidget.tsx` popup is `w-64` at `right-6`. → Constrain width / reposition.
- [ ] **Contact hero is unstyled** `[code]` — uses `.page-header`, `.hero-grid`,
  `.header-title`, `.hero-stats`, `.divider` which were deleted from globals.css in
  the Tailwind refactor (only `form-*` survived). Hero + divider render raw.
- [ ] **Default 404 page** `[browser]` — unstyled, **English** ("This page could not be
  found"), black background clashing with the cream theme, low-contrast nav links.
  → Add a themed French `app/not-found.tsx`.

---

## 🟡 P2 — Content / data

- [ ] **Placeholder contact content in the footer** `[browser]` — address is
  "Rue Lorem Ipsum, Immeuble Dolor Sit", phone & WhatsApp are literally
  "+216 XX XXX XXX". Map is generic "Tunis" center.
- [ ] **Contact entries aren't clickable** `[code/browser]` — Tel/Email/WhatsApp are
  plain `<span>`s, no `tel:` / `mailto:` / `wa.me` links.
- [ ] **Homepage promotes a course the catalogue doesn't offer** `[browser]` — the
  "Nos formations phares" slideshow advertises "Installation Photovoltaïque", but the
  catalogue lists the whole "Énergie Solaire" domain as *Stay tuned* / unavailable.
- [ ] **No backend** `[code]` — Prisma `schema.prisma` has **zero models**, there are
  **no API routes**, and the contact form "submits" via a fake `setTimeout` (nothing
  is sent/stored). Catalogue/formations are hardcoded in `constants`.

---

## 🟡 P3 — Architecture / conventions

- [ ] **Nested `<main>`** `[code]` — `layout.tsx` renders `<main>{children}</main>` and
  the home page returns its own `<main>` too → two `<main>` landmarks (invalid HTML/a11y).
- [ ] **Bespoke-CSS / inline-style regression** `[code]` — the contact page regrew a
  large `form-*`/`tab-*` block in globals.css and `circular-testimonials` is 100%
  inline styles — the pattern the slideshow/catalogue refactors removed (CLAUDE.md:
  "no inline css unless extremely critical").
- [ ] **Dead / orphaned files** `[code]` — `home/About.tsx`, `home/Location.tsx` (not
  rendered), and the unused `formationSlides` constant.

---

## ⚪ Testing gaps

- [ ] **Mobile / responsive not verified** `[browser]` — the resize tool didn't change
  the viewport (stuck at 1334px). Do a manual pass at mobile widths, especially given
  the WhatsApp overflow already seen at desktop.

---

### Recommended order
1. **P0** — get the build green (2 fixes, ~5 min).
2. **P1 routing + dead CTAs** — wire Contact/Localisation, footer links, and the
   "Nous contacter" / "S'inscrire" buttons; make footer contacts clickable.
3. **P1 UX** — decide on `PageScrollNavigation`; fix autoplay.
4. **P2** — navbar clearance, WhatsApp width, contact hero styling, themed 404, real content.
5. **P3 + backend** — cleanup, then the Prisma/API/form epic.
