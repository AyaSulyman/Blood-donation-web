<!-- src/views/NotFoundView.vue -->

<template>
  <div :class="$style.container">
    <div :class="$style.content">
      <h1 :class="$style.title">404</h1>
      <p :class="$style.message">Page not found</p>
      <router-link to="/" :class="$style.link">Go back home</router-link>
    </div>
  </div>
</template>

<style module lang="scss">
.container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f8f6f3;
  padding: 1.5rem;
}

.content {
  text-align: center;
}

.title {
  font-size: 6rem;
  font-weight: 700;
  color: #c81e2c;
  margin: 0;
}

.message {
  font-size: 1.5rem;
  color: #6b6459;
  margin: 0.5rem 0 2rem;
}

.link {
  display: inline-block;
  padding: 0.75rem 2rem;
  background: #1a1a1a;
  color: #ffffff;
  text-decoration: none;
  border-radius: 0.5rem;
  font-weight: 500;
  transition: background-color 0.2s ease;

  &:hover {
    background: #000000;
  }
}
</style>