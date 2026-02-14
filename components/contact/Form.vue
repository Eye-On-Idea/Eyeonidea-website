<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick } from "vue";

const { t } = useI18n();

const sectionRef = ref<HTMLElement | null>(null);
const isVisible = ref(false);
const isSubmitting = ref(false);
const submitSuccess = ref(false);
const submitError = ref(false);

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
    (opt) => opt.value === formData.value.interest
  );
  return selected?.label || "";
});

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
  if (isDropdownOpen.value) {
    focusedOptionIndex.value = interestOptions.value.findIndex(
      (opt) => opt.value === formData.value.interest
    );
  }
};

const selectOption = (value: string) => {
  formData.value.interest = value;
  isDropdownOpen.value = false;
  // Return focus to trigger
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
        selectOption(options[focusedOptionIndex.value].value);
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
          options.length - 1
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

// Close dropdown on outside click
const handleClickOutside = (event: MouseEvent) => {
  if (
    dropdownRef.value &&
    !dropdownRef.value.contains(event.target as Node)
  ) {
    isDropdownOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});

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
      headers: {
        Accept: "application/json",
      },
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
          @submit="handleSubmit"
        >
          <h2 id="contact-form-heading" class="form-heading">
            {{ t("contact.form.heading") }}
          </h2>

          <!-- Success Message -->
          <Transition
            enter-active-class="transition-all duration-300 ease-out"
            leave-active-class="transition-all duration-200 ease-in"
            enter-from-class="opacity-0 -translate-y-2"
            enter-to-class="opacity-100 translate-y-0"
            leave-from-class="opacity-100 translate-y-0"
            leave-to-class="opacity-0 -translate-y-2"
          >
            <div v-if="submitSuccess" class="form-alert form-alert--success" role="alert">
              <UIcon name="i-heroicons-check-circle" class="alert-icon" aria-hidden="true" />
              <span>{{ t("contact.form.successMessage") }}</span>
            </div>
          </Transition>

          <!-- Error Message -->
          <Transition
            enter-active-class="transition-all duration-300 ease-out"
            leave-active-class="transition-all duration-200 ease-in"
            enter-from-class="opacity-0 -translate-y-2"
            enter-to-class="opacity-100 translate-y-0"
            leave-from-class="opacity-100 translate-y-0"
            leave-to-class="opacity-0 -translate-y-2"
          >
            <div v-if="submitError" class="form-alert form-alert--error" role="alert">
              <UIcon name="i-heroicons-exclamation-triangle" class="alert-icon" aria-hidden="true" />
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
            <!-- Hidden input for form submission -->
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
                <UIcon
                  name="i-heroicons-chevron-down"
                  class="dropdown-chevron"
                  :class="{ 'dropdown-chevron--open': isDropdownOpen }"
                  aria-hidden="true"
                />
              </button>

              <Transition
                enter-active-class="transition-all duration-200 ease-out"
                leave-active-class="transition-all duration-150 ease-in"
                enter-from-class="opacity-0 -translate-y-1 scale-y-95"
                enter-to-class="opacity-100 translate-y-0 scale-y-100"
                leave-from-class="opacity-100 translate-y-0 scale-y-100"
                leave-to-class="opacity-0 -translate-y-1 scale-y-95"
              >
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
                    <UIcon
                      v-if="formData.interest === option.value"
                      name="i-heroicons-check"
                      class="option-check"
                      aria-hidden="true"
                    />
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
              <span v-if="!isSubmitting">{{ t("contact.form.submit") }}</span>
              <span v-else class="submitting-content">
                <UIcon name="i-heroicons-arrow-path" class="spinner" aria-hidden="true" />
                {{ t("contact.form.submitting") }}
              </span>
              <UIcon
                v-if="!isSubmitting"
                name="i-heroicons-paper-airplane"
                class="submit-icon"
                aria-hidden="true"
              />
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

// Alert messages
.form-alert {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 1.25rem;
  border-radius: var(--radius-md);
  font-size: var(--text-sm);
  font-weight: 500;
  margin-bottom: 1.5rem;
}

.form-alert--success {
  background: color-mix(in srgb, var(--color-accent-500) 10%, transparent);
  color: var(--color-accent-700);
  border: 1px solid color-mix(in srgb, var(--color-accent-500) 25%, transparent);
}

.form-alert--error {
  background: color-mix(in srgb, #ef4444 10%, transparent);
  color: #dc2626;
  border: 1px solid color-mix(in srgb, #ef4444 25%, transparent);
}

.alert-icon {
  width: 1.25rem;
  height: 1.25rem;
  flex-shrink: 0;
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
.form-textarea {
  width: 100%;
  padding: 0.875rem 1rem;
  min-height: 48px;
  font-size: var(--text-base);
  font-family: inherit;
  color: var(--color-text);
  background: var(--color-surface-1);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  transition: border-color 0.2s var(--ease-smooth), box-shadow 0.2s var(--ease-smooth);

  &::placeholder {
    color: var(--color-text-subtle);
  }

  &:focus-visible {
    outline: none;
    border-color: var(--color-primary-400);
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-primary-500) 15%, transparent);
  }
}

.form-textarea {
  resize: vertical;
  min-height: 140px;
}

// Custom select dropdown
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
  font-size: var(--text-base);
  font-family: inherit;
  color: var(--color-text-subtle);
  background: var(--color-surface-1);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  cursor: pointer;
  text-align: left;
  transition: border-color 0.2s var(--ease-smooth), box-shadow 0.2s var(--ease-smooth);

  &.has-value {
    color: var(--color-text);
  }

  &:focus-visible {
    outline: none;
    border-color: var(--color-primary-400);
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-primary-500) 15%, transparent);
  }

  &:hover {
    border-color: var(--color-border-strong);
  }
}

.dropdown-text {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.dropdown-chevron {
  width: 1.25rem;
  height: 1.25rem;
  flex-shrink: 0;
  color: var(--color-text-secondary);
  transition: transform 0.2s var(--ease-smooth);

  &--open {
    transform: rotate(180deg);
  }
}

.dropdown-list {
  position: absolute;
  z-index: 50;
  top: calc(100% + 4px);
  left: 0;
  right: 0;
  list-style: none;
  padding: 0.375rem;
  margin: 0;
  background: var(--color-surface-1);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
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
  font-size: var(--text-sm);
  color: var(--color-text);
  border-radius: var(--radius-sm, 6px);
  cursor: pointer;
  transition: background 0.15s var(--ease-smooth);

  &--focused,
  &:hover {
    background: var(--color-surface-3);
  }

  &--selected {
    color: var(--color-primary-600);
    font-weight: 600;
  }
}

.option-check {
  width: 1rem;
  height: 1rem;
  color: var(--color-primary-500);
  flex-shrink: 0;
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
  min-height: 48px;
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
    outline: 2px solid var(--focus-ring);
    outline-offset: 4px;
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
}

.submitting-content {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.spinner {
  width: 1.125rem;
  height: 1.125rem;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
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
  .form-textarea,
  .dropdown-trigger {
    background: var(--color-surface-2);

    &:focus-visible {
      border-color: var(--color-primary-500);
      box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-primary-500) 20%, transparent);
    }
  }

  .dropdown-list {
    background: var(--color-surface-2);
    border-color: var(--color-border);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
  }

  .dropdown-option {
    &--focused,
    &:hover {
      background: var(--color-surface-3);
    }

    &--selected {
      color: var(--color-primary-400);
    }
  }

  .option-check {
    color: var(--color-primary-400);
  }

  .form-alert--success {
    background: color-mix(in srgb, var(--color-accent-500) 12%, transparent);
    color: var(--color-accent-300);
    border-color: color-mix(in srgb, var(--color-accent-500) 20%, transparent);
  }

  .form-alert--error {
    background: color-mix(in srgb, #ef4444 12%, transparent);
    color: #fca5a5;
    border-color: color-mix(in srgb, #ef4444 20%, transparent);
  }
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
</style>
