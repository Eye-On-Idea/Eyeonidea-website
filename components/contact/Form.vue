<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

const { t } = useI18n();

const sectionRef = ref<HTMLElement | null>(null);
const isVisible = ref(false);
const isSubmitting = ref(false);

onMounted(() => {
  if (!sectionRef.value) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          isVisible.value = true;
          observer.disconnect();
        }
      });
    },
    { threshold: 0.1 }
  );

  observer.observe(sectionRef.value);

  onUnmounted(() => {
    observer.disconnect();
  });
});

const interestOptions = [
  { value: "website", label: "contact.form.interest.options.website" },
  { value: "identity", label: "contact.form.interest.options.identity" },
  { value: "cms", label: "contact.form.interest.options.cms" },
  { value: "support", label: "contact.form.interest.options.support" },
  { value: "consulting", label: "contact.form.interest.options.consulting" },
  { value: "other", label: "contact.form.interest.options.other" },
];
</script>

<template>
  <section
    ref="sectionRef"
    class="contact-form-section"
    aria-labelledby="contact-form-heading"
  >
    <div class="section-container">
      <div
        class="form-wrapper"
        :class="{ 'animate-in': isVisible }"
      >
        <form
          id="contact-form"
          class="contact-form glass-subtle"
          action="https://formsubmit.co/hello@eyeonidea.com"
          method="POST"
        >
          <h2 id="contact-form-heading" class="form-heading">
            {{ t("contact.form.heading") }}
          </h2>

          <!-- Name & Email Row -->
          <div class="form-row">
            <div class="form-group">
              <label for="name" class="form-label">
                {{ t("contact.form.name.label") }}
                <span class="required">*</span>
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                class="form-input"
                :placeholder="t('contact.form.name.placeholder')"
              />
            </div>
            <div class="form-group">
              <label for="email" class="form-label">
                {{ t("contact.form.email.label") }}
                <span class="required">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                class="form-input"
                :placeholder="t('contact.form.email.placeholder')"
              />
            </div>
          </div>

          <!-- Phone & Company Row -->
          <div class="form-row">
            <div class="form-group">
              <label for="phone" class="form-label">
                {{ t("contact.form.phone.label") }}
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                class="form-input"
                :placeholder="t('contact.form.phone.placeholder')"
              />
            </div>
            <div class="form-group">
              <label for="company" class="form-label">
                {{ t("contact.form.company.label") }}
              </label>
              <input
                id="company"
                name="company"
                type="text"
                class="form-input"
                :placeholder="t('contact.form.company.placeholder')"
              />
            </div>
          </div>

          <!-- Interest Dropdown -->
          <div class="form-group">
            <label for="interest" class="form-label">
              {{ t("contact.form.interest.label") }}
            </label>
            <select
              id="interest"
              name="interest"
              class="form-select"
            >
              <option value="" disabled selected>
                {{ t("contact.form.interest.placeholder") }}
              </option>
              <option
                v-for="option in interestOptions"
                :key="option.value"
                :value="option.value"
              >
                {{ t(option.label) }}
              </option>
            </select>
          </div>

          <!-- Subject -->
          <div class="form-group">
            <label for="subject" class="form-label">
              {{ t("contact.form.subject.label") }}
              <span class="required">*</span>
            </label>
            <input
              id="subject"
              name="subject"
              type="text"
              required
              class="form-input"
              :placeholder="t('contact.form.subject.placeholder')"
            />
          </div>

          <!-- Message -->
          <div class="form-group">
            <label for="message" class="form-label">
              {{ t("contact.form.message.label") }}
              <span class="required">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              rows="5"
              required
              class="form-textarea"
              :placeholder="t('contact.form.message.placeholder')"
            ></textarea>
          </div>

          <!-- Hidden fields for FormSubmit -->
          <input type="hidden" name="_subject" value="New Contact Form Submission - Eye On Idea" />
          <input type="hidden" name="_captcha" value="false" />
          <input type="hidden" name="_template" value="table" />

          <!-- Submit Button -->
          <div class="form-actions">
            <button
              type="submit"
              class="submit-button"
              :disabled="isSubmitting"
            >
              <span v-if="!isSubmitting">{{ t("contact.form.submit") }}</span>
              <span v-else>{{ t("contact.form.submitting") }}</span>
              <svg
                v-if="!isSubmitting"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                class="submit-icon"
              >
                <path d="M3.105 2.289a.75.75 0 00-.826.95l1.414 4.925A1.5 1.5 0 005.135 9.25h6.115a.75.75 0 010 1.5H5.135a1.5 1.5 0 00-1.442 1.086l-1.414 4.926a.75.75 0 00.826.95 28.896 28.896 0 0015.293-7.154.75.75 0 000-1.115A28.897 28.897 0 003.105 2.289z" />
              </svg>
            </button>
          </div>

          <!-- GDPR Notice -->
          <p class="gdpr-notice">
            {{ t("contact.form.gdprNotice") }}
          </p>
        </form>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.contact-form-section {
  padding: 4rem 1.5rem 6rem;
  background: var(--color-section-light);

  @media (min-width: 768px) {
    padding: 6rem 2rem 8rem;
  }
}

.section-container {
  max-width: 700px;
  margin: 0 auto;
}

.form-wrapper {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.8s var(--ease-smooth), transform 0.8s var(--ease-smooth);

  &.animate-in {
    opacity: 1;
    transform: translateY(0);
  }
}

.contact-form {
  padding: 2rem;
  border-radius: var(--radius-xl);

  @media (min-width: 768px) {
    padding: 3rem;
  }
}

.form-heading {
  font-size: var(--text-2xl);
  font-weight: 700;
  color: var(--color-text);
  margin-bottom: 2rem;
  text-align: center;

  @media (min-width: 768px) {
    font-size: var(--text-3xl);
  }
}

.form-row {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-label {
  display: block;
  font-size: var(--text-sm);
  font-weight: 500;
  color: var(--color-text);
  margin-bottom: 0.5rem;
}

.required {
  color: var(--color-primary-500);
}

.form-input,
.form-select,
.form-textarea {
  width: 100%;
  padding: 0.875rem 1rem;
  font-size: var(--text-base);
  color: var(--color-text);
  background: var(--color-bg-input);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  transition: border-color 0.2s var(--ease-smooth), box-shadow 0.2s var(--ease-smooth);

  &::placeholder {
    color: var(--color-text-subtle);
  }

  &:focus {
    outline: none;
    border-color: var(--color-primary-400);
    box-shadow: 0 0 0 3px var(--color-primary-100);
  }
}

.form-select {
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
  background-position: right 0.75rem center;
  background-repeat: no-repeat;
  background-size: 1.25rem;
  padding-right: 2.5rem;
}

.form-textarea {
  resize: vertical;
  min-height: 140px;
}

.form-actions {
  margin-top: 2rem;
  text-align: center;
}

.submit-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 1rem 2.5rem;
  background: var(--color-primary-500);
  color: white;
  font-size: var(--text-base);
  font-weight: 600;
  border: none;
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: background 0.2s var(--ease-smooth), transform 0.2s var(--ease-smooth);

  &:hover:not(:disabled) {
    background: var(--color-primary-600);
    transform: translateY(-2px);
  }

  &:focus-visible {
    outline: 2px solid var(--color-primary-400);
    outline-offset: 4px;
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
}

.submit-icon {
  width: 1.125rem;
  height: 1.125rem;
}

.gdpr-notice {
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--color-border);
  font-size: var(--text-xs);
  line-height: 1.6;
  color: var(--color-text-subtle);
  text-align: center;
}

// Dark mode
:root.dark {
  .contact-form-section {
    background: var(--color-section-dark);
  }

  .form-input,
  .form-select,
  .form-textarea {
    background: var(--color-bg-elevated);
    border-color: var(--color-border);

    &:focus {
      border-color: var(--color-primary-500);
      box-shadow: 0 0 0 3px var(--color-primary-900);
    }
  }

  .form-select {
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%239ca3af' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
  }
}

@media (prefers-reduced-motion: reduce) {
  .form-wrapper {
    opacity: 1;
    transform: none;
    transition: none;
  }
}
</style>
