---
name: Academic Tech Clean
colors:
  surface: '#f8f9fa'
  surface-dim: '#d9dadb'
  surface-bright: '#f8f9fa'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f4f5'
  surface-container: '#edeeef'
  surface-container-high: '#e7e8e9'
  surface-container-highest: '#e1e3e4'
  on-surface: '#191c1d'
  on-surface-variant: '#43474e'
  inverse-surface: '#2e3132'
  inverse-on-surface: '#f0f1f2'
  outline: '#73777f'
  outline-variant: '#c3c6cf'
  surface-tint: '#436084'
  primary: '#002444'
  on-primary: '#ffffff'
  primary-container: '#1a3a5c'
  on-primary-container: '#87a4cc'
  inverse-primary: '#abc9f2'
  secondary: '#a73a00'
  on-secondary: '#ffffff'
  secondary-container: '#fd651e'
  on-secondary-container: '#571a00'
  tertiary: '#002a1a'
  on-tertiary: '#ffffff'
  tertiary-container: '#00422b'
  on-tertiary-container: '#10b981'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d2e4ff'
  primary-fixed-dim: '#abc9f2'
  on-primary-fixed: '#001c37'
  on-primary-fixed-variant: '#2a486b'
  secondary-fixed: '#ffdbce'
  secondary-fixed-dim: '#ffb599'
  on-secondary-fixed: '#370e00'
  on-secondary-fixed-variant: '#7f2b00'
  tertiary-fixed: '#6ffbbe'
  tertiary-fixed-dim: '#4edea3'
  on-tertiary-fixed: '#002113'
  on-tertiary-fixed-variant: '#005236'
  background: '#f8f9fa'
  on-background: '#191c1d'
  surface-variant: '#e1e3e4'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 48px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Inter
    fontSize: 30px
    fontWeight: '700'
    lineHeight: 38px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.015em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  title-md:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '500'
    lineHeight: 26px
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 26px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 22px
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.02em
  code-inline:
    fontFamily: JetBrains Mono
    fontSize: 13px
    fontWeight: '500'
    lineHeight: 20px
  code-block:
    fontFamily: JetBrains Mono
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 22px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-mobile: 1rem
  margin: 2rem
  margin-mobile: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

This design system blends **Clean Academic rigor** with **Modern Tech utility**. Designed for engineering students, researchers, and Python practitioners, the interface projects intellectual authority, precision, and pedagogical clarity.

The visual language rejects decorative clutter in favor of scannable typography, structured data hierarchies, and intentional technical affordances. High contrast text, structured white space, and purposeful color coding evoke the dependable atmosphere of modern developer documentation hubs, academic journals, and computational notebooks. The user experience prioritizes sustained focus, long-form technical readability, and seamless navigation between theoretical formulations and executable code.

## Colors

The palette balances institutional gravitas with tactical visibility:

- **Primary (`#1A3A5C`)**: Deep institutional navy blue used for key headers, primary navigation surfaces, active selection indicators, and structural anchors.
- **Secondary (`#EA580C`)**: High-energy warm amber/orange dedicated to primary actions, interactive progress triggers, formula highlights, and important operational calls-to-action.
- **Tertiary (`#10B981`)**: Precision emerald green for success metrics, model convergence states, validated code outputs, and positive academic callouts.
- **Neutral Base (`#F8F9FA`)**: Ultra-light canvas tint providing an easy-reading base without the harsh glare of pure white.
- **Text & Surface Contrast**:
  - Primary Content Text: `#1E293B` (deep charcoal slate).
  - Secondary Content Text: `#334155` (slate medium) for captions, metadata, and body labels.
  - Border Muted: `#E2E8F0` for structural separators and card frames.
  - Code Block Dark Canvas: `#1E1E1E` with syntax-highlighted foreground layers.

## Typography

The typographic hierarchy relies on **Inter** for all prose, data tables, and user interface controls, ensuring uniform geometric clarity across desktop monitors and mobile viewports. Inter’s tall x-height and distinct glyph apertures support extended reading sessions in algorithmic and mathematical curriculum.

**JetBrains Mono** serves as the auxiliary technical typeface for inline code snippets, mathematical notation labels, terminal output, and full code listings. Line heights for body copy are tuned to `1.625` to reduce eye fatigue during long-form study, while headline tracks use subtle negative kerning (`-0.01em` to `-0.02em`) to command attention.

## Layout & Spacing

The layout is built upon an asymmetric, documentation-centric multi-column model optimized for desktop viewing and fluidly collapsible into a single-column view on mobile screens:

- **Desktop (>= 1024px)**: Fixed 280px left navigation sidebar, a central prose container constrained to a maximum reading width of 840px, and an optional 220px right-hand table of contents / parameter inspector.
- **Tablet (768px - 1023px)**: Left navigation collapses into an overlay drawer; reading area scales dynamically with fluid gutters (`1.5rem`).
- **Mobile (< 768px)**: Complete single-column flow with pinned top app header, slide-over drawer for repository/course navigation, and reduced canvas margins (`1rem`).

Vertical pacing follows an 8px modular baseline to maintain predictable vertical rhythm across markdown content, mathematical callouts, and embedded computational sandboxes.

## Elevation & Depth

Visual hierarchy employs a hybrid strategy of **crisp micro-borders** complemented by **low-intensity ambient shadows**:

- **Base Layer (Canvas)**: Background tint at `#F8F9FA`.
- **Card & Component Surfaces**: Solid pure white (`#FFFFFF`) with a `1px` border in `#E2E8F0` and an ambient shadow: `0 1px 3px rgba(15, 23, 42, 0.04), 0 1px 2px rgba(15, 23, 42, 0.02)`.
- **Elevated Interactive Layer (Dropdowns, Floating Palettes, Modals)**: Lifted using a layered shadow: `0 10px 15px -3px rgba(15, 23, 42, 0.08), 0 4px 6px -4px rgba(15, 23, 42, 0.03)` over a `1px` border in `#CBD5E1`.
- **Code & Syntax Panels**: Negative depth created through `#1E1E1E` dark-surface fill, recessed into surrounding white containers without heavy drop shadows.

## Shapes

The design system enforces a **Soft (Level 1)** geometric standard. Containers, input fields, badges, and code blocks adopt a measured `0.25rem` (4px) baseline border radius, scaling to `0.5rem` (8px) on major structural cards and dialogs.

This subtle rounding preserves a rigorous, engineered aesthetic, avoiding overly playful bubbly forms while softening harsh raw brutalist angles to sustain a modern, polished software impression.

## Components

### Buttons
- **Primary**: Solid `#EA580C` background, `#FFFFFF` text, `4px` border radius, medium weight typography. Subtle brightness lift on hover; `#C2410C` on active press.
- **Secondary / Institutional**: Solid `#1A3A5C` background, `#FFFFFF` text. Used for system actions (e.g., "Run Notebook", "Export Dataset").
- **Outline / Ghost**: Transparent fill, `1px` border in `#CBD5E1`, text in `#1E293B`. Hover transitions to `#F1F5F9`.

### Academic Callout Alerts
- Built with a left border accent strip of `4px` width, background tint at `5%` opacity of the state color, and `space-md` inner padding.
  - **Info / Tip**: `#1A3A5C` border with `#1E293B` text.
  - **Caution / Warning**: `#EA580C` border with deep amber-charcoal text.
  - **Convergence / Success**: `#10B981` border with emerald-charcoal text.

### Code Blocks & Inline Tokens
- **Inline Code**: Background `#EEF2F6`, border `#E2E8F0`, text `#1A3A5C`, padding `2px 6px`, radius `3px`, using `JetBrains Mono`.
- **Code Panels**: Background `#1E1E1E`, foreground `#D4D4D4`, header tab bar showing language badge (e.g., `python`), copy action icon button, and `16px` padding around syntax-highlighted code.

### Collapsible Navigation Sidebar
- Background `#FFFFFF` bordered on the right by `#E2E8F0`.
- Menu items utilize `14px` medium font, `8px 12px` inner spacing, and hover feedback (`#F1F5F9`).
- **Active State**: Left indicator strip (`3px` solid `#1A3A5C`), text colored `#1A3A5C` with a font weight of `600`, and background `#F8FAFC`.

### Cards & Parameter Containers
- Solid white `#FFFFFF` surface with `1px` `#E2E8F0` border and light ambient shadow.
- Header zones segmented by a light divider line, separating titles from interactive parameters or markdown content.

### Inputs & Checkboxes
- **Text Inputs**: Height `38px`, border `1px` solid `#CBD5E1`, background `#FFFFFF`. Focus ring is `2px` solid `#1A3A5C` with a `2px` offset.
- **Checkboxes & Radios**: Primary accent fill `#1A3A5C` upon selection; square bounds with `3px` corner radius for checkboxes.