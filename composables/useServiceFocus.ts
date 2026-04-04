import type { Ref } from "vue";
import { animate } from "animejs";

/**
 * Synchronises DOM card emphasis with the active 3D service panel.
 * Uses anime.js v4 to fade/scale service cards as the camera chapters advance.
 * No-ops when reducedMotion is true.
 */
export function useServiceFocus(reducedMotion: Ref<boolean>) {
  const sceneState = useSceneState();

  watch(
    () => sceneState.activeServiceIndex,
    (newIdx) => {
      if (reducedMotion.value) return;

      // Dim all cards as a baseline
      animate(".service-card", {
        opacity: 0.42,
        scale: 0.975,
        duration: 280,
        ease: "outQuad",
      });

      if (newIdx >= 0) {
        // Lift the active card into focus
        animate(`.service-card[data-service-index="${newIdx}"]`, {
          opacity: 1.0,
          scale: 1.03,
          duration: 400,
          ease: "outCubic",
          delay: 50,
        });
      } else {
        // No chapter active — restore all cards
        animate(".service-card", {
          opacity: 1,
          scale: 1,
          duration: 400,
          ease: "outCubic",
        });
      }
    },
  );
}
