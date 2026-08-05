<template>
  <div :class="$style.page">
    <header :class="$style.topbar">
      <RouterLink to="/" :class="$style.brand">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" :class="$style.brandIcon">
          <path d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75 0 7.312 9.75 11.25 9.75 11.25s9.75-3.938 9.75-11.25c0-5.385-4.365-9.75-9.75-9.75z" />
        </svg>
        <span :class="$style.brandTitle">LifeDrop</span>
      </RouterLink>
    </header>

    <div :class="$style.split">
      <AuthAyahPanel />

      <main :class="$style.main">
      <div :class="$style.card">
        <h1 :class="$style.title">Create your account</h1>
        <p :class="$style.subtitle">Join the community and start saving lives.</p>

        <form :class="$style.form" @submit.prevent="handleSubmit" novalidate>
          <div v-if="authStore.error" :class="$style.formError" role="alert">
            {{ authStore.error }}
          </div>

          <label :class="$style.field">
            <span :class="$style.fieldLabel">Full name</span>
            <input
              v-model.trim="form.name"
              type="text"
              name="name"
              autocomplete="name"
              placeholder="Jane Doe"
              :class="[$style.input, touched.name && errors.name && $style.inputError]"
              @blur="touched.name = true"
            />
            <span v-if="touched.name && errors.name" :class="$style.fieldError">{{ errors.name }}</span>
          </label>

          <label :class="$style.field">
            <span :class="$style.fieldLabel">Username</span>
            <input
              v-model.trim="form.username"
              type="text"
              name="username"
              autocomplete="username"
              placeholder="jane_doe"
              :class="[$style.input, touched.username && errors.username && $style.inputError]"
              @blur="touched.username = true"
            />
            <span v-if="touched.username && errors.username" :class="$style.fieldError">{{ errors.username }}</span>
          </label>

          <label :class="$style.field">
            <span :class="$style.fieldLabel">Email</span>
            <input
              v-model.trim="form.email"
              type="email"
              name="email"
              autocomplete="email"
              placeholder="you@example.com"
              :class="[$style.input, touched.email && errors.email && $style.inputError]"
              @blur="touched.email = true"
            />
            <span v-if="touched.email && errors.email" :class="$style.fieldError">{{ errors.email }}</span>
          </label>

          <label :class="$style.field">
            <span :class="$style.fieldLabel">Phone number</span>
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
            <span v-if="touched.phone && errors.phone" :class="$style.fieldError">{{ errors.phone }}</span>
          </label>

          <div :class="$style.fieldRow">
            <label :class="$style.field">
              <span :class="$style.fieldLabel">Blood group</span>
              <select
                v-model="form.bloodType"
                name="bloodType"
                :class="[$style.input, $style.select, touched.bloodType && errors.bloodType && $style.inputError]"
                @blur="touched.bloodType = true"
              >
                <option value="" disabled>Select</option>
                <option v-for="group in BLOOD_GROUPS" :key="group" :value="group">{{ group }}</option>
              </select>
              <span v-if="touched.bloodType && errors.bloodType" :class="$style.fieldError">{{ errors.bloodType }}</span>
            </label>

            <label :class="$style.field">
              <span :class="$style.fieldLabel">Password</span>
              <div :class="$style.passwordWrapper">
                <input
                  v-model="form.password"
                  :type="showPassword ? 'text' : 'password'"
                  name="password"
                  autocomplete="new-password"
                  placeholder="At least 8 characters"
                  :class="[$style.input, touched.password && errors.password && $style.inputError]"
                  @blur="touched.password = true"
                />
                <button type="button" :class="$style.togglePassword" @click="showPassword = !showPassword">
                  {{ showPassword ? 'Hide' : 'Show' }}
                </button>
              </div>
              <span v-if="touched.password && errors.password" :class="$style.fieldError">{{ errors.password }}</span>
            </label>
          </div>

          <div :class="$style.fieldRow">
            <label :class="$style.field">
              <span :class="$style.fieldLabel">I am a</span>
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
              <span v-if="touched.role && errors.role" :class="$style.fieldError">{{ errors.role }}</span>
            </label>

            <label :class="$style.field">
              <span :class="$style.fieldLabel">Address</span>
              <input
                v-model.trim="form.address"
                type="text"
                name="address"
                autocomplete="street-address"
                placeholder="Beirut, Lebanon"
                :class="[$style.input, touched.address && errors.address && $style.inputError]"
                @blur="touched.address = true"
              />
              <span v-if="touched.address && errors.address" :class="$style.fieldError">{{ errors.address }}</span>
            </label>
          </div>

          <label :class="$style.field">
            <span :class="$style.fieldLabel">Confirm password</span>
            <input
              v-model="form.confirmPassword"
              :type="showPassword ? 'text' : 'password'"
              name="confirmPassword"
              autocomplete="new-password"
              placeholder="Re-enter your password"
              :class="[$style.input, touched.confirmPassword && errors.confirmPassword && $style.inputError]"
              @blur="touched.confirmPassword = true"
            />
            <span v-if="touched.confirmPassword && errors.confirmPassword" :class="$style.fieldError">{{ errors.confirmPassword }}</span>
          </label>

          <label :class="$style.checkboxLabel">
            <input v-model="form.agreeToTerms" type="checkbox" @change="touched.agreeToTerms = true" />
            <span>I agree to the Terms of Service and Privacy Policy</span>
          </label>
          <span v-if="touched.agreeToTerms && errors.agreeToTerms" :class="$style.fieldError">{{ errors.agreeToTerms }}</span>

          <button type="submit" :class="$style.submitBtn" :disabled="authStore.loading">
            {{ authStore.loading ? 'Creating account…' : 'Sign up' }}
          </button>
        </form>

        <p :class="$style.switchText">
          Already have an account?
          <RouterLink to="/login" :class="$style.link">Log in</RouterLink>
        </p>
      </div>
      </main>
    </div>
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
    // The backend doesn't log the user in on register (no token returned),
    // so send them to log in with their new credentials.
    router.push({ path: '/login', query: { registered: 'true' } })
  } catch {
    // authStore.error already holds the message; nothing else to do here.
  }
}
</script>

<style module lang="scss">
$color-primary: #c92a2a;
$color-primary-hover: #a61e1e;
$color-border: #e5e7eb;
$color-error: #dc2626;

.page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #ffffff;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.split {
  flex: 1;
  display: flex;
}

.topbar {
  padding: 1.5rem;
}

.brand {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;

  .brandIcon {
    width: 1.5rem;
    height: 1.5rem;
    color: $color-primary;
  }

  .brandTitle {
    font-size: 1.25rem;
    font-weight: 700;
    color: #111827;
  }
}

.main {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem 1.5rem 3rem;
}

.card {
  width: 100%;
  max-width: 28rem;
  background: #ffffff;
  border: 1px solid $color-border;
  border-radius: 0.75rem;
  box-shadow: 0 10px 30px rgba(17, 24, 39, 0.06);
  padding: 2rem;
}

.title {
  font-size: 1.5rem;
  font-weight: 800;
  color: #111827;
  margin-bottom: 0.375rem;
}

.subtitle {
  font-size: 0.875rem;
  color: #6b7280;
  margin-bottom: 1.75rem;
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
  color: $color-error;
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
  gap: 0.375rem;
}

.fieldLabel {
  font-size: 0.8125rem;
  font-weight: 600;
  color: #374151;

  .optional {
    font-weight: 400;
    color: #9ca3af;
  }
}

.input {
  padding: 0.625rem 0.75rem;
  font-size: 0.9375rem;
  border: 1px solid $color-border;
  border-radius: 0.5rem;
  outline: none;
  width: 100%;
  background: #ffffff;
  transition: border-color 0.15s ease, box-shadow 0.15s ease;

  &:hover {
    border-color: #c7cbd1;
  }

  &:focus {
    border-color: $color-primary;
    box-shadow: 0 0 0 3px rgba(201, 42, 42, 0.1);
  }
}

.select {
  appearance: auto;
}

.inputError {
  border-color: $color-error;

  &:focus {
    box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1);
  }
}

.fieldError {
  font-size: 0.75rem;
  color: $color-error;
}

.passwordWrapper {
  position: relative;
  display: flex;
  align-items: center;

  .input {
    padding-right: 3.5rem;
  }

  .togglePassword {
    position: absolute;
    right: 0.5rem;
    background: none;
    border: none;
    color: $color-primary;
    font-size: 0.75rem;
    font-weight: 600;
    cursor: pointer;
    padding: 0.25rem 0.5rem;
  }
}

.checkboxLabel {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  color: #4b5563;
  font-size: 0.8125rem;
  cursor: pointer;

  input {
    margin-top: 0.15rem;
    accent-color: $color-primary;
  }
}

.link {
  color: $color-primary;
  font-weight: 600;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
}

.submitBtn {
  padding: 0.75rem 1rem;
  background: $color-primary;
  color: #ffffff;
  font-weight: 600;
  font-size: 0.9375rem;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;

  &:hover:not(:disabled) {
    background: $color-primary-hover;
  }

  &:disabled {
    opacity: 0.65;
    cursor: not-allowed;
  }
}

.switchText {
  margin-top: 1.5rem;
  text-align: center;
  font-size: 0.8125rem;
  color: #6b7280;
}
</style>