# DESIGN SYSTEM
## Premium Software Engineering — Digital Experience

Version: 1.2
Status: Approved Design Direction

> **Reference rule:** the implemented site is the official visual reference. This document records the approved implementation faithfully; it must never be used as a reason to alter the approved appearance. Where a value below describes the implementation, it was verified in `src/app/globals.css` and the components.
Language: Brazilian Portuguese (pt-BR)

---

# 1. PURPOSE

This document defines the official visual identity, interaction principles, interface standards, and design philosophy of this project.

It is the single source of truth for all visual and user experience decisions.

All developers, designers, and AI coding agents must follow this document when creating or modifying the website.

The current visual direction has been approved.

IMPORTANT:

- Do not replace the established visual identity with a different aesthetic.
- Do not introduce dark themes.
- Do not introduce neon colors.
- Do not redesign approved components unnecessarily.
- Do not alter the overall color system without a clear design justification and approval.

The objective is to continuously improve the experience while preserving its identity.

---

# 2. DESIGN PHILOSOPHY

The website represents a premium software engineering and digital product development company.

Its design must communicate: professionalism, trust, technical expertise, creativity, sophistication, innovation, accessibility, attention to detail, business credibility.

The visual experience must be: LIGHT, WELCOMING, ELEGANT, MODERN, REFINED, INTERACTIVE, HARMONIOUS, MEMORABLE.

The website must feel alive and engaging without becoming visually overwhelming. The design should communicate premium quality through precision and consistency. Avoid visual complexity without purpose.

Every design decision must contribute to: 1. Visual clarity 2. User experience 3. Brand consistency 4. Accessibility 5. Conversion 6. Performance

---

# 3. CREATIVE DIRECTION

The approved creative direction is: **PREMIUM LIGHT EXPERIENCE**

A sophisticated contemporary visual language combining:

- Warm light backgrounds
- Beautiful editorial typography
- Harmonious muted colors
- Elegant custom iconography
- Delicate borders
- Refined shadows
- Fluid microinteractions
- Carefully designed software interfaces
- Purposeful motion
- Spacious, balanced compositions

The aesthetic should feel like the work of a high-end digital product studio.

Avoid generic corporate templates. Avoid repetitive AI-generated layouts. Avoid exaggerated visual effects. The website should feel custom-designed.

---

# 4. OFFICIAL COLOR SYSTEM

Colors should be implemented through centralized design tokens.

## 4.1 Background and Surface Colors

| Token | Value | Usage |
|---|---|---|
| `--surface` | `#FFFFFF` | Main content areas, cards |
| `--bg` (Warm) | `#FAF9F6` | Page base, hero, welcoming sections |
| `--bg-2` (Cool) | `#F6F8FB` | Service areas, structured information |
| `--bg-3` (Soft Blue) | `#EDF4FA` | Feature sections, conversion areas, selected highlights |
| `--surface-2` | `#F1F5F9` | Inactive controls, table selection, bar tracks |

Avoid large areas of dark backgrounds.

## 4.2 Brand Colors

| Token | Value | Usage |
|---|---|---|
| `--accent` | `#3563A8` | Primary brand blue: primary buttons, links, selected states |
| `--accent-deep` | `#244A69` | Secondary brand blue: hover fill, deep text on blue surfaces |
| `--accent-soft` | `#E6EEF8` | Pale-blue indicator (navigation pill, active tabs, soft chips) |
| `--navy-soft` | `#E1E9F0` | Architecture tone surface |

The primary blue is the dominant brand accent. Do not overuse saturated blue surfaces.

## 4.3 Supporting Accent Colors

Each accent has a base color, a soft surface and a dark ink (for accessible text on the soft surface).

| Accent | Base | Soft | Ink |
|---|---|---|---|
| Sage Green | `#7DAA98` | `#E7F1EC` | `#3F6B58` |
| Muted Lavender | `#A89AC9` | `#EEEAF6` | `#6A5C96` |
| Warm Peach | `#E8B69D` | `#FBEEE6` | `#8F4F2F` |
| Muted Teal (automation) | `#6FA8AB` | `#E3F1F1` | `#2F6F73` |

Error text uses `--danger` `#9C432E` (on `#FBE9E4`; in the showcase badge `#873623` for contrast).

Tone mapping: custom software — blue; SaaS — lavender; applications — peach; management systems — sage; automation — teal; architecture — navy.

They create warmth and personality and appear in service icon backgrounds, technical illustrations, status indicators, interface details and small decorative elements. Distribute accents intentionally: do not use every accent in every section; avoid rainbow-like compositions; each section has a clear color hierarchy.

## 4.4 Text Colors

| Token | Value | Usage |
|---|---|---|
| `--text` | `#263241` | Primary text |
| `--muted` | `#4F5B6A` | Secondary text (body copy, leads) |
| `--dim` | `#5C6877` | Tertiary text (captions, metadata) |

The implemented secondary and tertiary values are deliberately deeper than the originally proposed `#687583` / `#87929E` so that text keeps WCAG AA contrast on tinted surfaces. These values are approved; no lighter text tokens exist. Do not use very light gray for important text.

## 4.5 Border Colors

| Token | Value | Usage |
|---|---|---|
| `--line` | `#E4E9EF` | Default border and dividers |
| `--line-strong` | `#D2DAE3` | Inputs, secondary buttons, emphasized dividers |

Interactive states change the border to the brand blue (`--accent`) or to an accent tone. Borders should be delicate; avoid thick, aggressive outlines.

---

# 5. COLOR USAGE RULES

Color must be used strategically. Recommended visual distribution (directional, not rigid):

- 75–85% neutral light surfaces
- 10–20% primary brand colors and tonal variations
- 5–10% supporting accent colors

Do not fill entire sections with multiple competing accent colors. Use color to communicate hierarchy, interaction, and meaning. Color must never be the only indicator of an important state.

---

# 6. TYPOGRAPHY SYSTEM

Typography is a primary element of the brand identity. The approved implementation uses **three font families**, loaded with `next/font`:

| Role | Family | CSS variable | Weights |
|---|---|---|---|
| Headlines and display text | Plus Jakarta Sans | `--font-jakarta` (`font-display`) | 500, 600 |
| Body and interface text | Geist | `--font-geist` (`font-sans`) | variable |
| Technical labels and metadata | IBM Plex Mono | `--font-plex-mono` (`font-mono`) | 400, 500 |

Typography should be elegant, readable, contemporary, confident, balanced and precise. Avoid overly aggressive font weights, excessive uppercase text and condensed typefaces. Do not add further families without approval.

---

# 7. TYPOGRAPHY SCALE

Fluid responsive scale implemented in `src/app/globals.css` (`@layer components`, so Tailwind utilities can still override):

| Class | Size | Line height | Tracking | Weight |
|---|---|---|---|---|
| `.t-display` (hero) | `clamp(2.5rem, 1rem + 5.3vw, 5.25rem)` | 1.04 | −0.032em | 500 |
| `.t-h1` (page title) | `clamp(2.25rem, 1.2rem + 3.8vw, 4.25rem)` | 1.06 | −0.028em | 500 |
| `.t-h2` (section) | `clamp(1.875rem, 1.1rem + 2.6vw, 3.125rem)` | 1.1 | −0.022em | 500 |
| `.t-h3` (card heading) | `clamp(1.25rem, 1.05rem + 0.8vw, 1.625rem)` | 1.2 | −0.015em | 600 |
| `.t-h4` | `1.125rem` | 1.3 | −0.015em | 500 |
| `.t-lead` | `clamp(1.0625rem, 0.98rem + 0.4vw, 1.3125rem)` | 1.5 | −0.01em | 400 |
| `.t-body` | `1rem` | 1.65 | — | 400 |
| `.t-small` | `0.875rem` | 1.55 | — | 400 |
| `.t-label` (mono) | `0.75rem` | 1.4 | 0.01em | 400 |

Headlines use tighter line heights; body text prioritizes readability. Avoid awkward text wrapping; use intentional line breaks in hero headlines. Software mockups may use 11–13px text, as real software does.

---

# 8. SPACING SYSTEM

Base unit: 4px.

Recommended tokens: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, 128 px.

Avoid arbitrary spacing values unless required by a specific visual composition.

Section padding (guidelines): desktop 96–144px; tablet 72–96px; mobile 56–80px. Maintain consistent visual rhythm.

---

# 9. LAYOUT SYSTEM

- Maximum content width: 1280px. Standard content width: 1120–1200px.
- Desktop gutters: 32–48px. Mobile gutters: 20–24px.
- Use CSS Grid and Flexbox appropriately.
- Favor intentional asymmetric compositions. Avoid centering every section. Avoid identical layouts throughout the website.

Create rhythm through alignment, whitespace, typography, visual density, background variation, component proportions.

---

# 10. NAVIGATION DESIGN

The navigation is a signature component. It must feel refined and carefully crafted.

**Appearance:** light background, elegant wordmark, balanced spacing, subtle border treatment, clear typography, premium primary CTA.

**Hover interaction:** a smooth, softly colored hover indicator (preferred: pale blue) that transitions fluidly between items. No aggressive scaling, excessive shadows, or distracting animations.

**Active state:** the current page must be identifiable (soft background, brand-colored text, optional subtle indicator). Do not rely only on color.

**Sticky navigation:** may remain visible while scrolling, with a subtle background and border transition. Avoid excessive backdrop blur.

**Mobile navigation:** smooth opening, clear hierarchy, large touch targets, elegant typography, comfortable spacing, visible focus states, accessible keyboard behavior.

---

# 11. BUTTON SYSTEM

**Primary:** background `#3563A8`, text `#FFFFFF`; comfortable padding, medium weight, refined radius, clear hover state, elegant arrow icon when appropriate, smooth transitions.

**Secondary:** transparent or white background, text `#263241`, border `#E4E9EF`; hover: soft blue background or refined border change.

**Shape:** buttons are pill-shaped (`rounded-full`), minimum height 48px. Primary hover fills upward with `--accent-deep`; secondary hover fills with `--bg-3`.

**Allowed interactions:** subtle arrow translation, background/border color transition, gentle shadow refinement.

**Avoid:** bouncing, large scaling, excessive glowing, multiple simultaneous effects.

---

# 12. BORDER RADIUS SYSTEM

The approved system, as implemented:

| Use | Radius |
|---|---|
| Buttons, navigation container, navigation indicator, tabs (showcase and solution selectors), badges, status chips | Pill (`rounded-full`) — **approved identity pattern** |
| Inputs, small controls inside mockups | 12px (`--r-md`) or 8px (`--r-sm`) |
| Cards, table wrappers, alert boxes | 16–24px |
| Large showcase stages and feature panels | 24–28px (`rounded-[1.5rem]`–`[1.75rem]`) |
| Mockup application frames | 16–20px |
| Icon tiles | 12–24px depending on size |

Pill shapes for buttons and tabs are part of the approved identity and must be preserved. Maintain consistency within each component type.

---

# 13. SHADOW AND BLUR SYSTEM

Shadows create subtle depth. Two custom levels are implemented (Tailwind `shadow-soft` and `shadow-lift`):

- **Soft** (`--sh-soft`): `0 1px 2px rgba(38, 50, 65, 0.04), 0 10px 30px -14px rgba(36, 74, 105, 0.16)` — navigation container, active tabs, small raised elements.
- **Lift** (`--sh-lift`): `0 2px 4px rgba(38, 50, 65, 0.04), 0 22px 48px -18px rgba(36, 74, 105, 0.26)` — software mockup frames, the hero composition, the conversion checklist card.

Use sparingly. Prefer borders and background contrast for most component separation.

**Backdrop blur (as implemented):**

- Sticky navigation background layer: `bg-bg/85` + `backdrop-blur-md` (a separate absolutely positioned layer, so the blur does not trap the fixed mobile menu).
- Hero service strip: `bg-surface/60` + `backdrop-blur-sm`.
- Software showcase tab selector: `bg-surface/80` + `backdrop-blur`.

Blur is limited to these three places. Do not extend it elsewhere.

---

# 14. ICONOGRAPHY

Preferred foundation: Lucide React.

Principles: consistent stroke width, clear visual meaning, harmonious sizing, optical alignment, refined color usage, consistent container proportions. Use soft accent backgrounds when appropriate.

Examples: SaaS — muted lavender; management systems — sage green; applications — warm peach; custom software — soft blue.

No emoji icons. No random icon styles. Do not mix filled and outlined icons without clear justification.

---

# 15. CARD DESIGN

Light surfaces, delicate borders, balanced internal spacing, strong typography hierarchy, carefully selected accent details, restrained hover effects.

Avoid creating every section as a collection of identical cards. Cards only when they improve information grouping. Consider editorial layouts for more important content.

---

# 16. HERO DESIGN

The hero establishes the website's visual and commercial positioning: welcoming, sophisticated, memorable, clear, visually impressive.

Use a light background. Combine a large editorial headline, clear supporting copy, strong CTA, secondary action, a beautiful software interface composition, and refined visual details.

Avoid generic floating dashboard cards. Use believable software interface mockups. Animation must support the presentation and not distract from the headline.

---

# 17. SOFTWARE INTERFACE SHOWCASE

A signature visual feature. It demonstrates the types of products the company can develop.

Categories: Gestão Empresarial · Pedidos e Vendas · Plataforma SaaS.

Mockups use real React components where practical, with realistic UI patterns: navigation sidebars, data tables, status indicators, charts, operational metrics, customer lists, filters, activity timelines. They must feel like legitimate professional software products, use the approved palette, and introduce accent colors through meaningful interface elements.

Do not fabricate client projects. Conceptual demonstrations must be identified as such.

---

# 18. MOTION DESIGN

Subtle and purposeful. Preferred library: Motion for React.

Use animation to reinforce hierarchy, communicate state changes, guide attention, improve perceived responsiveness, create continuity.

Durations: microinteractions 150–250ms; component transitions 250–400ms; section reveals 400–650ms. Avoid unnecessarily long animations. Consistent easing curves. Respect `prefers-reduced-motion`. No scroll hijacking. Do not animate large areas continuously.

---

# 19. HOVER STATES

Possible effects: subtle background changes, border color transitions, small icon translation, underline animations, gentle elevation, soft accent highlights.

Avoid excessive scaling, unnecessary icon rotation, and complex distracting effects. Every hover effect needs a clear interaction purpose. On touch devices, essential information must remain accessible without hover.

---

# 20. SECTION DESIGN

Strong visual rhythm. Alternate between white, warm off-white, soft cool-white, and very light blue sections. Avoid abrupt color changes; use thoughtful transitions.

Possible patterns: editorial split layouts, asymmetric grids, large interface showcases, numbered service lists, technical process timelines, typography-led statements, conversion panels.

Do not repeat identical section structures.

---

# 21. FORM DESIGN

Clear labels, comfortable input heights, subtle borders, visible focus states, helpful validation, accessible error messages, professional success states. No placeholder-only labels. Inputs integrated with the design system.

Forms must provide real functionality when connected to a submission service. Never simulate successful submissions without actual delivery.

---

# 22. RESPONSIVE DESIGN

Desktop: full editorial compositions. Tablet: adapted grids and typography. Mobile: purpose-built vertical compositions — not a compressed desktop layout.

Pay special attention to navigation, hero typography, software previews, buttons, cards, section spacing, touch interactions, text wrapping. Avoid horizontal overflow.

---

# 23. ACCESSIBILITY

Target WCAG 2.2 AA: semantic HTML, correct heading hierarchy, keyboard navigation, visible focus indicators, accessible color contrast, reduced motion support, proper labels, accessible forms, screen-reader compatibility, adequate touch targets.

---

# 24. PERFORMANCE

Prioritize optimized images, efficient fonts, minimal JavaScript, Server Components where appropriate, lightweight animations, reduced layout shifts, efficient CSS, lazy loading when appropriate. Avoid unnecessary dependencies and heavy decorative libraries. Keep animations GPU-friendly.

---

# 25. CONTENT AND BRAND VOICE

All user-facing content in professional Brazilian Portuguese. Tone: clear, confident, warm, professional, intelligent, direct, business-oriented. Avoid generic marketing clichés.

Do not invent: testimonials, clients, awards, certifications, company metrics, years of experience, portfolio projects. Use verified information.

---

# 26. COMPONENT CONSISTENCY

Before creating a new component:

1. Check whether a similar component exists.
2. Reuse established design tokens.
3. Follow approved typography rules.
4. Follow approved spacing rules.
5. Use consistent border radii.
6. Use established interaction patterns.
7. Ensure accessibility.
8. Test responsive behavior.

Do not create multiple inconsistent versions of the same component. Avoid unnecessary abstractions. Maintain clean, understandable code.

---

# 27. DESIGN PROTECTION RULES

Mandatory for AI coding agents. The current visual identity is approved.

DO NOT: replace the color palette; introduce dark sections without approval; introduce neon effects; replace the typography system; redesign the navigation unnecessarily; change established button styles arbitrarily; introduce inconsistent icons; add excessive animations; create generic card-heavy layouts; replace premium components with basic defaults; modify unrelated sections; remove existing visual refinements.

DO: respect existing design tokens; reuse established components; preserve visual consistency; improve accessibility; maintain responsive quality; keep animations refined; follow established spacing rules; preserve approved visual compositions.

If a requested feature requires a significant visual change, explain the proposed change before implementing it.

---

# 28. AI DEVELOPMENT WORKFLOW

When Claude Code or another AI coding agent receives a development request:

1. Read this DESIGN_SYSTEM.md file.
2. Inspect relevant existing components.
3. Identify established design patterns.
4. Plan changes using the existing visual system.
5. Implement only necessary modifications.
6. Check desktop and mobile layouts.
7. Verify visual consistency.
8. Run available technical validation.
9. Report completed changes.

Never redesign the website when the request only involves adding functionality. Preserve the identity.

---

# 29. VISUAL QUALITY CHECKLIST

Before completing any visual change, verify:

- Does the result match the approved palette?
- Is the typography consistent?
- Are spacing values harmonious?
- Are icons visually consistent?
- Are borders subtle?
- Are shadows refined?
- Are animations purposeful?
- Is the navigation preserved?
- Does mobile look intentional?
- Are hover states consistent?
- Is accessibility maintained?
- Does the result feel premium?
- Does the change improve the website?

If any answer reveals a problem, refine the implementation.

---

# 30. FINAL DESIGN PRINCIPLE

Premium design is not created through the quantity of effects. It is created through the quality of every decision.

Maintain: LIGHT BACKGROUNDS · WARM VISUAL ATMOSPHERE · HARMONIOUS COLORS · REFINED TYPOGRAPHY · BEAUTIFUL ICONOGRAPHY · PURPOSEFUL ANIMATIONS · PREMIUM SOFTWARE INTERFACES · CONSISTENT COMPONENTS · EXCELLENT RESPONSIVENESS · PROFESSIONAL ENGINEERING.

The approved visual identity must remain consistent as the project evolves.

# 31. OFFICIAL BRAND IDENTITY — GC-SYS

**Company name:** GC-Sys (always written "GC-Sys": capital G, capital C, hyphen, capital S, lowercase "ys"). Defined in `src/config/site.ts` (`siteConfig.name`); never hard-code the name elsewhere.

**Official logo:** the supplied brand assets in `public/branding/`:

| File | Description |
|---|---|
| `gc-sys-horizontal.png` | Original horizontal logo, 1774×502, opaque black background (source artwork, do not use directly on the site) |
| `gc-sys-vertical.jpeg` | Original vertical logo, 1254×789, JPEG with dark navy background (source artwork; no transparent version exists yet) |
| `gc-sys-horizontal-transparent.png` | Horizontal logo with background removed, 720×134, used in navigation, footer and Open Graph image |
| `gc-sys-symbol-transparent.png` | The G symbol only, background removed, source for the favicon |

The transparent versions were derived from the originals by removing the connected dark background only; logo colors, metallic gradients and circuit details are untouched. The originals must be kept as the source of truth. If an official transparent or vector (SVG) logo is supplied, it replaces the derived files.

**Brand symbol:** a technological "G" with integrated circuit details — a metallic silver G with a blue arc and circuit lines.

**Brand colors (in the logo artwork only):** metallic silver and technological blue. These colors belong to the artwork. They **do not** replace or extend the website's design tokens; the approved palette (section 4) is unchanged.

**Usage in the interface:**

- Navigation: horizontal logo, height 32px (`h-8`), width automatic, links to the home page, alt text "GC-Sys", link label "GC-Sys — página inicial".
- Footer: horizontal logo, height 36px.
- Favicon / app icon: the G symbol on a white rounded tile with a `--line-strong` hairline (`src/app/icon.png`, `apple-icon.png`, `favicon.ico`). The full wordmark is never used as a favicon.
- Open Graph image: horizontal logo on the warm-to-soft-blue gradient.

**Logo usage rules:**

1. **Proportional scaling:** set only height (or only width); never stretch. Aspect ratio of the horizontal logo is 720:134.
2. **Clear space:** keep free space around the logo equal to at least half of its height on all sides.
3. **Light backgrounds only:** use the transparent logo on `#FFFFFF`, `#FAF9F6`, `#F6F8FB` or `#EDF4FA`. Never place the opaque original (black rectangle) on the site.
4. **Minimum legibility:** horizontal logo no smaller than 24px tall (about 130px wide); the symbol no smaller than 16px in favicons.
5. **No distortion**, rotation or cropping of the wordmark.
6. **No unauthorized recoloring:** do not tint, invert or apply color overlays or blend modes.
7. **No artificial shadows, glows or outlines** added around the logo.
8. **No unnecessary filters** (blur, opacity, grayscale) and no animation of the logo.
9. Do not recreate the logo in code or change its typography.

---

END OF DESIGN SYSTEM.
