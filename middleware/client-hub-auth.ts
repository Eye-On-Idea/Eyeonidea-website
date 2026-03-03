export default defineNuxtRouteMiddleware((to) => {
  // Don't gate the disclaimer/login page itself
  if (to.path === "/client-hub/login") return;

  // Client-side only: localStorage is not available on the server
  if (import.meta.client) {
    const acknowledged = localStorage.getItem("client-hub-acknowledged");
    if (!acknowledged) {
      return navigateTo(
        `/client-hub/login?redirect=${encodeURIComponent(to.fullPath)}`,
      );
    }
  }
});
