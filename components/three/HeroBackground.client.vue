<script setup lang="ts">
import { ref, onMounted, onUnmounted, shallowRef } from "vue";

// Props for customization
const props = withDefaults(
  defineProps<{
    particleCount?: number;
    primaryColor?: string;
    secondaryColor?: string;
  }>(),
  {
    particleCount: 80,
    primaryColor: "rgba(223, 175, 133, 0.6)", // primary-200
    secondaryColor: "rgba(100, 198, 183, 0.4)", // accent-300
  }
);

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  color: string;
  opacity: number;
}

const canvasRef = ref<HTMLCanvasElement | null>(null);
const particles = shallowRef<Particle[]>([]);
const animationId = ref<number>(0);
const prefersReducedMotion = ref(false);

const createParticles = (width: number, height: number): Particle[] => {
  const newParticles: Particle[] = [];

  for (let i = 0; i < props.particleCount; i++) {
    const isPrimary = Math.random() > 0.4;
    newParticles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 4 + 1,
      speedX: (Math.random() - 0.5) * 0.3,
      speedY: (Math.random() - 0.5) * 0.3,
      color: isPrimary ? props.primaryColor : props.secondaryColor,
      opacity: Math.random() * 0.5 + 0.2,
    });
  }

  return newParticles;
};

const animate = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
  if (prefersReducedMotion.value) {
    // Static render for reduced motion
    ctx.clearRect(0, 0, width, height);
    particles.value.forEach((particle) => {
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fillStyle = particle.color;
      ctx.globalAlpha = particle.opacity * 0.5;
      ctx.fill();
    });
    ctx.globalAlpha = 1;
    return;
  }

  ctx.clearRect(0, 0, width, height);

  particles.value.forEach((particle) => {
    // Update position with wave motion
    particle.x += particle.speedX + Math.sin(Date.now() * 0.001 + particle.y * 0.01) * 0.2;
    particle.y += particle.speedY + Math.cos(Date.now() * 0.001 + particle.x * 0.01) * 0.1;

    // Wrap around edges
    if (particle.x < 0) particle.x = width;
    if (particle.x > width) particle.x = 0;
    if (particle.y < 0) particle.y = height;
    if (particle.y > height) particle.y = 0;

    // Draw particle with glow
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
    ctx.fillStyle = particle.color;
    ctx.globalAlpha = particle.opacity;
    ctx.fill();

    // Add subtle glow
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.size * 2, 0, Math.PI * 2);
    ctx.fillStyle = particle.color;
    ctx.globalAlpha = particle.opacity * 0.2;
    ctx.fill();
  });

  ctx.globalAlpha = 1;

  animationId.value = requestAnimationFrame(() => animate(ctx, width, height));
};

const drawConnections = (ctx: CanvasRenderingContext2D) => {
  const connectionDistance = 120;

  for (let i = 0; i < particles.value.length; i++) {
    for (let j = i + 1; j < particles.value.length; j++) {
      const dx = particles.value[i].x - particles.value[j].x;
      const dy = particles.value[i].y - particles.value[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < connectionDistance) {
        ctx.beginPath();
        ctx.moveTo(particles.value[i].x, particles.value[i].y);
        ctx.lineTo(particles.value[j].x, particles.value[j].y);
        ctx.strokeStyle = props.primaryColor;
        ctx.globalAlpha = (1 - distance / connectionDistance) * 0.15;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    }
  }
  ctx.globalAlpha = 1;
};

onMounted(() => {
  prefersReducedMotion.value = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  const handleChange = (e: MediaQueryListEvent) => {
    prefersReducedMotion.value = e.matches;
  };
  mediaQuery.addEventListener("change", handleChange);

  if (!canvasRef.value) return;

  const canvas = canvasRef.value;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const resizeCanvas = () => {
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    ctx.scale(dpr, dpr);
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;

    particles.value = createParticles(rect.width, rect.height);
  };

  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  const animateWithConnections = () => {
    const rect = canvas.getBoundingClientRect();
    ctx.clearRect(0, 0, rect.width, rect.height);

    // Draw connections first (behind particles)
    if (!prefersReducedMotion.value) {
      drawConnections(ctx);
    }

    // Update and draw particles
    particles.value.forEach((particle) => {
      if (!prefersReducedMotion.value) {
        particle.x += particle.speedX + Math.sin(Date.now() * 0.0008 + particle.y * 0.01) * 0.15;
        particle.y += particle.speedY + Math.cos(Date.now() * 0.0008 + particle.x * 0.01) * 0.08;

        if (particle.x < 0) particle.x = rect.width;
        if (particle.x > rect.width) particle.x = 0;
        if (particle.y < 0) particle.y = rect.height;
        if (particle.y > rect.height) particle.y = 0;
      }

      // Draw particle
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fillStyle = particle.color;
      ctx.globalAlpha = particle.opacity;
      ctx.fill();

      // Glow effect
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size * 2.5, 0, Math.PI * 2);
      ctx.fillStyle = particle.color;
      ctx.globalAlpha = particle.opacity * 0.15;
      ctx.fill();
    });

    ctx.globalAlpha = 1;

    if (!prefersReducedMotion.value) {
      animationId.value = requestAnimationFrame(animateWithConnections);
    }
  };

  animateWithConnections();

  onUnmounted(() => {
    cancelAnimationFrame(animationId.value);
    window.removeEventListener("resize", resizeCanvas);
    mediaQuery.removeEventListener("change", handleChange);
  });
});
</script>

<template>
  <canvas
    ref="canvasRef"
    class="hero-background-canvas"
    aria-hidden="true"
  />
</template>

<style scoped>
.hero-background-canvas {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}
</style>
