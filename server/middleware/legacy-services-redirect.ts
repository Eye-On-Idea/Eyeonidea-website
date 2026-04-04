const LEGACY_LOCALES = new Set(["de", "fr", "es", "it", "dk"]);
const LEGACY_SOLUTIONS_PATHS = new Set([
  "",
  "website-packages",
  "visual-identity",
  "additional-services",
  "process",
]);

export default defineEventHandler((event) => {
  const url = getRequestURL(event);
  const normalizedPath = url.pathname.replace(/\/+$/, "") || "/";
  const segments = normalizedPath.split("/").filter(Boolean);

  let localePrefix = "";
  const firstSegment = segments[0];
  if (firstSegment && LEGACY_LOCALES.has(firstSegment)) {
    localePrefix = `/${segments.shift()}`;
  }

  if (segments[0] !== "services") return;

  const legacySubpath = segments.slice(1).join("/");
  if (!LEGACY_SOLUTIONS_PATHS.has(legacySubpath)) return;

  const suffix = legacySubpath ? `/${legacySubpath}` : "";
  const target = `${localePrefix}/solutions${suffix}${url.search}`;
  return sendRedirect(event, target, 301);
});
