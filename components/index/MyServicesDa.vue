<template>
  <div
    id="services"
    aria-labelledby="services-title"
    class="bg flex bg-neutral-900"
  >
    <div class="cont flex flex-row">
      <section class="flex flex-col gap-1">
        <h2 id="services-title" class="!text-brand-200">
          Services
          <span class="!text-brand-50"> bygget til din arbejdsgang</span>
        </h2>

        <p>
          Hos <strong>Eye On Idea</strong> holder vi kvalitetssikring
          <strong>klar</strong> og <strong>praktisk</strong>. Vores services er
          fleksible og tilpasser sig den måde, din virksomhed arbejder på.
          Uanset om du har brug for et hurtigt review, struktureret
          projektstøtte eller en langsigtet QA-partner, fokuserer vi på at give
          dig <strong>handlingsorienterede forbedringer</strong>, der
          <strong>styrker dit produkt</strong> uden at bremse dit team.
        </p>

        <p>
          Fra korte audits til løbende support er målet at
          <strong>reducere friktion</strong>: digitale produkter, der fungerer
          bedre for dine brugere og reducerer friktion for dit team. Hver
          service er designet til at
          <strong
            >forbedre tilgængelighed, brugervenlighed og pålidelighed.</strong
          >
          Udforsk vores service-muligheder for at se, hvilken løsning der passer
          bedst til dine behov.
        </p>

        <div class="button-cont flex-row flex gap-6">
          <UButton
            href="/services_da#services"
            variant="outline"
            class="border-brand-50 bg-brand-200 ring-brand-50 hover:bg-brand-300 focus-visible:ring-brand-50 font-bold"
          >
            <span class="text-neutral-900 font-medium"
              >Sammenlign muligheder</span
            >
          </UButton>

          <UButton
            href="#contact"
            variant="outline"
            class="border-brand-50 text-brand-50 bg-transparent hover:bg-neutral-900/75 focus-visible:ring-brand-50 text-[0.75rem] font-sans ring-brand-50"
          >
            <span>Kontakt os</span>
          </UButton>
        </div>
      </section>

      <div class="service-cont flex flex-col">
        <IndexMyServiceCardDa />
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
