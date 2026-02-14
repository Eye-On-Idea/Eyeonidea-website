# Eye On Idea - UX Streamlining & Design Consistency Plan

> **Created**: 2026-02-14
> **Status**: Awaiting Phase 1 Decisions
> **Scope**: Animation consistency, component architecture refactoring, glass morphism refinement, design pattern cohesion
> **Estimated files affected**: ~25 modified, 2-4 deleted, 3-5 new base components

---

## How to Use This Plan

### Tracking Progress
- Each task has a checkbox `[ ]`. Mark as `[x]` when complete.
- Tasks marked **[DISCUSS]** require user input before any code is written.
- Tasks within a phase should be completed in order unless noted otherwise.
- You may pause after any completed task and resume later - note the Phase and Task number.

### Collaboration Rules
1. **No content, text, or information shall be created without prior discussion and explicit agreement.**
2. At every **[DISCUSS]** checkpoint, the implementer must ask the user questions to determine wants, needs, and preferences.
3. Any fictitious information, placeholder copy, or assumed content is strictly prohibited without prior agreement.
4. This is a collaboration - insights emerge from questions and debate. Challenge assumptions.
5. When resuming work, re-read this plan and confirm the current phase/task before proceeding.

### Progress Legend
- `[ ]` - Not started
- `[x]` - Complete
- `[~]` - In progress / partially done
- `[!]` - Blocked (needs discussion or dependency)

---

## Table of Contents

1. [Context & Problem Statement](#context--problem-statement)
2. [Current State Audit](#current-state-audit)
3. [Research Findings](#research-findings)
4. [Phase 1: Audit Decisions (All DISCUSS)](#phase-1-audit-decisions)
5. [Phase 2: Foundation - Animation Infrastructure](#phase-2-foundation)
6. [Phase 3: Component Architecture Refactoring](#phase-3-component-architecture)
7. [Phase 4: Glass Morphism Refinement](#phase-4-glass-morphism-refinement)
8. [Phase 5: Global Animation Consistency](#phase-5-global-animation-consistency)
9. [Phase 6: Page-Specific Enhancements](#phase-6-page-specific-enhancements)
10. [Phase 7: Performance & Accessibility Audit](#phase-7-performance--accessibility)
11. [Phase 8: Final Review & Testing](#phase-8-final-review--testing)
12. [Appendix: File Inventory](#appendix-file-inventory)

---

## Context & Problem Statement

The Eye On Idea website aims to showcase premium web consultancy capabilities through its own UX/UI. The current implementation suffers from:

1. **Animation system fragmentation** - 4 competing patterns, 2 of which are unused dead code
2. **Inconsistent feature distribution** - advanced effects appear on some pages but not others
3. **Stagger timing chaos** - increments vary from 50ms to 200ms with no rhythm
4. **Component duplication** - Hero, CTA, PackageCard, Breadcrumb components repeated 2-4x
5. **Glass morphism overuse** - applied broadly where selective use would create stronger hierarchy
6. **No unified design language** - the site feels like multiple micro-sites assembled together

### User Decisions Made
- **Magnetic buttons**: Rethink as scale-only (no position shift), hero CTAs only
- **TextReveal**: Extend to ALL page heroes for brand consistency
- **ParticleWaves 3D**: Home only (remove from About)
- **Scope**: Broader redesign including component architecture and glass morphism refinement
- **Glass morphism**: Reduce to key focal areas, research complementary design patterns (minimalism, selective brutalism)
- **Priority**: All pages treated equally

---

## Current State Audit

### Animation System Fragmentation

| Pattern | Used In | Mechanism | Status |
|---------|---------|-----------|--------|
| Manual IntersectionObserver + CSS class | Home (Hero, About, CTA, Services), Contact (Hero, Info, Form), Services (Hero), Legal, Policies | `isVisible` ref + `.animate-in` CSS | **Active - 10+ components** |
| `v-motion` + `useAccessibleMotion` | About (Hero, Story, Values, Founder, Location, CTA), News components | Declarative `v-motion` directives | **Active - 11+ components** |
| `useScrollAnimation` composable | None | 4 exported functions, 0 imports | **Dead code** |
| `useStaggeredScrollAnimation` | None | Container-level stagger | **Dead code** |

### Stagger Timing Inconsistency

| Component | Base | Increment | Notes |
|-----------|------|-----------|-------|
| Home AboutSection cards | 100ms | +100ms | |
| Home ServicesSection | 100ms | +100ms then +200ms jump | Inconsistent within itself |
| Contact Info cards | 100ms | +50ms | Different increment |
| About Values | 350ms | +120ms | Late start |
| About Story | 300ms | +150ms | Late start |
| Services CMS cards | 50ms | +50ms | Fast |
| TextReveal words | 60-80ms | varies | Nearly consistent |
| StrokeDraw icons | 80-150ms | varies | Inconsistent |

### Advanced Feature Distribution Matrix

| Feature | Home | About | Services | Contact | Process | Legal/Policies | News |
|---------|:----:|:-----:|:--------:|:-------:|:-------:|:--------------:|:----:|
| TextReveal | Yes | Yes | Yes | No | No | No | No |
| ParticleWaves 3D | Yes | Yes | - | - | - | - | - |
| v-magnetic | Yes | Yes | Yes | - | - | - | - |
| StrokeDraw | Yes | Yes | - | Yes | Yes | - | - |
| Parallax | - | Yes | - | - | - | - | - |
| TiltCard | - | Yes | - | - | - | - | - |
| LiquidGlass | - | Yes | - | - | - | - | - |
| AnimatedCounter | - | - | Yes | - | - | - | - |
| SectionNav | - | - | Yes | - | - | - | - |
| BeforeAfter | - | - | Yes | - | - | - | - |
| Skeleton loading | - | - | - | - | - | - | Yes |

### Component Duplication Analysis

| Pattern | Instances | Lines Duplicated | Files |
|---------|-----------|-----------------|-------|
| Hero sections | 6 components | ~400 lines shared | `home/HeroSection`, `about/Hero`, `services/Hero`, `contact/Hero`, `process/Hero`, `news/Hero` |
| CTA sections | 4 components | ~650 lines shared | `home/CTASection`, `about/CTA`, `services/CTA`, `process/CTA` |
| PackageCard | 2 components | ~300 lines shared | `home/PackageCard`, `services/PackageCard` |
| Breadcrumb | 2 components | ~100 lines shared | `news/Breadcrumb`, `client-hub/Breadcrumb` |
| Button styles | 10+ components | ~200+ lines scattered | Inline across CTAs, heroes, sections |
| IntersectionObserver | 30+ components | ~15 lines each = 450+ | Inline boilerplate |

**Estimated reduction**: 1,500-2,000 lines of code through consolidation.

---

## Research Findings

### Glass Morphism: When to Use & When Not To

**Use glass morphism for** (sources: [NNGroup](https://www.nngroup.com/articles/glassmorphism/), [IxDF](https://www.interaction-design.org/literature/topics/glassmorphism)):
- Establishing visual hierarchy over complex/gradient backgrounds
- Overlay components (modals, contextual menus, floating panels)
- Navigation elements that float over content
- Featured/spotlight cards that need to pop
- Virtual/mixed-reality-style interfaces

**Do NOT use glass morphism for** (sources: [NNGroup](https://www.nngroup.com/articles/glassmorphism/), [Axess Lab](https://axesslab.com/glassmorphism-meets-accessibility-can-frosted-glass-be-inclusive/)):
- Every card or container (dilutes the effect, hurts readability)
- Components over simple, single-color backgrounds (no visual payoff)
- Text-heavy content areas (transparency hurts reading flow)
- Small, repeated elements like tags or badges
- Mobile-first interfaces where `backdrop-filter` has performance cost

**Key principle**: "Use glass for only a few key elements. Stick to navigation bars, primary buttons, or important cards, not every component on the screen." ([NNGroup](https://www.nngroup.com/articles/glassmorphism/))

### Minimalism + Glass: Complementary Patterns

Glass morphism naturally pairs with minimalism - both emphasize clean lines and intentional use of space. The approach: minimalist solid surfaces as the default, glass as the accent for elements that need visual hierarchy.

**Sources**: [Alpha Efficiency](https://alphaefficiency.com/glassmorphism-ui), [Ramotion](https://www.ramotion.com/blog/what-is-glassmorphism/)

### Nordic/Scandinavian Design Alignment

Scandinavian design emphasizes:
- Functional minimalism with generous white space
- Natural, muted color palettes (earth tones, wood, stone)
- Clean typography with strong hierarchy
- Intentionality - every element earns its place
- Human-centered, authentic design over decoration

This aligns well with reducing glass morphism to intentional accent points and adopting cleaner, more minimal sections elsewhere.

**Sources**: [Awwwards](https://www.awwwards.com/), [WebFX](https://www.webfx.com/blog/web-design/modern-web-design/), [Colorlib](https://colorlib.com/wp/portfolio-design-trends/)

### 2025-2026 Agency Portfolio Trends

- Asymmetric layouts with generous white space
- Nature-distilled color palettes (muted earthy tones)
- Mix of digital polish with authentic/handmade elements
- Bold typography as a design element itself
- Intentional animation (motion with purpose, not decoration)

**Sources**: [Designmodo](https://designmodo.com/web-design-trends/), [Wix Trends](https://www.wix.com/blog/web-design-trends), [Framer](https://www.framer.com/blog/web-design-trends/)

### Vue 3 Component Architecture

Key patterns for reducing duplication:
- **Base components with slots**: `BaseHero`, `BaseCTA` with content slots
- **Composable extraction**: Shared logic in `use*` functions
- **Options object pattern**: Composables accept config objects for flexibility
- **Provide/inject**: Share state deeply without prop drilling

**Sources**: [Vue.js Docs](https://vuejs.org/guide/reusability/composables.html), [Vue Mastery](https://www.vuemastery.com/blog/coding-better-composables-1-of-5/), [Michael Thiessen](https://michaelnthiessen.com/composable-patterns-in-vue)

---

## Phase 1: Audit Decisions

Every task in this phase requires discussion before proceeding to implementation.

### Task 1.1 [DISCUSS] - Magnetic Effect Rethink
- [ ] Design scale-only proximity effect for hero CTAs

**Agreed**: Rethink as scale-only micro-interaction (no position shift), applied only to hero CTA buttons.

**Implementation approach**: Modify `plugins/magnetic.ts` to apply `transform: scale(1.02)` on proximity instead of `translate()`. Remove `v-magnetic` from non-hero CTA buttons (about/CTA, services/CTA, process/CTA). Keep only on hero sections.

**Files to modify**:
- `plugins/magnetic.ts` - rewrite to scale-only
- `components/home/HeroSection.vue` - keep `v-magnetic` (2 buttons)
- `components/home/CTASection.vue` - remove `v-magnetic` (2 buttons)
- `components/about/CTA.vue` - remove `v-magnetic` (2 buttons)
- `components/services/CTA.vue` - remove `v-magnetic` (2 buttons)

**[DISCUSS]**: Should the scale amount be `1.02` (subtle) or `1.04` (more noticeable)? Should there be a subtle box-shadow expansion accompanying the scale?

---

### Task 1.2 [DISCUSS] - Animation System Consolidation
- [ ] Agree on single animation approach

**Recommendation**: Standardize on `v-motion` + `useAccessibleMotion`.

**Rationale**:
- Already a dependency, well-adopted (11+ components)
- Declarative (2 template attributes vs 15 lines boilerplate)
- Built-in IntersectionObserver, reduced-motion support
- Reference implementation already exists: `components/about/Hero.vue`

**Migration scope**: 10 components currently using manual IntersectionObserver.

**[DISCUSS]**: Are there any concerns about `v-motion` behavior that have been observed? Any edge cases where the manual approach was preferred?

---

### Task 1.3 [DISCUSS] - Stagger Timing Standards
- [ ] Establish stagger rhythm constants

**Recommendation**: Three standardized stagger timings:

| Type | Increment | Use Case |
|------|-----------|----------|
| `STAGGER_CARD` | 100ms | Cards, sections, list items |
| `STAGGER_TEXT` | 60ms | TextReveal word-by-word |
| `STAGGER_ICON` | 120ms | StrokeDraw SVG icons |

**Reference**: [Material Design Motion](https://m3.material.io/styles/motion/overview) recommends 50-100ms stagger offsets.

---

### Task 1.4 [DISCUSS] - Glass Morphism Reduction Strategy
- [ ] Define which elements keep glass vs which become solid/minimal

**Recommendation based on research**: Glass morphism should be reserved for:

| Keep Glass | Rationale |
|-----------|-----------|
| Site header/navigation | Floats over content, benefits from depth |
| Hero overlay cards | Visually layered over gradients/particles |
| Featured/spotlight cards (1 per section max) | Creates hierarchy within card grids |
| Modal/overlay panels (cookie banner, contact panel) | Overlays need glass to show context beneath |
| Color mode toggle area | Small, intentional accent |

| Switch to Solid/Minimal | Rationale |
|------------------------|-----------|
| Standard content cards (services, news posts) | Glass over solid bg has no payoff |
| Pricing/package cards | Text-heavy, readability priority |
| Form containers | Input focus needs clean background |
| Info/stat cards | Simple data, doesn't need depth effect |
| Footer | Bottom of page, no content beneath to blur |
| Legal/policies content | Reading-focused, solid bg is clearer |

**[DISCUSS]**: Do you agree with this split? Are there specific elements you feel strongly about keeping glass or removing glass from? What about the CTA sections - should they retain glass or go minimal?

---

### Task 1.5 [DISCUSS] - Complementary Design Pattern for Non-Glass Areas
- [ ] Define the visual language for solid/minimal areas

**Options based on research**:

**Option A - Clean Minimalism** (Nordic-aligned)
- Solid white/dark surfaces with generous spacing
- Bold typography as the primary design element
- Subtle borders (`1px solid var(--glass-border-subtle)`) for definition
- Color accents through text and small elements, not containers
- Aligns with Scandinavian design philosophy

**Option B - Warm Minimalism with Texture**
- Solid surfaces with very subtle background textures/patterns
- Earthy, muted tones from the existing palette
- Slight shadow depth (`box-shadow`) instead of glass blur
- Photography and illustration as hero visual elements

**Option C - Selective Brutalist Accents**
- Bold, oversized typography for headings
- High-contrast section dividers
- Raw, confident layout with deliberate asymmetry
- Mixed with glass on key focal elements for contrast

**[DISCUSS]**: Which direction resonates? These can be combined - for instance, clean minimalism as the base with selective brutalist typography on headings.

---

### Task 1.6 [DISCUSS] - Component Architecture: Base Components
- [ ] Agree on which base components to extract

**Recommended new base components** (reduces ~1,500 lines of duplication):

| Component | Consolidates | Estimated Lines Saved |
|-----------|-------------|----------------------|
| `BaseHero.vue` | 4 similar hero components (services, contact, process + pattern for others) | ~400 |
| `BaseCTASection.vue` | 3 CTA sections (about, services, process) | ~450 |
| `PackageCard.vue` (unified) | 2 PackageCard implementations | ~300 |
| `Breadcrumb.vue` (unified) | 2 Breadcrumb implementations | ~70 |
| `SectionHeader.vue` | Badge + title + subtitle pattern repeated in 8+ sections | ~200 |

**[DISCUSS]**:
- Should `BaseHero.vue` be a full component or a composable that provides shared logic while keeping templates separate?
- The home hero is significantly more complex (TextReveal + particles + scroll indicator) - should it remain standalone while simpler heroes share a base?
- For `BaseCTASection.vue` - the home CTA is also unique (contact info, social links). Should it stay standalone?

---

### Task 1.7 [DISCUSS] - CustomCursor: Confirm Removal
- [ ] Confirm CustomCursor stays unmounted

**Current state**: `CustomCursor.vue` exists but is NOT mounted anywhere. `useCursorFollow` composable is used only in `about/Values.vue` for cursor-following shine effect.

**Recommendation**: Delete `CustomCursor.vue` component. Keep `useCursorFollow` composable for the Values shine effect only.

**References**:
- [NNGroup on Custom Cursors](https://www.nngroup.com/articles/mouse-pointers/) - custom cursors reduce usability
- [Web.dev INP](https://web.dev/articles/inp) - continuous pointer tracking impacts responsiveness

---

### Task 1.8 [DISCUSS] - LiquidGlass: Confirm Single Use
- [ ] Confirm LiquidGlass stays on Founder photo only

Used only in `components/about/Founder.vue` on the founder photo. Intentional spotlight effect.

---

### Task 1.9 [DISCUSS] - Dead Code Inventory
- [ ] Confirm removal of unused code

| Item | Location | Reason |
|------|----------|--------|
| `useScrollAnimation.ts` | `composables/` | 0 imports across entire codebase |
| `useStaggeredScrollAnimation` | Within `useScrollAnimation.ts` | Same file, 0 imports |
| `CustomCursor.vue` | `components/` | Not mounted anywhere |
| `hoverEffect="tilt"` code path in GlassCard | `components/GlassCard.vue` | No component ever passes this prop |

---

## Phase 2: Foundation - Animation Infrastructure

*Prerequisites: Phase 1 decisions approved.*

### Task 2.1 - Rewrite Magnetic Plugin to Scale-Only
- [ ] Modify `plugins/magnetic.ts`: replace `translate()` transform with `scale()` on proximity
- [ ] Apply only when `v-magnetic` is present (no behavior change to directive registration)
- [ ] Remove `v-magnetic` from non-hero CTAs:
  - [ ] `components/home/CTASection.vue` (2 buttons)
  - [ ] `components/about/CTA.vue` (2 buttons)
  - [ ] `components/services/CTA.vue` (2 buttons)
- [ ] Keep `v-magnetic` on `components/home/HeroSection.vue` (2 buttons)
- [ ] Test: hover over hero CTAs confirms scale effect, no position shift

### Task 2.2 - Remove Dead Code
- [ ] Delete `composables/useScrollAnimation.ts`
- [ ] Delete `components/CustomCursor.vue` (if approved in 1.7)
- [ ] Remove `hoverEffect="tilt"` dead code path from `components/GlassCard.vue`
- [ ] Verify no imports break (search for import references)

### Task 2.3 - Add Stagger Constants to useAccessibleMotion
- [ ] Add to `composables/useAccessibleMotion.ts`:
  ```typescript
  export const STAGGER_CARD = 100   // ms per card/section item
  export const STAGGER_TEXT = 60    // ms per word in TextReveal
  export const STAGGER_ICON = 120   // ms per SVG icon stroke-draw
  ```
- [ ] Add helper function:
  ```typescript
  export function staggeredFadeInUp(index: number, baseDelay = 0) {
    return withDelay(animationPresets.fadeInUp, baseDelay + index * STAGGER_CARD)
  }
  ```
- [ ] Update TextReveal default stagger prop to use `STAGGER_TEXT`
- [ ] Update StrokeDraw calls to use `STAGGER_ICON`

---

## Phase 3: Component Architecture Refactoring

*Prerequisites: Phase 2 complete, architecture decisions from 1.6 approved.*

### Task 3.1 - Create BaseHero Component
- [ ] Create `components/base/BaseHero.vue` with:
  - Props: `badge`, `title`, `subtitle`, `minHeight`, `showTextReveal`, `textRevealDelay`
  - Slots: `#background` (for particles, parallax), `#title` (override), `#after-subtitle` (for CTAs, scroll indicators)
  - Built-in: gradient background, dot pattern, v-motion entrance animation
- [ ] Refactor `components/services/Hero.vue` to use BaseHero
- [ ] Refactor `components/contact/Hero.vue` to use BaseHero
- [ ] Refactor `components/process/Hero.vue` to use BaseHero
- [ ] Verify all three pages render identically before/after
- [ ] **Note**: Home hero and About hero stay standalone (too unique for base component)
- [ ] **Note**: News hero stays standalone (featured post layout is unique)

### Task 3.2 - Create BaseCTASection Component
- [ ] Create `components/base/BaseCTASection.vue` with:
  - Props: `badge`, `title`, `description`, `primaryCta` (text + link), `secondaryCta` (text + link)
  - Slots: `#extra` (for additional content like contact info)
  - Built-in: v-motion visible-once entrance, consistent stagger timing
- [ ] Refactor `components/about/CTA.vue` to use BaseCTASection
- [ ] Refactor `components/services/CTA.vue` to use BaseCTASection
- [ ] Refactor `components/process/CTA.vue` to use BaseCTASection
- [ ] **Note**: Home CTASection stays standalone (unique layout with contact info, social links)

### Task 3.3 - Unify PackageCard Component
- [ ] Merge `components/home/PackageCard.vue` and `components/services/PackageCard.vue`
- [ ] Keep the more featured version (services) as the single implementation
- [ ] Add props to handle the differences (e.g., `compact` mode for home page)
- [ ] Update `components/home/ServicesSection.vue` to use unified PackageCard
- [ ] Update `components/services/PackagesSection.vue` to use same component
- [ ] Verify both pages render correctly

### Task 3.4 - Unify Breadcrumb Component
- [ ] Merge `components/news/Breadcrumb.vue` and `components/client-hub/Breadcrumb.vue`
- [ ] Create single `components/base/Breadcrumb.vue` with optional formatter prop
- [ ] Update news pages to use unified Breadcrumb
- [ ] Update client-hub pages to use unified Breadcrumb

### Task 3.5 - Create SectionHeader Component
- [ ] Create `components/base/SectionHeader.vue` for the repeated badge + title + subtitle pattern
- [ ] Props: `badge`, `title`, `subtitle`, `align` (left/center), `size` (sm/lg)
- [ ] Identify sections using this pattern and migrate (at least 8 sections across pages)
- [ ] **[DISCUSS]**: Which sections should be migrated? Review list with user.

### Task 3.6 - Extract Button Component (Optional - DISCUSS)
- [ ] **[DISCUSS]**: Button styles are scattered across 10+ components. Should we:
  - **A**: Create `components/base/CtaButton.vue` with `variant` prop (primary/secondary/ghost)
  - **B**: Keep as CSS utility classes but consolidate in `main.css`
  - **C**: Use Nuxt UI's `UButton` component more consistently

---

## Phase 4: Glass Morphism Refinement

*Prerequisites: Phase 1 Task 1.4 and 1.5 decisions approved.*

### Task 4.1 [DISCUSS] - Define Glass vs Solid Zones Per Page
- [ ] Create a visual map (or list) of every element currently using glass effect
- [ ] For each element, classify as "keep glass" or "switch to solid"
- [ ] Get user approval on the classification before making changes

### Task 4.2 - Implement Solid Card Variant
- [ ] Add `variant` prop to `GlassCard.vue`: `"glass" | "solid" | "outlined"`
- [ ] `solid`: Clean surface with subtle border, no backdrop-filter
- [ ] `outlined`: Transparent bg with border only (lightest weight)
- [ ] Maintain existing hover effects (lift, glow) for all variants

### Task 4.3 - Apply Glass Reduction
- [ ] Apply glass/solid decisions from Task 4.1 across all components
- [ ] Verify visual hierarchy is maintained without glass
- [ ] Ensure dark mode still works correctly for solid variants
- [ ] **[DISCUSS]**: Preview each page with user for approval

### Task 4.4 - Define Non-Glass Visual Language
- [ ] Based on decision from Task 1.5 (minimalism / texture / brutalist accents):
  - [ ] Update CSS custom properties if needed for new surface styles
  - [ ] Create utility classes for the chosen design pattern
  - [ ] Apply to non-glass sections
- [ ] **[DISCUSS]**: This is the most visually impactful change - review with user at each page

---

## Phase 5: Global Animation Consistency

*Prerequisites: Phase 2 and Phase 3 complete.*

Each migration replaces manual IntersectionObserver with `v-motion`. **Reference implementation**: `components/about/Hero.vue` (already correct).

### Task 5.1 - Migrate Home HeroSection
- [ ] File: `components/home/HeroSection.vue`
- [ ] Replace `isVisible` + `setTimeout` with `v-motion :initial :enter`
- [ ] Keep TextReveal (independent), keep ParticleWaves
- [ ] Remove corresponding `.animate-in` CSS

### Task 5.2 - Migrate Home AboutSection
- [ ] File: `components/home/AboutSection.vue`
- [ ] Replace IntersectionObserver + stagger-1/2/3 with `v-motion :visible-once` + `staggeredFadeInUp(index)`
- [ ] Keep `useStrokeDraw`
- [ ] Standardize StrokeDraw params to `{ delay: 200, stagger: STAGGER_ICON, duration: 600 }`

### Task 5.3 - Migrate Home CTASection
- [ ] File: `components/home/CTASection.vue`
- [ ] Replace manual observer with `v-motion :visible-once`

### Task 5.4 - Migrate Home ServicesSection
- [ ] File: `components/home/ServicesSection.vue`
- [ ] Replace IntersectionObserver + stagger with `v-motion :visible-once` + `staggeredFadeInUp(index)`

### Task 5.5 - Migrate Services Hero (if not already handled by BaseHero in Phase 3)
- [ ] File: `components/services/Hero.vue`
- [ ] Replace `isVisible` + `setTimeout(100)` with `v-motion :initial :enter`

### Task 5.6 - Migrate Contact Components
- [ ] `components/contact/Hero.vue` - replace manual observer
- [ ] `components/contact/Info.vue` - replace observer + stagger, keep StrokeDraw
- [ ] `components/contact/Form.vue` - replace observer
- [ ] Standardize StrokeDraw on Info.vue to `{ delay: 200, stagger: STAGGER_ICON, duration: 600 }`

### Task 5.7 - Migrate Legal and Policies Pages
- [ ] `pages/about/legal.vue` - replace `isVisible` + fixed timing with `v-motion`
- [ ] `pages/about/policies.vue` - same pattern

### Task 5.8 - Extend TextReveal to All Page Heroes
- [ ] `components/contact/Hero.vue` - wrap h1 in TextReveal
- [ ] `pages/about/legal.vue` - wrap h1 in TextReveal
- [ ] `pages/about/policies.vue` - wrap h1 in TextReveal
- [ ] `components/news/Hero.vue` - wrap h1 in TextReveal (if applicable with featured post layout)
- [ ] **[DISCUSS]**: Confirm heading text for each before implementation (no fictitious content)

### Task 5.9 - Remove ParticleWaves from About Hero
- [ ] File: `components/about/Hero.vue`
- [ ] Remove `<ThreeParticleWaves>` component usage
- [ ] Verify parallax + v-motion + TextReveal still provide sufficient visual interest
- [ ] **[DISCUSS]**: Preview with user

### Task 5.10 - Standardize All StrokeDraw Parameters
- [ ] Align all `useStrokeDraw` calls to: `{ delay: 200, stagger: STAGGER_ICON, duration: 600 }`
- [ ] Files:
  - `components/home/AboutSection.vue` (currently: 200/150/700)
  - `components/about/Values.vue` (currently: 300/150/700)
  - `components/contact/Info.vue` (currently: 200/120/600)

### Task 5.11 - Clean Up Orphaned CSS
- [ ] Audit `assets/css/main.css` for `.animate-in`, `.is-visible`, stagger utility classes
- [ ] Remove only confirmed-unused classes after all migrations
- [ ] Keep classes still referenced by non-migrated components

---

## Phase 6: Page-Specific Enhancements

### Task 6.1 - Document Intentionally Page-Specific Features
- [ ] Add code comments explaining WHY each feature is page-exclusive:

| Feature | Page | Rationale |
|---------|------|-----------|
| ParticleWaves 3D | Home only | First-impression; performance budget |
| SectionNav pill | Services only | Only page with 8+ scrollable sections |
| BeforeAfter slider | Services only | Results showcase unique to services |
| ComparisonTable | Services only | Plan comparison specific to offerings |
| AnimatedCounter | Services only | Metrics/stats section |
| LiquidGlass | About/Founder | Spotlight on founder identity |
| TiltCard | About/Values | Featured value highlight |
| Parallax scroll | About hero | Narrative depth for company story |
| Process Timeline | Process only | Step-by-step workflow visualization |

### Task 6.2 [DISCUSS] - Evaluate News Page Consistency
- [ ] Review news page animations against new global standard
- [ ] News uses skeleton loading (appropriate for CMS data fetching)
- [ ] Confirm news hero gets TextReveal treatment
- [ ] Check if news PostCard interactions match global card hover standard

### Task 6.3 [DISCUSS] - Evaluate Client Hub Consistency
- [ ] Review client-hub layout and components against new standards
- [ ] Client hub has separate layout - should it match or intentionally differ?
- [ ] Glass morphism in client-hub header - keep or align with main design?

---

## Phase 7: Performance & Accessibility Audit

### Task 7.1 - Verify prefers-reduced-motion Coverage
- [ ] After all migrations, test every animated element with `prefers-reduced-motion: reduce`
- [ ] Checklist:
  - [ ] `v-motion` elements (covered by `useAccessibleMotion`)
  - [ ] `TextReveal` (has built-in check)
  - [ ] `StrokeDraw` (has built-in check)
  - [ ] CSS keyframes (covered by `main.css` media query)
  - [ ] `LiquidGlass` (verify graceful degradation)
  - [ ] Page transitions (verify they simplify)
  - [ ] Scale-only magnetic effect (should disable)

### Task 7.2 - Touch Target Audit (WCAG AA: 44x44px)
- [ ] All CTA buttons
- [ ] Navigation links (header, footer, SectionNav)
- [ ] Form inputs and submit button
- [ ] Language switcher buttons
- [ ] Color mode toggle
- [ ] Scroll indicator
- [ ] Contact floating panel trigger

### Task 7.3 - Three.js Performance
- [ ] Confirm `<ClientOnly>` wrapper on ParticleWaves
- [ ] Verify animation pauses on `document.hidden`
- [ ] Verify proper disposal on unmount (renderer, geometry, material)
- [ ] Test on mobile viewport (throttled CPU in DevTools)

### Task 7.4 - Bundle Size Analysis
- [ ] Run `npx nuxi analyze`
- [ ] Verify Three.js is code-split (only loaded on Home)
- [ ] Confirm removed files reduced bundle
- [ ] Check `@wxperia/liquid-glass-vue` tree-shaking on non-About pages
- [ ] Verify `vuedraggable` usage or remove if unused

### Task 7.5 - Security Review
- [ ] Verify no API keys in source code
- [ ] Check runtime config for sensitive values
- [ ] Review client-hub auth (password stored in env, not hardcoded default)
- [ ] Verify cookie security flags (SameSite, Secure, HttpOnly)
- [ ] Check for XSS vectors in i18n strings (`escapeHtml: false` in config)

---

## Phase 8: Final Review & Testing

### Task 8.1 - Visual Regression: All Pages
- [ ] Home: TextReveal, particles, section stagger, CTA scale effect, hover states
- [ ] About: TextReveal, parallax (no particles), v-motion stagger, LiquidGlass, TiltCard
- [ ] Services: TextReveal, SectionNav, ComparisonTable, BeforeAfter, counter
- [ ] Contact: TextReveal, form interactions, Info cards stagger
- [ ] Process: Timeline, stroke-draw icons, CTA
- [ ] Legal/Policies: TextReveal, content entrance
- [ ] News: Hero, post list, filters, skeleton loading
- [ ] Client Hub: Login, dashboard, breadcrumb

### Task 8.2 - Reduced Motion Verification
- [ ] Enable `prefers-reduced-motion: reduce` in DevTools
- [ ] All content appears immediately with no animation delays
- [ ] No layout shifts from skipped animations
- [ ] Page remains fully functional

### Task 8.3 - Mobile Testing
- [ ] 375px viewport (iPhone SE)
- [ ] 768px viewport (iPad)
- [ ] 1024px viewport (small laptop)
- [ ] No horizontal scroll on any page
- [ ] Touch targets meet 44px minimum
- [ ] Three.js performance acceptable on Home
- [ ] No magnetic/scale effects on touch devices

### Task 8.4 - Cross-Browser Testing
- [ ] Chrome: full feature set
- [ ] Firefox: `backdrop-filter`, `color-mix()`, reduced glass
- [ ] Safari: View Transitions graceful degradation, webkit prefixes
- [ ] Edge: baseline compatibility

### Task 8.5 - Lighthouse Audit
- [ ] Performance (target: 90+)
- [ ] Accessibility (target: 100)
- [ ] Best Practices (target: 95+)
- [ ] SEO (target: 100)

### Task 8.6 - Code Quality Review
- [ ] No unused imports
- [ ] No unused components
- [ ] Consistent naming conventions
- [ ] All composables properly typed
- [ ] No console.log statements left
- [ ] SCSS properly scoped per component

---

## Appendix: File Inventory

### Files to DELETE (confirmed unused)

| File | Reason |
|------|--------|
| `composables/useScrollAnimation.ts` | 0 imports across codebase |
| `components/CustomCursor.vue` | Not mounted anywhere (pending approval) |

### Files to CREATE (new base components)

| File | Purpose |
|------|---------|
| `components/base/BaseHero.vue` | Shared hero structure |
| `components/base/BaseCTASection.vue` | Shared CTA layout |
| `components/base/Breadcrumb.vue` | Unified breadcrumb |
| `components/base/SectionHeader.vue` | Badge + title + subtitle |

### Files to MODIFY (by phase)

**Phase 2 - Foundation (~7 files)**
- `plugins/magnetic.ts` - rewrite to scale-only
- `composables/useAccessibleMotion.ts` - add constants + helper
- `components/GlassCard.vue` - remove tilt dead code, add solid variant
- `components/home/CTASection.vue` - remove v-magnetic
- `components/about/CTA.vue` - remove v-magnetic
- `components/services/CTA.vue` - remove v-magnetic

**Phase 3 - Architecture (~10 files)**
- `components/services/Hero.vue` - use BaseHero
- `components/contact/Hero.vue` - use BaseHero
- `components/process/Hero.vue` - use BaseHero
- `components/about/CTA.vue` - use BaseCTASection
- `components/services/CTA.vue` - use BaseCTASection
- `components/process/CTA.vue` - use BaseCTASection
- `components/home/PackageCard.vue` or `components/services/PackageCard.vue` - merge
- `components/news/Breadcrumb.vue` - replace with unified
- `components/client-hub/Breadcrumb.vue` - replace with unified

**Phase 4 - Glass Refinement (~8-12 files)**
- `components/GlassCard.vue` - add variants
- Various section components depending on glass/solid decisions

**Phase 5 - Animation Migration (~13 files)**
- `components/home/HeroSection.vue`
- `components/home/AboutSection.vue`
- `components/home/CTASection.vue`
- `components/home/ServicesSection.vue`
- `components/services/Hero.vue`
- `components/contact/Hero.vue`
- `components/contact/Info.vue`
- `components/contact/Form.vue`
- `pages/about/legal.vue`
- `pages/about/policies.vue`
- `components/about/Hero.vue` (remove ParticleWaves)
- `components/about/Values.vue` (StrokeDraw params)
- `assets/css/main.css` (cleanup orphaned classes)

---

## References Index

### UX & Design
- [NNGroup: Glassmorphism Best Practices](https://www.nngroup.com/articles/glassmorphism/)
- [NNGroup: Animation for Usability](https://www.nngroup.com/articles/animation-usability/)
- [NNGroup: Motion Design Principles](https://www.nngroup.com/articles/motion-design/)
- [NNGroup: Custom Cursors](https://www.nngroup.com/articles/mouse-pointers/)
- [IxDF: Glassmorphism](https://www.interaction-design.org/literature/topics/glassmorphism)
- [IxDF: Fitts's Law](https://www.interaction-design.org/literature/topics/fitts-law)
- [Axess Lab: Glassmorphism Accessibility](https://axesslab.com/glassmorphism-meets-accessibility-can-frosted-glass-be-inclusive/)
- [Material Design: Motion](https://m3.material.io/styles/motion/overview)

### Design Trends
- [WebFX: Modern Web Design Trends 2026](https://www.webfx.com/blog/web-design/modern-web-design/)
- [Designmodo: Web Design Trends 2026](https://designmodo.com/web-design-trends/)
- [Framer: Emerging Web Design Trends](https://www.framer.com/blog/web-design-trends/)
- [Colorlib: Portfolio Design Trends 2026](https://colorlib.com/wp/portfolio-design-trends/)

### Technical
- [Vue.js: Composables Guide](https://vuejs.org/guide/reusability/composables.html)
- [Vue Mastery: Coding Better Composables](https://www.vuemastery.com/blog/coding-better-composables-1-of-5/)
- [Michael Thiessen: Composable Patterns](https://michaelnthiessen.com/composable-patterns-in-vue)
- [Web.dev: Interaction to Next Paint](https://web.dev/articles/inp)
- [VueUse Motion](https://motion.vueuse.org/)
- [Chrome: Scroll-Driven Animations](https://developer.chrome.com/docs/css-ui/scroll-driven-animations/)
- [MDN: View Transitions API](https://developer.mozilla.org/en-US/docs/Web/API/View_Transitions_API)

### Design Systems & Patterns
- [Ramotion: Glassmorphism Guide](https://www.ramotion.com/blog/what-is-glassmorphism/)
- [Alpha Efficiency: Glassmorphism UI Guide](https://alphaefficiency.com/glassmorphism-ui)
- [Awwwards: Best Web Design](https://www.awwwards.com/)
