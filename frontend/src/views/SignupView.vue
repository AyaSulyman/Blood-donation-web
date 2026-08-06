<template>
  <div :class="$style.split">
    <AuthAyahPanel />

    <div :class="$style.dropBadge" aria-hidden="true">
      <span :class="$style.dropBadgeHalo"></span>
      <svg :class="$style.dropBadgeShape" viewBox="0 0 72 88" fill="none">
        <path
          d="M36 4C36 4 8 40 8 60C8 75.464 20.536 88 36 88C51.464 88 64 75.464 64 60C64 40 36 4 36 4Z"
          fill="#1a1a1a"
        />
      </svg>
      <svg :class="$style.dropBadgePulse" viewBox="0 0 32 16" fill="none">
        <path d="M0 8h6l3-6 4 12 3-9 2 3h14" stroke="#ffffff" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </div>

    <main :class="$style.main">
      <span :class="$style.secureBadge">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <rect x="5" y="11" width="14" height="9" rx="2" />
          <path d="M8 11V7a4 4 0 0 1 8 0v4" />
        </svg>
        Secure access
      </span>

      <div :class="$style.card">
        <span :class="$style.eyebrow">Donor sign up</span>
        <h1 :class="$style.title">
          Create your<br />
          <em>account.</em>
        </h1>
        <p :class="$style.subtitle">Join the community and start saving lives.</p>

        <form :class="$style.form" @submit.prevent="handleSubmit" novalidate>
          <div v-if="authStore.error" :class="$style.formError" role="alert">
            {{ authStore.error }}
          </div>

          <label :class="$style.field">
            <span :class="$style.fieldLabel">Full name</span>
            <div :class="$style.inputWrapper">
              <svg :class="$style.inputIcon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="8" r="4" />
                <path d="M4 20c0-4 4-6 8-6s8 2 8 6" />
              </svg>
              <input
                v-model.trim="form.name"
                type="text"
                name="name"
                autocomplete="name"
                placeholder="Jane Doe"
                :class="[$style.input, touched.name && errors.name && $style.inputError]"
                @blur="touched.name = true"
              />
            </div>
            <span v-if="touched.name && errors.name" :class="$style.fieldError">{{ errors.name }}</span>
          </label>

          <label :class="$style.field">
            <span :class="$style.fieldLabel">Username</span>
            <div :class="$style.inputWrapper">
              <svg :class="$style.inputIcon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M16 8a4 4 0 1 1-8 0 4 4 0 0 1 8 0z" />
                <path d="M12 14c-4 0-7 2-8 4.5" />
                <path d="M20 18.5c-.6-1.3-1.7-2.4-3-3.2" />
              </svg>
              <input
                v-model.trim="form.username"
                type="text"
                name="username"
                autocomplete="username"
                placeholder="jane_doe"
                :class="[$style.input, touched.username && errors.username && $style.inputError]"
                @blur="touched.username = true"
              />
            </div>
            <span v-if="touched.username && errors.username" :class="$style.fieldError">{{ errors.username }}</span>
          </label>

          <label :class="$style.field">
            <span :class="$style.fieldLabel">Email</span>
            <div :class="$style.inputWrapper">
              <svg :class="$style.inputIcon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="M3 7l9 6 9-6" />
              </svg>
              <input
                v-model.trim="form.email"
                type="email"
                name="email"
                autocomplete="email"
                placeholder="you@example.com"
                :class="[$style.input, touched.email && errors.email && $style.inputError]"
                @blur="touched.email = true"
              />
            </div>
            <span v-if="touched.email && errors.email" :class="$style.fieldError">{{ errors.email }}</span>
          </label>

          <label :class="$style.field">
            <span :class="$style.fieldLabel">Phone number</span>
            <div :class="$style.inputWrapper">
              <svg :class="$style.inputIcon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M4 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L14 13l5 2v4a2 2 0 0 1-2 2C9.5 21 3 14.5 3 6a2 2 0 0 1 1-2z" />
              </svg>
              <input
                v-model.trim="form.phone"
                type="tel"
                name="phone"
                autocomplete="tel"
                placeholder="71234567"
                maxlength="8"
                :class="[$style.input, touched.phone && errors.phone && $style.inputError]"
                @blur="touched.phone = true"
              />
            </div>
            <span v-if="touched.phone && errors.phone" :class="$style.fieldError">{{ errors.phone }}</span>
          </label>

          <div :class="$style.fieldRow">
            <label :class="$style.field">
              <span :class="$style.fieldLabel">Blood group</span>
              <div :class="$style.inputWrapper">
                <svg :class="$style.inputIcon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M12 3s7 7.5 7 12a7 7 0 1 1-14 0c0-4.5 7-12 7-12z" />
                </svg>
                <select
                  v-model="form.bloodType"
                  name="bloodType"
                  :class="[$style.input, $style.select, touched.bloodType && errors.bloodType && $style.inputError]"
                  @blur="touched.bloodType = true"
                >
                  <option value="" disabled>Select</option>
                  <option v-for="group in BLOOD_GROUPS" :key="group" :value="group">{{ group }}</option>
                </select>
              </div>
              <span v-if="touched.bloodType && errors.bloodType" :class="$style.fieldError">{{ errors.bloodType }}</span>
            </label>

            <label :class="$style.field">
              <span :class="$style.fieldLabel">Password</span>
              <div :class="$style.inputWrapper">
                <svg :class="$style.inputIcon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="5" y="11" width="14" height="9" rx="2" />
                  <path d="M8 11V7a4 4 0 0 1 8 0v4" />
                </svg>
                <input
                  v-model="form.password"
                  :type="showPassword ? 'text' : 'password'"
                  name="password"
                  autocomplete="new-password"
                  placeholder="At least 8 characters"
                  :class="[$style.input, touched.password && errors.password && $style.inputError]"
                  @blur="touched.password = true"
                />
                <button type="button" :class="$style.togglePassword" :aria-label="showPassword ? 'Hide password' : 'Show password'" @click="showPassword = !showPassword">
                  <svg v-if="!showPassword" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M1.5 12s4-7 10.5-7 10.5 7 10.5 7-4 7-10.5 7-10.5-7-10.5-7z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                  <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M3 3l18 18M10.6 10.6a3 3 0 0 0 4.24 4.24M9.88 5.09A10.9 10.9 0 0 1 12 5c6.5 0 10.5 7 10.5 7a13.2 13.2 0 0 1-3.24 3.87M6.6 6.6C3.5 8.6 1.5 12 1.5 12s2.06 3.6 5.42 5.6" />
                  </svg>
                </button>
              </div>
              <span v-if="touched.password && errors.password" :class="$style.fieldError">{{ errors.password }}</span>
            </label>
          </div>

          <div :class="$style.fieldRow">
            <label :class="$style.field">
              <span :class="$style.fieldLabel">I am a</span>
              <div :class="$style.inputWrapper">
                <svg :class="$style.inputIcon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="8" r="4" />
                  <path d="M4 20c0-4 4-6 8-6s8 2 8 6" />
                </svg>
                <select
                  v-model="form.role"
                  name="role"
                  :class="[$style.input, $style.select, touched.role && errors.role && $style.inputError]"
                  @blur="touched.role = true"
                >
                  <option value="" disabled>Select</option>
                  <option value="donar">Donor</option>
                  <option value="recipient">Recipient</option>
                </select>
              </div>
              <span v-if="touched.role && errors.role" :class="$style.fieldError">{{ errors.role }}</span>
            </label>

            <label :class="$style.field">
              <span :class="$style.fieldLabel">Address</span>
              <div :class="$style.inputWrapper">
                <svg :class="$style.inputIcon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M12 21s7-6.5 7-11.5A7 7 0 0 0 5 9.5C5 14.5 12 21 12 21z" />
                  <circle cx="12" cy="9.5" r="2.3" />
                </svg>
                <input
                  v-model.trim="form.address"
                  type="text"
                  name="address"
                  autocomplete="street-address"
                  placeholder="Beirut, Lebanon"
                  :class="[$style.input, touched.address && errors.address && $style.inputError]"
                  @blur="touched.address = true"
                />
              </div>
              <span v-if="touched.address && errors.address" :class="$style.fieldError">{{ errors.address }}</span>
            </label>
          </div>

          <label :class="$style.field">
            <span :class="$style.fieldLabel">Confirm password</span>
            <div :class="$style.inputWrapper">
              <svg :class="$style.inputIcon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="5" y="11" width="14" height="9" rx="2" />
                <path d="M8 11V7a4 4 0 0 1 8 0v4" />
              </svg>
              <input
                v-model="form.confirmPassword"
                :type="showPassword ? 'text' : 'password'"
                name="confirmPassword"
                autocomplete="new-password"
                placeholder="Re-enter your password"
                :class="[$style.input, touched.confirmPassword && errors.confirmPassword && $style.inputError]"
                @blur="touched.confirmPassword = true"
              />
            </div>
            <span v-if="touched.confirmPassword && errors.confirmPassword" :class="$style.fieldError">{{ errors.confirmPassword }}</span>
          </label>

          <label :class="$style.checkboxLabel">
            <input v-model="form.agreeToTerms" type="checkbox" @change="touched.agreeToTerms = true" />
            <span>I agree to the Terms of Service and Privacy Policy</span>
          </label>
          <span v-if="touched.agreeToTerms && errors.agreeToTerms" :class="$style.fieldError">{{ errors.agreeToTerms }}</span>

          <button type="submit" :class="$style.submitBtn" :disabled="authStore.loading">
            {{ authStore.loading ? 'Creating account…' : 'Sign up' }}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </button>
        </form>

        <p :class="$style.switchText">
          Already have an account? <RouterLink to="/login" :class="$style.link">Log in</RouterLink>
        </p>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { reactive, computed, ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { useAuthStore, BLOOD_GROUPS, type BloodGroup, type UserRole } from '@/stores/auth'
import AuthAyahPanel from '@/components/AuthAyahPanel.vue'

const router = useRouter()
const authStore = useAuthStore()

const form = reactive({
  name: '',
  username: '',
  email: '',
  phone: '',
  bloodType: '' as BloodGroup | '',
  role: '' as UserRole | '',
  address: '',
  password: '',
  confirmPassword: '',
  agreeToTerms: false,
})

const touched = reactive({
  name: false,
  username: false,
  email: false,
  phone: false,
  bloodType: false,
  role: false,
  address: false,
  password: false,
  confirmPassword: false,
  agreeToTerms: false,
})

const showPassword = ref(false)

type FieldName = keyof typeof touched

const errors = computed(() => {
  const e: Partial<Record<FieldName, string>> = {}

  if (!form.name) {
    e.name = 'Full name is required'
  }

  if (!form.username) {
    e.username = 'Username is required'
  }

  if (!form.email) {
    e.email = 'Email is required'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    e.email = 'Enter a valid email address'
  }

  if (!form.phone) {
    e.phone = 'Phone number is required'
  } else if (!/^\d{8}$/.test(form.phone)) {
    e.phone = 'Enter an 8-digit phone number'
  }

  if (!form.bloodType) {
    e.bloodType = 'Select your blood group'
  }

  if (!form.role) {
    e.role = 'Select an option'
  }

  if (!form.address) {
    e.address = 'Address is required'
  }

  if (!form.password) {
    e.password = 'Password is required'
  } else if (form.password.length < 8) {
    e.password = 'Password must be at least 8 characters'
  }

  if (!form.confirmPassword) {
    e.confirmPassword = 'Please confirm your password'
  } else if (form.confirmPassword !== form.password) {
    e.confirmPassword = 'Passwords do not match'
  }

  if (!form.agreeToTerms) {
    e.agreeToTerms = 'You must accept the terms to continue'
  }

  return e
})

const isValid = computed(() => Object.keys(errors.value).length === 0)

async function handleSubmit() {
  ;(Object.keys(touched) as FieldName[]).forEach((key) => {
    touched[key] = true
  })

  if (!isValid.value || !form.bloodType || !form.role) return

  try {
    await authStore.signup({
      name: form.name,
      username: form.username,
      email: form.email,
      phone: form.phone,
      address: form.address,
      role: form.role,
      bloodType: form.bloodType,
      password: form.password,
    })
    router.push({ path: '/login', query: { registered: 'true' } })
  } catch {
    // authStore.error already holds the message; nothing else to do here.
  }
}
</script>

<style module lang="scss">
.split {
  position: relative;
  min-height: 100vh;
  display: flex;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.dropBadge {
  position: absolute;
  top: 44%;
  left: 50.4%;
  transform: translate(-50%, -50%);
  z-index: 5;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 900px) {
    display: none;
  }
}

.dropBadgeHalo {
  position: absolute;
  width: 9rem;
  height: 9rem;
  border-radius: 9999px;
  background: rgba(0, 0, 0, 0.04);
}

.dropBadgeShape {
  position: relative;
  width: 3.25rem;
  height: 4rem;
  filter: drop-shadow(0 8px 20px rgba(0, 0, 0, 0.25));
}

.dropBadgePulse {
  position: absolute;
  width: 1.5rem;
  height: 0.75rem;
  top: 46%;
}

.main {
  flex: 1;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4rem 1.5rem;
  background: #f6f1ea;
  overflow: hidden;
}

.secureBadge {
  position: absolute;
  top: 2rem;
  right: 2rem;
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.4rem 0.9rem;
  background: #ffffff;
  border: 1px solid #e6ddd0;
  border-radius: 9999px;
  font-size: 0.6875rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #8a2c1c;

  svg {
    width: 0.875rem;
    height: 0.875rem;
  }
}

.card {
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 26rem;
}

.eyebrow {
  display: block;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #c81e2c;
  margin-bottom: 0.75rem;
}

.title {
  font-family: Georgia, 'Times New Roman', serif;
  font-weight: 400;
  font-size: 2.5rem;
  line-height: 1.1;
  color: #1a1a1a;
  margin: 0 0 1rem;

  em {
    font-style: italic;
    color: #c81e2c;
  }
}

.subtitle {
  font-size: 0.9375rem;
  color: #6b6459;
  line-height: 1.5;
  margin: 0 0 2rem;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.formError {
  padding: 0.625rem 0.75rem;
  background: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: 0.5rem;
  color: #dc2626;
  font-size: 0.8125rem;
}

.fieldRow {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.fieldLabel {
  font-size: 0.6875rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #8a8478;
}

.inputWrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.inputIcon {
  position: absolute;
  left: 0.9rem;
  width: 1.1rem;
  height: 1.1rem;
  color: #8a8478;
  pointer-events: none;
}

.input {
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 2.6rem;
  font-size: 0.9375rem;
  color: #1a1a1a;
  background: #e9edfb;
  border: 1px solid transparent;
  border-radius: 0.5rem;
  outline: none;
  transition: border-color 0.15s ease, box-shadow 0.15s ease;

  &:focus {
    border-color: #c81e2c;
    box-shadow: 0 0 0 3px rgba(200, 30, 44, 0.12);
  }
}

.select {
  appearance: auto;
}

.inputError {
  border-color: #dc2626;
}

.fieldError {
  font-size: 0.75rem;
  color: #dc2626;
}

.togglePassword {
  position: absolute;
  right: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  background: none;
  border: none;
  color: #8a8478;
  cursor: pointer;

  svg {
    width: 1.1rem;
    height: 1.1rem;
  }
}

.checkboxLabel {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  color: #6b6459;
  font-size: 0.8125rem;
  cursor: pointer;

  input {
    margin-top: 0.15rem;
    accent-color: #c81e2c;
  }
}

.link {
  color: #c81e2c;
  font-weight: 600;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
}

.submitBtn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.85rem 1.5rem;
  background: #1a1a1a;
  color: #ffffff;
  font-weight: 600;
  font-size: 0.9375rem;
  border: none;
  border-radius: 9999px;
  cursor: pointer;

  svg {
    width: 1.1rem;
    height: 1.1rem;
  }

  &:hover:not(:disabled) {
    background: #000000;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
}

.switchText {
  margin-top: 1.5rem;
  text-align: center;
  font-size: 0.8125rem;
  color: #6b6459;
}
</style>