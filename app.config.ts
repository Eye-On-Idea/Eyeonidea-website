// app.config.ts
export default defineAppConfig({
  ui: {
    // map "primary" to your blue brand scale
    primary: "brand",
    colors: {
      brand: {
        50: "var(--color-primary-50)",
        100: "var(--color-primary-100)",
        200: "var(--color-primary-200)",
        300: "var(--color-primary-300)",
        400: "var(--color-primary-400)",
        500: "var(--color-primary-500)",
        600: "var(--color-primary-600)",
        700: "var(--color-primary-700)",
        800: "var(--color-primary-800)",
        900: "var(--color-primary-900)",
      },
    },

    button: {
      // 1) SLOTS (aka “base” structure)
      slots: {
        base: [
          "rounded-lg font-medium inline-flex items-center",
          "disabled:cursor-not-allowed aria-disabled:cursor-not-allowed disabled:opacity-75 aria-disabled:opacity-75",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)] focus-visible:ring-offset-2 ring-offset-[var(--ring-offset)]",
          "transition-colors",
        ],
        label: "truncate",
        leadingIcon: "shrink-0",
        leadingAvatar: "shrink-0",
        leadingAvatarSize: "",
        trailingIcon: "shrink-0",
      },

      // 2) VARIANTS (structure only; styles come in compoundVariants)
      variants: {
        buttonGroup: {
          horizontal:
            "not-only:first:rounded-e-none not-only:last:rounded-s-none not-last:not-first:rounded-none focus-visible:z-[1]",
          vertical:
            "not-only:first:rounded-b-none not-only:last:rounded-t-none not-last:not-first:rounded-none focus-visible:z-[1]",
        },
        color: {
          primary: "",
          secondary: "",
          success: "",
          info: "",
          warning: "",
          error: "",
          neutral: "",
        },
        variant: {
          solid: "",
          outline: "",
          soft: "",
          subtle: "",
          ghost: "",
          link: "",
        },
        size: {
          sm: {
            base: "px-4 py-2 text-sm gap-1.5",
            leadingIcon: "size-5",
            leadingAvatarSize: "2xs",
            trailingIcon: "size-5",
          },
          md: {
            base: "px-5 py-2.5 text-sm gap-1.5",
            leadingIcon: "size-5",
            leadingAvatarSize: "2xs",
            trailingIcon: "size-5",
          },
          lg: {
            base: "px-6 py-3 text-base gap-2",
            leadingIcon: "size-6",
            leadingAvatarSize: "xs",
            trailingIcon: "size-6",
          },
        },
        block: {
          true: { base: "w-full justify-center", trailingIcon: "ms-auto" },
        },
        square: { true: "" },
        leading: { true: "" },
        trailing: { true: "" },
        loading: { true: "" },
        active: { true: { base: "" }, false: { base: "" } },
      },

      // 3) COMPOUND VARIANTS (actual styling per color+variant)
      compoundVariants: [
        // === PRIMARY (your brand blue) ===
        {
          color: "primary",
          variant: "solid",
          // Filled must be primary-600 with white text for AA (as per your tokens)
          class:
            "text-white bg-primary-600 hover:bg-primary-700 active:bg-primary-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-700",
        },
        {
          color: "primary",
          variant: "outline",
          class:
            "ring ring-inset ring-primary/50 text-primary hover:bg-primary/10 active:bg-primary/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary",
        },
        {
          color: "primary",
          variant: "soft",
          class:
            "text-primary-700 bg-primary-100 hover:bg-primary-200 active:bg-primary-200",
        },
        {
          color: "primary",
          variant: "subtle",
          class:
            "text-primary ring ring-inset ring-primary/25 bg-primary/10 hover:bg-primary/15 active:bg-primary/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary",
        },
        {
          color: "primary",
          variant: "ghost",
          class:
            "text-[var(--btn-ghost-text)] hover:bg-[var(--btn-ghost-hover)]",
        },
        {
          color: "primary",
          variant: "link",
          class:
            "text-[var(--link)] hover:text-[var(--link-hover)] focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary",
        },

        // === NEUTRAL (kept close to Nuxt UI defaults) ===
        {
          color: "neutral",
          variant: "solid",
          class:
            "text-inverted bg-inverted hover:bg-inverted/90 active:bg-inverted/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-inverted",
        },
        {
          color: "neutral",
          variant: "outline",
          class:
            "ring ring-inset ring-accented text-default bg-default hover:bg-elevated active:bg-elevated focus:outline-none focus-visible:ring-2 focus-visible:ring-inverted",
        },
        {
          color: "neutral",
          variant: "soft",
          class:
            "text-default bg-elevated hover:bg-accented/75 active:bg-accented/75",
        },
        {
          color: "neutral",
          variant: "subtle",
          class:
            "ring ring-inset ring-accented text-default bg-elevated hover:bg-accented/75 active:bg-accented/75 focus:outline-none focus-visible:ring-2 focus-visible:ring-inverted",
        },
        {
          color: "neutral",
          variant: "ghost",
          class:
            "text-default hover:bg-elevated active:bg-elevated focus:outline-none focus-visible:bg-elevated hover:disabled:bg-transparent dark:hover:disabled:bg-transparent hover:aria-disabled:bg-transparent dark:hover:aria-disabled:bg-transparent",
        },
        {
          color: "neutral",
          variant: "link",
          class:
            "text-muted hover:text-default active:text-default focus:outline-none focus-visible:ring-inset focus-visible:ring-2 focus-visible:ring-inverted",
        },

        // squares & loading (unchanged)
        { size: "sm", square: true, class: "p-1.5" },
        { size: "md", square: true, class: "p-1.5" },
        { size: "lg", square: true, class: "p-2" },
        {
          loading: true,
          leading: true,
          class: { leadingIcon: "animate-spin" },
        },
        {
          loading: true,
          leading: false,
          trailing: true,
          class: { trailingIcon: "animate-spin" },
        },
      ],

      // 4) DEFAULTS
      defaultVariants: {
        color: "primary",
        variant: "solid",
        size: "md",
      },
    },
  },
});
