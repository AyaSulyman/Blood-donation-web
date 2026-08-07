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
        <span :class="$style.eyebrow">Donor sign in</span>
        <h1 :class="$style.title">
          Welcome<br />
          <em>back.</em>
        </h1>
        <p :class="$style.subtitle">Log in to manage your donations and appointments.</p>

        <form :class="$style.form" @submit.prevent="handleSubmit" novalidate>
          <div v-if="showRegisteredBanner" :class="$style.formSuccess">
            Account created — log in with your new username and password.
          </div>

          <div v-if="authStore.error" :class="$style.formError" role="alert">
            {{ authStore.error }}
          </div>

          <label :class="$style.field">
            <span :class="$style.fieldLabel">Username</span>
            <div :class="$style.inputWrapper">
              <svg :class="$style.inputIcon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="8" r="4" />
                <path d="M4 20c0-4 4-6 8-6s8 2 8 6" />
              </svg>
              <input
                v-model.trim="form.username"
                type="text"
                name="username"
                autocomplete="username"
                placeholder="your_username"
                :class="[$style.input, touched.username && errors.username && $style.inputError]"
                @blur="touched.username = true"
                @keydown.enter="handleSubmit"
              />
            </div>
            <span v-if="touched.username && errors.username" :class="$style.fieldError">{{ errors.username }}</span>
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
                autocomplete="current-password"
                placeholder="Enter your password"
                :class="[$style.input, touched.password && errors.password && $style.inputError]"
                @blur="touched.password = true"
                @keydown.enter="handleSubmit"
              />
              <button 
                type="button" 
                :class="$style.togglePassword" 
                :aria-label="showPassword ? 'Hide password' : 'Show password'" 
                @click="showPassword = !showPassword"
              >
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

          <div :class="$style.rowBetween">
            <label :class="$style.checkboxLabel">
              <input v-model="form.remember" type="checkbox" />
              <span>Remember me</span>
            </label>
            <RouterLink to="/forgot-password" :class="$style.link">Forgot password?</RouterLink>
          </div>

          <button type="submit" :class="$style.submitBtn" :disabled="authStore.loading || !isValid">
            <span v-if="authStore.loading">
              <svg :class="$style.spinner" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10" stroke-dasharray="31.4" stroke-dashoffset="25" />
              </svg>
              Logging in…
            </span>
            <span v-else>
              Log in
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </span>
          </button>
        </form>

        <p :class="$style.switchText">
          Don't have an account? <RouterLink to="/signup" :class="$style.link">Sign up</RouterLink>
        </p>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { reactive, computed, ref, onMounted } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import AuthAyahPanel from '@/components/AuthAyahPanel.vue'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()

// Redirect to dashboard if already logged in
onMounted(() => {
  if (authStore.isAuthenticated) {
    console.log('✅ Already authenticated, redirecting to dashboard')
    router.push('/dashboard')
  }
})

const showRegisteredBanner = computed(() => route.query.registered === 'true')

const form = reactive({
  username: '',
  password: '',
  remember: false,
})

const touched = reactive({
  username: false,
  password: false,
})

const showPassword = ref(false)

const errors = computed(() => {
  const e: Partial<Record<'username' | 'password', string>> = {}

  if (!form.username) {
    e.username = 'Username is required'
  } else if (form.username.length < 3) {
    e.username = 'Username must be at least 3 characters'
  }

  if (!form.password) {
    e.password = 'Password is required'
  } else if (form.password.length < 6) {
    e.password = 'Password must be at least 6 characters'
  }

  return e
})

const isValid = computed(() => {
  const hasUsername = form.username && form.username.length >= 3
  const hasPassword = form.password && form.password.length >= 6
  return hasUsername && hasPassword
})

async function handleSubmit() {
  // Mark all fields as touched
  touched.username = true
  touched.password = true

  // Check if form is valid
  if (!isValid.value) {
    console.log('❌ Form validation failed:', errors.value)
    return
  }

  console.log('🔐 Attempting login with:', { username: form.username })

  try {
    await authStore.login({ 
      username: form.username, 
      password: form.password 
    })
    
    console.log('✅ Login successful, redirecting to dashboard...')
    
    // Redirect to dashboard after successful login
    const redirectPath = (route.query.redirect as string) || '/dashboard'
    await router.push(redirectPath)
    
  } catch (err: any) {
    // Error is already stored in authStore.error
    console.error('❌ Login failed:', err.message || err)
    
    // Clear password field on error for security
    form.password = ''
  }
}

// Clear any previous errors when user types
function clearError() {
  if (authStore.error) {
    authStore.error = null
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
  padding: 1.5rem;
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
  max-width: 24rem;
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
  font-size: 2.75rem;
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

.formSuccess {
  padding: 0.625rem 0.75rem;
  background: #f0fdf4;
  border: 1px solid #bbf7d0;
  border-radius: 0.5rem;
  color: #15803d;
  font-size: 0.8125rem;
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
  background: #ffffff;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  outline: none;
  transition: border-color 0.15s ease, box-shadow 0.15s ease;

  &:focus {
    border-color: #c81e2c;
    box-shadow: 0 0 0 3px rgba(200, 30, 44, 0.12);
  }

  &:hover {
    border-color: #9ca3af;
  }

  &::placeholder {
    color: #9ca3af;
  }
}

.inputError {
  border-color: #dc2626;

  &:focus {
    border-color: #dc2626;
    box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.12);
  }
}

.fieldError {
  font-size: 0.75rem;
  color: #dc2626;
  margin-top: 0.25rem;
}

.togglePassword {
  position: absolute;
  right: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.25rem;
  background: none;
  border: none;
  color: #8a8478;
  cursor: pointer;
  border-radius: 0.25rem;

  &:hover {
    background: #f3f4f6;
  }

  svg {
    width: 1.1rem;
    height: 1.1rem;
  }
}

.rowBetween {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.8125rem;
}

.checkboxLabel {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  color: #6b6459;
  cursor: pointer;

  input {
    accent-color: #c81e2c;
    width: 1rem;
    height: 1rem;
    cursor: pointer;
  }
}

.link {
  color: #c81e2c;
  font-weight: 600;
  text-decoration: none;
  transition: color 0.2s ease;

  &:hover {
    text-decoration: underline;
    color: #991b1b;
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
  transition: background-color 0.2s ease, opacity 0.2s ease, transform 0.1s ease;

  svg {
    width: 1.1rem;
    height: 1.1rem;
  }

  &:hover:not(:disabled) {
    background: #000000;
    transform: translateY(-1px);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
}

.spinner {
  animation: spin 0.8s linear infinite;
  width: 1.1rem;
  height: 1.1rem;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.switchText {
  margin-top: 1.5rem;
  text-align: center;
  font-size: 0.8125rem;
  color: #6b6459;
}

/* Responsive */
@media (max-width: 768px) {
  .title {
    font-size: 2rem;
  }

  .secureBadge {
    top: 1rem;
    right: 1rem;
    font-size: 0.625rem;
    padding: 0.3rem 0.7rem;
  }

  .card {
    max-width: 100%;
    padding: 0 0.5rem;
  }
}

@media (max-width: 480px) {
  .main {
    padding: 1rem;
  }

  .title {
    font-size: 1.75rem;
  }

  .rowBetween {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }

  .submitBtn {
    padding: 0.75rem 1.25rem;
    font-size: 0.875rem;
  }
}
</style>