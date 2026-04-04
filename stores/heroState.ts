import { defineStore } from "pinia";
import { ref } from "vue";

export const useHeroState = defineStore("heroState", () => {
  const logoAssembled = ref(false);

  const markLogoAssembled = () => {
    logoAssembled.value = true;
  };

  return { logoAssembled, markLogoAssembled };
});
