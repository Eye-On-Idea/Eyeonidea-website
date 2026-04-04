<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick } from "vue";

const { t } = useI18n();

const sectionRef = ref<HTMLElement | null>(null);
const isVisible = ref(false);
const isSubmitting = ref(false);
const submitSuccess = ref(false);
const submitError = ref(false);

onMounted(() => {
  if (!sectionRef.value) return;
  const observer = new IntersectionObserver(
    (entries) => {
      const entry = entries[0];
      if (entry?.isIntersecting) {
        isVisible.value = true;
        observer.disconnect();
      }
    },
    { threshold: 0.05 },
  );
  observer.observe(sectionRef.value);
  document.addEventListener("click", handleClickOutside);
  onUnmounted(() => {
    observer.disconnect();
    document.removeEventListener("click", handleClickOutside);
  });
});

// Form data
const formData = ref({
  name: "",
  email: "",
  phone: "",
  company: "",
  interest: "",
  subject: "",
  message: "",
});

// Interest dropdown
const interestOptions = computed(() => [
  { value: "website", label: t("contact.form.interest.options.website") },
  { value: "identity", label: t("contact.form.interest.options.identity") },
  { value: "cms", label: t("contact.form.interest.options.cms") },
  { value: "support", label: t("contact.form.interest.options.support") },
  { value: "consulting", label: t("contact.form.interest.options.consulting") },
  { value: "other", label: t("contact.form.interest.options.other") },
]);

const isDropdownOpen = ref(false);
const dropdownRef = ref<HTMLElement | null>(null);
const focusedOptionIndex = ref(-1);

const selectedLabel = computed(() => {
  const selected = interestOptions.value.find(
    (opt) => opt.value === formData.value.interest,
  );
  return selected?.label || "";
});

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
  if (isDropdownOpen.value) {
    focusedOptionIndex.value = interestOptions.value.findIndex(
      (opt) => opt.value === formData.value.interest,
    );
  }
};

const selectOption = (value: string) => {
  formData.value.interest = value;
  isDropdownOpen.value = false;
  nextTick(() => {
    dropdownRef.value?.querySelector<HTMLElement>(".dropdown-trigger")?.focus();
  });
};

const handleDropdownKeydown = (event: KeyboardEvent) => {
  const options = interestOptions.value;
  switch (event.key) {
    case "Enter":
    case " ":
      event.preventDefault();
      if (isDropdownOpen.value && focusedOptionIndex.value >= 0) {
        const selectedOption = options[focusedOptionIndex.value];
        if (selectedOption) {
          selectOption(selectedOption.value);
        }
      } else {
        toggleDropdown();
      }
      break;
    case "ArrowDown":
      event.preventDefault();
      if (!isDropdownOpen.value) {
        isDropdownOpen.value = true;
        focusedOptionIndex.value = 0;
      } else {
        focusedOptionIndex.value = Math.min(
          focusedOptionIndex.value + 1,
          options.length - 1,
        );
      }
      break;
    case "ArrowUp":
      event.preventDefault();
      if (isDropdownOpen.value) {
        focusedOptionIndex.value = Math.max(focusedOptionIndex.value - 1, 0);
      }
      break;
    case "Escape":
      event.preventDefault();
      isDropdownOpen.value = false;
      break;
    case "Home":
      if (isDropdownOpen.value) {
        event.preventDefault();
        focusedOptionIndex.value = 0;
      }
      break;
    case "End":
      if (isDropdownOpen.value) {
        event.preventDefault();
        focusedOptionIndex.value = options.length - 1;
      }
      break;
  }
};

const handleClickOutside = (event: MouseEvent) => {
  if (
    dropdownRef.value &&
    !dropdownRef.value.contains(event.target as Node)
  ) {
    isDropdownOpen.value = false;
  }
};

// Form submission
const handleSubmit = async (event: Event) => {
  event.preventDefault();
  if (isSubmitting.value) return;

  isSubmitting.value = true;
  submitSuccess.value = false;
  submitError.value = false;

  try {
    const form = event.target as HTMLFormElement;
    const data = new FormData(form);
    const response = await fetch(form.action, {
      method: "POST",
      body: data,
      headers: { Accept: "application/json" },
    });

    if (response.ok) {
      submitSuccess.value = true;
      formData.value = {
        name: "",
        email: "",
        phone: "",
        company: "",
        interest: "",
        subject: "",
        message: "",
      };
    } else {
      submitError.value = true;
    }
  } catch {
    submitError.value = true;
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<template>
  <section
    ref="sectionRef"
    class="contact-form-section"
    aria-labelledby="contact-form-heading"
  >
    <!-- Section label row -->
    <div class="section-label-row" aria-hidden="true">
      <span class="sep-line" />
      <span class="sep-diamond" />
      <span class="sep-text">{{ t("contact.form.heading") }}</span>
      <span class="sep-diamond" />
      <span class="sep-line" />
    </div>

    <div class="section-container">
      <div class="form-wrapper" :class="{ 'animate-in': isVisible }">
        <form
          id="contact-form"
          class="contact-form"
          action="https://formsubmit.co/ajax/hello@eyeonidea.com"
          method="POST"
          @submit="handleSubmit"
        >
          <!-- Success Message -->
          <Transition name="alert">
            <div v-if="submitSuccess" class="form-alert form-alert--success" role="alert">
              <span class="alert-icon" aria-hidden="true">✓</span>
              <span>{{ t("contact.form.successMessage") }}</span>
            </div>
          </Transition>

          <!-- Error Message -->
          <Transition name="alert">
            <div v-if="submitError" class="form-alert form-alert--error" role="alert">
              <span class="alert-icon" aria-hidden="true">✕</span>
              <span>{{ t("contact.form.errorMessage") }}</span>
            </div>
          </Transition>

          <!-- Name & Email Row -->
          <div class="form-row">
            <div class="form-group">
              <label for="contact-name" class="form-label">
                {{ t("contact.form.name.label") }}
                <span class="required" aria-hidden="true">*</span>
              </label>
              <input
                id="contact-name"
                v-model="formData.name"
                name="name"
                type="text"
                required
                autocomplete="name"
                class="form-input"
                :placeholder="t('contact.form.name.placeholder')"
              />
            </div>
            <div class="form-group">
              <label for="contact-email" class="form-label">
                {{ t("contact.form.email.label") }}
                <span class="required" aria-hidden="true">*</span>
              </label>
              <input
                id="contact-email"
                v-model="formData.email"
                name="email"
                type="email"
                required
                autocomplete="email"
                class="form-input"
                :placeholder="t('contact.form.email.placeholder')"
              />
            </div>
          </div>

          <!-- Phone & Company Row -->
          <div class="form-row">
            <div class="form-group">
              <label for="contact-phone" class="form-label">
                {{ t("contact.form.phone.label") }}
              </label>
              <input
                id="contact-phone"
                v-model="formData.phone"
                name="phone"
                type="tel"
                autocomplete="tel"
                class="form-input"
                :placeholder="t('contact.form.phone.placeholder')"
              />
            </div>
            <div class="form-group">
              <label for="contact-company" class="form-label">
                {{ t("contact.form.company.label") }}
              </label>
              <input
                id="contact-company"
                v-model="formData.company"
                name="company"
                type="text"
                autocomplete="organization"
                class="form-input"
                :placeholder="t('contact.form.company.placeholder')"
              />
            </div>
          </div>

          <!-- Interest Custom Dropdown -->
          <div class="form-group">
            <label id="interest-label" class="form-label">
              {{ t("contact.form.interest.label") }}
            </label>
            <input type="hidden" name="interest" :value="formData.interest" />
            <div ref="dropdownRef" class="custom-select">
              <button
                type="button"
                class="dropdown-trigger"
                role="combobox"
                aria-haspopup="listbox"
                :aria-expanded="isDropdownOpen"
                aria-labelledby="interest-label"
                aria-controls="interest-listbox"
                :class="{ 'has-value': formData.interest }"
                @click="toggleDropdown"
                @keydown="handleDropdownKeydown"
              >
                <span class="dropdown-text">
                  {{ selectedLabel || t("contact.form.interest.placeholder") }}
                </span>
                <span
                  class="dropdown-chevron"
                  :class="{ 'dropdown-chevron--open': isDropdownOpen }"
                  aria-hidden="true"
                >↓</span>
              </button>

              <Transition name="dropdown">
                <ul
                  v-if="isDropdownOpen"
                  id="interest-listbox"
                  role="listbox"
                  aria-labelledby="interest-label"
                  class="dropdown-list"
                >
                  <li
                    v-for="(option, index) in interestOptions"
                    :key="option.value"
                    role="option"
                    :aria-selected="formData.interest === option.value"
                    class="dropdown-option"
                    :class="{
                      'dropdown-option--selected': formData.interest === option.value,
                      'dropdown-option--focused': focusedOptionIndex === index,
                    }"
                    @click="selectOption(option.value)"
                    @mouseenter="focusedOptionIndex = index"
                  >
                    <span>{{ option.label }}</span>
                    <span
                      v-if="formData.interest === option.value"
                      class="option-check"
                      aria-hidden="true"
                    >◆</span>
                  </li>
                </ul>
              </Transition>
            </div>
          </div>

          <!-- Subject -->
          <div class="form-group">
            <label for="contact-subject" class="form-label">
              {{ t("contact.form.subject.label") }}
              <span class="required" aria-hidden="true">*</span>
            </label>
            <input
              id="contact-subject"
              v-model="formData.subject"
              name="subject"
              type="text"
              required
              class="form-input"
              :placeholder="t('contact.form.subject.placeholder')"
            />
          </div>

          <!-- Message -->
          <div class="form-group">
            <label for="contact-message" class="form-label">
              {{ t("contact.form.message.label") }}
              <span class="required" aria-hidden="true">*</span>
            </label>
            <textarea
              id="contact-message"
              v-model="formData.message"
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
              <span v-if="!isSubmitting" class="submit-inner">
                {{ t("contact.form.submit") }}
                <span class="submit-arrow" aria-hidden="true">→</span>
              </span>
              <span v-else class="submitting-content">
                <span class="spinner" aria-hidden="true" />
                {{ t("contact.form.submitting") }}
              </span>
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
/* ── Section ──────────────────────────────────────────────────── */
.contact-form-section {
  background: #120703;
  padding-bottom: 0;
}

/* ── Section label row ────────────────────────────────────────── */
.section-label-row {
  display: flex;
  align-items: center;
  gap: 1rem;
  max-width: 80rem;
  margin: 0 auto;
  padding: 6rem 2rem 4rem;
}

.sep-line {
  flex: 1;
  height: 1px;
  background: rgba(223, 175, 133, 0.12);
}

.sep-diamond {
  width: 5px;
  height: 5px;
  background: rgba(223, 175, 133, 0.35);
  transform: rotate(45deg);
  flex-shrink: 0;
}

.sep-text {
  font-family: var(--font-heading);
  font-size: 0.6rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(223, 175, 133, 0.45);
  flex-shrink: 0;
}

/* ── Container ────────────────────────────────────────────────── */
.section-container {
  max-width: 48rem;
  margin: 0 auto;
  padding: 0 2rem 6rem;
}

/* ── Form wrapper (animation) ─────────────────────────────────── */
.form-wrapper {
  opacity: 0;
  transform: translateY(24px);
  transition:
    opacity 0.7s var(--ease-smooth),
    transform 0.7s var(--ease-smooth);

  &.animate-in {
    opacity: 1;
    transform: translateY(0);
  }
}

/* ── Form panel ───────────────────────────────────────────────── */
.contact-form {
  padding: 2.5rem 2rem;
  background: rgba(18, 7, 3, 0.5);
  border: 1px solid rgba(223, 175, 133, 0.12);

  @media (min-width: 640px) {
    padding: 3rem 3rem;
  }
}

/* ── Alerts ───────────────────────────────────────────────────── */
.form-alert {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.875rem 1.25rem;
  font-family: var(--font-heading);
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  margin-bottom: 1.5rem;
  border: 1px solid;
}

.form-alert--success {
  background: rgba(223, 175, 133, 0.06);
  color: rgba(223, 175, 133, 0.8);
  border-color: rgba(223, 175, 133, 0.2);
}

.form-alert--error {
  background: rgba(220, 38, 38, 0.06);
  color: rgba(252, 165, 165, 0.9);
  border-color: rgba(220, 38, 38, 0.2);
}

.alert-icon {
  font-size: 0.9rem;
  flex-shrink: 0;
}

/* ── Alert transitions ────────────────────────────────────────── */
.alert-enter-active,
.alert-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}
.alert-enter-from,
.alert-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}

/* ── Form rows ────────────────────────────────────────────────── */
.form-row {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0;

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }
}

.form-group {
  margin-bottom: 1.5rem;
}

/* ── Labels ───────────────────────────────────────────────────── */
.form-label {
  display: block;
  font-family: var(--font-heading);
  font-size: 0.6rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: rgba(223, 175, 133, 0.5);
  margin-bottom: 0.625rem;
}

.required {
  color: rgba(223, 175, 133, 0.6);
  margin-left: 0.125rem;
}

/* ── Inputs ───────────────────────────────────────────────────── */
.form-input,
.form-textarea {
  width: 100%;
  padding: 0.875rem 1rem;
  min-height: 48px;
  font-family: var(--font-text);
  font-size: clamp(0.875rem, 1vw, 0.95rem);
  font-weight: 300;
  color: rgba(255, 255, 255, 0.88);
  background: rgba(223, 175, 133, 0.03);
  border: 1px solid rgba(223, 175, 133, 0.12);
  border-radius: 0;
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;
  appearance: none;

  &::placeholder {
    color: rgba(255, 255, 255, 0.2);
  }

  &:focus-visible {
    outline: none;
    border-color: rgba(223, 175, 133, 0.45);
    box-shadow: 0 0 0 3px rgba(223, 175, 133, 0.06);
  }
}

.form-textarea {
  resize: vertical;
  min-height: 140px;
}

/* ── Custom dropdown ──────────────────────────────────────────── */
.custom-select {
  position: relative;
}

.dropdown-trigger {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0.875rem 1rem;
  min-height: 48px;
  font-family: var(--font-text);
  font-size: clamp(0.875rem, 1vw, 0.95rem);
  font-weight: 300;
  color: rgba(255, 237, 223, 0.25);
  background: rgba(223, 175, 133, 0.03);
  border: 1px solid rgba(223, 175, 133, 0.12);
  cursor: pointer;
  text-align: left;
  transition: border-color 0.2s ease;

  &.has-value {
    color: rgba(255, 255, 255, 0.88);
  }

  &:focus-visible {
    outline: none;
    border-color: rgba(223, 175, 133, 0.45);
    box-shadow: 0 0 0 3px rgba(223, 175, 133, 0.06);
  }

  &:hover {
    border-color: rgba(223, 175, 133, 0.25);
  }
}

.dropdown-text {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.dropdown-chevron {
  flex-shrink: 0;
  font-size: 0.75rem;
  color: rgba(223, 175, 133, 0.35);
  transition: transform 0.2s ease;
  display: inline-block;

  &--open {
    transform: rotate(180deg);
  }
}

.dropdown-list {
  position: absolute;
  z-index: 50;
  top: calc(100% + 2px);
  left: 0;
  right: 0;
  list-style: none;
  padding: 0.25rem;
  margin: 0;
  background: #1a0c07;
  border: 1px solid rgba(223, 175, 133, 0.15);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.5);
  max-height: 240px;
  overflow-y: auto;
  transform-origin: top;
}

.dropdown-option {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1rem;
  min-height: 44px;
  font-family: var(--font-text);
  font-size: clamp(0.875rem, 1vw, 0.95rem);
  font-weight: 300;
  color: rgba(255, 237, 223, 0.65);
  cursor: pointer;
  transition: background 0.15s ease;

  &--focused,
  &:hover {
    background: rgba(223, 175, 133, 0.05);
    color: #ffeddf;
  }

  &--selected {
    color: rgba(223, 175, 133, 0.85);
  }
}

.option-check {
  font-size: 0.4rem;
  color: rgba(223, 175, 133, 0.6);
  flex-shrink: 0;
}

/* ── Dropdown transition ──────────────────────────────────────── */
.dropdown-enter-active,
.dropdown-leave-active {
  transition: opacity 0.18s ease, transform 0.18s ease;
  transform-origin: top;
}
.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: scaleY(0.95) translateY(-4px);
}

/* ── Submit ───────────────────────────────────────────────────── */
.form-actions {
  margin-top: 2rem;
  text-align: center;
}

.submit-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 2.5rem;
  min-height: 48px;
  background: rgba(223, 175, 133, 0.12);
  color: rgba(223, 175, 133, 0.9);
  border: 1px solid rgba(223, 175, 133, 0.3);
  font-family: var(--font-heading);
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  cursor: pointer;
  transition:
    background 0.2s ease,
    border-color 0.2s ease,
    color 0.2s ease;

  &:hover:not(:disabled) {
    background: rgba(223, 175, 133, 0.18);
    border-color: rgba(223, 175, 133, 0.5);
    color: #ffeddf;
  }

  &:focus-visible {
    outline: 2px solid rgba(223, 175, 133, 0.5);
    outline-offset: 3px;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}

.submit-inner {
  display: inline-flex;
  align-items: center;
  gap: 0.625rem;
}

.submit-arrow {
  transition: transform 0.2s ease;

  .submit-button:hover:not(:disabled) & {
    transform: translateX(3px);
  }
}

.submitting-content {
  display: inline-flex;
  align-items: center;
  gap: 0.625rem;
}

.spinner {
  display: inline-block;
  width: 0.875rem;
  height: 0.875rem;
  border: 1px solid rgba(223, 175, 133, 0.2);
  border-top-color: rgba(223, 175, 133, 0.7);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* ── GDPR notice ──────────────────────────────────────────────── */
.gdpr-notice {
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(223, 175, 133, 0.08);
  font-family: var(--font-text);
  font-size: 0.75rem;
  font-weight: 300;
  line-height: 1.6;
  color: rgba(255, 237, 223, 0.25);
  text-align: center;
}

@media (prefers-reduced-motion: reduce) {
  .form-wrapper {
    opacity: 1;
    transform: none;
    transition: none;
  }

  .spinner {
    animation: none;
  }
}

/* ── Light mode overrides ─────────────────────────────────────── */
html:not(.dark) {
  .contact-form-section { background: var(--color-section-light); }

  .sep-line    { background: var(--deco-line); }
  .sep-diamond { background: var(--deco-diamond); }
  .sep-text    { color: var(--deco-text); }

  .contact-form {
    background: rgba(255, 255, 255, 0.75);
    border-color: var(--deco-line);
  }

  .form-alert--success {
    background: rgba(153, 82, 38, 0.05);
    color: var(--color-primary-700);
    border-color: rgba(153, 82, 38, 0.25);
  }

  .form-label { color: var(--color-primary-500); opacity: 0.7; }
  .required   { color: var(--color-primary-600); opacity: 1; }

  .form-input,
  .form-textarea {
    color: var(--color-text-primary);
    background: rgba(255, 255, 255, 0.9);
    border-color: var(--deco-line);

    &::placeholder { color: var(--color-text-subtle); opacity: 0.5; }

    &:focus-visible {
      border-color: var(--color-primary-400);
      box-shadow: 0 0 0 3px rgba(153, 82, 38, 0.08);
    }
  }

  .dropdown-trigger {
    color: var(--color-text-subtle);
    background: rgba(255, 255, 255, 0.9);
    border-color: var(--deco-line);

    &.has-value { color: var(--color-text-primary); }

    &:focus-visible {
      border-color: var(--color-primary-400);
      box-shadow: 0 0 0 3px rgba(153, 82, 38, 0.08);
    }

    &:hover { border-color: var(--deco-line-strong); }
  }

  .dropdown-chevron { color: var(--color-primary-500); opacity: 0.5; }

  .dropdown-list {
    background: #fff;
    border-color: var(--deco-line);
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.08);
  }

  .dropdown-option {
    color: var(--color-text-secondary);

    &--focused,
    &:hover {
      background: rgba(153, 82, 38, 0.04);
      color: var(--color-text-primary);
    }

    &--selected { color: var(--color-primary-600); }
  }

  .option-check { color: var(--color-primary-500); }

  .submit-button {
    background: rgba(153, 82, 38, 0.08);
    color: var(--color-primary-700);
    border-color: var(--deco-line-strong);

    &:hover:not(:disabled) {
      background: rgba(153, 82, 38, 0.14);
      border-color: var(--color-primary-500);
      color: var(--color-primary-800);
    }

    &:focus-visible { outline-color: var(--color-primary-500); }
  }

  .gdpr-notice {
    border-top-color: var(--deco-line);
    color: var(--color-text-subtle);
    opacity: 0.6;
  }
}
</style>


