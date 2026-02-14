# Eye On Idea - UX Streamlining & Design Consistency Plan

> **Created**: 2026-02-14
> **Status**: Phases 1-4 Complete - Starting Phase 5
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

### Task 1.1 ~~[DISCUSS]~~ DECIDED - Magnetic Effect Rethink
- [x] Design scale-only proximity effect for hero CTAs

**Decision**: Scale amount `1.02` (subtle), no box-shadow expansion. Scale-only, no position shift. Hero CTAs only.

---

### Task 1.2 ~~[DISCUSS]~~ DECIDED - Animation System Consolidation
- [x] Agree on single animation approach

**Decision**: Standardize on `v-motion` + `useAccessibleMotion`. No edge case concerns. Migrate all 10 manual IntersectionObserver components.

---

### Task 1.3 ~~[DISCUSS]~~ DECIDED - Stagger Timing Standards
- [x] Establish stagger rhythm constants

**Decision**: Approved as proposed. `STAGGER_CARD: 100ms`, `STAGGER_TEXT: 60ms`, `STAGGER_ICON: 120ms`.

---

### Task 1.4 ~~[DISCUSS]~~ DECIDED - Glass Morphism Reduction Strategy
- [x] Define which elements keep glass vs which become solid/minimal

**Decision**: Approved as proposed. CTA sections keep glass. Header, hero overlays, spotlight cards, modals, color toggle, and CTAs retain glass. Content cards, pricing, forms, info cards, footer, and legal pages switch to solid/minimal.

---

### Task 1.5 ~~[DISCUSS]~~ DECIDED - Complementary Design Pattern for Non-Glass Areas
- [x] Define the visual language for solid/minimal areas

**Decision**: Mix of Option A (Clean Minimalism) and Option B (Warm Minimalism with Texture). Nordic-aligned clean surfaces with generous spacing and bold typography, combined with subtle background textures and slight shadow depth for warmth.

---

### Task 1.6 ~~[DISCUSS]~~ DECIDED - Component Architecture: Base Components
- [x] Agree on which base components to extract

**Decision**: BaseHero as a slot-based full component. Home Hero stays standalone (too unique). Home CTA stays standalone (unique layout). All other base components approved as proposed.

---

### Task 1.7 ~~[DISCUSS]~~ DECIDED - CustomCursor: Confirm Removal
- [x] Confirm CustomCursor stays unmounted

**Decision**: Delete `CustomCursor.vue`. Keep `useCursorFollow` composable for Values shine effect.

---

### Task 1.8 ~~[DISCUSS]~~ DECIDED - LiquidGlass: Remove from Founder
- [x] Remove LiquidGlass from Founder photo

**Decision**: Remove LiquidGlass from Founder photo. Reserve LiquidGlass as a special showcase effect for rare cases only - not currently used anywhere.

---

### Task 1.9 ~~[DISCUSS]~~ DECIDED - Dead Code Inventory
- [x] Confirm removal of unused code

**Decision**: Approved. Delete `useScrollAnimation.ts`, `CustomCursor.vue`, remove `hoverEffect="tilt"` dead code from `GlassCard.vue`.

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
- [x] Modify `plugins/magnetic.ts`: replace `translate()` transform with `scale(1.02)` on proximity
- [x] Remove `v-magnetic` from non-hero CTAs (home/CTASection, about/CTA, services/CTA)
- [x] Keep `v-magnetic` on `components/home/HeroSection.vue` (2 buttons)

### Task 2.2 - Remove Dead Code
- [x] Delete `composables/useScrollAnimation.ts`
- [x] Delete `components/CustomCursor.vue`
- [x] Remove `hoverEffect="tilt"` dead code path + legacy props from `components/GlassCard.vue`
- [x] Verified no imports break

### Task 2.3 - Add Stagger Constants to useAccessibleMotion
- [x] Added `STAGGER_CARD`, `STAGGER_TEXT`, `STAGGER_ICON` constants
- [x] Added `staggeredFadeInUp()` helper function
- [x] Updated TextReveal default stagger to use `STAGGER_TEXT`
- [x] Updated useStrokeDraw default stagger to use `STAGGER_ICON`

---

## Phase 3: Component Architecture Refactoring

*Prerequisites: Phase 2 complete, architecture decisions from 1.6 approved.*

### Task 3.1 - Create BaseHero Component
- [x] Created `components/base/BaseHero.vue` (slot-based, v-motion entrance animation)
- [x] Refactored `components/services/Hero.vue` to use BaseHero
- [x] Refactored `components/contact/Hero.vue` to use BaseHero
- [x] Refactored `components/process/Hero.vue` to use BaseHero
- [x] Home hero and About hero stay standalone (too unique)

### Task 3.2 - Create BaseCTASection Component
- [x] Created `components/base/BaseCTASection.vue` (v-motion staggered entrance)
- [x] Refactored `components/about/CTA.vue` to use BaseCTASection
- [x] Refactored `components/services/CTA.vue` to use BaseCTASection
- [x] Refactored `components/process/CTA.vue` to use BaseCTASection
- [x] Home CTASection stays standalone (unique layout)

### Task 3.3 - Unify PackageCard Component
- [x] Kept `components/services/PackageCard.vue` as canonical version
- [x] Updated `components/home/ServicesSection.vue` to use `ServicesPackageCard`
- [x] Deleted `components/home/PackageCard.vue`
- [x] Removed orphaned CTA button `:deep` styles from ServicesSection

### Task 3.4 - Unify Breadcrumb Component
- [x] Created `components/base/Breadcrumb.vue` (crumbs array prop)
- [x] Updated `pages/news/[slug].vue` to use BaseBreadcrumb
- [x] Updated 3 client-hub pages to use BaseBreadcrumb (building crumbs inline)
- [x] Deleted `components/news/Breadcrumb.vue` and `components/client-hub/Breadcrumb.vue`

### Task 3.5 - Create SectionHeader Component
- [x] Created `components/base/SectionHeader.vue` (badge + title + subtitle)
- [ ] Section migrations deferred to Phase 5 (will happen alongside animation migration)

### Task 3.6 - Extract Button Component (Optional - DISCUSS)
- [ ] Deferred. Button consolidation will be evaluated after glass morphism refinement in Phase 4.

---

## Phase 4: Glass Morphism Refinement

*Prerequisites: Phase 1 Task 1.4 and 1.5 decisions approved.*

### Task 4.1 - Define Glass vs Solid Zones Per Page
- [x] Audited all glass morphism usage across codebase
- [x] Classified each element as "keep glass" or "switch to solid" per Phase 1 decisions

### Task 4.2 - Implement Solid Card Variant
- [x] Added `variant` prop to `GlassCard.vue`: `"glass" | "solid" | "outlined"`
- [x] `solid`: Clean surface with `--card-bg`, subtle border, no backdrop-filter
- [x] `outlined`: Transparent bg with border only
- [x] All hover effects (lift, glow) work for all variants

### Task 4.3 - Apply Glass Reduction
- [x] Home About value cards: glass → solid (gradient-border kept)
- [x] Home additional services cards: glass → solid
- [x] Client Hub category cards: glass → solid
- [x] Client Hub login form: glass → solid
- [x] Contact form: removed `glass-subtle` (was undefined no-op)
- [x] Services Identity includes: removed `glass-subtle`
- [x] **Kept glass**: Header nav, hero badges, Home CTA card, CTA section badges

### Task 4.4 - Define Non-Glass Visual Language
- [x] Existing `--card-bg`, `--card-border`, `--card-shadow` variables already support solid cards in both light/dark modes
- [x] No new CSS custom properties needed - design system was already prepared

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
