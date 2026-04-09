import type { Ref } from "vue";
import { animate } from "animejs";

export function useServiceFocus(reducedMotion: Ref<boolean>) {
  const sceneState = useSceneState();

  watch(
    () => sceneState.activeServiceIndex,
    (newIdx) => {
      if (reducedMotion.value) return;

      animate(".service-card", {
        opacity: 0.42,
        scale: 0.975,
        duration: 280,
        ease: "outQuad",
      });

      if (newIdx >= 0) {

        animate(`.service-card[data-service-index="${newIdx}"]`, {
          opacity: 1.0,
          scale: 1.03,
          duration: 400,
          ease: "outCubic",
          delay: 50,
        });
      } else {

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
