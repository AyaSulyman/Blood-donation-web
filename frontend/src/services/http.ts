// src/services/http.ts

import axios from 'axios'

export const http = axios.create({
  baseURL: 'http://localhost:3000/api', // Change this to your backend port
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor - adds token to every request
http.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('lifedrop_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    console.log('📤 Request:', config.method?.toUpperCase(), config.url, 'Auth:', !!config.headers.Authorization)
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor - handles 401 errors
http.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response?.status === 401) {
      console.error('🔒 Unauthorized - redirecting to login')
      localStorage.removeItem('lifedrop_token')
      delete http.defaults.headers.common['Authorization']
      
      if (!window.location.pathname.includes('/login')) {
        window.location.href = '/login'
      }
    }
    return Promise.reject(error)
  }
)