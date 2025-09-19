<!-- components/ContactForm.vue -->
<script setup lang="ts">
import { ref, computed } from "vue";

// Keep your existing logic
type Status = "idle" | "loading" | "error";
const status = ref<Status>("idle");
const errorMsg = ref("");

const name = ref("");
const email = ref("");
const subject = ref("");
const message = ref("");
const company = ref(""); // honeypot

const isSuccessOpen = ref(false); // controls the modal

// NEW: load translatable strings from JSON (reactive to language toggle)
const { page } = usePageContent();
const contact = computed(() => page.value?.contact);

// Submit unchanged, just uses your refs
async function onSubmit() {
  status.value = "loading";
  errorMsg.value = "";
  try {
    await $fetch<{ ok: boolean }>("/api/contact", {
      method: "POST",
      body: {
        name: name.value.trim(),
        email: email.value.trim(),
        subject: subject.value.trim(),
        message: message.value.trim(),
        company: company.value, // honeypot
      },
    });

    // success
    name.value =
      email.value =
      subject.value =
      message.value =
      company.value =
        "";
    status.value = "idle";
    isSuccessOpen.value = true;
  } catch (e: any) {
    status.value = "error";
    errorMsg.value =
      e?.data?.error || // from our function below
      e?.data?.statusMessage ||
      e?.message ||
      contact.value?.status?.genericError ||
      "Something went wrong. Please try again.";
  }
}
</script>

<template>
  <section
    v-if="contact"
    class="w-full max-w-2xl mx-auto"
    id="contact"
    aria-labelledby="contact-heading"
  >
    <h2 id="contact-heading">{{ contact.title }}</h2>
    <p class="mb-5">{{ contact.intro }}</p>

    <form @submit.prevent="onSubmit" class="flex flex-col gap-4" novalidate>
      <!-- Name -->
      <UFormGroup :label="contact.fields.name.label" name="name" required>
        <UInput
          v-model="name"
          :placeholder="contact.fields.name.placeholder"
          autocomplete="name"
          required
          :aria-invalid="status === 'error' && !name"
          class="w-full"
        />
      </UFormGroup>

      <!-- Email -->
      <UFormGroup :label="contact.fields.email.label" name="email" required>
        <UInput
          v-model="email"
          type="email"
          :placeholder="contact.fields.email.placeholder"
          autocomplete="email"
          required
          :aria-invalid="status === 'error' && !email"
          class="w-full"
        />
      </UFormGroup>

      <!-- Subject -->
      <UFormGroup :label="contact.fields.subject.label" name="subject" required>
        <UInput
          v-model="subject"
          :placeholder="contact.fields.subject.placeholder"
          required
          :aria-invalid="status === 'error' && !subject"
          class="w-full"
        />
      </UFormGroup>

      <!-- Message -->
      <UFormGroup :label="contact.fields.message.label" name="message" required>
        <UTextarea
          v-model="message"
          :rows="6"
          :placeholder="contact.fields.message.placeholder"
          required
          :aria-invalid="status === 'error' && !message"
          class="w-full"
        />
      </UFormGroup>

      <!-- Honeypot (hidden visually and from AT) -->
      <div class="sr-only" aria-hidden="true">
        <label>
          {{ contact.honeypotLabel }}
          <input
            v-model="company"
            type="text"
            tabindex="-1"
            autocomplete="off"
          />
        </label>
      </div>

      <!-- Submit -->
      <div class="submit-cont bg-brand-200 max-w-fit">
        <UButton
          type="submit"
          :loading="status === 'loading'"
          :disabled="status === 'loading'"
          class="submit inline-flex items-center gap-2"
        >
          <span>{{ contact.submit.label }}</span>
          <UIcon name="i-heroicons-paper-airplane-20-solid" class="h-5 w-5" />
        </UButton>
      </div>

      <!-- Error -->
      <p
        v-if="status === 'error'"
        class="text-red-700 text-sm"
        role="alert"
        aria-live="polite"
      >
        {{ errorMsg || contact.status.genericError }}
      </p>
    </form>

    <!-- Success modal -->
    <UModal
      v-if="isSuccessOpen"
      v-model="isSuccessOpen"
      :ui="{ content: 'sm:max-w-md' }"
      aria-label="Submission status"
    >
      <template #default>
        <div class="p-6 space-y-4">
          <h3 class="text-lg font-semibold">{{ contact.modal.title }}</h3>
          <p>{{ contact.modal.body }}</p>
          <div class="flex justify-end">
            <UButton @click="isSuccessOpen = false">{{
              contact.modal.close
            }}</UButton>
          </div>
        </div>
      </template>
    </UModal>
  </section>
</template>

<style scoped lang="scss">
#contact {
  position: relative;
  z-index: 2;
  form {
    .submit-cont {
      border-radius: var(--border-radius);
      .submit {
        cursor: pointer;
      }
    }
  }
}

:deep(input),
:deep(textarea) {
  @media (prefers-reduced-motion: no-preference) {
    transition: box-shadow 0.15s ease, outline-color 0.15s ease;
  }
}
</style>
