<template>
  <div
    id="about"
    aria-labelledby="about-title"
    class="bg flex bg-neutral-900/50 backdrop-blur-xs"
  >
    <div class="cont flex flex-row">
      <section class="flex flex-col gap-1">
        <h2 id="about-title" class="!text-brand-200">Eye On Idea</h2>
        <p>
          <strong>Menneskecentreret QA til bedre digitale produkter</strong>
        </p>

        <section class="flex flex-col gap-4 mt-3" aria-labelledby="areas-title">
          <h3 id="areas-title">EOI-områder</h3>
          <p>
            UX · UI · Tilgængelighed · Brugervenlighed · Responsivitet ·
            Mobil/Tablet · Cross-Browser · Kompatibilitet · Skærmlæsere · Ydelse
            · Design · Test · Front-End
          </p>

          <p>
            EOI er en kvalitetskontrolpartner, der
            <strong>hjælper virksomheder</strong> i hele Europa med at bygge
            digitale produkter, der er pålidelige, tilgængelige og
            <strong>nemme at bruge</strong>. Vi kombinerer brugervenlighed,
            tilgængelighed og front-end QA-ekspertise for at sikre, at din
            digitale tilstedeværelse <strong>fungerer for alle brugere</strong>.
          </p>
          <p>
            Vi arbejder tæt sammen med dit team for at gennemgå, teste og
            forbedre digitale tjenester. Hvert review eller projekt tilpasses
            dine behov, med klare og praktiske trin, der kan handles på med det
            samme. Vores proces er fleksibel, menneskecentreret og designet til
            at passe ind i dit workflow.
          </p>
          <p>
            Med fokus på detaljer og målbare resultater hjælper vi dig med at
            levere produkter, der fungerer bedre og skaber mere gnidningsfri
            oplevelser for dine brugere. Vores mål er enkelt: at hæve kvaliteten
            af dine digitale løsninger og støtte din langsigtede succes.
          </p>
        </section>
      </section>

      <div
        class="carousel flex flex-col justify-center"
        role="region"
        aria-labelledby="about-carousel-title"
      >
        <UCarousel
          :items="[
            {
              src: '/images/desk/rune_desk1.png',
              alt: 'Rune arbejder ved skrivebord med skærm',
            },
            {
              src: '/images/desk/rune_desk2.png',
              alt: 'Rune ved skrivebord, fokuseret på QA-test',
            },
          ]"
          dots
          loop
          :autoplay="{ delay: 10000 }"
          v-slot="{ item }"
          class="w-full mx-auto"
          aria-describedby="about-carousel-status"
        >
          <img :src="item.src" :alt="item.alt" class="rounded-lg" />
        </UCarousel>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.bg {
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

    p {
      line-height: 1.53;
      letter-spacing: 0.6px;
      strong {
        &:only-child {
          font-size: 1.2rem;
          font-family: kanit;
          letter-spacing: 1px;
        }
      }
      small {
        text-transform: uppercase;
      }
    }
  }
  .carousel {
    width: 100%;
    z-index: 2;
    max-width: fit-content;
    max-width: 590px;
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
    .carousel {
      max-width: 590px;
      padding: 15px;
    }
  }
}
</style>
