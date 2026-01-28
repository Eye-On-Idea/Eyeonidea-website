// app.config.ts
export default defineAppConfig({
  ui: {
    /**
     * Semantic color aliases used by Nuxt UI components.
     * primary -> your @theme "brand" scale
     * neutral -> your @theme "neutral" scale (if registered), otherwise keep "zinc"
     */
    colors: {
      primary: "brand",
      neutral: "neutral", // <-- if you did NOT register a `neutral` scale in @theme, use "zinc"
      // Optional but recommended: map your accent scale to secondary
      secondary: "accent",
      info: "accent",
      success: "green",
      warning: "amber",
      error: "red",
    },

    rounded: "md",

    /**
     * BUTTONS
     * Goal: consistent font, transitions, focus ring, and default variants across the app.
     * Nuxt UI Button supports `color`, `variant`, `size` etc. :contentReference[oaicite:3]{index=3}
     */
    button: {
      defaultVariants: {
        color: "primary",
        variant: "solid",
        size: "md",
      },
      slots: {
        base: [
          "font-semibold",
          "tracking-wide",
          "transition-colors",
          "focus-visible:outline-none",
          "focus-visible:ring-2",
          "focus-visible:ring-[var(--focus-ring)]",
          "focus-visible:ring-offset-2",
          "focus-visible:ring-offset-[var(--ring-offset)]",
          "disabled:opacity-60 disabled:cursor-not-allowed",
        ].join(" "),
      },
      variants: {
        variant: {
          solid: {
            base: "shadow-sm",
          },
          outline: {
            base: "bg-transparent",
          },
          ghost: {
            base: "bg-transparent",
          },
          link: {
            base: "bg-transparent p-0 h-auto underline underline-offset-4",
          },
        },
        size: {
          xs: { base: "text-xs px-2.5 py-1.5" },
          sm: { base: "text-sm px-3 py-2" },
          md: { base: "text-sm px-4 py-2.5" },
          lg: { base: "text-base px-5 py-3" },
          xl: { base: "text-base px-6 py-3.5" },
        },
      },
    },

    /**
     * LINKS (ULink wrapper around NuxtLink) :contentReference[oaicite:4]{index=4}
     * Goal: all links follow your --link / --link-hover tokens, consistent focus ring.
     */
    link: {
      slots: {
        base: [
          "inline-flex items-center gap-1",
          "font-medium",
          "transition-colors",
          "focus-visible:outline-none",
          "focus-visible:ring-2",
          "focus-visible:ring-[var(--focus-ring)]",
          "focus-visible:ring-offset-2",
          "focus-visible:ring-offset-[var(--ring-offset)]",
          // Use your semantic link tokens (light/dark already handled in your CSS)
          "text-[color:var(--link)] hover:text-[color:var(--link-hover)]",
          "underline underline-offset-4 decoration-transparent hover:decoration-current",
        ].join(" "),
      },
      variants: {
        // These are extra “soft defaults” you can toggle with props where supported
        disabled: {
          true: { base: "pointer-events-none opacity-60 no-underline" },
        },
      },
    },

    /**
     * INPUTS
     * Goal: your borders/background/text tokens + consistent focus ring.
     */
    input: {
      slots: {
        base: [
          "w-full",
          "bg-[var(--input-bg)] text-[var(--input-text)]",
          "placeholder:text-[var(--input-placeholder)]",
          "border border-[var(--input-border)]",
          "focus-visible:outline-none",
          "focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)]",
          "focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--ring-offset)]",
          "focus:border-[var(--input-border-focus)]",
          "disabled:opacity-60 disabled:cursor-not-allowed",
        ].join(" "),
      },
    },

    textarea: {
      slots: {
        base: [
          "w-full",
          "bg-[var(--input-bg)] text-[var(--input-text)]",
          "placeholder:text-[var(--input-placeholder)]",
          "border border-[var(--input-border)]",
          "focus-visible:outline-none",
          "focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)]",
          "focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--ring-offset)]",
          "focus:border-[var(--input-border-focus)]",
          "disabled:opacity-60 disabled:cursor-not-allowed",
        ].join(" "),
      },
    },

    /**
     * BADGES / TAGS
     * Goal: default badge styles reflect your AA-safe badge tokens.
     */
    badge: {
      defaultVariants: {
        color: "primary",
        variant: "soft",
        size: "md",
      },
      variants: {
        variant: {
          soft: {
            base: "bg-[var(--badge-primary-bg)] text-[var(--badge-primary-text)]",
          },
        },
        color: {
          // allow `color="secondary"` to use your accent badge tokens
          secondary: {
            base: "bg-[var(--badge-accent-bg)] text-[var(--badge-accent-text)]",
          },
        },
      },
    },

    /**
     * CARDS
     * Goal: align all cards with your surface tokens and glass-friendly borders/shadows.
     */
    card: {
      slots: {
        base: [
          "bg-[var(--card-bg)]",
          "border border-[var(--card-border)]",
          "shadow-[var(--card-shadow)]",
        ].join(" "),
        header: "p-6",
        body: "p-6",
        footer: "p-6 border-t border-[var(--ui-border)]",
      },
    },
  },
});
