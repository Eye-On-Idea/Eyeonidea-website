<script setup lang="ts">
const { page } = usePageContent();
const services = computed(() => page.value?.services);

function btnTo(b: any) {
  // fallback if 'to' is missing in a locale
  if (b?.to) return b.to;
  // sensible defaults based on label text
  return /sammenlign|compare/i.test(b?.label) ? "/services" : "#contact";
}
function btnClasses(b: any) {
  // fallback classes if 'style' missing
  if (b?.style === "accent-solid") {
    return "border-brand-50 bg-brand-200 ring-brand-50 hover:bg-brand-300 focus-visible:ring-brand-50 font-bold";
  }
  if (b?.style === "primary-outline") {
    return "border-brand-50 text-brand-50 bg-transparent hover:bg-neutral-900/75 focus-visible:ring-brand-50 text-[0.75rem] font-sans ring-brand-50";
  }
  // default to outline look
  return "border-brand-50 text-brand-50 bg-transparent hover:bg-neutral-900/75 focus-visible:ring-brand-50 text-[0.75rem] font-sans ring-brand-50";
}
function innerSpanClass(b: any) {
  return b?.style === "accent-solid" ? "text-neutral-900 font-medium" : "";
}
</script>

<template>
  <div
    v-if="services"
    :id="services.id"
    aria-labelledby="services-title"
    class="bg flex bg-neutral-900"
  >
    <div class="cont flex flex-row">
      <section class="flex flex-col gap-1">
        <h2 id="services-title" class="!text-brand-200">
          {{ services.titleFirst }}
          <span class="!text-brand-50">{{ services.titleAccent }}</span>
        </h2>
        <p v-for="(para, i) in services.paragraphs" :key="i" v-html="para" />
        <div class="button-cont flex-row flex gap-6">
          <UButton
            v-for="(b, i) in services.buttons"
            :key="i"
            :to="btnTo(b)"
            variant="outline"
            :class="btnClasses(b)"
          >
            <span :class="innerSpanClass(b)">{{ b.label }}</span>
          </UButton>
        </div>
      </section>
      <div class="service-cont flex flex-col">
        <IndexMyServiceCard
          h3="Time-Based QA"
          text1="Flexible Hours"
          text2="Time-Based QA"
          href="/services#timebased"
        />
        <IndexMyServiceCard
          h3="Project QA"
          text1="Fixed Scope, Flexible Hours"
          text2="Project QA"
          href="/services#fixed"
        />
        <IndexMyServiceCard
          h3="Retainer QA"
          text1="Continuous Collaboration"
          text2="Retainer QA"
          href="/services#retainer"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.bg {
  position: relative;
  z-index: 2;
  margin-top: 50px;
  .cont {
    margin: 0 auto;
    max-width: 1440px;
    position: relative;
    padding: 50px 0 50px 0;
    height: 100%;
  }
  section {
    width: 100%;
    z-index: 2;
    padding-right: 12px;
    align-self: center;
    gap: 25px;
    p {
      line-height: 1.53;
      letter-spacing: 0.6px;
    }
  }
  .service-cont {
    width: 100%;
    z-index: 2;
    max-width: 600px;
    min-width: 320px;
  }
}

@media (max-width: 1440px) {
  .cont {
    padding: 25px;
  }
}
@media (max-width: 1200px) {
  .cont {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 25px;
    section {
      width: 80%;
      section {
        width: 100%;
      }
      p {
        padding: 0;
      }
    }
  }
  .service-cont {
    flex-wrap: wrap;
    flex-direction: row;
  }
}
@media (max-width: 769px) {
  .cont {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 25px;
    section {
      width: 90%;
      section {
        width: 100%;
      }
      p {
        padding: 0;
        font-size: 0.8rem;
      }
    }
    .service-cont {
      max-width: 590px;
      padding: 15px;
    }
  }
}
</style>
