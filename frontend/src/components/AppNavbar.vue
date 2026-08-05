<template>
  <header :class="$style.navbar">
    <div :class="$style.navInner">
      <div :class="$style.brand">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" :class="$style.brandIcon">
          <path d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75 0 7.312 9.75 11.25 9.75 11.25s9.75-3.938 9.75-11.25c0-5.385-4.365-9.75-9.75-9.75z" />
        </svg>
        <span :class="$style.brandTitle">LifeDrop</span>
      </div>

      <nav :class="$style.navLinks">
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
        <a href="#">Donate</a>
        <a href="#">Events</a>
        <a href="#">Centers</a>
        <a href="#">Contact</a>
      </nav>

      <div :class="$style.authButtons">
        <RouterLink to="/login" :class="$style.btnLogin">Log in</RouterLink>
        <RouterLink to="/signup" :class="$style.btnSignup">Sign up</RouterLink>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
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
  background-color: #ffffff;
  border-bottom: 1px solid $color-border;

  .navInner {
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

  .navLinks {
    display: flex;
    align-items: center;
    gap: 2rem;

    a {
      font-size: 0.875rem;
      font-weight: 500;
      color: #4b5563;
      text-decoration: none;

      &:hover {
        color: $color-primary;
      }
    }

    @media (max-width: 768px) {
      display: none;
    }
  }

  .authButtons {
    display: flex;
    align-items: center;
    gap: 0.75rem;

    .btnLogin {
      display: inline-block;
      padding: 0.5rem 1rem;
      font-size: 0.875rem;
      font-weight: 500;
      color: #1f2937;
      background: #ffffff;
      border: 1px solid #d1d5db;
      border-radius: 0.375rem;
      text-decoration: none;
      cursor: pointer;

      &:hover {
        background: #f9fafb;
      }
    }

    .btnSignup {
      display: inline-block;
      padding: 0.5rem 1rem;
      font-size: 0.875rem;
      font-weight: 500;
      color: #ffffff;
      background: $color-primary;
      border: none;
      border-radius: 0.375rem;
      text-decoration: none;
      cursor: pointer;

      &:hover {
        background: $color-primary-hover;
      }
    }
  }
}
</style>