<template>
  <section :class="$style.drivesSection">
    <h2 :class="$style.sectionTitle">Upcoming blood drives</h2>

    <div :class="$style.drivesGrid">
      <div v-for="(drive, index) in bloodDrives" :key="index" :class="$style.driveCard">
        <div :class="$style.driveIconBox">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
          </svg>
        </div>
        <div>
          <h3 :class="$style.cardTitle">{{ drive.title }}</h3>
          <p :class="$style.cardMeta">{{ drive.date }} · {{ drive.location }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface BloodDrive {
  title: string;
  date: string;
  location: string;
}

const bloodDrives: BloodDrive[] = [
  {
    title: 'Beirut community drive',
    date: 'Sep 12, 2026',
    location: 'Downtown square',
  },
  {
    title: 'Sidon hospital drive',
    date: 'Sep 20, 2026',
    location: 'AUBMC campus',
  },
];
</script>

<style module lang="scss">
$color-primary: #c92a2a;

.drivesSection {
  max-width: 1152px;
  margin: 0 auto;
  padding: 0 1.5rem 4rem;

  .sectionTitle {
    font-size: 1.75rem;
    font-weight: 700;
    color: #111827;
    margin: 0;
  }

  .drivesGrid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
    margin-top: 1.5rem;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }

    .driveCard {
      padding: 1rem;
      border: 1px solid #e5e7eb;
      border-radius: 0.75rem;
      background: #ffffff;
      display: flex;
      align-items: center;
      gap: 1rem;

      .driveIconBox {
        width: 4rem;
        height: 4rem;
        background: #fef2f2;
        border-radius: 0.5rem;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;

        svg {
          width: 1.5rem;
          height: 1.5rem;
          color: $color-primary;
        }
      }

      .cardTitle {
        font-size: 1rem;
        font-weight: 700;
        color: #111827;
        margin: 0;
      }

      .cardMeta {
        font-size: 0.875rem;
        color: #6b7280;
        margin-top: 0.25rem;
        margin-bottom: 0;
      }
    }
  }
}
</style>