<template>
  <aside :class="$style.panel">
    <RouterLink to="/" :class="$style.brand">
      <span :class="$style.brandRing" aria-hidden="true"></span>
      <span :class="$style.brandWord">LifeDrop</span>
    </RouterLink>

    <div :class="$style.quoteCard">
      <svg :class="$style.dropIcon" viewBox="0 0 72 88" fill="none" aria-hidden="true">
        <path
          d="M36 4C36 4 8 40 8 60C8 75.464 20.536 88 36 88C51.464 88 64 75.464 64 60C64 40 36 4 36 4Z"
          fill="#c33a2c"
        />
      </svg>
      <p :class="$style.quoteText">
        Your blood is a gift<br />
        that no factory can produce.<br />
        Share it, save a life.
      </p>
    </div>

    <div :class="$style.divider"></div>

    <p :class="$style.stat">
      <em>1</em> donation can save up to <em>3</em> lives
    </p>

    <span :class="$style.footerBrand">LifeDrop &middot; Donor network</span>
  </aside>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<style module lang="scss">
.panel {
  flex: 0 0 44%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 2.5rem;
  padding: 3rem 3rem 2.5rem;
  background: linear-gradient(135deg, #c81e2c 0%, #7a1013 55%, #4a0b0e 100%);

  @media (max-width: 900px) {
    display: none;
  }
}

.brand {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  text-decoration: none;
  align-self: flex-start;
}

.brandRing {
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 9999px;
  background: #ffffff;
  border: 5px solid #c81e2c;
  box-sizing: border-box;
}

.brandWord {
  font-family: Georgia, 'Times New Roman', serif;
  font-style: italic;
  font-size: 1.375rem;
  color: #ffffff;
}

.quoteCard {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  padding: 3rem 2rem;
  background: #f4c6b8;
  border-radius: 0.75rem;
}

.dropIcon {
  width: 3rem;
  height: 3.7rem;
}

.quoteText {
  margin: 0;
  font-family: Georgia, 'Times New Roman', serif;
  font-style: italic;
  font-size: 1.25rem;
  line-height: 1.6;
  text-align: center;
  color: #5a1f16;
}

.divider {
  height: 1px;
  background: rgba(255, 255, 255, 0.2);
}

.stat {
  margin: 0;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  font-size: 0.9375rem;
  color: rgba(255, 255, 255, 0.85);

  em {
    font-family: Georgia, 'Times New Roman', serif;
    font-style: italic;
    color: #f4a58c;
  }
}

.footerBrand {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  font-size: 0.6875rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.55);
}
</style>