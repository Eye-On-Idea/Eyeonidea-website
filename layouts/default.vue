<template>
  <div class="default-layout min-h-screen flex flex-col">
    <MyHeader style="view-transition-name: site-header" />
    <main class="flex-1">
      <slot />
    </main>
    <MyContactAbs />
    <MyFoot style="view-transition-name: site-footer" />
  </div>
</template>
