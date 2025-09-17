<template>
  <a
    href="#hero"
    class="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:rounded-xl focus:bg-[var(--quart-colour)] focus:px-3 focus:py-2 focus:text-[var(--prim-colour)]"
  >
    Skip to main content
  </a>
  <header class="fixed top-0 z-10 mx-auto flex h-20 w-full min-w-[320px">
    <nav class="w-full max-w-[1440px]">
      <ul class="flex flex-row">
        <li>
          <NuxtLink
            to="/"
            :aria-current="$route.path === '/' ? 'page' : undefined"
            class="nav-link"
          >
            home
          </NuxtLink>
        </li>
        <li>
          <NuxtLink
            to="/services"
            :aria-current="
              $route.path.startsWith('/services') ? 'page' : undefined
            "
            class="nav-link"
          >
            Services
          </NuxtLink>
        </li>
        <li>
          <a href="/"
            ><img
              class="logo"
              src="/public-material/logo-center-shadow.svg"
              alt="EOI logo with shadow effect on lettering"
          /></a>
        </li>
        <li>
          <NuxtLink
            to="/about"
            :aria-current="
              $route.path.startsWith('/about') ? 'page' : undefined
            "
            class="nav-link"
          >
            About
          </NuxtLink>
        </li>
        <li>
          <button
            type="button"
            aria-label="Switch language to/from Danish/English"
          >
            DA/EN
          </button>
        </li>
      </ul>
    </nav>
  </header>
</template>

<style lang="scss" scoped>
header {
  background-color: #1f1f1f50;
  backdrop-filter: blur(2.4px);
  -webkit-backdrop-filter: blur(5.4px);
  box-shadow: 0px 20px 9px 0px #1f1f1fa0;
  nav {
    display: flex;
    justify-content: center;
    margin-top: auto;
    padding: 15px;
    margin: 0 auto;

    ul {
      gap: 25px;
      letter-spacing: 0.09em;
      li {
        margin-top: auto;
        text-transform: uppercase;
        cursor: pointer;
        transition: var(--transition-normal);
        &:hover {
          outline: auto;
          padding: 6px;
          border-radius: 6px;
        }
        &:nth-child(3) {
          transition: all 1.2s ease-out;
          &:hover {
            background-color: var(--quart-colour);
            padding: 15px;
            transform: scale(0.75);
            transition: all 0.3s ease-in;
          }
        }
        &:nth-child(5) {
          &:hover {
            outline: none;
          }
        }
        img {
          width: 100%;
          max-width: 150px;
          min-width: 50px;
        }
      }
      button {
        border-radius: var(--border-radius);
        background-color: var(--quart-colour);
        padding: 6px;
        outline: auto;
        outline-width: 1px;
        outline-offset: 1px;
        outline-color: var(--sec-colour);
        transition: var(--transition-normal);
        width: 100%;
        cursor: pointer;
        &:hover {
          width: 120%;
          outline: auto;
        }
      }
    }
  }
}
</style>
