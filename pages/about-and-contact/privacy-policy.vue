<template>
  <main class="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)]">
    <UContainer class="max-w-[1440px] py-10 md:py-14">
      <!-- Breadcrumb -->
      <nav aria-label="Breadcrumb" class="text-sm mb-4">
        <ol class="flex flex-wrap items-center gap-2 text-primary-900">
          <li>
            <NuxtLink
              to="/about-and-contact"
              class="hover:underline underline-offset-2"
              >About & Contact</NuxtLink
            >
          </li>
          <li aria-hidden="true">/</li>
          <li class="text-primary-900">Privacy Policy</li>
        </ol>
      </nav>

      <!-- Title -->
      <header class="mb-8">
        <h1
          class="text-3xl md:text-4xl font-semibold tracking-tight text-primary-900"
        >
          Privatlivspolitik
        </h1>
        <p class="mt-2 text-primary-900">
          Denne side beskriver hvordan Tegetec behandler personoplysninger og
          anvender cookies/trackere.
        </p>
        <p class="mt-1 text-sm text-primary-900">
          <strong>Seneste opdatering:</strong> april 03, 2024
        </p>
      </header>

      <!-- Controller -->
      <section id="controller" class="mb-10">
        <h2 class="text-2xl md:text-3xl font-semibold text-primary-900">
          Ejer og Dataansvarlig
        </h2>
        <div class="mt-3 text-primary-900 space-y-2">
          <p>
            <strong>Tegetec</strong><br />Holmensvej 38, 3600 Frederikssund,
            Denmark
          </p>
          <p>
            E-mail:
            <a
              class="underline underline-offset-2"
              href="mailto:mail@tegetec.com"
              >mail@tegetec.com</a
            >
          </p>
        </div>
      </section>

      <!-- Purposes & Services (verbatim from doc; kept in Danish) -->
      <section id="purposes" class="mb-10">
        <h2 class="text-2xl md:text-3xl font-semibold text-primary-900">
          Personoplysninger og formål
        </h2>
        <UCard class="bg-[var(--color-surface-1)] text-primary-900 mt-3">
          <div
            class="prose prose-p:my-2 prose-ul:my-2 prose-li:my-1 max-w-none text-primary-900"
          >
            <p>
              <strong
                >Personoplysninger behandles til følgende formål og ved brug af
                følgende tjenester:</strong
              >
            </p>
            <h3 class="text-xl font-semibold">Administration af tags</h3>
            <ul>
              <li>
                <strong>Google Tag Manager</strong> — Personoplysninger:
                Trackere.
              </li>
            </ul>

            <h3 class="text-xl font-semibold mt-4">Analyser</h3>
            <ul>
              <li>
                <strong>Google Analytics 4</strong> — Personoplysninger: antal
                Brugere; Brugsoplysninger; sessionsstatistik; Trackere.
              </li>
            </ul>
          </div>
        </UCard>
      </section>

      <!-- GA details (kept from doc) -->
      <section id="ga-details" class="mb-10">
        <h2 class="text-2xl md:text-3xl font-semibold text-primary-900">
          Måling (Google Analytics)
        </h2>
        <UCard class="bg-[var(--color-surface-1)] text-primary-900 mt-3">
          <div class="prose max-w-none text-primary-900">
            <p>
              Denne Applikation bruger Trackere til at måle trafikken og
              analysere Brugeradfærd med henblik på at forbedre Tjenesten.
            </p>
            <h3 class="text-xl font-semibold">
              Google Analytics (Universal Analytics) med anonymiseret IP
            </h3>
            <p>
              Google bruger de indsamlede Data til at spore og undersøge brugen,
              udarbejde rapporter og dele dem med andre Google-tjenester.
              IP-adresser anonymiseres i EU/EØS; kun i særlige tilfælde sendes
              fuld IP til USA for forkortelse.
            </p>
            <ul class="list-disc pl-5">
              <li>Behandlede data: Brugsoplysninger; Trackere</li>
              <li>Sted: Irland – Privatlivspolitik – Opt Out</li>
              <li>
                Varighed af Trackere (eksempler): AMP_TOKEN 1 time, _ga 2 år,
                _gac* 3 mdr., _gat 1 min, _gid 1 dag
              </li>
            </ul>

            <h3 class="text-xl font-semibold mt-4">Google Analytics 4</h3>
            <p>
              IP-adresser anvendes ved indsamlingstidspunktet og kasseres, før
              data logges i et datacenter/server. Se Googles dokumentation for
              detaljer.
            </p>
            <ul class="list-disc pl-5">
              <li>
                Behandlede data: antal Brugere; Brugsoplysninger;
                sessionsstatistik; Trackere
              </li>
              <li>Sted: Irland – Privatlivspolitik – Opt Out</li>
              <li>Varighed: _ga 2 år; _ga_* 2 år</li>
            </ul>
          </div>
        </UCard>
      </section>

      <!-- Cookie/consent management pointers (from doc) -->
      <section id="cookies" class="mb-10">
        <h2 class="text-2xl md:text-3xl font-semibold text-primary-900">
          Cookies / samtykke
        </h2>
        <UCard class="bg-[var(--color-surface-1)] text-primary-900 mt-3">
          <div class="prose max-w-none text-primary-900">
            <p>
              Når brugen af Trackere er baseret på samtykke, kan Brugere give
              eller trække samtykke tilbage i privatlivspanelet på denne
              Applikation. Brugere kan også administrere tredjeparts Trackere
              via opt-out-links, udbydernes privatlivspolitikker eller ved at
              kontakte tredjeparten.
            </p>
            <p>
              Det er muligt at tjekke/slette cookies via browserindstillinger
              (Chrome, Firefox, Safari, Edge, m.fl.). Bemærk, at detaljeret
              kategoristyring kan være begrænset i standardindstillingerne.
              Visse kategorier i mobilapps kan fravælges i enhedens
              indstillinger.
            </p>
          </div>
        </UCard>
      </section>

      <!-- Legal note / last updated -->
      <section id="legal" class="mb-10">
        <h2 class="text-2xl md:text-3xl font-semibold text-primary-900">
          Juridiske oplysninger
        </h2>
        <p class="mt-3 text-primary-900">
          Privatlivspolitikken vedrører udelukkende denne Applikation, hvis ikke
          andet er anført.
        </p>
      </section>

      <!-- Contact footer -->
      <section id="contact-footer">
        <UCard class="bg-[var(--color-surface-1)] text-primary-900">
          <p>
            Spørgsmål vedrørende denne privatlivspolitik kan rettes til:
            <a
              class="underline underline-offset-2"
              href="mailto:mail@tegetec.com"
              >mail@tegetec.com</a
            >
          </p>
        </UCard>
      </section>
    </UContainer>
  </main>
</template>

<script setup lang="ts">
useHead({ title: "Privacy Policy — Tegetec" });
</script>
