<template>
  <header class="flex row">
    <nav class="flex row">
      <ul class="flex row">
        <li><a href="/">home</a></li>
        <li><a href="/">home</a></li>
        <li><a href="/">home</a></li>
      </ul>
    </nav>
    <svg
      width="1920"
      height="64"
      viewBox="0 0 1920 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      class="deco"
    >
      <g clip-path="url(#clip0_93_91)">
        <path
          class="deco-fill"
          d="M921 22L960.466 61L999 22L999 24L960.466 63.9326L921 24L921 22Z"
        />
        <rect y="22" width="921" height="2" class="deco-fill" />
        <rect x="999" y="22" width="921" height="2" class="deco-fill" />
        <rect
          x="959.92"
          width="31"
          height="31"
          rx="6"
          class="deco-fill"
          transform="rotate(45 959.92 0)"
        />
      </g>
      <defs>
        <clipPath id="clip0_93_91">
          <rect width="1920" height="64" fill="white" />
        </clipPath>
      </defs>
    </svg>
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
  position: relative;
  outline: auto;
  outline-color: var(--sec-colour);
  box-shadow: 2px 5px 2px var(--box-glow);
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
  .deco {
    position: absolute;
    bottom: -73px;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    .deco-fill {
      fill: var(--sec-colour);
    }
  }
  nav {
    width: 100%;
    max-width: 1440px;
  }
}
</style>
