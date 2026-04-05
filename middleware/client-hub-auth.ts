export default defineNuxtRouteMiddleware((to) => {
  const localePath = useLocalePath();

  // Don't gate the disclaimer/login page itself
  if (to.path === localePath("/client-hub/login")) return;

  // Client-side only: localStorage is not available on the server
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
