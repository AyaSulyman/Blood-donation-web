<template>
  <div :class="$style.page">
    <AppNavbar />
    <main>
      <HeroSection />
      <StatsSection />
      <FeaturesSection />
      <UpcomingDrives />
      <CallToActionFooter />
    </main>
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import AppNavbar from '@/components/AppNavbar.vue';
import HeroSection from '@/components/HeroSection.vue';
import StatsSection from '@/components/StatsSection.vue';
import FeaturesSection from '@/components/FeaturesSection.vue';
import UpcomingDrives from '@/components/UpcomingDrives.vue';
import CallToActionFooter from '@/components/CallToActionFooter.vue';
import AppFooter from '@/components/AppFooter.vue';
</script>

<style module lang="scss">
.page {
  min-height: 100vh;
  background-color: #ffffff;
  color: #1f2937;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  -webkit-font-smoothing: antialiased;
}
</style>