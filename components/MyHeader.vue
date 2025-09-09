<template>
  <header class="fixed top-0 z-10 mx-auto flex h-20 w-full min-w-[320px">
    <nav class="w-full max-w-[1440px]">
      <ul class="flex flex-row">
        <li>
          <a href="/" class="block h-full w-full px-2.5 py-2 uppercase">
            home
          </a>
        </li>
        <li>
          <a href="/services" class="block h-full w-full px-2.5 py-2 uppercase">
            services
          </a>
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
          <a href="/about" class="block h-full w-full px-2.5 py-2 uppercase">
            About
          </a>
        </li>
        <li><button>DA/EN</button></li>
      </ul>
    </nav>
  </header>
</template>

<style lang="scss" scoped>
header {
  nav {
    display: flex;
    justify-content: center;
    margin-top: auto;
    padding: 15px;
    max-width: 1440px;
    margin: 0 auto;

    ul {
      gap: 15px;
      li,
      button {
        margin-top: auto;
        font-family: kanit;
        font-weight: 700;
        font-size: 18px;
        line-height: 27px;
        letter-spacing: 0.09em;
        text-transform: uppercase;
        button {
          border-radius: var(--border-radius);
          background-color: var(--quart-colour);
          padding: 6px;
          outline: auto;
          outline-width: 1px;
          outline-offset: 1px;
          outline-color: var(--sec-colour);
        }
      }
    }
  }
}
</style>
