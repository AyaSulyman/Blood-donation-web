import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'] as const
export type BloodGroup = (typeof BLOOD_GROUPS)[number]

export const USER_ROLES = ['donar', 'recipient'] as const
export type UserRole = (typeof USER_ROLES)[number]

export interface LoginPayload {
  username: string
  password: string
}

export interface SignupPayload {
  name: string
  username: string
  email: string
  phone: string
  address: string
  role: UserRole
  bloodType: BloodGroup
  password: string
}

// 🔥 CHANGE THIS: Added /auth to the URL
const API_BASE_URL = 'http://localhost:3000/api/auth'

interface JwtPayload {
  id: string
  username: string
}

function decodeJwtPayload(token: string): JwtPayload | null {
  try {
    const payloadBase64 = token.split('.')[1]
    if (!payloadBase64) return null
    const json = atob(payloadBase64.replace(/-/g, '+').replace(/_/g, '/'))
    return JSON.parse(json) as JwtPayload
  } catch {
    return null
  }
}

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null>(localStorage.getItem('lifedrop_token'))
  const username = ref<string | null>(token.value ? decodeJwtPayload(token.value)?.username ?? null : null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  const isAuthenticated = computed(() => !!token.value)

  function setToken(newToken: string) {
    token.value = newToken
    username.value = decodeJwtPayload(newToken)?.username ?? null
    localStorage.setItem('lifedrop_token', newToken)
  }

  function clearSession() {
    token.value = null
    username.value = null
    localStorage.removeItem('lifedrop_token')
    error.value = null
  }

  async function login(payload: LoginPayload) {
    loading.value = true
    error.value = null
    try {
      // 🔥 ADDED: Console log for debugging
      console.log('🔐 Attempting login at:', `${API_BASE_URL}/login`)
      
      const res = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const data = await res.json().catch(() => null)
      
      // 🔥 ADDED: Console log for debugging
      console.log('📨 Login response:', { status: res.status, data })

      if (!res.ok) {
        if (res.status === 401 || res.status === 404) {
          throw new Error('Invalid username or password')
        }
        throw new Error(data?.message ?? 'Login failed. Please try again.')
      }

      if (!data.token) {
        throw new Error('No token received from server')
      }

      setToken(data.token)
      return data
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Something went wrong. Please try again.'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function signup(payload: SignupPayload) {
    loading.value = true
    error.value = null
    try {
      const signupData = {
        name: payload.name,
        username: payload.username,
        email: payload.email,
        phone: payload.phone,
        address: payload.address,
        role: payload.role,
        bloodType: payload.bloodType,
        password: payload.password,
      }

      // 🔥 ADDED: Console log for debugging
      console.log('📝 Attempting signup at:', `${API_BASE_URL}/register`)
      
      const res = await fetch(`${API_BASE_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(signupData),
      })

      const data = await res.json().catch(() => null)
      
      // 🔥 ADDED: Console log for debugging
      console.log('📨 Signup response:', { status: res.status, data })

      if (!res.ok) {
        if (res.status === 409) {
          throw new Error(data?.message || 'User already exists with this email, phone, or username')
        }
        throw new Error(data?.message ?? 'Could not create your account')
      }

      error.value = null
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
    token,
    username,
    loading,
    error,
    isAuthenticated,
    login,
    signup,
    logout,
  }
})