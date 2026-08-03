<template>
  <section :class="$style.featuresSection">
    <h2 :class="$style.sectionTitle">Why donate blood?</h2>
    <p :class="$style.sectionSubtitle">A few reasons our donors keep coming back.</p>

    <div :class="$style.featuresGrid">
      <div v-for="(feature, index) in features" :key="index" :class="$style.featureCard">
        <div :class="$style.featureIcon">
          <component :is="feature.icon" />
        </div>
        <h3 :class="$style.cardTitle">{{ feature.title }}</h3>
        <p :class="$style.cardDescription">{{ feature.description }}</p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { h, type Component } from 'vue';

interface Feature {
  title: string;
  description: string;
  icon: Component;
}

const ShieldHeartIcon = () => h('svg', { xmlns: 'http://www.w3.org/2000/svg', fill: 'none', viewBox: '0 0 24 24', strokeWidth: '1.5', stroke: 'currentColor' }, [
  h('path', { strokeLinecap: 'round', strokeLinejoin: 'round', d: 'M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z' })
]);

const StethoscopeIcon = () => h('svg', { xmlns: 'http://www.w3.org/2000/svg', fill: 'none', viewBox: '0 0 24 24', strokeWidth: '1.5', stroke: 'currentColor' }, [
  h('path', { strokeLinecap: 'round', strokeLinejoin: 'round', d: 'M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z' })
]);

const ClockIcon = () => h('svg', { xmlns: 'http://www.w3.org/2000/svg', fill: 'none', viewBox: '0 0 24 24', strokeWidth: '1.5', stroke: 'currentColor' }, [
  h('path', { strokeLinecap: 'round', strokeLinejoin: 'round', d: 'M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z' })
]);

const features: Feature[] = [
  {
    title: 'Saves lives',
    description: 'One donation can help up to 3 patients in emergency care.',
    icon: ShieldHeartIcon,
  },
  {
    title: 'Free health check',
    description: 'Every visit includes a quick vitals and iron check.',
    icon: StethoscopeIcon,
  },
  {
    title: 'Quick and easy',
    description: 'The whole process takes under 30 minutes, start to finish.',
    icon: ClockIcon,
  },
];
</script>

<style module lang="scss">
$color-primary: #c92a2a;

.featuresSection {
  max-width: 1152px;
  margin: 0 auto;
  padding: 4rem 1.5rem;

  .sectionTitle {
    font-size: 1.75rem;
    font-weight: 700;
    color: #111827;
    margin: 0;
  }

  .sectionSubtitle {
    color: #6b7280;
    margin-top: 0.5rem;
    margin-bottom: 2rem;
  }

  .featuresGrid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }

    .featureCard {
      padding: 1.5rem;
      border: 1px solid #e5e7eb;
      border-radius: 0.75rem;
      background: #ffffff;

      .featureIcon {
        width: 2rem;
        height: 2rem;
        color: $color-primary;
        margin-bottom: 1rem;

        svg {
          width: 100%;
          height: 100%;
        }
      }

      .cardTitle {
        font-size: 1rem;
        font-weight: 700;
        color: #111827;
        margin: 0 0 0.5rem 0;
      }

      .cardDescription {
        font-size: 0.875rem;
        color: #6b7280;
        line-height: 1.5;
        margin: 0;
      }
    }
  }
}
</style>