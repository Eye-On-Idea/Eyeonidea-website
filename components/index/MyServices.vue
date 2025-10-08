<template>
  <div id="services" aria-labelledby="services-title" class="bg flex">
    <div class="cont flex flex-row">
      <section class="flex flex-col gap-1">
        <h2 id="services-title" class="!text-brand-200">
          Services
          <span class="!text-brand-50"> built for your workflow</span>
        </h2>

        <p>
          At <strong>Eye On Idea</strong>, we keep quality assurance
          <strong>clear</strong> and <strong>practical</strong>. Our services
          are flexible and adapt to the way your business works. Whether you
          need a quick review, structured project support, or a long-term QA
          partner, we focus on giving you
          <strong>actionable improvements</strong> that
          <strong>strengthen your product</strong> without slowing your team
          down
        </p>
        <p>
          From short audits to ongoing support, the outcome is
          <strong>reduce friction</strong>: digital products that work better
          for your users and reduce friction for your team. Each service is
          designed to
          <strong>improve accessibility, usability, and reliability.</strong>
          Explore our service options to see which setup fits your needs best.
        </p>

        <div class="button-cont flex-row flex gap-6">
          <UButton
            to="/services#services"
            variant="outline"
            class="border-brand-50 bg-brand-200 ring-brand-50 hover:bg-brand-300 focus-visible:ring-brand-50 font-bold"
          >
            <span class="text-neutral-900 font-medium">Compare options</span>
          </UButton>

          <UButton
            to="#contact"
            variant="outline"
            class="border-brand-50 text-brand-50 bg-transparent hover:bg-neutral-900/75 focus-visible:ring-brand-50 text-[0.75rem] font-sans ring-brand-50"
          >
            <span>Contact us</span>
          </UButton>
        </div>
      </section>

      <div class="service-cont flex flex-col">
        <IndexMyServiceCard
          h3="Digital Tool Consulting"
          img="/images/userconfusion.png"
          alt="alt is working"
          p1="paragraph 1 here"
          p2="paragraph 2 is here ooyo"
          footTxt="from 60€ "
          VAT="VAT not included"
          butTxt="Detailed Information"
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
