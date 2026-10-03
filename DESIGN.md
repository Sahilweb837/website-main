---
name: Kinetic Amber
colors:
  surface: '#141312'
  surface-dim: '#141312'
  surface-bright: '#3b3937'
  surface-container-lowest: '#0f0e0d'
  surface-container-low: '#1d1b1a'
  surface-container: '#211f1e'
  surface-container-high: '#2b2a28'
  surface-container-highest: '#363433'
  on-surface: '#e6e1df'
  on-surface-variant: '#e2bfb0'
  inverse-surface: '#e6e1df'
  inverse-on-surface: '#32302f'
  outline: '#a98a7d'
  outline-variant: '#5a4136'
  surface-tint: '#ffb693'
  primary: '#ffb693'
  on-primary: '#561f00'
  primary-container: '#ff6b00'
  on-primary-container: '#572000'
  inverse-primary: '#a04100'
  secondary: '#ffb95f'
  on-secondary: '#472a00'
  secondary-container: '#ee9800'
  on-secondary-container: '#5b3800'
  tertiary: '#f9bd22'
  on-tertiary: '#402d00'
  tertiary-container: '#c29100'
  on-tertiary-container: '#402e00'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffdbcc'
  primary-fixed-dim: '#ffb693'
  on-primary-fixed: '#351000'
  on-primary-fixed-variant: '#7a3000'
  secondary-fixed: '#ffddb8'
  secondary-fixed-dim: '#ffb95f'
  on-secondary-fixed: '#2a1700'
  on-secondary-fixed-variant: '#653e00'
  tertiary-fixed: '#ffdf9f'
  tertiary-fixed-dim: '#f9bd22'
  on-tertiary-fixed: '#261a00'
  on-tertiary-fixed-variant: '#5c4300'
  background: '#141312'
  on-background: '#e6e1df'
  surface-variant: '#363433'
typography:
  display-hero:
    fontFamily: Space Grotesk
    fontSize: 56px
    fontWeight: '700'
    lineHeight: 64px
    letterSpacing: -0.03em
  display-hero-mobile:
    fontFamily: Space Grotesk
    fontSize: 38px
    fontWeight: '700'
    lineHeight: 44px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Space Grotesk
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Space Grotesk
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Space Grotesk
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Space Grotesk
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  title-lg:
    fontFamily: Sora
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 26px
  title-md:
    fontFamily: Sora
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 24px
  body-lg:
    fontFamily: Sora
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 26px
  body-md:
    fontFamily: Sora
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 22px
  body-sm:
    fontFamily: Sora
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 18px
  label-lg:
    fontFamily: Space Grotesk
    fontSize: 13px
    fontWeight: '600'
    lineHeight: 18px
    letterSpacing: 0.04em
  label-md:
    fontFamily: Space Grotesk
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.06em
  label-mono:
    fontFamily: Space Grotesk
    fontSize: 10px
    fontWeight: '700'
    lineHeight: 14px
    letterSpacing: 0.1em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-mobile: 1rem
  margin: 3rem
  margin-mobile: 1.25rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

This design system channels the electrifying sense of wonder, human connection, and immersion experienced when stepping into alternate realities. Tailored for next-generation spatial computing, virtual reality, and immersive tech ecosystems, it pairs hyper-saturated warm radiance with deep, structured obsidian anchors.

The emotional signature is high-energy optimism, razor-sharp technical performance, and tactile futuristic utility. It rejects sterile, cold-blue sci-fi tropes in favor of radiant daylight warmth—warm amber, energetic solar orange, and honeyed highlights balanced by deep charcoal shadows. 

The aesthetic is a hybrid of **Futuristic Precision** and **Translucent Spatial Surfaces**:
- Crisp geometric structures grounded by dark obsidian surfaces and subtle glass boundaries.
- Radiant atmospheric glows and luminous micro-accents reminiscent of HUD projections, spatial focal rings, and charged holographic energy.
- Purposeful, tactile micro-interactions that evoke low-latency spatial response times and sensory feedback.

## Colors

The color palette centers on intense thermal energy counterbalanced by rich carbon neutrals:

- **Primary (`#FF6B00`):** The primary kinetic signal. Used for focal callouts, primary buttons, real-time spatial status indicators, and energetic UI boundaries.
- **Secondary (`#F59E0B`):** Deep amber. Provides contextual progression, selected state accents, hover variations, and secondary graphical vectors.
- **Tertiary (`#FBBF24`):** Honey yellow highlight. Used for delicate telemetry rings, volumetric badges, active state indicators, and glowing specular pips.
- **Neutral (`#121110`):** Obsidian charcoal. A warm-tinted black that prevents harsh digital dead-space, serving as the deep infinite canvas upon which high-saturation oranges and ambers glow.

### Tonal Hierarchy & Surfaces
- **Canvas Base:** `#121110` — The deepest layer of viewport depth.
- **Surface Elevation 1 (Cards, panels):** `#1C1A18` with subtle border stroke `#2E2A24`.
- **Surface Elevation 2 (Floating sheets, overlays):** `#25221E` with micro-glow edge bleed.
- **Text & Foreground:** Primary body text uses high-contrast warm white (`#FAF6F0`), secondary descriptors use muted graphite sand (`#A8A29E`), and tertiary metadata sits at `#78716C`.

## Typography

The typography structure fuses high-tech geometric character with spatial legibility:

- **Display & Headlines (`Space Grotesk`):** Delivers a deliberate, tech-forward voice with sharp mechanical curves and modern proportions. Uppercase treatments in `label-mono` and `label-md` reinforce telemetry interfaces and system heads-up displays.
- **Body & Continuous Reading (`Sora`):** Chosen for its wide geometric aperture and open counters, maintaining pristine clarity even against dark textured glass backgrounds and low-light environments.
- **Micro-labels & Telemetry:** Always pair `Space Grotesk` with expanded letter-spacing (`0.04em` to `0.1em`) to simulate spatial HUD diagnostics and sensory readout panels.

## Layout & Spacing

The layout model implements a structured 12-column responsive fluid grid designed to float effortlessly inside large desktop viewports or scale cleanly to mobile and spatial head-mounted displays.

- **Desktop (>= 1200px):** 12 columns, `gutter: 1.5rem`, `margin: 3rem`, max content container width locked at `1440px`.
- **Tablet (768px - 1199px):** 8 columns, `gutter: 1.25rem`, `margin: 2rem`. Side panels collapse into progressive floating drawers.
- **Mobile (< 768px):** 4 columns, `gutter: 1rem`, `margin: 1.25rem`. Actions pinned to bottom touch-accessible command strips.

Layout rhythms rely on consistent multi-factor increments of `space-sm` (8px) and `space-md` (16px), giving floating interface panels breathability while preserving dense data clusters inside analytical telemetry cards.

## Elevation & Depth

Visual hierarchy uses a dual-axis layering technique: dark carbon grounding mixed with warm chromatic illumination.

1. **Flat Ambient (Base Layer):**
   - Background token: `#121110`. Zero shadow.
2. **Elevated Spatial Tier 1 (Module Cards, Feed Panes):**
   - Background token: Solid `#1C1A18` or translucent `rgba(28, 26, 24, 0.75)` with `backdrop-filter: blur(16px)`.
   - Edge: 1px border stroke with `rgba(255, 107, 0, 0.12)`.
   - Shadow: `0 8px 32px -4px rgba(0, 0, 0, 0.5)`.
3. **Elevated Spatial Tier 2 (Hover States, Popovers, Modals):**
   - Background token: `rgba(37, 34, 30, 0.9)` with `backdrop-filter: blur(24px)`.
   - Edge: 1px border stroke with `rgba(255, 107, 0, 0.28)`.
   - Shadow: `0 16px 40px -8px rgba(0, 0, 0, 0.65), 0 0 24px -2px rgba(255, 107, 0, 0.22)`.
4. **Active Luminescence (Hero CTA, Active Focal Points):**
   - Glow: Inset `0 1px 0 rgba(255, 255, 255, 0.35)`, outer drop glow `0 0 20px rgba(255, 107, 0, 0.45)`.

## Shapes

The geometric vocabulary balances modern ergonomics with high-tech solidity using level `2` roundedness:

- **Base Radii:** Standard interactive items (inputs, list items, small buttons) feature `0.5rem` (8px) corner rounding.
- **Large Container Radii:** Surface containers, viewport panes, and immersive media cards employ `1rem` (16px) to emulate rounded head-mounted display viewports and handheld controllers.
- **Precision Accents:** Nested chips, telemetry badges, and live indicator dots can utilize pill-shaped silhouettes (`9999px`) to create clear differentiation against rectilinear technical cards.

## Components

### Buttons
- **Primary:** Background `#FF6B00`, text `#121110` (extra bold readability), height `44px`, padding `0 1.5rem`, `border-radius: 0.5rem`. Hover state transitions to `#F97316` with a warm outer glow (`0 0 20px rgba(255, 107, 0, 0.4)`). Active state scales to `0.98`.
- **Secondary / HUD:** Translucent background `rgba(255, 107, 0, 0.08)`, border `1px solid rgba(255, 107, 0, 0.3)`, text `#FAF6F0`. On hover: border switches to `#FF6B00`, background to `rgba(255, 107, 0, 0.16)`.
- **Ghost:** Transparent background, text `#FAF6F0`, hover background `rgba(255, 255, 255, 0.05)`.

### Chips & Meta Tags
- Compact, uppercase `label-mono` typography.
- Filled variant: background `rgba(245, 158, 11, 0.15)`, text `#FBBF24`, border `1px solid rgba(245, 158, 11, 0.3)`.
- Live Status variant: features a pulsing `6px` circular amber dot (`#FF6B00`) preceding the label text.

### Form Inputs & Selectors
- Background `rgba(18, 17, 16, 0.8)`, border `1px solid #2E2A24`, text `#FAF6F0`, height `44px`, padding `0 1rem`, `border-radius: 0.5rem`.
- Focus state: border turns `#FF6B00`, flanked by an outer glow `0 0 0 3px rgba(255, 107, 0, 0.2)`. Placeholder color sits at `#78716C`.

### Selection Controls (Checkbox & Radio)
- Size `20px x 20px`, surface `#1C1A18`, border `1.5px solid #44403C`.
- Checked state: background `#FF6B00`, border `#FF6B00`, glyph icon `#121110`. Radio retains an inner dot of `#121110` inside the filled orange circle.

### Cards & Panels
- Structured with a `1px` gradient border (fading from `#FF6B00` at 30% to transparent at the bottom).
- Padding: `1.5rem` (`space-lg`).
- Cards host an optional contextual ambient header with subtle radial orange gradient bleeding through the top edge at 8% opacity.

### Immersive Extras: Spatial Viewport Scrim
- A floating HUD utility frame that encapsulates real-time 3D streams, camera feeds, or metaverse avatar portraits with four perimeter corner tick marks rendered in `#FBBF24`.