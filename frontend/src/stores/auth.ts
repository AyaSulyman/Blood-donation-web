import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'] as const
export type BloodGroup = (typeof BLOOD_GROUPS)[number]

export interface User {
  id: string
  fullName: string
  email: string
  phone: string
  bloodGroup: BloodGroup
  city?: string
}

export interface LoginPayload {
  email: string
  password: string
}

export interface SignupPayload {
  fullName: string
  email: string
  phone: string
  password: string
  bloodGroup: BloodGroup
  city?: string
}

// TODO(backend): point this at the real API base URL (e.g. via import.meta.env.VITE_API_URL)
const API_BASE_URL = '/api'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const token = ref<string | null>(localStorage.getItem('lifedrop_token'))
  const loading = ref(false)
  const error = ref<string | null>(null)

  const isAuthenticated = computed(() => !!token.value)

  function setSession(newUser: User, newToken: string) {
    user.value = newUser
    token.value = newToken
    localStorage.setItem('lifedrop_token', newToken)
  }

  function clearSession() {
    user.value = null
    token.value = null
    localStorage.removeItem('lifedrop_token')
  }

  // TODO(backend): replace with the real endpoint contract once it's finalized.
  // Expected response shape assumed here: { user: User; token: string }
  async function login(payload: LoginPayload) {
    loading.value = true
    error.value = null
    try {
      const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        const body = await res.json().catch(() => null)
        throw new Error(body?.message ?? 'Invalid email or password')
      }

      const data = (await res.json()) as { user: User; token: string }
      setSession(data.user, data.token)
      return data
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Something went wrong. Please try again.'
      throw err
    } finally {
      loading.value = false
    }
  }

  // TODO(backend): replace with the real endpoint contract once it's finalized.
  async function signup(payload: SignupPayload) {
    loading.value = true
    error.value = null
    try {
      const res = await fetch(`${API_BASE_URL}/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        const body = await res.json().catch(() => null)
        throw new Error(body?.message ?? 'Could not create your account')
      }

      const data = (await res.json()) as { user: User; token: string }
      setSession(data.user, data.token)
      return data
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Something went wrong. Please try again.'
      throw err
    } finally {
      loading.value = false
    }
  }

  function logout() {
    clearSession()
  }

  return {
    user,
    token,
    loading,
    error,
    isAuthenticated,
    login,
    signup,
    logout,
  }
})