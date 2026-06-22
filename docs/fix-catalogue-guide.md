# Fix Guide — Convert the Catalogue page to Tailwind

**Who this is for:** eya
**Branch:** fix/cataloguue

---

## The problem

The catalogue page is styled with a big block of hand-written CSS classes
(`.page-header`, `.fcard`, `.cat-container`, …) that currently lives in
[`src/app/globals.css`](../src/app/globals.css).

Every other page in this project (Hero, About, Carousel, Location, Footer,
Navbar) is styled with **Tailwind utility classes written directly in the JSX**.
The catalogue is the odd one out. That bespoke CSS block is the thing to remove.

> Note: the routing fix, the navbar-in-layout, the removal of the inline
> `<style>` block, and the color tokens were already handled in the hotfix.
> The **only** task here is converting the catalogue's classes to Tailwind.

## The goal

1. Style [`src/app/catalogue/page.tsx`](../src/app/catalogue/page.tsx) entirely with
   Tailwind utility classes in the JSX.
2. Delete the entire `/* ── Catalogue page ── */` block from `globals.css`
   (everything after the `body { … }` rule).
3. After you're done, `globals.css` should contain **only**: the
   `@import "tailwindcss";`, the `@theme { … }` palette, and the `body { … }` rule.

You will **keep** and **use** the color tokens already defined in `@theme`
(`orange`, `green`, `blue`, `sky`, `base`, `deep`, `surface`, `surface-hover`,
`ink`, `heading`, `strong`, `muted`, `faded`, `faint`, `faintest`, `locked`,
`level-beginner`, `level-intermediate`, `level-advanced`). They already generate
utilities like `text-orange`, `bg-surface`, `border-blue`.

---

## How to do it

Go class by class. For each element in `page.tsx` that has a bespoke class
(e.g. `className="fcard"`), replace it with the equivalent Tailwind utilities
from the table below, then delete that CSS rule from `globals.css`.

### Translation reference

| Bespoke class | Tailwind utilities |
|---|---|
| `page-header` | `relative overflow-hidden bg-base pt-24 opacity-0 translate-y-5 transition-all duration-700 ease-out` (the JS in the component flips it to visible) |
| `hero-grid` | `grid grid-cols-1 min-[900px]:grid-cols-2 min-h-[420px]` |
| `hero-left` | `flex flex-col justify-center relative z-10 px-6 pt-12 pb-10 min-[900px]:px-14 min-[900px]:pt-[72px] min-[900px]:pb-16` |
| `hero-right` | `relative overflow-hidden h-[260px] min-[900px]:h-auto` |
| `hero-right img` | `w-full h-full object-cover object-center block brightness-[0.7] saturate-[0.85]` |
| `header-eyebrow` | `text-[11px] font-bold tracking-[0.2em] uppercase text-orange mb-[18px]` |
| `header-title` | `text-[clamp(34px,4vw,54px)] font-extrabold text-white leading-[1.08] mb-5` (inner `<span>` → `text-orange`) |
| `header-sub` | `text-[15px] text-[rgb(230_237_243/0.5)] max-w-[460px] leading-[1.75] mb-8` |
| `hero-stats` | `flex gap-5 min-[600px]:gap-8` |
| `hero-stat-num` | `text-[22px] font-extrabold text-orange leading-none mb-1` |
| `hero-stat-label` | `text-xs text-[rgb(230_237_243/0.4)] font-medium` |
| `divider` | `h-px bg-[linear-gradient(90deg,transparent_0%,rgb(249_115_22/0.45)_30%,rgb(27_79_114/0.55)_70%,transparent_100%)]` |
| `page-body` | `w-full bg-gradient-to-b from-deep to-base px-5 pt-8 pb-15 min-[900px]:px-12 min-[900px]:pt-13 min-[900px]:pb-25` |
| `body-inner` | `max-w-[1400px] mx-auto flex flex-col gap-7` |
| `section-label` | `text-[11px] font-bold tracking-[0.16em] uppercase text-[rgb(230_237_243/0.3)] mb-2` |
| `cat-container` | `w-full border border-white/[0.07] rounded-2xl bg-surface overflow-hidden transition-colors duration-[250ms]` — when **not** locked add `hover:border-orange/30`; when locked add `opacity-[0.55]` |
| `cat-header` | `px-5 pt-[22px] pb-[18px] min-[900px]:px-8 min-[900px]:pt-7 min-[900px]:pb-6 border-b border-white/[0.055]` |
| `cat-title-row` | `flex items-center gap-3.5 mb-2` |
| `cat-title` | `text-xl font-bold` + color: `text-heading` (unlocked) or `text-locked` (locked) |
| `cat-count` | `text-xs font-bold bg-orange/15 text-orange px-3 py-1 rounded-full` |
| `stay-tuned` | `inline-flex items-center gap-1.5 text-xs font-semibold bg-white/5 text-faded px-3 py-1 rounded-full` |
| `cat-desc` | `text-[13.5px] text-faded leading-[1.6]` |
| `formations-grid` | `grid grid-cols-1 min-[600px]:grid-cols-2 min-[900px]:grid-cols-3 gap-px bg-white/5` |
| `fcard` | `group flex flex-col gap-3 bg-surface p-[22px] min-[900px]:py-7 min-[900px]:px-[30px] cursor-pointer transition-colors duration-200 hover:bg-surface-hover` |
| `fcard-header` | `flex justify-between items-center` |
| `fcard-badge` | `text-[11px] font-bold px-2.5 py-1 rounded-full` + level class (see below) |
| `fcard-duree` | `flex items-center gap-[5px] text-xs text-faint` |
| `fcard-titre` | `text-[15px] font-bold text-strong leading-[1.35]` |
| `fcard-desc` | `text-[13px] text-faded leading-[1.65] grow` |
| `fcard-footer` | `flex justify-between items-center mt-1 pt-3.5 border-t border-white/5` |
| `fcard-places` | `flex items-center gap-1.5 text-xs text-faint` |
| `fcard-btn` | `px-4 py-2 bg-transparent text-orange border border-orange/30 rounded-lg text-[12.5px] font-semibold cursor-pointer transition-colors hover:bg-orange/10 hover:border-orange/60` |
| `locked-body` | `py-14 px-8 flex justify-center` |
| `locked-placeholder` | `flex flex-col items-center gap-3.5 text-center` |
| `locked-icon` | `w-14 h-14 rounded-full bg-white/[0.04] flex items-center justify-center text-faintest animate-pulse` |
| `locked-text` | `text-sm text-faint` |
| `locked-btn` | `px-6 py-2.5 bg-transparent border border-white/10 rounded-[9px] text-faded text-[13px] font-semibold cursor-pointer transition-colors hover:border-orange/45 hover:text-orange` |

### Level badge classes

Replace the `NIVEAU_CLASS` map so each level maps to Tailwind classes instead of
the old `level-debutant` / `level-intermediaire` / `level-avance` CSS classes:

```ts
const NIVEAU_CLASS: Record<string, string> = {
  "Débutant":      "bg-green/15 text-level-beginner",
  "Intermédiaire": "bg-orange/15 text-level-intermediate",
  "Avancé":        "bg-level-advanced/15 text-level-advanced",
};
```

Then the badge becomes `<span className={`... ${NIVEAU_CLASS[f.niveau]}`}>`.
Keep the full class strings as literals (don't build them by string
concatenation) — Tailwind only generates classes it can see in the source.

---

## Things to watch out for

- **Breakpoints are inverted.** The old CSS was desktop-first (`@media (max-width: 900px)`).
  Tailwind is mobile-first, so the base classes are the *small-screen* values and
  `min-[900px]:` / `min-[600px]:` add the *larger-screen* values. The table above
  already accounts for this — follow it as written.
- **Keep the entrance animations.** The `useEffect` + `useRef` logic in the
  component (the `IntersectionObserver` and the header fade-in) stays exactly as
  is. It sets inline `style.opacity` / `style.transform` at runtime — that's fine
  and is not the CSS we're removing. The per-card staggered `style={{ … }}` on the
  category container also stays (the delay depends on the index, so it must be inline).
- **`@keyframes pulse` can be deleted** — use Tailwind's built-in `animate-pulse`.
- **Gradient overlays.** The `.hero-right::before` / `::after` pseudo-elements have
  no JSX element. Add two real `<div>`s inside `hero-right` for them:
  ```jsx
  <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-r from-base from-0% to-transparent to-40%" />
  <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-b from-transparent from-60% to-base to-100%" />
  ```
- **Don't invent new colors.** If you need a shade, it should already be a token in
  `@theme`. If something genuinely isn't there, ask before adding — don't hardcode a hex.

---

## Definition of done

- [ ] `src/app/catalogue/page.tsx` has no bespoke class names — only Tailwind utilities.
- [ ] The `/* ── Catalogue page ── */` block is gone from `globals.css`; the file
      contains only `@import`, `@theme`, and `body`.
- [ ] `npm run build` passes with no errors.
- [ ] `npm run dev`, open `/catalogue`: it looks the same as before, the navbar
      shows and is not overlapping the hero, and the layout is correct at desktop,
      ~900px, and mobile widths.
- [ ] No hardcoded hex colors anywhere in `src/` — verify with:
      `grep -rE "\[#[0-9a-fA-F]{3,6}\]" src/` (should return nothing).

When all boxes are checked, commit and push your branch.

```
refactor(catalogue): style with Tailwind utilities instead of bespoke CSS
```
