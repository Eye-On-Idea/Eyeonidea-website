<template>
  <div class="portable-text">
    <template v-for="(group, index) in renderedGroups" :key="index">
      <!-- Headings -->
      <h2 v-if="group.type === 'h2'" class="pt-h2">
        <span v-for="(child, i) in group.block!.children" :key="i">{{ child.text }}</span>
      </h2>
      <h3 v-else-if="group.type === 'h3'" class="pt-h3">
        <span v-for="(child, i) in group.block!.children" :key="i">{{ child.text }}</span>
      </h3>
      <h4 v-else-if="group.type === 'h4'" class="pt-h4">
        <span v-for="(child, i) in group.block!.children" :key="i">{{ child.text }}</span>
      </h4>

      <!-- Blockquote -->
      <blockquote v-else-if="group.type === 'blockquote'" class="pt-blockquote">
        <span v-for="(child, i) in group.block!.children" :key="i">{{ child.text }}</span>
      </blockquote>

      <!-- Normal paragraph -->
      <p v-else-if="group.type === 'paragraph'" class="pt-paragraph">
        <template v-for="(child, i) in group.block!.children" :key="i">
          <a
            v-if="hasLink(child)"
            :href="getLinkHref(child, group.block!)"
            class="pt-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            <strong v-if="child.marks?.includes('strong')">{{ child.text }}</strong>
            <em v-else-if="child.marks?.includes('em')">{{ child.text }}</em>
            <code v-else-if="child.marks?.includes('code')">{{ child.text }}</code>
            <span v-else>{{ child.text }}</span>
          </a>
          <template v-else>
            <strong v-if="child.marks?.includes('strong')">{{ child.text }}</strong>
            <em v-else-if="child.marks?.includes('em')">{{ child.text }}</em>
            <code v-else-if="child.marks?.includes('code')" class="pt-inline-code">{{ child.text }}</code>
            <span v-else>{{ child.text }}</span>
          </template>
        </template>
      </p>

      <!-- Image -->
      <figure v-else-if="group.type === 'image'" class="pt-figure">
        <img
          v-if="group.block!.url || group.block!.asset"
          :src="getImageUrl(group.block!)"
          :alt="group.block!.alt || ''"
          class="pt-image"
          loading="lazy"
        />
        <figcaption v-if="group.block!.caption" class="pt-caption">{{ group.block!.caption }}</figcaption>
      </figure>

      <!-- Bullet list - grouped consecutive items into one ul -->
      <ul v-else-if="group.type === 'bullet'" class="pt-list">
        <li v-for="(item, i) in group.items" :key="i">
          <span v-for="(child, j) in item.children" :key="j">{{ child.text }}</span>
        </li>
      </ul>

      <!-- Numbered list - grouped consecutive items into one ol -->
      <ol v-else-if="group.type === 'number'" class="pt-list pt-list-ordered">
        <li v-for="(item, i) in group.items" :key="i">
          <span v-for="(child, j) in item.children" :key="j">{{ child.text }}</span>
        </li>
      </ol>

      <!-- Code block -->
      <pre v-else-if="group.type === 'code'" class="pt-code-block"><code :class="group.block!.language ? `language-${group.block!.language}` : ''">{{ group.block!.code }}</code></pre>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface PortableTextChild {
  _key?: string;
  _type: string;
  text: string;
  marks?: string[];
}

interface PortableTextBlock {
  _key?: string;
  _type: string;
  style?: string;
  children?: PortableTextChild[];
  listItem?: string;
  markDefs?: Array<{ _key: string; _type: string; href?: string }>;
  // Image fields
  url?: string;
  asset?: { _ref?: string; url?: string };
  alt?: string;
  caption?: string;
  dimensions?: { width: number; height: number };
  // Code block fields
  code?: string;
  language?: string;
}

type RenderedGroup =
  | { type: 'h2' | 'h3' | 'h4' | 'blockquote' | 'paragraph' | 'image' | 'code'; block: PortableTextBlock; items?: never }
  | { type: 'bullet' | 'number'; items: PortableTextBlock[]; block?: never };

const props = defineProps<{
  blocks: PortableTextBlock[];
}>();

// Group consecutive list blocks so they render in a single ul/ol
const renderedGroups = computed((): RenderedGroup[] => {
  const groups: RenderedGroup[] = [];

  for (const block of props.blocks) {
    if (block._type === 'block' && (block.listItem === 'bullet' || block.listItem === 'number')) {
      const listType = block.listItem as 'bullet' | 'number';
      const last = groups[groups.length - 1];
      if (last && last.type === listType) {
        last.items!.push(block);
      } else {
        groups.push({ type: listType, items: [block] });
      }
    } else if (block._type === 'block' && block.style === 'h2') {
      groups.push({ type: 'h2', block });
    } else if (block._type === 'block' && block.style === 'h3') {
      groups.push({ type: 'h3', block });
    } else if (block._type === 'block' && block.style === 'h4') {
      groups.push({ type: 'h4', block });
    } else if (block._type === 'block' && block.style === 'blockquote') {
      groups.push({ type: 'blockquote', block });
    } else if (block._type === 'image') {
      groups.push({ type: 'image', block });
    } else if (block._type === 'code') {
      groups.push({ type: 'code', block });
    } else if (block._type === 'block') {
      groups.push({ type: 'paragraph', block });
    }
  }

  return groups;
});

function hasLink(child: PortableTextChild): boolean {
  return child.marks?.some(mark => mark !== 'strong' && mark !== 'em' && mark !== 'code') || false;
}

function getLinkHref(child: PortableTextChild, block: PortableTextBlock): string {
  if (!child.marks || !block.markDefs) return '#';

  const linkMark = child.marks.find(mark => mark !== 'strong' && mark !== 'em' && mark !== 'code');
  if (!linkMark) return '#';

  const markDef = block.markDefs.find(def => def._key === linkMark);
  return markDef?.href || '#';
}

function getImageUrl(block: PortableTextBlock): string {
  if (block.url) return block.url;
  if (block.asset?.url) return block.asset.url;
  return '';
}
</script>

<style lang="scss" scoped>
.portable-text {
  font-size: 1.0625rem;
  line-height: 1.8;
  color: var(--color-primary-800);
}

.pt-paragraph {
  margin-bottom: 1.5rem;
}

.pt-h2 {
  font-size: 1.75rem;
  font-weight: 600;
  color: var(--color-primary-900);
  margin-top: 2.5rem;
  margin-bottom: 1rem;
  line-height: 1.3;
}

.pt-h3 {
  font-size: 1.375rem;
  font-weight: 600;
  color: var(--color-primary-900);
  margin-top: 2rem;
  margin-bottom: 0.75rem;
  line-height: 1.4;
}

.pt-h4 {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--color-primary-900);
  margin-top: 1.5rem;
  margin-bottom: 0.5rem;
  line-height: 1.4;
}

.pt-blockquote {
  border-left: 4px solid var(--color-primary-400);
  padding-left: 1.5rem;
  margin: 2rem 0;
  font-style: italic;
  color: var(--color-primary-700);
  font-size: 1.125rem;
}

.pt-link {
  color: var(--color-primary-600);
  text-decoration: underline;
  text-underline-offset: 3px;
  transition: color var(--duration-fast) var(--ease-smooth);

  &:hover {
    color: var(--color-primary-500);
  }

  &:focus-visible {
    outline: 2px solid var(--focus-ring);
    outline-offset: 2px;
  }
}

.pt-inline-code {
  background: var(--color-primary-100);
  padding: 0.125rem 0.375rem;
  border-radius: 4px;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 0.9em;
}

.pt-figure {
  margin: 2rem 0;
}

.pt-image {
  width: 100%;
  height: auto;
  border-radius: 12px;
  box-shadow: var(--glass-shadow);
}

.pt-caption {
  margin-top: 0.75rem;
  font-size: 0.875rem;
  color: var(--color-primary-600);
  text-align: center;
  font-style: italic;
}

.pt-list {
  margin: 1.5rem 0;
  padding-left: 1.5rem;

  li {
    margin-bottom: 0.5rem;
    padding-left: 0.25rem;
  }
}

.pt-list-ordered {
  list-style-type: decimal;
}

.pt-code-block {
  background: var(--color-primary-950);
  color: var(--color-primary-100);
  padding: 1.25rem;
  border-radius: 12px;
  overflow-x: auto;
  margin: 2rem 0;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 0.9rem;
  line-height: 1.6;

  code {
    background: none;
    padding: 0;
  }
}

/* Dark mode */
:global(.dark) .portable-text {
  color: var(--color-primary-200);
}

:global(.dark) .pt-h2,
:global(.dark) .pt-h3,
:global(.dark) .pt-h4 {
  color: var(--color-primary-100);
}

:global(.dark) .pt-blockquote {
  border-left-color: var(--color-primary-600);
  color: var(--color-primary-300);
}

:global(.dark) .pt-link {
  color: var(--color-primary-400);

  &:hover {
    color: var(--color-primary-300);
  }
}

:global(.dark) .pt-inline-code {
  background: rgba(64, 150, 255, 0.15);
  color: var(--color-primary-200);
}

:global(.dark) .pt-caption {
  color: var(--color-primary-400);
}

:global(.dark) .pt-code-block {
  background: var(--color-primary-900);
  border: 1px solid var(--color-border);
}
</style>
