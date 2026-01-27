import { joinURL } from "ufo";

export const useAssetUrl = () => {
  const baseURL = useRuntimeConfig().app?.baseURL || "/";
  return (path: string) => joinURL(baseURL, path);
};
