---
name: Kisaan Sahyog Design System
colors:
  surface: '#ecfeef'
  surface-dim: '#cdded0'
  surface-bright: '#ecfeef'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#e7f8e9'
  surface-container: '#e1f2e4'
  surface-container-high: '#dbedde'
  surface-container-highest: '#d5e7d9'
  on-surface: '#101f16'
  on-surface-variant: '#40493d'
  inverse-surface: '#25342a'
  inverse-on-surface: '#e4f5e7'
  outline: '#707a6c'
  outline-variant: '#bfcaba'
  surface-tint: '#1b6d24'
  primary: '#0d631b'
  on-primary: '#ffffff'
  primary-container: '#2e7d32'
  on-primary-container: '#cbffc2'
  inverse-primary: '#88d982'
  secondary: '#126d27'
  on-secondary: '#ffffff'
  secondary-container: '#9cf49c'
  on-secondary-container: '#19722b'
  tertiary: '#005a8c'
  on-tertiary: '#ffffff'
  tertiary-container: '#0073b2'
  on-tertiary-container: '#e9f2ff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#a3f69c'
  primary-fixed-dim: '#88d982'
  on-primary-fixed: '#002204'
  on-primary-fixed-variant: '#005312'
  secondary-fixed: '#9ff79f'
  secondary-fixed-dim: '#83da85'
  on-secondary-fixed: '#002105'
  on-secondary-fixed-variant: '#005318'
  tertiary-fixed: '#cee5ff'
  tertiary-fixed-dim: '#96ccff'
  on-tertiary-fixed: '#001d32'
  on-tertiary-fixed-variant: '#004a75'
  background: '#ecfeef'
  on-background: '#101f16'
  surface-variant: '#d5e7d9'
typography:
  headline-xl:
    fontFamily: Nunito Sans
    fontSize: 34px
    fontWeight: '800'
    lineHeight: 42px
    letterSpacing: -0.02em
  headline-xl-mobile:
    fontFamily: Nunito Sans
    fontSize: 26px
    fontWeight: '800'
    lineHeight: 34px
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Nunito Sans
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Nunito Sans
    fontSize: 22px
    fontWeight: '700'
    lineHeight: 30px
    letterSpacing: 0em
  headline-md:
    fontFamily: Nunito Sans
    fontSize: 20px
    fontWeight: '700'
    lineHeight: 28px
  title-md:
    fontFamily: Nunito Sans
    fontSize: 17px
    fontWeight: '600'
    lineHeight: 24px
  body-lg:
    fontFamily: Nunito Sans
    fontSize: 16px
    fontWeight: '500'
    lineHeight: 24px
  body-md:
    fontFamily: Nunito Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-lg:
    fontFamily: Nunito Sans
    fontSize: 15px
    fontWeight: '700'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-md:
    fontFamily: Nunito Sans
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.02em
rounded:
  sm: 0.5rem
  DEFAULT: 1rem
  md: 1.5rem
  lg: 2rem
  xl: 3rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-sm: 0.75rem
  margin: 1rem
  margin-tablet: 1.5rem
  margin-desktop: 2rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.25rem
---

## Brand & Style
This design system crafts an empowering, straightforward, and welcoming digital environment for agricultural producers and direct consumers. Built around principles of transparency, accessibility, and dignity, the interface emphasizes extreme clarity and confidence. The aesthetic leans into a modern, airy organic utility—blending warm, grounded pastoral tones with soft physical tactility.

Visual interactions must minimize cognitive load, accommodating varying levels of digital literacy through generous touch zones, visual reassurance, and prominent voice-enabled utility. By combining reassuring botanical greens with breathable off-white surfaces, the UI eliminates transaction intimidation, instills institutional trust, and establishes an approachable bridge from farm to marketplace.

## Colors
The color hierarchy is rooted in authentic agricultural vitality, prioritizing daylight contrast and calming earthy accents:

- **Primary (`#2E7D32`)**: Used for key calls-to-action, success confirmations, active navigation anchors, and primary branding elements.
- **Secondary (`#66BB6A`)**: Serves as secondary interactive states, category badges, supporting progress rings, and balanced accents.
- **Tertiary (`#0288D1`) / Pastel Sky (`#E3F2FD`)**: Denotes informational prompts, logistics status updates, weather modules, and audio/voice input focal points.
- **Neutral Deep Tone (`#2F3E34`)**: Serves as primary text and iconography, providing softer, higher-legibility contrast than harsh true black.
- **Canvas & Surface System**:
  - Main background: Soft cream nuance (`#FFFDF5`).
  - Card & Container background: Pure white (`#FFFFFF`) layered over subtle mint tint containers (`#E8F5E9`, `#C8E6C9`).
- **Semantic Feedback**:
  - Soft warning peach: `#FFE0B2` (background) paired with `#E65100` (content).
  - Critical blush red: `#FFCDD2` (background) paired with `#C62828` (content).

## Typography
Typography is rendered consistently using `Nunito Sans` across all display scales. Its rounded, open letterforms improve character distinction on outdoor mobile devices under sunlight, reducing visual strain. 

Hierarchy is established through distinct weights (`800` ExtraBold for key metrics and headlines down to `500` Medium for body copy) rather than dramatic size differences, preserving spatial economy on compact screens. Numbers, commodity prices, and weight listings utilize heavier weights (`700` and `800`) to guarantee error-free comprehension.

## Layout & Spacing
The layout relies on a mobile-first 4-column layout fluid grid calibrated specifically for a default 390px viewport width, scaling up to an 8-column layout for tablets and a 12-column layout for desktop views:

- **Mobile (Base, 390px)**: 4 columns, 16px (`1rem`) outer margins, 16px gutters. Every primary interactive element adheres to a minimum touch target bounding box of 52px to accommodate field conditions and one-handed operation.
- **Tablet (600px - 1024px)**: 8 columns, 24px (`1.5rem`) outer margins, 20px gutters. Dual-pane marketplace layouts and listing split-screens activate here.
- **Desktop (1024px+)**: 12 columns, centered container with a maximum width of 1200px, 32px (`2rem`) outer margins.

Spacing follows an 8px base rhythm with 4px sub-increments (`space-xs` = 4px, `space-sm` = 8px, `space-md` = 16px, `space-lg` = 24px, `space-xl` = 36px) applied across intra-card groupings, stack gaps, and list segmentations.

## Elevation & Depth
Depth is rendered through diffused, sunlit ambient shadowing and soft surface tinting rather than harsh borders or dark drop-shadows:

- **Surface Level 0 (Canvas)**: `#FFFDF5` flat base layer with zero elevation.
- **Surface Level 1 (Cards & Lists)**: `#FFFFFF` resting atop canvas, highlighted with an ambient shadow: `box-shadow: 0 4px 16px -2px rgba(47, 62, 52, 0.06), 0 1px 3px 0 rgba(47, 62, 52, 0.04)`.
- **Surface Level 2 (Active Modals, Bottom Sheets & Sticky Voice Bars)**: `#FFFFFF` floating with enhanced ambient shadow: `box-shadow: 0 12px 32px -4px rgba(47, 62, 52, 0.12), 0 4px 8px -2px rgba(47, 62, 52, 0.04)`.
- **Surface Level 3 (Floating Voice Interaction & Primary Action Overlays)**: Glassmorphic transluscent green or pure white with backdrop blur (`backdrop-filter: blur(12px); background: rgba(255, 255, 255, 0.92)`), framed with a low-contrast translucent boundary (`1px solid rgba(46, 125, 50, 0.12)`).

## Shapes
Geometry across the system uses soft, pill-inspired curvilinear forms to convey warmth, safety, and modern approachability:

- **Buttons & Chips**: Pure pill shapes (`border-radius: 9999px` or `3rem`).
- **Cards & Visual Containers**: Generous rounded corners set to 20px - 24px (`rounded-lg` at `2rem`), establishing a smooth, pebble-like quality.
- **Input Fields & Search Bars**: Pill-shaped or ultra-soft corner profiles (`border-radius: 1.5rem` to `2rem`).
- **Media Thumbnails & Crop Images**: Rounded inner corners (16px to 20px) that align with external card geometry to preserve balanced concentricity.

## Components

### Buttons
- **Primary Action**: Pill-shaped (`border-radius: 9999px`), 52px height, solid background `#2E7D32`, text `#FFFFFF`, typography `label-lg`. Tap states exhibit a subtle downward translation and color shift to `#256629`.
- **Secondary Action**: Pill-shaped, light mint background `#E8F5E9`, text `#2E7D32`, subtle border `1px solid #C8E6C9`.
- **Voice Assist Button**: Persistent floating circular or extended pill element with pastel sky tint (`#E3F2FD`), icon `#0288D1`, and an animated concentric pulse indicating mic readiness.

### Cards
- **Marketplace Crop Card**: Pure white background (`#FFFFFF`), 22px border radius, subtle padding (`1.25rem`), layered with Level 1 ambient shadow. Top segment features the produce image with 16px inner radii, followed by commodity title, mandi reference rate, and direct farmer contact pill.
- **Information / Advisory Card**: Tinted surface (`#E8F5E9` for tips, `#FFE0B2` for market alerts), no harsh borders, 20px border radius, with iconography inset in contrasting circular containers.

### Input Fields & Search
- Generous 54px touch targets. Pure white backgrounds with an inset shadow or fine `1px solid rgba(47, 62, 52, 0.12)` border. Focused state replaces boundary with a glowing `2px solid #2E7D32`. Inset mic icon on the right edge triggers hands-free voice transcription.

### Chips & Filters
- Compact pill height (38px). Unselected: `#FFFFFF` with `#C8E6C9` stroke and `#2F3E34` text. Selected: `#2E7D32` background with `#FFFFFF` text and zero outline.

### Checkboxes & Radio Buttons
- Radio buttons: 24px diameter circles, `#2E7D32` fill when selected with a centered 10px white dot.
- Checkboxes: 24px rounded squares (6px corner radius), `#2E7D32` check state with crisp white vector tick.

### Language Selector & Voice Navigation
- Accessible header badge anchored at the top-right of mobile views: Pill shape containing an intuitive regional language icon and current script label (e.g., "हिंदी / English"), providing a dedicated one-tap modal selector.