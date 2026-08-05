import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'] as const
export type BloodGroup = (typeof BLOOD_GROUPS)[number]

// NOTE: 'donar' is spelled exactly as the backend's enum expects (a typo on their end,
// not ours) - see schemas/auth.schema.ts on the backend. Keep it as-is until they fix it,
// otherwise registration will fail validation.
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

// Matches backend routes, which are registered with prefix "/api" (see server.ts).
// TODO(backend): move this to an env var (import.meta.env.VITE_API_URL) once there's
// a deployed URL - right now this assumes the backend is running locally on port 3000.
const API_BASE_URL = 'http://localhost:3000/api'
interface JwtPayload {
  id: string
  username: string
}

// NOTE: this only decodes the token's payload to read the username for display purposes
// (e.g. "Hi, jane_doe"). It does NOT verify the signature - that's fine here since we're
// not using this for anything security-sensitive, just showing a greeting. Real auth
// checks still happen server-side via the token itself.
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
  // NOTE: the backend's /login response only returns { message, token } - no user object.
  // There's also no profile endpoint yet (checked routes/ - only auth + a leftover
  // "products" route from a tutorial template), so we have nothing to fetch the user's
  // profile from. `user` stays null until that endpoint exists.
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
  }

  async function login(payload: LoginPayload) {
    loading.value = true
    error.value = null
    try {
      const res = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const data = await res.json().catch(() => null)

      if (!res.ok) {
        throw new Error(data?.message ?? 'Invalid username or password')
      }

      setToken(data.token)
      return data as { message: string; token: string }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Something went wrong. Please try again.'
      throw err
    } finally {
      loading.value = false
    }
  }

  // NOTE: as of the current backend code, POST /api/register requires an existing valid
  // token (it has `onRequest: [authenticate]` on the route), which blocks brand-new users
  // from signing up at all. This is flagged to the backend dev - assuming it gets fixed to
  // be a public route, since that's the only way self-signup can work.
  //
  // The backend also does NOT log the user in automatically after registering - it only
  // returns { message, user: { id } }, no token. So after a successful signup we send the
  // person to the login page rather than treating them as logged in.
  async function signup(payload: SignupPayload) {
    loading.value = true
    error.value = null
    try {
      const res = await fetch(`${API_BASE_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const data = await res.json().catch(() => null)

      if (!res.ok) {
        throw new Error(data?.message ?? 'Could not create your account')
      }

      return data as { message: string; user: { id: string } }
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