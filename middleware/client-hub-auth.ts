export default defineNuxtRouteMiddleware((to) => {
  const localePath = useLocalePath();

  if (to.path === localePath("/client-hub/login")) return;

  if (import.meta.client) {
    const acknowledged = sessionStorage.getItem("client-hub-acknowledged");
    if (!acknowledged) {
      return navigateTo(
        localePath("/client-hub/login") +
          `?redirect=${encodeURIComponent(to.fullPath)}`,
      );
    }
  }
});
