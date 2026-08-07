<!-- src/views/DonationDetailsView.vue -->

<template>
  <div :class="$style.pageWrapper">
    <!-- Navbar -->
    <AppNavbar />

    <main :class="$style.mainContent">
      <div :class="$style.container">
        <div :class="$style.card">
          <div :class="$style.header">
            <button :class="$style.backBtn" @click="goBack">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              Back
            </button>
            <h1 :class="$style.title">Donation Details</h1>
          </div>

          <div v-if="loading" :class="$style.loading">
            <div :class="$style.spinner"></div>
            <p>Loading donation details...</p>
          </div>

          <div v-else-if="error" :class="$style.error">
            <p>{{ error }}</p>
            <button :class="$style.retryBtn" @click="loadDonation">Try Again</button>
          </div>

          <div v-else-if="donation" :class="$style.details">
            <div :class="$style.detailRow">
              <span :class="$style.label">Date</span>
              <span :class="$style.value">{{ formatDate(donation.donationDate || donation.date) }}</span>
            </div>
            <div :class="$style.detailRow">
              <span :class="$style.label">Center</span>
              <span :class="$style.value">{{ donation.centerName || donation.donationCenter || donation.location || 'Unknown' }}</span>
            </div>
            <div :class="$style.detailRow">
              <span :class="$style.label">Units</span>
              <span :class="$style.value">{{ donation.units }} unit(s)</span>
            </div>
            <div :class="$style.detailRow">
              <span :class="$style.label">Status</span>
              <span 
                :class="[
                  $style.statusBadge,
                  donation.status === 'Completed' ? $style.badgeCompleted : $style.badgeScheduled
                ]"
              >
                {{ donation.status || 'Scheduled' }}
              </span>
            </div>
            <div :class="$style.detailRow">
              <span :class="$style.label">Donation ID</span>
              <span :class="$style.value">{{ donation.id }}</span>
            </div>
          </div>
        </div>
      </div>
    </main>

    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getDonationDetails } from '@/services/donation';
import AppFooter from '@/components/AppFooter.vue';
import AppNavbar from '@/components/AppNavbar.vue';

const route = useRoute();
const router = useRouter();
const donation = ref<any>(null);
const loading = ref(true);
const error = ref<string | null>(null);

const loadDonation = async () => {
  loading.value = true;
  error.value = null;
  
  try {
    const id = route.params.id as string;
    console.log('🔍 Fetching donation details for ID:', id);
    const data = await getDonationDetails(id);
    donation.value = data;
    console.log('✅ Donation details loaded:', data);
  } catch (err: any) {
    console.error('❌ Failed to load donation:', err);
    error.value = err.response?.data?.message || 'Failed to load donation details.';
  } finally {
    loading.value = false;
  }
};

const formatDate = (dateString: string) => {
  if (!dateString) return 'N/A';
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  } catch {
    return dateString;
  }
};

const goBack = () => {
  router.back();
};

onMounted(() => {
  loadDonation();
});
</script>

<style module lang="scss">
$color-primary: #b91c1c;
$color-primary-hover: #991b1b;
$text-dark: #1e293b;
$text-muted: #64748b;
$border-color: #e2e8f0;

.pageWrapper {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #f8fafc;
}

.mainContent {
  flex: 1;
  padding: 3rem 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.container {
  width: 100%;
  max-width: 1080px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
}

.card {
  background: #ffffff;
  border-radius: 1rem;
  padding: 2rem;
  max-width: 600px;
  width: 100%;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
  border: 1px solid $border-color;
}

.header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
}

.backBtn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: transparent;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  color: $text-muted;
  cursor: pointer;
  transition: background-color 0.15s ease;

  svg {
    width: 1.1rem;
    height: 1.1rem;
  }

  &:hover {
    background: #f3f0eb;
  }
}

.title {
  font-size: 1.25rem;
  font-weight: 600;
  color: $text-dark;
  margin: 0;
}

.loading {
  text-align: center;
  padding: 3rem 0;
  color: $text-muted;
}

.spinner {
  width: 2.5rem;
  height: 2.5rem;
  border: 3px solid #f3f0eb;
  border-top-color: $color-primary;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
  margin: 0 auto 1rem;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.error {
  text-align: center;
  padding: 2rem 0;
  color: #dc2626;

  p {
    margin-bottom: 1rem;
  }
}

.retryBtn {
  padding: 0.5rem 1.5rem;
  background: $text-dark;
  color: #ffffff;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  font-weight: 500;

  &:hover {
    background: #000000;
  }
}

.details {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.detailRow {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid #f3f0eb;

  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }
}

.label {
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #8a8478;
}

.value {
  font-size: 0.9375rem;
  font-weight: 500;
  color: $text-dark;
  text-align: right;
}

.statusBadge {
  display: inline-block;
  padding: 0.25rem 0.875rem;
  border-radius: 9999px;
  font-size: 0.8125rem;
  font-weight: 600;

  &.badgeCompleted {
    background-color: #dcfce7;
    color: #166534;
  }

  &.badgeScheduled {
    background-color: #fef3c7;
    color: #92400e;
  }
}

/* Responsive */
@media (max-width: 768px) {
  .mainContent {
    padding: 1.5rem 1rem;
  }

  .card {
    padding: 1.5rem;
  }

  .header {
    flex-wrap: wrap;
  }

  .title {
    font-size: 1.125rem;
  }

  .detailRow {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.25rem;
  }

  .value {
    text-align: left;
    width: 100%;
  }
}

@media (max-width: 480px) {
  .card {
    padding: 1rem;
  }

  .backBtn {
    padding: 0.4rem 0.75rem;
    font-size: 0.8125rem;
  }

  .details {
    gap: 1rem;
  }

  .detailRow {
    padding-bottom: 0.5rem;
  }
}
</style>