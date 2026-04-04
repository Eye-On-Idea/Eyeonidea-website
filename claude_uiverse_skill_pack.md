# Claude skill pack for UIverse → Nuxt

Below is a project-ready setup you can drop into your repo for Claude Code.

It includes:
- a **project slash command** for one-off conversions
- a **project subagent** for repeated UIverse adaptation work
- optional **project memory** instructions so Claude stays aligned with your Nuxt conventions

These patterns are based on Claude Code’s current project-level customization system: custom slash commands live in `.claude/commands/`, and custom subagents live in `.claude/agents/` as Markdown files with YAML frontmatter. ([docs.anthropic.com](https://docs.anthropic.com/en/docs/claude-code/slash-commands?utm_source=chatgpt.com))

---

## 1) Project slash command

**Path:** `.claude/commands/uiverse-to-nuxt.md`

```md
Convert the selected UIverse component into a production-ready Nuxt component.

Context:
- The source may come from UIverse or the uiverse-io/galaxy repository.
- The source may be raw HTML/CSS or Tailwind-flavored markup.
- The target stack is Nuxt with Vue SFC components.

Instructions:
1. Inspect the provided component snippet, file, or pasted code.
2. Rebuild it as a Vue Single File Component using `<script setup lang="ts">` when logic is needed.
3. Prefer Tailwind utility classes when practical, but do not force a full rewrite if scoped CSS is cleaner.
4. Preserve the original visual intent while improving code quality.
5. Remove dead wrappers, duplicated spans, non-semantic markup, and unnecessary absolute positioning where possible.
6. Ensure accessibility:
   - keyboard focus states
   - aria-labels where needed
   - button vs link semantics
   - reduced-motion consideration for non-essential animation
   - sufficient contrast where obvious issues exist
7. Make the component reusable:
   - extract props for label, variant, size, href, disabled, loading, icon slot, etc. when relevant
   - define sensible defaults
   - avoid hardcoded page-level spacing
8. Make the result Nuxt-safe:
   - no direct DOM access unless guarded with `onMounted`
   - no browser-only API usage during SSR
   - use `NuxtLink` instead of anchor tags for internal navigation
9. Align output with the project design system:
   - prefer project tokens, shared utility classes, and existing primitives if present
   - if project tokens are unknown, leave clear TODO markers
10. Output in this order:
   - short summary of what was changed
   - final `.vue` file
   - optional extracted CSS or composable only if truly needed
   - concise integration notes

Quality bar:
- production-ready
- readable
- no unnecessary dependencies
- no fake imports
- no placeholder code unless explicitly marked

If the source component is low quality or overly decorative, simplify it while preserving the core style.

Arguments passed to this command should be treated as the component request and any attached snippet/path as the source.
```

---

## 2) Project subagent

**Path:** `.claude/agents/uiverse-nuxt-converter.md`

```md
---
name: uiverse-nuxt-converter
description: Converts UIverse-style UI snippets into clean, reusable, accessible Nuxt Vue components aligned with the current project.
---

You are a specialist front-end conversion agent focused on turning UIverse-style snippets into maintainable Nuxt components.

Primary responsibilities:
- convert raw HTML/CSS/Tailwind snippets into Vue SFCs
- adapt third-party visual snippets to existing project conventions
- improve accessibility, semantics, and reusability
- preserve intended styling while reducing fragility
- flag risky code patterns before implementation

Working rules:
1. Always inspect the existing project structure before generating code.
2. Reuse existing components, composables, utility classes, and tokens when possible.
3. Prefer consistency with the current codebase over literal fidelity to the source snippet.
4. Treat animation and decorative effects as optional unless they are central to the design.
5. Avoid introducing libraries for small UI tasks.
6. Prefer Tailwind classes if the surrounding codebase already uses Tailwind heavily.
7. Prefer scoped CSS for highly custom visuals that would become unreadable in utility classes.
8. Respect Nuxt SSR constraints.
9. When converting links or navigational UI, determine whether `NuxtLink` is more appropriate than `<a>`.
10. When unsure, produce the most maintainable version, not the flashiest one.

Accessibility checklist:
- correct semantic element choice
- visible focus state
- hover is not the only interaction state
- reduced-motion support for significant animation
- text/icon labels are understandable
- disabled state is conveyed properly

Output format:
- brief assessment of source quality
- implementation plan
- final code
- integration notes
- optional refactor suggestions if the snippet should instead become part of an existing primitive system

Refusal boundary:
- do not invent project files or imports that do not exist
- do not claim a component was tested unless it was actually tested in the project
- do not preserve broken markup just because it existed in the source
```

---

## 3) Optional project memory

**Path:** `CLAUDE.md`

Add or merge a section like this into your existing project memory file:

```md
## UIverse component intake rules

When adapting third-party UI snippets:
- treat UIverse as visual reference material, not as production-ready architecture
- convert snippets into Vue SFCs that match project conventions
- prefer existing components and tokens over copying raw code verbatim
- maintain accessibility and semantic HTML
- avoid unnecessary wrappers and brittle positioning
- keep animations tasteful and optional
- do not introduce new dependencies unless clearly justified
- for internal links use `NuxtLink`
- for SSR-sensitive behavior, guard browser-only logic properly
```

Claude Code supports project memory files via `CLAUDE.md`, and project slash commands can be created under `.claude/commands/`. ([docs.anthropic.com](https://docs.anthropic.com/en/docs/claude-code/slash-commands?utm_source=chatgpt.com))

---

## 4) Recommended repo structure

```text
your-project/
  .claude/
    agents/
      uiverse-nuxt-converter.md
    commands/
      uiverse-to-nuxt.md
  CLAUDE.md
```

---

## 5) How to use it

After adding the files:

1. In Claude Code, run `/help` and confirm the project command appears. Custom slash commands are file-backed Markdown commands in `.claude/commands/`. ([docs.anthropic.com](https://docs.anthropic.com/en/docs/claude-code/slash-commands?utm_source=chatgpt.com))
2. Use the command like:

```text
/uiverse-to-nuxt convert this button from ./reference/uiverse/button-12.html into a reusable Nuxt component
```

3. Or invoke the subagent for broader work such as:

```text
Use the uiverse-nuxt-converter agent to review the three UI snippets in /reference/uiverse and rebuild them as components for our design system.
```

---

## 6) My recommendation for your setup

For your Nuxt project, the strongest workflow is:
- browse UIverse visually on the website
- store chosen raw references locally or pull from `uiverse-io/galaxy`
- let Claude operate on those local files
- convert into your own `/components/` architecture instead of consuming UIverse directly

UIverse exposes browse-and-copy UI on the site, while the `uiverse-io/galaxy` repository is better suited for machine-readable component retrieval. ([docs.anthropic.com](https://docs.anthropic.com/en/docs/claude-code/slash-commands?utm_source=chatgpt.com))

---

## 7) Optional stronger version

If you want deeper automation later, the next step is **not** a bigger prompt. It is an MCP-backed toolchain or a local indexed reference folder so Claude can search your saved UIverse references more deterministically. Claude Code supports MCP-based extension patterns in project config as well. ([docs.anthropic.com](https://docs.anthropic.com/en/docs/claude-code/sdk/sdk-mcp?utm_source=chatgpt.com))

