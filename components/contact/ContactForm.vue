// components/contact/ContactForm.vue
<template>
  <form
    class="w-full max-w-2xl mx-auto bg-brand-700 text-white border border-[--color-brand-700] rounded-xl shadow-md p-6 space-y-6 mt-10 relative"
    id="contact"
    action="https://formsubmit.co/hello@eyeonidea.com"
    method="post"
    aria-labelledby="form-heading"
  >
    <h2 id="form-heading" class="text-xl font-heading font-semibold mb-4">
      Contact Form
    </h2>

    <div class="grid md:grid-cols-2 gap-4">
      <div>
        <label for="name" class="block font-medium mb-1">Name</label>
        <input
          id="name"
          name="name"
          type="text"
          required
          class="w-full px-4 py-2 border border-[--color-brand-400] bg-white text-black rounded-md focus:outline-none focus:ring-2 focus:ring-[--color-brand-200]"
        />
      </div>
      <div>
        <label for="email" class="block font-medium mb-1">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          required
          class="w-full px-4 py-2 border border-[--color-brand-400] bg-white text-black rounded-md focus:outline-none focus:ring-2 focus:ring-[--color-brand-200]"
        />
      </div>
    </div>

    <div>
      <label for="phone" class="block font-medium mb-1">Phone (optional)</label>
      <input
        id="phone"
        name="phone"
        type="tel"
        class="w-full px-4 py-2 border border-[--color-brand-400] bg-white text-black rounded-md focus:outline-none focus:ring-2 focus:ring-[--color-brand-200]"
      />
    </div>

    <div>
      <label for="subject" class="block font-medium mb-1">Subject</label>
      <input
        id="subject"
        name="subject"
        type="text"
        required
        class="w-full px-4 py-2 border border-[--color-brand-400] bg-white text-black rounded-md focus:outline-none focus:ring-2 focus:ring-[--color-brand-200]"
      />
    </div>

    <div>
      <label for="message" class="block font-medium mb-1">Message</label>
      <textarea
        id="message"
        name="message"
        rows="5"
        required
        class="w-full px-4 py-2 border border-[--color-brand-400] bg-white text-black rounded-md focus:outline-none focus:ring-2 focus:ring-[--color-brand-200]"
      ></textarea>
    </div>

    <div class="pt-2">
      <UButton
        type="submit"
        variant="ghost"
        color="neutral"
        class="bg-neutral-900 cursor-pointer"
      >
        <span>Send Message</span>
      </UButton>
    </div>

    <p
      class="text-xs mt-6 leading-relaxed border-t pt-4 border-[--color-brand-700] text-white"
    >
      <i
        >* By contacting Eye On Idea, you give consent to be contacted via the
        information provided regarding your inquiry. Under the EU's GDPR
        regulation, your name, email, and optional phone number will only be
        stored for communication related to your submitted subject and will
        never be misused or shared with third parties.</i
      >
    </p>
  </form>
</template>

<script setup></script>

<style scoped lang="scss">
form {
  font-family: var(--font-sans);
  transition: all var(--duration-normal) ease;
}
label {
  font-family: var(--font-sans);
  color: white;
}
h2 {
  color: white;
}
</style>
