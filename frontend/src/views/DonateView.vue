<template>
  <div :class="$style.pageWrapper">
    <AppNavbar />

    <main :class="$style.mainContent">
      <div :class="$style.container">
        <!-- Header Title Section -->
        <header :class="$style.headerSection">
          <span :class="$style.subBadge">Emergency & Regular Requests</span>
          <h1 :class="$style.pageTitle">Top Donors In Our system</h1>
          <p :class="$style.pageSubtitle">
            Recognizing our most dedicated blood donors whose lifesaving contributions make the
            biggest impact in our community. needs.
          </p>
        </header>

        <!-- Search Bar Card -->
        <div :class="$style.searchCard">
          <div :class="$style.filterGrid">
            <div :class="$style.inputGroup">
              <label for="bloodType">Blood type</label>
              <div :class="$style.selectWrapper">
                <select id="bloodType" v-model="selectedBloodType" :class="$style.selectInput">
                  <option value="Any">Any Blood Type</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                </select>
              </div>
            </div>

            <div :class="$style.inputGroup">
              <label for="cityName">City / Region</label>
              <div :class="$style.inputWithIcon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  :class="$style.fieldIcon"
                >
                  <path
                    fill-rule="evenodd"
                    d="M9.69 18.933l.003.001C9.89 19.02 10 19 10 19s.11.02.307-.066l.003-.001.006-.003.018-.008a5.741 5.741 0 00.281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 103 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 003.03 2.198l.018.009.006.003zM10 11.25a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z"
                    clip-rule="evenodd"
                  />
                </svg>
                <input
                  id="cityName"
                  v-model="cityQuery"
                  type="text"
                  placeholder="e.g. Beirut"
                  :class="$style.textInput"
                  @keyup.enter="handleSearch"
                />
              </div>
            </div>

            <div :class="$style.inputGroup">
              <label for="urgency">Urgency</label>
              <div :class="$style.selectWrapper">
                <select id="urgency" v-model="selectedUrgency" :class="$style.selectInput">
                  <option value="normal">Normal</option>
                  <option value="high">High Priority</option>
                  <option value="critical">Critical</option>
                </select>
              </div>
            </div>

            <div :class="$style.buttonGroup">
              <button
                :class="$style.btnSearch"
                aria-label="Search Donors"
                :disabled="isLoading"
                @click="handleSearch"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  :class="$style.btnIcon"
                >
                  <path
                    fill-rule="evenodd"
                    d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                    clip-rule="evenodd"
                  />
                </svg>
                <span>{{ isLoading ? 'Searching...' : 'Search' }}</span>
              </button>
            </div>
          </div>
        </div>

        <!-- Error message -->
        <p v-if="errorMessage" :class="$style.errorText">{{ errorMessage }}</p>

        <!-- Donors Section Title -->
        <div :class="$style.gridHeader">
          <h2>Top Donors ({{ donors.length }})</h2>
        </div>

        <!-- Loading state -->
        <p v-if="isLoading" :class="$style.loadingText">Loading donors...</p>

        <!-- Empty state -->
        <p v-else-if="donors.length === 0" :class="$style.loadingText">
          No donors found. Try adjusting your filters.
        </p>

        <!-- Donors List Grid -->
        <div v-else :class="$style.donorsGrid">
          <div
            v-for="donor in donors"
            :key="(donor as any)._id || donor.id"
            :class="$style.donorCard"
          >
            <div :class="$style.cardHeader">
              <div :class="$style.bloodBadge">
                <span>{{ getDonorBloodType(donor) }}</span>
              </div>
              <span :class="$style.statusDot" title="Available donor"></span>
            </div>

            <h3 :class="$style.donorName">
              {{ getDonorName(donor) }}
            </h3>

            <div :class="$style.donorMeta">
              <p :class="$style.metaRow">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fill-rule="evenodd"
                    d="M9.69 18.933l.003.001C9.89 19.02 10 19 10 19s.11.02.307-.066l.003-.001.006-.003.018-.008a5.741 5.741 0 00.281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 103 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 003.03 2.198l.018.009.006.003zM10 11.25a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z"
                    clip-rule="evenodd"
                  />
                </svg>
                <span>{{ getDonorCity(donor) }}</span>
              </p>
              <p :class="$style.metaRow">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-13a.75.75 0 00-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 000-1.5h-3.25V5z"
                    clip-rule="evenodd"
                  />
                </svg>
                <span>Last donated: {{ formatLastDonated(donor) }}</span>
              </p>
            </div>

            <router-link
              :to="`/donors/${(donor as any)._id || donor.id}`"
              :class="$style.btnContact"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path
                  d="M3 4a2 2 0 00-2 2v1.161l8.441 4.221a1.25 1.25 0 001.118 0L19 7.162V6a2 2 0 00-2-2H3z"
                />
                <path
                  d="M19 8.839l-7.77 3.885a2.75 2.75 0 01-2.46 0L1 8.839V14a2 2 0 002 2h14a2 2 0 002-2V8.839z"
                />
              </svg>
              <span>Contact Donor</span>
            </router-link>
          </div>
        </div>
      </div>
    </main>

    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import AppNavbar from '@/components/AppNavbar.vue'
import AppFooter from '@/components/AppFooter.vue'
import { fetchDonors } from '@/services/donor.service'
import type { Donor, BloodType, UrgencyLevel, DonorSearchParams } from '@/types/donor'

const donors = ref<Donor[]>([])
const isLoading = ref(false)
const errorMessage = ref('')

const selectedBloodType = ref<BloodType | 'Any'>('Any')
const cityQuery = ref('')
const selectedUrgency = ref<UrgencyLevel>('normal')

function getDonorName(donor: Donor | any): string {
  if (typeof donor.user === 'object' && donor.user?.name) {
    return donor.user.name
  }
  return donor.name || 'Anonymous Donor'
}
function getDonorBloodType(donor: Donor | any): string {
  if (typeof donor.user === 'object' && donor.user?.bloodType) {
    return donor.user.bloodType
  }
  return donor.bloodType || 'Unknown'
}

function getDonorCity(donor: Donor | any): string {
  if (!donor || !donor.user) return 'Location unspecified'
  const u = donor.user

  if (typeof u === 'object' && u !== null) {
    if (typeof u.address === 'string' && u.address.trim() !== '') {
      return u.address
    }
    if (u.address && typeof u.address === 'object' && u.address.city) {
      return u.address.city
    }
  }

  if (typeof donor.address === 'string' && donor.address.trim() !== '') {
    return donor.address
  }

  return 'Location unspecified'
}

function formatLastDonated(donor: Donor | any): string {
  // Check lowercase lastdonation (from DB) as well as camelCase variants
  let rawDate =
    donor.lastdonation || donor.lastDonation || donor.lastDonationDate || donor.lastDonated

  if (!rawDate) return 'Never'

  // If the database stored string literal quotes like '""2026-08-03...""', clean them up:
  if (typeof rawDate === 'string') {
    rawDate = rawDate.replace(/"/g, '').trim()
  }

  const date = new Date(rawDate)
  if (isNaN(date.getTime())) return 'Never'

  const now = new Date()

  // Calculate difference based on midnight start of today for clean day matching
  const dateMidnight = new Date(date.getFullYear(), date.getMonth(), date.getDate())
  const nowMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate())

  const diffInMs = nowMidnight.getTime() - dateMidnight.getTime()
  const diffInDays = Math.round(diffInMs / (1000 * 60 * 60 * 24))

  if (diffInDays < 0) return 'Today'
  if (diffInDays === 0) return 'Today'
  if (diffInDays === 1) return 'Yesterday'
  if (diffInDays < 30) return `${diffInDays} days ago`
  if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} months ago`

  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

async function handleSearch() {
  isLoading.value = true
  errorMessage.value = ''
  try {
    const searchParams = {
      bloodType:
        selectedBloodType.value === 'Any' ? undefined : (selectedBloodType.value as BloodType),
      urgency: selectedUrgency.value,
      address: cityQuery.value.trim() || undefined,
    } as DonorSearchParams & { address?: string }

    donors.value = await fetchDonors(searchParams)
  } catch (err) {
    errorMessage.value = 'Could not load donors. Please try again.'
    console.error(err)
  } finally {
    isLoading.value = false
  }
}

onMounted(handleSearch)
</script>

<style module lang="scss">
$color-primary: #dc2626;
$color-primary-dark: #b91c1c;
$color-primary-light: #fef2f2;
$color-text-main: #0f172a;
$color-text-muted: #64748b;
$border-color: #e2e8f0;

.pageWrapper {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #f8fafc;
  font-family:
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    Oxygen,
    Ubuntu,
    Cantarell,
    sans-serif;
}

.mainContent {
  flex: 1;
  padding: 3.5rem 1.5rem 5rem;
  background: linear-gradient(180deg, #fef2f2 0%, #f8fafc 300px);
}

.container {
  max-width: 1080px;
  margin: 0 auto;
}

.headerSection {
  margin-bottom: 2rem;

  .subBadge {
    display: inline-block;
    padding: 0.25rem 0.75rem;
    background-color: #fee2e2;
    color: $color-primary-dark;
    font-size: 0.8125rem;
    font-weight: 600;
    border-radius: 9999px;
    margin-bottom: 0.75rem;
  }

  .pageTitle {
    font-size: 2.25rem;
    font-weight: 800;
    color: $color-text-main;
    letter-spacing: -0.025em;
    margin: 0 0 0.5rem 0;

    @media (max-width: 640px) {
      font-size: 1.75rem;
    }
  }

  .pageSubtitle {
    font-size: 1rem;
    color: $color-text-muted;
    margin: 0;
    max-width: 600px;
  }
}

.searchCard {
  background: #ffffff;
  border-radius: 1rem;
  padding: 1.5rem;
  border: 1px solid $border-color;
  box-shadow:
    0 10px 15px -3px rgba(0, 0, 0, 0.04),
    0 4px 6px -4px rgba(0, 0, 0, 0.02);
  margin-bottom: 1.5rem;

  .filterGrid {
    display: grid;
    grid-template-columns: 1.5fr 2fr 1.5fr 1.25fr;
    gap: 1.25rem;
    align-items: flex-end;

    @media (max-width: 900px) {
      grid-template-columns: 1fr 1fr;
    }

    @media (max-width: 580px) {
      grid-template-columns: 1fr;
    }
  }

  .inputGroup {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    label {
      font-size: 0.84375rem;
      font-weight: 600;
      color: #334155;
    }

    .selectWrapper {
      position: relative;
    }

    .inputWithIcon {
      position: relative;
      display: flex;
      align-items: center;

      .fieldIcon {
        position: absolute;
        left: 0.875rem;
        width: 1.25rem;
        height: 1.25rem;
        color: #94a3b8;
        pointer-events: none;
      }

      .textInput {
        padding-left: 2.625rem;
      }
    }

    .selectInput,
    .textInput {
      width: 100%;
      height: 2.875rem;
      padding: 0 1rem;
      border: 1px solid $border-color;
      border-radius: 0.625rem;
      font-size: 0.9375rem;
      color: $color-text-main;
      background-color: #ffffff;
      outline: none;
      transition: all 0.2s ease;

      &:focus {
        border-color: $color-primary;
        box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.12);
      }
    }
  }

  .buttonGroup {
    .btnSearch {
      width: 100%;
      height: 2.875rem;
      background-color: $color-primary;
      color: #ffffff;
      border: none;
      border-radius: 0.625rem;
      font-size: 0.9375rem;
      font-weight: 600;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      cursor: pointer;
      transition: all 0.2s ease;

      .btnIcon {
        width: 1.25rem;
        height: 1.25rem;
      }

      &:hover:not(:disabled) {
        background-color: $color-primary-dark;
        box-shadow: 0 4px 12px rgba(220, 38, 38, 0.25);
      }

      &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
      }

      &:active:not(:disabled) {
        transform: translateY(1px);
      }
    }
  }
}

.errorText {
  color: $color-primary-dark;
  background-color: #fee2e2;
  border: 1px solid #fecaca;
  border-radius: 0.625rem;
  padding: 0.75rem 1rem;
  font-size: 0.9375rem;
  margin-bottom: 1.5rem;
}

.loadingText {
  color: $color-text-muted;
  font-size: 0.9375rem;
  padding: 1rem 0;
}

.gridHeader {
  margin-bottom: 1.25rem;

  h2 {
    font-size: 1.125rem;
    font-weight: 700;
    color: $color-text-main;
    margin: 0;
  }
}

.donorsGrid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }

  .donorCard {
    background: #ffffff;
    border-radius: 1rem;
    padding: 1.5rem;
    border: 1px solid $border-color;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
    display: flex;
    flex-direction: column;
    transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);

    &:hover {
      transform: translateY(-4px);
      box-shadow: 0 12px 20px -5px rgba(0, 0, 0, 0.08);
      border-color: #fca5a5;
    }

    .cardHeader {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.25rem;

      .bloodBadge {
        width: 2.75rem;
        height: 2.75rem;
        border-radius: 0.75rem;
        background-color: $color-primary-light;
        color: $color-primary;
        font-weight: 800;
        font-size: 1.125rem;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px solid #fecaca;
      }

      .statusDot {
        width: 0.625rem;
        height: 0.625rem;
        background-color: #22c55e;
        border-radius: 50%;
        box-shadow: 0 0 0 3px #dcfce7;
      }
    }

    .donorName {
      font-size: 1.25rem;
      font-weight: 700;
      color: $color-text-main;
      margin: 0 0 0.75rem 0;
    }

    .donorMeta {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      margin-bottom: 1.75rem;

      .metaRow {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-size: 0.875rem;
        color: $color-text-muted;
        margin: 0;

        svg {
          width: 1rem;
          height: 1rem;
          color: #94a3b8;
        }
      }
    }

    .btnContact {
      width: 100%;
      height: 2.625rem;
      background-color: #ffffff;
      border: 1px solid #cbd5e1;
      border-radius: 0.625rem;
      color: #334155;
      font-size: 0.875rem;
      font-weight: 600;
      cursor: pointer;
      margin-top: auto;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      transition: all 0.2s ease;

      svg {
        width: 1rem;
        height: 1rem;
        color: $color-text-muted;
        transition: color 0.2s ease;
      }

      &:hover {
        background-color: $color-primary;
        border-color: $color-primary;
        color: #ffffff;

        svg {
          color: #ffffff;
        }
      }
    }
  }
}
</style>