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

    <main :class="$style.main">
      <div :class="$style.card">
        <h1 :class="$style.title">Welcome back</h1>
        <p :class="$style.subtitle">Log in to manage your donations and appointments.</p>

        <form :class="$style.form" @submit.prevent="handleSubmit" novalidate>
          <div v-if="authStore.error" :class="$style.formError" role="alert">
            {{ authStore.error }}
          </div>

          <label :class="$style.field">
            <span :class="$style.fieldLabel">Email</span>
            <input
              v-model.trim="form.email"
              type="email"
              name="email"
              autocomplete="email"
              placeholder="you@example.com"
              :class="[$style.input, errors.email && $style.inputError]"
              @blur="touched.email = true"
            />
            <span v-if="touched.email && errors.email" :class="$style.fieldError">{{ errors.email }}</span>
          </label>

          <label :class="$style.field">
            <span :class="$style.fieldLabel">Password</span>
            <div :class="$style.passwordWrapper">
              <input
                v-model="form.password"
                :type="showPassword ? 'text' : 'password'"
                name="password"
                autocomplete="current-password"
                placeholder="Enter your password"
                :class="[$style.input, errors.password && $style.inputError]"
                @blur="touched.password = true"
              />
              <button type="button" :class="$style.togglePassword" @click="showPassword = !showPassword">
                {{ showPassword ? 'Hide' : 'Show' }}
              </button>
            </div>
            <span v-if="touched.password && errors.password" :class="$style.fieldError">{{ errors.password }}</span>
          </label>

          <div :class="$style.rowBetween">
            <label :class="$style.checkboxLabel">
              <input v-model="form.remember" type="checkbox" />
              <span>Remember me</span>
            </label>
            <a href="#" :class="$style.link">Forgot password?</a>
          </div>

          <button type="submit" :class="$style.submitBtn" :disabled="authStore.loading">
            {{ authStore.loading ? 'Logging in…' : 'Log in' }}
          </button>
        </form>

        <p :class="$style.switchText">
          Don't have an account?
          <RouterLink to="/signup" :class="$style.link">Sign up</RouterLink>
        </p>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { reactive, computed, ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const form = reactive({
  email: '',
  password: '',
  remember: false,
})

const touched = reactive({
  email: false,
  password: false,
})

const showPassword = ref(false)

const errors = computed(() => {
  const e: Partial<Record<'email' | 'password', string>> = {}

  if (!form.email) {
    e.email = 'Email is required'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    e.email = 'Enter a valid email address'
  }

  if (!form.password) {
    e.password = 'Password is required'
  }

  return e
})

const isValid = computed(() => Object.keys(errors.value).length === 0)

async function handleSubmit() {
  touched.email = true
  touched.password = true

  if (!isValid.value) return

  try {
    await authStore.login({ email: form.email, password: form.password })
    router.push('/')
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
  background: linear-gradient(180deg, #f9c9bc 0%, #f0a894 100%);
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
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
  padding: 1.5rem;
}

.card {
  width: 100%;
  max-width: 24rem;
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

.field {
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
}

.fieldLabel {
  font-size: 0.8125rem;
  font-weight: 600;
  color: #374151;
}

.input {
  padding: 0.625rem 0.75rem;
  font-size: 0.9375rem;
  border: 1px solid $color-border;
  border-radius: 0.5rem;
  outline: none;
  width: 100%;

  &:focus {
    border-color: $color-primary;
    box-shadow: 0 0 0 3px rgba(201, 42, 42, 0.1);
  }
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
  color: #4b5563;
  cursor: pointer;

  input {
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