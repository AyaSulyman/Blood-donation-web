<template>
  <aside :class="$style.panel">
    <div :class="$style.illustration">
      <svg width="96" height="118" viewBox="0 0 72 88" fill="none" aria-hidden="true">
        <path
          d="M36 4C36 4 8 40 8 60C8 75.464 20.536 88 36 88C51.464 88 64 75.464 64 60C64 40 36 4 36 4Z"
          fill="#c92a2a"
          fill-opacity="0.92"
        />
        <ellipse cx="26" cy="58" rx="7" ry="11" fill="#c92a2a" opacity="0.16" />
      </svg>
    </div>

    <div :class="$style.verse">
      <p dir="rtl" lang="ar" :class="$style.ayahArabic">
       
    Your blood is a gift <br>
    that no factory can produce<br>share it,
     save a life.
        
      </p>
     
    
    </div>
  </aside>
</template>

<script setup lang="ts">
</script>

<style module lang="scss">
.panel {
  flex: 0 0 60%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2.5rem;
  background: linear-gradient(180deg, #f9c9bc 0%, #f0a894 100%);
  padding: 3rem 2rem;

  @media (max-width: 900px) {
    display: none;
  }
}

.illustration {
  display: flex;
  align-items: center;
  justify-content: center;
}

.verse {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  max-width: 22rem;
}

.ayahArabic {
  font-family: 'Traditional Arabic', 'Amiri', 'Segoe UI', serif;
  font-size: 1.5rem;
  line-height: 2.1;
  color: #4a1b0c;
  text-align: center;
  margin: 0;
}

.ayahMark {
  color: #993c1d;
  margin: 0 0.15rem;
}

.ayahTranslation {
  font-size: 0.9375rem;
  font-style: italic;
  color: #712b13;
  text-align: center;
  line-height: 1.7;
  margin: 0;
}

.ayahCitation {
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.02em;
  color: #993c1d;
}
</style>