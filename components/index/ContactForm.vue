<!-- components/ContactForm.vue -->
<script setup lang="ts">
import { ref } from "vue";

type Status = "idle" | "loading" | "error";
const status = ref<Status>("idle");
const errorMsg = ref("");

const name = ref("");
const email = ref("");
const subject = ref("");
const message = ref("");
const company = ref(""); // honeypot

const isSuccessOpen = ref(false); // controls the modal

async function onSubmit() {
  status.value = "loading";
  errorMsg.value = "";
  try {
    const res = await $fetch("/api/contact", {
      method: "POST",
      body: {
        name: name.value.trim(),
        email: email.value.trim(),
        subject: subject.value.trim(),
        message: message.value.trim(),
        company: company.value,
      },
    });
    if ((res as any)?.ok) {
      // reset
      name.value =
        email.value =
        subject.value =
        message.value =
        company.value =
          "";
      status.value = "idle";
      isSuccessOpen.value = true; // open modal
    } else {
      throw new Error("Send failed");
    }
  } catch (e: any) {
    status.value = "error";
    errorMsg.value =
      e?.data?.statusMessage ||
      e?.message ||
      "Something went wrong. Please try again.";
  }
}
</script>

<template>
  <section
    class="w-full max-w-2xl mx-auto"
    id="contact"
    aria-labelledby="contact-heading"
  >
    <h2 id="contact-heading" class="">Contact form</h2>
    <p class="mb-5">
      Send us a message, and let's see if we can help each other
    </p>
    <form @submit.prevent="onSubmit" class="flex flex-col gap-4" novalidate>
      <UFormGroup label="Name" name="name" required>
        <UInput
          v-model="name"
          placeholder="Your name"
          autocomplete="name"
          required
          :aria-invalid="status === 'error' && !name"
          class="w-full"
        />
      </UFormGroup>

      <UFormGroup label="Email" name="email" required>
        <UInput
          v-model="email"
          type="email"
          placeholder="you@example.com"
          autocomplete="email"
          required
          :aria-invalid="status === 'error' && !email"
          class="w-full"
        />
      </UFormGroup>

      <UFormGroup label="Subject" name="subject" required>
        <UInput
          v-model="subject"
          placeholder="What is this about?"
          required
          :aria-invalid="status === 'error' && !subject"
          class="w-full"
        />
      </UFormGroup>

      <UFormGroup label="Message" name="message" required>
        <UTextarea
          v-model="message"
          :rows="6"
          placeholder="Write your message here..."
          required
          :aria-invalid="status === 'error' && !message"
          class="w-full"
        />
      </UFormGroup>

      <!-- Honeypot - visually hidden and hidden from AT -->
      <div class="sr-only" aria-hidden="true">
        <label>
          Company
          <input
            v-model="company"
            type="text"
            tabindex="-1"
            autocomplete="off"
          />
        </label>
      </div>

      <div class="submit-cont bg-brand-200 max-w-fit">
        <UButton
          type="submit"
          :loading="status === 'loading'"
          :disabled="status === 'loading'"
          class="submit inline-flex items-center gap-2"
        >
          <span>Send message</span>
          <UIcon name="i-heroicons-paper-airplane-20-solid" class="h-5 w-5" />
        </UButton>
      </div>

      <p
        v-if="status === 'error'"
        class="text-red-700 text-sm"
        role="alert"
        aria-live="polite"
      >
        {{ errorMsg }}
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
          <h3 class="text-lg font-semibold">Thank you</h3>
          <p>Your message has been sent. I’ll get back to you soon.</p>
          <div class="flex justify-end">
            <UButton @click="isSuccessOpen = false">Close</UButton>
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
