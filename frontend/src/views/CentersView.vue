<template>
  <div :class="$style.pageWrapper">
    <AppNavbar />

    <main :class="$style.mainContent">
      <section :class="$style.container" aria-labelledby="centers-title">
        <header :class="$style.pageHeader">
          <span :class="$style.eyebrow">Find a place to donate</span>
          <h1 id="centers-title" :class="$style.pageTitle">Blood donation centers</h1>
          <p :class="$style.pageSubtitle">
            Nearby locations accepting walk-in and scheduled blood donations.
          </p>
        </header>

        <div :class="$style.centersGrid">
          <article v-for="center in centers" :key="center._id" :class="$style.centerCard">
            <div :class="$style.imagePlaceholder" aria-hidden="true">
              <div :class="$style.iconCircle">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 21s7-4.35 7-11A7 7 0 1 0 5 10c0 6.65 7 11 7 11Z" stroke="currentColor" stroke-width="1.7"
                    stroke-linecap="round" stroke-linejoin="round" />
                  <circle cx="12" cy="10" r="2.3" stroke="currentColor" stroke-width="1.7" />
                </svg>
              </div>
            </div>

            <div :class="$style.cardContent">
              <div>
                <h2 :class="$style.centerName">{{ center.name }}</h2>
                <p :class="$style.address">
                  <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fill-rule="evenodd"
                      d="M9.69 18.933 10 19l.31-.067C10.583 18.815 17 15.91 17 9A7 7 0 1 0 3 9c0 6.91 6.417 9.815 6.69 9.933ZM10 11.25a2.25 2.25 0 1 0 0-4.5 2.25 2.25 0 0 0 0 4.5Z"
                      clip-rule="evenodd" />
                  </svg>
                  <span>{{ center.address }}</span>
                </p>
              </div>

              <button type="button" :class="$style.directionsButton"
                @click="openDirections(center.latitude, center.longitude)">
                <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fill-rule="evenodd"
                    d="M10.293 2.293a1 1 0 0 1 1.414 0l6 6a1 1 0 0 1 0 1.414l-6 6a1 1 0 0 1-1.414-1.414L14.586 10H5a1 1 0 1 1 0-2h9.586l-4.293-4.293a1 1 0 0 1 0-1.414Z"
                    clip-rule="evenodd" />
                </svg>
                <span>Get directions</span>
              </button>
            </div>
          </article>
        </div>
      </section>
    </main>

    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import {
  fetchCenters,
  type DonationCenter,
} from "@/services/center.service";
import AppFooter from '@/components/AppFooter.vue'
import AppNavbar from '@/components/AppNavbar.vue'




const openDirections = (latitude: number, longitude: number) => {
  window.open(
    `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`,
    "_blank"
  )
}

const centers = ref<DonationCenter[]>([])

onMounted(async () => {
  try {
    centers.value = await fetchCenters()
  } catch (error) {
    console.error("Failed to fetch centers:", error)
  }
})
</script>

<style module lang="scss">
$primary: #c92a2a;
$primary-dark: #a61e1e;
$text-main: #111827;
$text-muted: #6b7280;
$border: #e5e7eb;

.pageWrapper {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #f8fafc;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.mainContent {
  flex: 1;
  padding: 4rem 1.5rem 5rem;
  background:
    radial-gradient(circle at 92% 8%, rgba(201, 42, 42, 0.08), transparent 26rem),
    linear-gradient(180deg, #fff7f7 0, #f8fafc 22rem);
}

.container {
  width: 100%;
  max-width: 1152px;
  margin: 0 auto;
}

.pageHeader {
  max-width: 720px;
  margin-bottom: 2.5rem;
}

.eyebrow {
  display: inline-flex;
  margin-bottom: 0.8rem;
  padding: 0.35rem 0.8rem;
  border-radius: 999px;
  background: #fee2e2;
  color: #991b1b;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.pageTitle {
  margin: 0 0 0.65rem;
  color: $text-main;
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 800;
  letter-spacing: -0.04em;
  line-height: 1.08;
}

.pageSubtitle {
  margin: 0;
  color: $text-muted;
  font-size: 1.08rem;
  line-height: 1.7;
}

.centersGrid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1.5rem;
}

.centerCard {
  overflow: hidden;
  display: flex;
  min-width: 0;
  flex-direction: column;
  background: #ffffff;
  border: 1px solid $border;
  border-radius: 1rem;
  box-shadow: 0 12px 32px rgba(15, 23, 42, 0.07);
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 18px 38px rgba(15, 23, 42, 0.11);
  }
}

.imagePlaceholder {
  height: 190px;
  display: grid;
  place-items: center;
  background:
    linear-gradient(135deg, rgba(255, 255, 255, 0.25), transparent),
    #efa097;
}

.iconCircle {
  width: 3.7rem;
  height: 3.7rem;
  display: grid;
  place-items: center;
  color: #ffffff;
  background: rgba(255, 255, 255, 0.18);
  border: 1px solid rgba(255, 255, 255, 0.55);
  border-radius: 50%;
  backdrop-filter: blur(3px);

  svg {
    width: 1.8rem;
    height: 1.8rem;
  }
}

.cardContent {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1.5rem;
  padding: 1.65rem;
}

.centerName {
  margin: 0 0 0.55rem;
  color: $text-main;
  font-size: 1.25rem;
  font-weight: 750;
  letter-spacing: -0.02em;
}

.address {
  display: flex;
  align-items: center;
  gap: 0.45rem;
  margin: 0;
  color: $text-muted;
  font-size: 0.96rem;
  line-height: 1.5;

  svg {
    width: 1rem;
    height: 1rem;
    flex: 0 0 auto;
    color: #9ca3af;
  }
}

.directionsButton {
  width: 100%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.82rem 1rem;
  color: #ffffff;
  background: $primary;
  border: 1px solid $primary;
  border-radius: 0.6rem;
  font: inherit;
  font-size: 0.95rem;
  font-weight: 650;
  cursor: pointer;
  transition: background-color 0.2s ease, border-color 0.2s ease, transform 0.2s ease;

  &:hover {
    background: $primary-dark;
    border-color: $primary-dark;
  }

  &:active {
    transform: translateY(1px);
  }

  &:focus-visible {
    outline: 3px solid rgba(201, 42, 42, 0.25);
    outline-offset: 2px;
  }

  svg {
    width: 1rem;
    height: 1rem;
  }
}

@media (max-width: 900px) {
  .centersGrid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 640px) {
  .mainContent {
    padding: 3rem 1rem 4rem;
  }

  .pageHeader {
    margin-bottom: 2rem;
  }

  .pageSubtitle {
    font-size: 1rem;
  }

  .centersGrid {
    grid-template-columns: 1fr;
  }

  .imagePlaceholder {
    height: 170px;
  }
}
</style>
