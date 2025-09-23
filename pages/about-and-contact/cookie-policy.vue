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
            >
              About & Contact
            </NuxtLink>
          </li>
          <li aria-hidden="true">/</li>
          <li class="text-primary-900">Cookie Policy</li>
        </ol>
      </nav>

      <!-- Title -->
      <header class="mb-8">
        <h1
          class="text-3xl md:text-4xl font-semibold tracking-tight text-primary-900"
        >
          Cookiepolitik
        </h1>
        <p class="mt-2 text-primary-900">Cookiepolitikken for tegetec.com</p>
        <p class="mt-3 text-primary-900">
          Dette dokument informerer Brugerne om de teknologier, der hjælper
          denne Applikation med at opnå de formål, der er beskrevet nedenfor.
          Sådanne teknologier giver Ejeren mulighed for at få adgang til og
          gemme oplysninger (f.eks. ved hjælp af en Cookie) eller bruge
          ressourcer (f.eks. ved at køre et script) på en Brugers enhed, når de
          interagerer med denne Applikation.
        </p>
        <p class="mt-2 text-primary-900">
          For nemheds skyld defineres alle sådanne teknologier som “Trackere” i
          dette dokument – medmindre andet er anført. Selv om Cookies f.eks. kan
          bruges på både web- og mobilbrowsere, ville det være upræcist at tale
          om Cookies i forbindelse med mobilapps, da Cookies er en
          browserbaseret Tracker. Derfor anvendes udtrykket Cookies i dette
          dokument kun, når der menes den pågældende type Tracker.
        </p>
        <p class="mt-2 text-primary-900">
          Det kan også være nødvendigt at indhente Brugerens samtykke til brug
          af Trackere. Et samtykke kan til enhver tid frit trækkes tilbage i
          henhold til instrukserne i dette dokument.
        </p>
        <p class="mt-3 text-sm text-primary-900">
          <strong>Seneste opdatering:</strong> april 03, 2024
        </p>
      </header>

      <!-- Local nav -->
      <UCard class="bg-[var(--color-surface-1)] text-primary-900 mb-8">
        <ul class="flex flex-wrap gap-4 text-sm">
          <li>
            <a href="#definitions" class="hover:underline underline-offset-4"
              >Definitioner</a
            >
          </li>
          <li>
            <a href="#how-we-use" class="hover:underline underline-offset-4"
              >Sådan bruger vi Trackere</a
            >
          </li>
          <li>
            <a href="#necessary" class="hover:underline underline-offset-4"
              >Nødvendige</a
            >
          </li>
          <li>
            <a href="#experience" class="hover:underline underline-offset-4"
              >Oplevelse</a
            >
          </li>
          <li>
            <a href="#measurement" class="hover:underline underline-offset-4"
              >Måling (Analytics)</a
            >
          </li>
          <li>
            <a href="#consent" class="hover:underline underline-offset-4"
              >Samtykke & præferencer</a
            >
          </li>
          <li>
            <a href="#manage" class="hover:underline underline-offset-4"
              >Tjek/slet cookies</a
            >
          </li>
          <li>
            <a href="#legal" class="hover:underline underline-offset-4"
              >Juridisk</a
            >
          </li>
        </ul>
      </UCard>

      <!-- Definitions -->
      <section id="definitions" class="mb-10">
        <h2 class="text-2xl md:text-3xl font-semibold text-primary-900">
          Definitioner
        </h2>
        <div class="prose max-w-none text-primary-900 mt-3">
          <p>
            <strong>Cookie</strong><br />Cookies er Trackere, der består af små
            datasæt, som gemmes i Brugerens browser.
          </p>
          <p class="mt-2">
            <strong>Tracker</strong><br />Tracker er et udtryk for en teknologi
            – f.eks. Cookies, unikke identifikatorer, webbeacons, indlejrede
            scripts, e-tags og fingeraftryk – der gør det muligt at spore
            Brugere, f.eks. ved at få adgang til eller lagre oplysninger på
            Brugerens enhed.
          </p>
        </div>
      </section>

      <!-- How this application uses trackers -->
      <section id="how-we-use" class="mb-10">
        <h2 class="text-2xl md:text-3xl font-semibold text-primary-900">
          Sådan bruger denne Applikation Trackere
        </h2>
        <div class="prose max-w-none text-primary-900 mt-3">
          <p>
            Denne Applikation bruger Trackere, der administreres direkte af
            Ejeren (“Førsteparts”-trackere) og Trackere, der aktiverer tjenester
            fra en tredjepart (“Tredjeparts”-trackere). Medmindre andet er
            anført, kan tredjepartsleverandører få adgang til de Trackere, som
            de administrerer. Gyldighedsperioden og udløbstiden kan variere
            afhængigt af den levetid, der er fastsat af Ejeren eller
            leverandøren. Nogle udløber ved afslutningen af Brugerens
            søgesession.
          </p>
        </div>
      </section>

      <!-- Necessary -->
      <section id="necessary" class="mb-10">
        <h2 class="text-2xl md:text-3xl font-semibold text-primary-900">
          Nødvendige
        </h2>
        <div class="prose max-w-none text-primary-900 mt-3">
          <p>
            Denne Applikation bruger såkaldte “tekniske” Cookies og andre
            lignende Trackere til aktiviteter, der er strengt nødvendige for
            drift eller levering af Tjenesten.
          </p>
          <h3 class="text-xl font-semibold mt-4">
            Trackere administreret af tredjeparter
          </h3>
          <p class="mt-2">
            <strong>Google Tag Manager (Google Ireland Limited)</strong><br />
            Google Tag Manager er en tjeneste til håndtering af tags, der
            leveres af Google Ireland Limited.<br />
            Personoplysninger, der behandles: Trackere.<br />
            Sted hvor behandlingen finder sted: Irland – Privatlivspolitik.
          </p>
        </div>
      </section>

      <!-- Experience -->
      <section id="experience" class="mb-10">
        <h2 class="text-2xl md:text-3xl font-semibold text-primary-900">
          Oplevelse
        </h2>
        <div class="prose max-w-none text-primary-900 mt-3">
          <p>
            Denne Applikation bruger Trackere til at levere en personlig
            brugeroplevelse ved at forbedre kvaliteten af indstillingerne for
            styring af præferencer og ved at muliggøre interaktion med eksterne
            netværk og platforme.
          </p>
        </div>
      </section>

      <!-- Measurement -->
      <section id="measurement" class="mb-10">
        <h2 class="text-2xl md:text-3xl font-semibold text-primary-900">
          Måling (Analytics)
        </h2>
        <div class="prose max-w-none text-primary-900 mt-3">
          <p>
            Denne Applikation bruger Trackere til at måle trafikken og analysere
            Brugeradfærd med henblik på at forbedre Tjenesten.
          </p>

          <h3 class="text-xl font-semibold mt-4">
            Google Analytics (Universal Analytics) med anonymiseret IP (Google
            Ireland Limited)
          </h3>
          <p>
            Google Analytics (Universal Analytics) er en webanalysetjeneste, der
            leveres af Google Ireland Limited (“Google”). Google bruger de
            indsamlede Data til at spore og undersøge brugen af denne
            Applikation, til at udarbejde rapporter om dens aktiviteter og dele
            dem med andre Google-tjenester. Google kan bruge de indsamlede Data
            til at kontekstualisere og tilpasse annoncerne i sit eget
            annoncenetværk. Denne integration anonymiserer IP-adresser i EU/EØS;
            kun i særlige tilfælde sendes fuld IP til en Google-server og
            forkortes i USA.
          </p>
          <p class="mt-2">
            Personoplysninger, der behandles: Brugsoplysninger og Trackere.<br />
            Sted hvor behandlingen finder sted: Irland – Privatlivspolitik – Opt
            Out.
          </p>
          <p class="mt-2">
            <strong>Varighed af Trackere (eksempler)</strong><br />
            AMP_TOKEN: 1 time · _ga: 2 år · _gac*: 3 måneder · _gat: 1 minut ·
            _gid: 1 dag
          </p>

          <h3 class="text-xl font-semibold mt-6">
            Google Analytics 4 (Google Ireland Limited)
          </h3>
          <p>
            Google Analytics 4 er en webanalysetjeneste, der leveres af Google
            Ireland Limited. Google bruger de indsamlede Data til at spore og
            undersøge brugen af denne Applikation, til at udarbejde rapporter om
            dens aktiviteter og dele dem med andre Google-tjenester. IP-adresser
            anvendes ved indsamlingstidspunktet og kasseres derefter, før
            Dataene logges i et datacenter eller på en server.
          </p>
          <p class="mt-2">
            Personoplysninger, der behandles: antal Brugere; Brugsoplysninger;
            sessionsstatistik og Trackere.<br />
            Sted hvor behandlingen finder sted: Irland – Privatlivspolitik – Opt
            Out.
          </p>
          <p class="mt-2">
            <strong>Varighed af Trackere</strong><br />
            _ga: 2 år · _ga_*: 2 år
          </p>
        </div>
      </section>

      <!-- Consent -->
      <section id="consent" class="mb-10">
        <h2 class="text-2xl md:text-3xl font-semibold text-primary-900">
          Sådan administrerer du præferencer og giver eller tilbagekalder
          samtykke
        </h2>
        <div class="prose max-w-none text-primary-900 mt-3">
          <p>
            Når brugen af Trackere er baseret på samtykke, kan Brugerne give
            eller trække et sådant samtykke tilbage ved at indstille eller
            opdatere deres præferencer i det privatlivspanel, der findes på
            denne Applikation. Med hensyn til eventuelle Trackere fra tredjepart
            kan Brugerne administrere deres præferencer via det relevante link
            til opt-out (hvis det er angivet), ved hjælp af de metoder, der er
            anført i tredjepartens privatlivspolitik, eller ved at kontakte
            tredjeparten.
          </p>
        </div>
      </section>

      <!-- Manage cookies -->
      <section id="manage" class="mb-10">
        <h2 class="text-2xl md:text-3xl font-semibold text-primary-900">
          Sådan tjekker eller sletter du Cookies via dine enhedsindstillinger
        </h2>
        <div class="prose max-w-none text-primary-900 mt-3">
          <p>
            Brugere kan bruge deres egne browserindstillinger til at se, hvilke
            Cookies eller lignende teknologier der er indstillet, blokere dem
            eller fjerne dem fra browseren. Browserindstillingerne tillader dog
            ikke detaljeret kontrol af samtykke efter kategori.
          </p>
          <p class="mt-2">
            Brugere kan f.eks. finde oplysninger om, hvordan de administrerer
            Cookies i de mest anvendte browsere:
          </p>
          <ul class="list-disc pl-5">
            <li>Google Chrome</li>
            <li>Mozilla Firefox</li>
            <li>Apple Safari</li>
            <li>Microsoft Internet Explorer</li>
            <li>Microsoft Edge</li>
            <li>Brave</li>
            <li>Opera</li>
          </ul>
          <p class="mt-2">
            Brugere kan også administrere visse kategorier af Trackere, der
            anvendes i mobilapps, ved at fravælge dem via relevante
            enhedsindstillinger (f.eks. annonceindstillinger for mobile enheder
            eller generelle sporingsindstillinger).
          </p>
        </div>
      </section>

      <!-- Legal -->
      <section id="legal" class="mb-2">
        <h2 class="text-2xl md:text-3xl font-semibold text-primary-900">
          Juridiske oplysninger
        </h2>
        <div class="prose max-w-none text-primary-900 mt-3">
          <p>
            Privatlivspolitikken vedrører udelukkende denne Applikation, hvis
            ikke andet er anført.
          </p>
          <p class="mt-2">Seneste opdatering: april 03, 2024</p>
        </div>
      </section>
    </UContainer>
  </main>
</template>

<script setup lang="ts">
useHead({ title: "Cookie Policy — Tegetec" });
</script>
