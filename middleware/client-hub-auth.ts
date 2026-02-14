export default defineNuxtRouteMiddleware(async (to) => {
  // Don't protect the login page itself
  if (to.path === "/client-hub/login") {
    return;
  }

  const { loggedIn, user } = useUserSession();

  // Check if user has client hub access
  if (!loggedIn.value || !user.value?.clientHub) {
    return navigateTo(`/client-hub/login?redirect=${encodeURIComponent(to.fullPath)}`);
  }
});
