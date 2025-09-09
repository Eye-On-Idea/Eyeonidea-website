<template>
  <header class="flex row">
    <nav class="flex row">
      <ul class="flex row">
        <li><a href="/">home</a></li>
        <li><a href="/">home</a></li>
        <li><a href="/">home</a></li>
      </ul>
    </nav>
  </header>
</template>

<script></script>

<style lang="scss" scoped>
header {
  margin: 0 auto;
  width: 100%;
  max-width: 1440px;
  min-width: 320px;
  height: 80px;
  position: sticky;
  top: 0;
  nav {
    ul {
      li {
        a {
          text-transform: uppercase;
          width: 100%;
          height: 100%;
          padding: 10px;
          color: var(--prim-colour);
        }
      }
    }
  }

  nav {
    width: 100%;
    max-width: 1440px;
  }
}
</style>
