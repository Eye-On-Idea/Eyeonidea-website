<template>
  <section>
    <UContainer class="max-w-[1440px] py-10 md:py-14">
      <div class="grid gap-6 md:grid-cols-2">
        <!-- RA Jones / KartridgPak -->
        <CollaboratorCard
          name="RA Jones (KartridgPak)"
          logo="/assets/img/collaborators/RA_JONES_Logo.svg"
          alt="Logo for the company RA Jones"
          tagline="Chub packaging systems"
          summary="High-volume chub packaging with continuous operation, tight diameter control and flexible sealing options."
          :bullets="[
            'Continuous motion; reduced downtime',
            'Recipe-driven changeovers',
            'Upgrades: film drive, safety guard, HMI retrofit',
          ]"
          :cta="{ label: 'Request info', to: '/about-and-contact#contact' }"
          learnMoreTo="/equipment-and-solutions#chubmaker-details"
          externalHref="https://www.rajones.com/"
        />

        <CollaboratorCard
          name="Lyco Manufacturing"
          logo="/assets/img/collaborators/lyco.svg"
          alt="Logo for the company Lyco"
          tagline="Blanching, cooking, and cooling"
          summary="Clean-Flow® blanchers and rotary drum systems designed for uniform quality, higher recovery and fast changeovers."
          :bullets="[
            'Hydro-Flow® agitation improves heat transfer',
            'Lower water usage; sanitation-friendly',
            'Applications: pasta, rice, vegetables, beans',
          ]"
          :cta="{ label: 'Discuss a line', to: '/about-and-contact#contact' }"
          externalHref="https://www.lycomfg.com/"
        />

        <CollaboratorCard
          name="Elmoprint"
          logo="/assets/img/collaborators/elmoprint.svg"
          alt="Logo for the company Elmoprint"
          tagline="Date-coding systems"
          summary="Fully integratable coders for flexible packaging and cartoning, with regional consumables and service."
          :bullets="[
            'High-contrast prints; minimal downtime',
            'Easy integration with conveyors and HMIs',
            'Regional consumables & service support',
          ]"
          :cta="{ label: 'Integrate coding', to: '/about-and-contact#contact' }"
          externalHref="https://www.elmoprint.dk/"
        />

        <CollaboratorCard
          name="Mepaco"
          logo="/assets/img/collaborators/mepaco-logo.svg"
          alt="Logo for the company Mepaco"
          tagline="Processing systems"
          summary="Customized blending, cooking and material-handling modules for upstream and mid-process."
          :bullets="[
            'Sanitary designs with robust drives',
            'Batch or continuous configurations',
            'Controls, parts and local service',
          ]"
          :cta="{ label: 'Plan a project', to: '/about-and-contact#contact' }"
          externalHref="https://www.mepaco.net/"
        />
      </div>
    </UContainer>
  </section>
</template>
<script setup lang="ts">
import CollaboratorCard from "./CollaboratorCard.vue";

// No extra logic
</script>
