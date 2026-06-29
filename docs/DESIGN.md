---
name: Serene Professionalism
colors:
  surface: '#fcf8fb'
  surface-dim: '#dcd9dc'
  surface-bright: '#fcf8fb'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f6f3f5'
  surface-container: '#f0edef'
  surface-container-high: '#eae7ea'
  surface-container-highest: '#e4e2e4'
  on-surface: '#1b1b1d'
  on-surface-variant: '#3d4947'
  inverse-surface: '#303032'
  inverse-on-surface: '#f3f0f2'
  outline: '#6d7a77'
  outline-variant: '#bcc9c6'
  surface-tint: '#006a61'
  primary: '#0d9488'
  on-primary: '#ffffff'
  primary-container: '#008378'
  on-primary-container: '#f4fffc'
  inverse-primary: '#6bd8cb'
  secondary: '#2563eb'
  on-secondary: '#ffffff'
  secondary-container: '#316bf3'
  on-secondary-container: '#fefcff'
  tertiary: '#5d5c58'
  on-tertiary: '#ffffff'
  tertiary-container: '#767470'
  on-tertiary-container: '#fcffe2'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#89f5e7'
  primary-fixed-dim: '#6bd8cb'
  on-primary-fixed: '#00201d'
  on-primary-fixed-variant: '#005049'
  secondary-fixed: '#dbe1ff'
  secondary-fixed-dim: '#b4c5ff'
  on-secondary-fixed: '#00174b'
  on-secondary-fixed-variant: '#003ea8'
  tertiary-fixed: '#e5e2dd'
  tertiary-fixed-dim: '#c9c6c1'
  on-tertiary-fixed: '#1c1c19'
  on-tertiary-fixed-variant: '#474743'
  background: '#fcf8fb'
  on-background: '#1b1b1d'
  surface-variant: '#e4e2e4'
typography:
  headline-xl:
    fontFamily: Hanken Grotesk
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Hanken Grotesk
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Hanken Grotesk
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Hanken Grotesk
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
  headline-sm:
    fontFamily: Hanken Grotesk
    fontSize: 18px
    fontWeight: '600'
    lineHeight: '1.4'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.5'
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '500'
    lineHeight: '1.2'
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1.2'
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1280px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 40px
  stack-sm: 12px
  stack-md: 24px
  stack-lg: 48px
---

## Brand & Style

This design system is built for high-utility tools that demand focus, clarity, and a sense of calm. The brand personality is **composed, intellectual, and inviting**. It avoids the sterile coldness of traditional enterprise software by utilizing a warm, organic foundation while maintaining the rigorous structure required for professional workflows.

The design style is **Sophisticated Minimalism**. It prioritizes high-quality typography and intentional white space over decorative elements. By combining a warm cream base with precise, high-contrast accents, the UI evokes an emotional response of reliability and "quiet power" — allowing the user's content to take center stage without visual fatigue.

## Colors

The palette is anchored by a warm cream background (`#fcf8fb`), which reduces eye strain compared to pure white.

- **Primary (Teal):** `#0d9488` — used for primary actions and "success" states. Grounded, organic feel.
- **Secondary (Slate Blue):** `#2563eb` — used for interactive links, informational callouts, or secondary active states.
- **Surface (Warm Stone):** `#f0ede8` — a subtle tint for container backgrounds, input fields, and sidebars to separate from the main canvas.
- **Typography:** main text uses warm gray-black (`#1c1c1e`); secondary info uses muted gray (`#6b7280`) for hierarchy.

## Typography

Headlines use **Hanken Grotesk** for a sharp, contemporary edge. Body text and functional UI use **Inter** for legibility. Hierarchy comes from weight and tight tracking in headlines; body text stays spacious. All-caps reserved for small labels/table headers.

## Layout & Spacing

Fixed-fluid hybrid grid. Desktop content centered within a 1280px container. Strict 8px base unit governs padding/margins.
- **Desktop:** 12-col, 24px gutters, 40px outer margins.
- **Tablet:** 8-col, 24px gutters, 32px outer margins.
- **Mobile:** 4-col, 16px gutters, 16px outer margins.

## Elevation & Depth

Depth via **tonal layering** and **low-contrast outlines** over heavy shadows.
- **Level 0 (Base):** cream `#fcf8fb`.
- **Level 1 (Surface):** stone `#f0ede8` for cards/inputs/sidebars.
- **Borders:** 1px. On light backgrounds use ~10% black; on surfaces ~5% black.
- **Shadows:** only for floating elements (dropdowns, modals): `0 12px 24px -10px rgba(28,28,30,0.08)`.

## Shapes

Rounded — friendly yet professional.
- Small (buttons, inputs): 0.5rem.
- Medium (cards, modals): 1rem.
- Large (outer containers): 1.5rem.

Avoid pill shapes for primary buttons.

## Components

### Buttons
- **Primary:** teal background, white text, no shadow, 1px inset darker-teal border.
- **Secondary:** stone background, warm-gray text.
- **Tertiary/Ghost:** no background, subtle border on hover.

### Input Fields
- **Default:** stone background, 1px border.
- **Active:** white background, 2px border in slate blue or teal.
- **Labels:** `label-md`, 8px above the field.

### Cards
- No shadow by default. 1px subtle border + stone background. Internal padding 24px.

### Lists & Navigation
- Nav items: 4px vertical active indicator in teal. Hover uses a slightly darker stone (`#e5e2dd`).

### Chips
- Small, `label-sm`, slightly more saturated background with dark text for contrast.
