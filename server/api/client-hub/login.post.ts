export default defineEventHandler(async (event) => {
  const { password } = await readBody<{ password: string }>(event);

  if (!password) {
    throw createError({
      statusCode: 400,
      message: "Password is required",
    });
  }

  const config = useRuntimeConfig();
  const hubPassword = config.clientHubPassword;

  if (password !== hubPassword) {
    throw createError({
      statusCode: 401,
      message: "Invalid password",
    });
  }

  await setUserSession(event, {
    user: {
      clientHub: true,
    },
  });

  return { success: true };
});
