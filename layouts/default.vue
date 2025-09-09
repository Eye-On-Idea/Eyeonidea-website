<template>
  <div class="default-layout min-h-screen flex flex-col">
    <MyHeader />
    <main class="flex-1">
      <slot />
    </main>
    <MyFoot />
  </div>
</template>
