<template>
  <header :class="$style.navbar">
    <div :class="$style.navInner">
      <RouterLink to="/" :class="$style.brand" aria-label="LifeDrop home">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" :class="$style.brandIcon">
          <path d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75 0 7.312 9.75 11.25 9.75 11.25s9.75-3.938 9.75-11.25c0-5.385-4.365-9.75-9.75-9.75z" />
        </svg>
        <span :class="$style.brandTitle">LifeDrop</span>
      </RouterLink>

      <nav :class="[$style.navLinks, menuOpen && $style.navLinksOpen]" aria-label="Primary navigation">
        <RouterLink to="/" @click="closeMenu">Home</RouterLink>
        <RouterLink to="/about" @click="closeMenu">About</RouterLink>
        <RouterLink to="/donate" @click="closeMenu">Donate</RouterLink>
        <RouterLink to="/centers" @click="closeMenu">Centers</RouterLink>
        <RouterLink to="/contact" @click="closeMenu">Contact</RouterLink>
      </nav>

      <div :class="$style.authButtons">
        <template v-if="authStore.isAuthenticated">
          <span :class="$style.welcomeText">Welcome, {{ displayName }}</span>
          <button :class="$style.btnLogout" type="button" @click="handleLogout">Log out</button>
        </template>
        <template v-else>
          <RouterLink to="/login" :class="$style.btnLogin">Log in</RouterLink>
          <RouterLink to="/signup" :class="$style.btnSignup">Sign up</RouterLink>
        </template>
      </div>

      <button
        :class="$style.menuButton"
        type="button"
        :aria-expanded="menuOpen"
        aria-label="Toggle navigation menu"
        @click="menuOpen = !menuOpen"
      >
        <svg v-if="!menuOpen" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.8" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.8" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  </header>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()
const menuOpen = ref(false)

const displayName = computed(() => {
  const name = authStore.username?.trim()
  return name ? name : 'there'
})

const closeMenu = () => {
  menuOpen.value = false
}

const handleLogout = () => {
  authStore.logout()
  closeMenu()
  router.push('/login')
}
</script>

<style module lang="scss">
$color-primary: #c92a2a;
$color-primary-hover: #a61e1e;
$color-border: #f3f4f6;

.navbar {
  position: sticky;
  top: 0;
  z-index: 50;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.96);
  border-bottom: 1px solid $color-border;
  backdrop-filter: blur(12px);
}

.navInner {
  position: relative;
  max-width: 1152px;
  margin: 0 auto;
  padding: 0 1.5rem;
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.brand {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  flex-shrink: 0;
}

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

.navLinks {
  display: flex;
  align-items: center;
  gap: 2rem;

  a {
    position: relative;
    padding: 1.4rem 0;
    font-size: 0.875rem;
    font-weight: 500;
    color: #4b5563;
    text-decoration: none;
    transition: color 0.2s ease;
    white-space: nowrap;

    &:hover {
      color: $color-primary;
    }

    &.router-link-active,
    &[aria-current='page'] {
      color: $color-primary;
    }

    &.router-link-active::after,
    &[aria-current='page']::after {
      position: absolute;
      right: 0;
      bottom: 0.75rem;
      left: 0;
      height: 2px;
      border-radius: 999px;
      background: $color-primary;
      content: '';
    }
  }

  @media (max-width: 850px) {
    position: absolute;
    top: calc(100% + 1px);
    left: 1rem;
    right: 1rem;
    display: none;
    flex-direction: column;
    align-items: stretch;
    gap: 0;
    padding: 0.5rem;
    background: #ffffff;
    border: 1px solid #e5e7eb;
    border-radius: 0.75rem;
    box-shadow: 0 18px 40px rgba(17, 24, 39, 0.12);

    a {
      padding: 0.75rem 1rem;
      border-radius: 0.5rem;
      white-space: normal;

      &.router-link-active::after,
      &[aria-current='page']::after {
        display: none;
      }

      &:hover,
      &.router-link-active,
      &[aria-current='page'] {
        background: #fef2f2;
        color: $color-primary;
      }
    }
  }
}

.navLinksOpen {
  @media (max-width: 850px) {
    display: flex !important;
  }
}

.authButtons {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-shrink: 0;
}

.welcomeText {
  font-size: 0.875rem;
  color: #4b5563;
  white-space: nowrap;
  
  @media (max-width: 560px) {
    display: none;
  }
}

.btnLogin {
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: #1f2937;
  background: #ffffff;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  text-decoration: none;
  cursor: pointer;
  transition: background-color 0.2s ease, border-color 0.2s ease;
  white-space: nowrap;

  &:hover {
    background: #f9fafb;
  }

  @media (max-width: 560px) {
    display: none;
  }
}

.btnSignup {
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: #ffffff;
  background: $color-primary;
  border: 1px solid $color-primary;
  border-radius: 0.375rem;
  text-decoration: none;
  cursor: pointer;
  transition: background-color 0.2s ease, border-color 0.2s ease;
  white-space: nowrap;

  &:hover {
    background: $color-primary-hover;
    border-color: $color-primary-hover;
  }
}

.btnLogout {
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: #ffffff;
  background: $color-primary;
  border: 1px solid $color-primary;
  border-radius: 0.375rem;
  text-decoration: none;
  cursor: pointer;
  transition: background-color 0.2s ease, border-color 0.2s ease;
  white-space: nowrap;

  &:hover {
    background: $color-primary-hover;
    border-color: $color-primary-hover;
  }
}

.menuButton {
  display: none;
  width: 2.5rem;
  height: 2.5rem;
  align-items: center;
  justify-content: center;
  padding: 0;
  color: #374151;
  background: #ffffff;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: background-color 0.2s ease;
  flex-shrink: 0;

  &:hover {
    background: #f9fafb;
  }

  svg {
    width: 1.35rem;
    height: 1.35rem;
  }

  @media (max-width: 850px) {
    display: flex;
  }
}
</style>