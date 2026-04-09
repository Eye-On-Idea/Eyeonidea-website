
export default defineAppConfig({
  ui: {

    colors: {
      primary: "primary",
      neutral: "neutral",

      secondary: "accent",
      info: "accent",
      success: "green",
      warning: "amber",
      error: "red",
    },

    rounded: "md",

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

          "text-[color:var(--link)] hover:text-[color:var(--link-hover)]",
          "underline underline-offset-4 decoration-transparent hover:decoration-current",
        ].join(" "),
      },
      variants: {

        disabled: {
          true: { base: "pointer-events-none opacity-60 no-underline" },
        },
      },
    },

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

          secondary: {
            base: "bg-[var(--badge-accent-bg)] text-[var(--badge-accent-text)]",
          },
        },
      },
    },

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

    dashboardSidebar: {
      slots: {
        root: "bg-[var(--color-surface-1)] border-r border-[var(--glass-border-subtle)]",
        header: "border-b border-[var(--glass-border-subtle)]",
        footer: "border-t border-[var(--glass-border-subtle)]",
      },
    },

    dashboardPanel: {
      slots: {
        root: "bg-[var(--color-background)]",
      },
    },

    navigationMenu: {
      slots: {
        link: "transition-colors text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]",
        childLink:
          "transition-colors text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]",
        childLabel: "mt-3 first:mt-0",
      },
    },
  },
});
