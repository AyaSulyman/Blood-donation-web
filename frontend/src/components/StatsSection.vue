<template>
  <section :class="$style.statsSection">
    <div :class="$style.statsInner">
      <div v-for="(stat, index) in stats" :key="index" :class="$style.statItem">
        <p :class="$style.statValue">{{ stat.value }}</p>
        <p :class="$style.statLabel">{{ stat.label }}</p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface Stat {
  value: string;
  label: string;
}

const stats: Stat[] = [
  { value: '1,240', label: 'Donors' },
  { value: '312', label: 'Lives saved' },
  { value: '8', label: 'Hospitals' },
  { value: '24', label: 'Drives run' },
];
</script>

<style module lang="scss">
$color-primary: #c92a2a;
$color-border: #f3f4f6;

.statsSection {
  border-bottom: 1px solid $color-border;
  background-color: #ffffff;
  padding: 2rem 0;

  .statsInner {
    max-width: 1152px;
    margin: 0 auto;
    padding: 0 1.5rem;
    display: grid;
    grid-template-columns: repeat(4, 1fr);

    @media (max-width: 768px) {
      grid-template-columns: repeat(2, 1fr);
      gap: 1.5rem;
    }

    .statItem {
      text-align: center;
      border-right: 1px solid $color-border;

      &:last-child {
        border-right: none;
      }

      @media (max-width: 768px) {
        border-right: none;
      }

      .statValue {
        font-size: 2rem;
        font-weight: 700;
        color: $color-primary;
        margin: 0;
      }

      .statLabel {
        font-size: 0.875rem;
        font-weight: 500;
        color: #6b7280;
        margin-top: 0.25rem;
      }
    }
  }
}
</style>