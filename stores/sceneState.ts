import { defineStore } from "pinia";

export const useSceneState = defineStore("sceneState", () => {
  const activeServiceIndex = ref(-1);

  const setActiveService = (idx: number) => {
    activeServiceIndex.value = idx;
  };

  return { activeServiceIndex, setActiveService };
});
