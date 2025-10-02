<template>
  <footer class="bg-neutral-900 text-brand-100 z-20 mt-12">
    <!-- top border accent -->
    <div class="h-1 w-full bg-brand-500/60"></div>

    <div class="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8">
      <div
        class="flex flex-col items-center gap-8 md:flex-row md:justify-center md:gap-16"
      >
        <!-- Left: navigation -->
        <nav aria-label="Footer" class="text-left">
          <ul class="flex flex-col gap-2 text-sm font-medium">
            <li>
              <NuxtLink
                to="/"
                class="hover:underline underline-offset-4 decoration-brand-200"
              >
                Home
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/services"
                class="hover:underline underline-offset-4 decoration-brand-200"
              >
                Services
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/about"
                class="hover:underline underline-offset-4 decoration-brand-200"
              >
                About
              </NuxtLink>
            </li>
          </ul>
        </nav>

        <!-- Middle: logo -->
        <div>
          <img
            src="/public-material/logo-center-shadow.svg"
            alt="Eye On Idea logo"
            class="h-14 w-auto select-none"
            draggable="false"
          />
        </div>

        <!-- Right: contact -->
        <div class="text-left">
          <h3 class="text-sm font-semibold text-brand-200 mb-2">Contact</h3>
          <ul class="flex flex-col gap-2 text-sm">
            <li>
              <a
                href="mailto:hello@eyeonidea.com"
                class="rounded-lg px-2 py-1 hover:ring-2 hover:ring-brand-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900"
              >
                hello@eyeonidea.com
              </a>
            </li>
            <li>
              <a
                href="tel:+4540233267"
                class="rounded-lg px-2 py-1 hover:ring-2 hover:ring-brand-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900"
              >
                +45 40 23 32 67
              </a>
            </li>
          </ul>
        </div>
      </div>

      <!-- Divider -->
      <div class="mt-8 border-t border-brand-700/40 pt-4">
        <p class="text-xs text-brand-200/80 text-center">
          © <strong>Copyright</strong> Rune M. P. Pjetursson | Eye On Idea
          <small class="ml-1">2025</small>
        </p>
      </div>
    </div>
  </footer>
</template>
