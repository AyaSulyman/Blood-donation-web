<template>
  <div :class="$style.page">
    <AppNavbar />

    <main>
      <section :class="$style.hero">
        <div :class="$style.heroGlow"></div>
        <div :class="$style.heroInner">
          <span :class="$style.eyebrow">We are here to help</span>
          <h1>Let’s connect and save more lives</h1>
          <p>
            Have a question about donating, hosting a blood drive, or finding a nearby center?
            Our team is ready to guide you.
          </p>
        </div>
      </section>

      <section :class="$style.contactSection">
        <div :class="$style.contactGrid">
          <div :class="$style.infoColumn">
            <div>
              <span :class="$style.sectionLabel">Contact LifeDrop</span>
              <h2>Every conversation can make a difference.</h2>
              <p :class="$style.introText">
                Whether you are a first-time donor, a returning donor, or an organization planning
                a community drive, send us a message and we will point you in the right direction.
              </p>
            </div>

            <div :class="$style.infoCards">
              <article v-for="item in contactItems" :key="item.title" :class="$style.infoCard">
                <div :class="$style.iconBox" v-html="item.icon"></div>
                <div>
                  <h3>{{ item.title }}</h3>
                  <p>{{ item.primary }}</p>
                  <span>{{ item.secondary }}</span>
                </div>
              </article>
            </div>

            <div :class="$style.urgentCard">
              <div :class="$style.urgentIcon">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.7" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                </svg>
              </div>
              <div>
                <h3>Need blood urgently?</h3>
                <p>For medical emergencies, contact your nearest hospital or local emergency service immediately.</p>
              </div>
            </div>
          </div>

          <div :class="$style.formCard">
            <div :class="$style.formHeader">
              <h2>Send us a message</h2>
              <p>Complete the form and our support team will get back to you soon.</p>
            </div>

            <form novalidate @submit.prevent="submitForm">
              <div :class="$style.fieldGrid">
                <div :class="$style.fieldGroup">
                  <label for="fullName">Full Name</label>
                  <input
                    id="fullName"
                    v-model.trim="form.fullName"
                    type="text"
                    name="fullName"
                    autocomplete="name"
                    placeholder="Enter your full name"
                    :class="{ [$style.inputError]: errors.fullName }"
                    @blur="validateField('fullName')"
                  />
                  <span v-if="errors.fullName" :class="$style.errorText">{{ errors.fullName }}</span>
                </div>

                <div :class="$style.fieldGroup">
                  <label for="email">Email</label>
                  <input
                    id="email"
                    v-model.trim="form.email"
                    type="email"
                    name="email"
                    autocomplete="email"
                    placeholder="you@example.com"
                    :class="{ [$style.inputError]: errors.email }"
                    @blur="validateField('email')"
                  />
                  <span v-if="errors.email" :class="$style.errorText">{{ errors.email }}</span>
                </div>
              </div>

              <div :class="$style.fieldGroup">
                <label for="subject">Subject</label>
                <input
                  id="subject"
                  v-model.trim="form.subject"
                  type="text"
                  name="subject"
                  placeholder="How can we help?"
                  :class="{ [$style.inputError]: errors.subject }"
                  @blur="validateField('subject')"
                />
                <span v-if="errors.subject" :class="$style.errorText">{{ errors.subject }}</span>
              </div>

              <div :class="$style.fieldGroup">
                <label for="message">Message</label>
                <textarea
                  id="message"
                  v-model.trim="form.message"
                  name="message"
                  rows="6"
                  placeholder="Tell us more about your question..."
                  :class="{ [$style.inputError]: errors.message }"
                  @blur="validateField('message')"
                ></textarea>
                <div :class="$style.messageMeta">
                  <span v-if="errors.message" :class="$style.errorText">{{ errors.message }}</span>
                  <span :class="$style.characterCount">{{ form.message.length }}/1000</span>
                </div>
              </div>

              <button :class="$style.submitButton" type="submit">
                Send Message
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.8" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0121.485 12 59.768 59.768 0 013.27 20.875L5.999 12zm0 0h7.5" />
                </svg>
              </button>

              <p v-if="submitted" :class="$style.successMessage" role="status">
                Thank you! Your message has been received. 
              </p>
            </form>
          </div>
        </div>
      </section>

      <section :class="$style.helpSection">
        <div :class="$style.helpInner">
          <div>
            <span :class="$style.sectionLabel">Before you donate</span>
            <h2>Looking for a quick answer?</h2>
            <p>Our donor resources cover eligibility, preparation, recovery, and what to expect on donation day.</p>
          </div>
          <button type="button">Explore donor FAQs</button>
        </div>
      </section>
    </main>

    <AppFooter />
  </div>
</template>

<script setup lang="ts">

import { reactive, ref } from 'vue'
import AppFooter from '@/components/AppFooter.vue'
import AppNavbar from '@/components/AppNavbar.vue'
import { createMessage } from '@/services/message.service'

type FieldName = 'fullName' | 'email' | 'subject' | 'message'

const contactItems = [
  {
    title: 'Call us',
    primary: '+961 1 234 567',
    secondary: 'Monday–Friday, 8:00 AM–5:00 PM',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.6" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102A1.125 1.125 0 005.872 2.25H4.5A2.25 2.25 0 002.25 4.5v2.25z" /></svg>',
  },
  {
    title: 'Email us',
    primary: 'support@lifedrop.org',
    secondary: 'We usually reply within one business day',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.6" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5A2.25 2.25 0 0119.5 19.5h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0l-7.5-4.615a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>',
  },
  {
    title: 'Visit us',
    primary: 'LifeDrop Community Center',
    secondary: 'Beirut, Lebanon',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.6" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /></svg>',
  },
]

const form = reactive({
  fullName: '',
  email: '',
  subject: '',
  message: '',
})

const errors = reactive<Record<FieldName, string>>({
  fullName: '',
  email: '',
  subject: '',
  message: '',
})

const submitted = ref(false)

const validateField = (field: FieldName) => {
  const value = form[field]

  if (!value) {
    errors[field] = `${field === 'fullName' ? 'Full name' : field.charAt(0).toUpperCase() + field.slice(1)} is required.`
    return false
  }

  if (field === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    errors.email = 'Please enter a valid email address.'
    return false
  }

  if (field === 'message' && value.length < 10) {
    errors.message = 'Please enter at least 10 characters.'
    return false
  }

  if (field === 'message' && value.length > 1000) {
    errors.message = 'Message must be 1000 characters or fewer.'
    return false
  }

  errors[field] = ''
  return true
}

const submitForm = async () => {
  submitted.value = false
  const valid = (Object.keys(form) as FieldName[]).map((field) => validateField(field)).every(Boolean)

  if (!valid) return
  try {
    await createMessage({
      fullName: form.fullName,
      email: form.email,
      subject: form.subject,
      message: form.message,
    })

    submitted.value = true

    form.fullName = ''
    form.email = ''
    form.subject = ''
    form.message = ''
  } catch (error) {
    console.error(error)
    alert('Failed to send message. Please try again.')
  }
}
</script>

<style module lang="scss">
$color-primary: #c92a2a;
$color-primary-hover: #a61e1e;
$color-text: #111827;
$color-muted: #6b7280;
$color-border: #e5e7eb;

.page {
  min-height: 100vh;
  color: #1f2937;
  background: #ffffff;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  -webkit-font-smoothing: antialiased;
}

.hero {
  position: relative;
  overflow: hidden;
  border-bottom: 1px solid #f3f4f6;
  background: linear-gradient(135deg, #fff 0%, #fff7f7 50%, #fef2f2 100%);

  .heroGlow {
    position: absolute;
    top: -14rem;
    right: -8rem;
    width: 32rem;
    height: 32rem;
    border-radius: 50%;
    background: rgba(201, 42, 42, 0.08);
    filter: blur(5px);
  }

  .heroInner {
    position: relative;
    max-width: 800px;
    margin: 0 auto;
    padding: 6rem 1.5rem 5.5rem;
    text-align: center;

    @media (max-width: 640px) {
      padding: 4.5rem 1.25rem 4rem;
    }
  }

  .eyebrow,
  .sectionLabel {
    display: inline-block;
    color: $color-primary;
    font-size: 0.8125rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  h1 {
    max-width: 720px;
    margin: 1rem auto 1.25rem;
    color: $color-text;
    font-size: clamp(2.25rem, 5vw, 3.75rem);
    line-height: 1.08;
    letter-spacing: -0.04em;
  }

  p {
    max-width: 660px;
    margin: 0 auto;
    color: $color-muted;
    font-size: 1.0625rem;
    line-height: 1.75;
  }
}

.contactSection {
  padding: 5rem 1.5rem;

  @media (max-width: 640px) {
    padding: 3.5rem 1rem;
  }
}

.contactGrid {
  max-width: 1152px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
  gap: 4rem;
  align-items: start;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
}

.sectionLabel {
  display: inline-block;
  color: $color-primary;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.infoColumn {
  h2 {
    margin: 0.75rem 0 1rem;
    color: $color-text;
    font-size: clamp(1.75rem, 3vw, 2.35rem);
    line-height: 1.2;
    letter-spacing: -0.025em;
  }

  .introText {
    margin: 0;
    color: $color-muted;
    line-height: 1.75;
  }
}

.infoCards {
  display: grid;
  gap: 1rem;
  margin-top: 2rem;
}

.infoCard {
  display: flex;
  gap: 1rem;
  padding: 1.15rem;
  border: 1px solid $color-border;
  border-radius: 0.75rem;
  background: #ffffff;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 14px 30px rgba(17, 24, 39, 0.07);
  }

  .iconBox {
    width: 3rem;
    height: 3rem;
    display: flex;
    flex: 0 0 auto;
    align-items: center;
    justify-content: center;
    color: $color-primary;
    background: #fef2f2;
    border-radius: 0.625rem;

    :global(svg) {
      width: 1.35rem;
      height: 1.35rem;
    }
  }

  h3 {
    margin: 0 0 0.25rem;
    color: $color-text;
    font-size: 0.95rem;
  }

  p {
    margin: 0;
    color: #374151;
    font-size: 0.9rem;
    font-weight: 600;
  }

  span {
    display: block;
    margin-top: 0.25rem;
    color: $color-muted;
    font-size: 0.8rem;
    line-height: 1.45;
  }
}

.urgentCard {
  display: flex;
  gap: 0.9rem;
  margin-top: 1.25rem;
  padding: 1rem 1.1rem;
  border: 1px solid #fecaca;
  border-radius: 0.75rem;
  background: #fff7f7;

  .urgentIcon {
    width: 1.5rem;
    height: 1.5rem;
    flex: 0 0 auto;
    color: $color-primary;

    svg {
      width: 100%;
      height: 100%;
    }
  }

  h3 {
    margin: 0 0 0.25rem;
    color: #7f1d1d;
    font-size: 0.9rem;
  }

  p {
    margin: 0;
    color: #991b1b;
    font-size: 0.8rem;
    line-height: 1.5;
  }
}

.formCard {
  padding: 2rem;
  border: 1px solid $color-border;
  border-radius: 1rem;
  background: #ffffff;
  box-shadow: 0 22px 55px rgba(17, 24, 39, 0.09);

  @media (max-width: 560px) {
    padding: 1.25rem;
  }
}

.formHeader {
  margin-bottom: 1.75rem;

  h2 {
    margin: 0;
    color: $color-text;
    font-size: 1.5rem;
  }

  p {
    margin: 0.5rem 0 0;
    color: $color-muted;
    font-size: 0.875rem;
    line-height: 1.55;
  }
}

.fieldGrid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    gap: 0;
  }
}

.fieldGroup {
  margin-bottom: 1.25rem;

  label {
    display: block;
    margin-bottom: 0.5rem;
    color: #374151;
    font-size: 0.85rem;
    font-weight: 600;
  }

  input,
  textarea {
    width: 100%;
    box-sizing: border-box;
    padding: 0.75rem 0.875rem;
    color: $color-text;
    background: #ffffff;
    border: 1px solid #d1d5db;
    border-radius: 0.5rem;
    outline: none;
    font: inherit;
    font-size: 0.9rem;
    transition: border-color 0.2s ease, box-shadow 0.2s ease;

    &::placeholder {
      color: #9ca3af;
    }

    &:focus {
      border-color: $color-primary;
      box-shadow: 0 0 0 3px rgba(201, 42, 42, 0.1);
    }
  }

  textarea {
    min-height: 9rem;
    resize: vertical;
  }

  .inputError {
    border-color: #dc2626;
  }
}

.messageMeta {
  min-height: 1.25rem;
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  margin-top: 0.35rem;
}

.errorText {
  color: #dc2626;
  font-size: 0.75rem;
}

.characterCount {
  margin-left: auto;
  color: #9ca3af;
  font-size: 0.72rem;
}

.submitButton {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  padding: 0.8rem 1.25rem;
  color: #ffffff;
  background: $color-primary;
  border: none;
  border-radius: 0.5rem;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s ease, background-color 0.2s ease;

  svg {
    width: 1.15rem;
    height: 1.15rem;
  }

  &:hover {
    transform: translateY(-1px);
    background: $color-primary-hover;
  }
}

.successMessage {
  margin: 1rem 0 0;
  padding: 0.75rem 0.9rem;
  color: #166534;
  background: #f0fdf4;
  border: 1px solid #bbf7d0;
  border-radius: 0.5rem;
  font-size: 0.8rem;
  line-height: 1.5;
}

.helpSection {
  padding: 0 1.5rem 5rem;

  @media (max-width: 640px) {
    padding: 0 1rem 3.5rem;
  }
}

.helpInner {
  max-width: 1152px;
  margin: 0 auto;
  padding: 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  color: #ffffff;
  background: #1c1311;
  border-radius: 1rem;

  @media (max-width: 700px) {
    flex-direction: column;
    align-items: stretch;
    padding: 1.5rem;
  }

  h2 {
    margin: 0.65rem 0 0.5rem;
    font-size: 1.5rem;
  }

  p {
    max-width: 680px;
    margin: 0;
    color: #9ca3af;
    font-size: 0.875rem;
    line-height: 1.6;
  }

  button {
    flex: 0 0 auto;
    padding: 0.75rem 1.25rem;
    color: #ffffff;
    background: $color-primary;
    border: none;
    border-radius: 0.5rem;
    font-weight: 600;
    cursor: pointer;

    &:hover {
      background: $color-primary-hover;
    }
  }
}
</style>
