<!-- src/views/RecipientsView.vue -->

<template>
  <div :class="$style.pageWrapper">
    <AppNavbar />

    <main :class="$style.mainContent">
      <div :class="$style.container">
        <!-- Back Link -->
        <router-link to="/dashboard" :class="$style.btnBack">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M17 10a.75.75 0 01-.75.75H5.612l4.158 3.96a.75.75 0 11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 111.04 1.08L5.612 9.25H16.25A.75.75 0 0117 10z" clip-rule="evenodd" />
          </svg>
          <span>Back to Dashboard</span>
        </router-link>

        <header :class="$style.headerSection">
          <div :class="$style.headerRow">
            <div>
              <h1 :class="$style.pageTitle">All Blood Recipients</h1>
              <p :class="$style.pageSubtitle">
                Browse all blood recipients and their requirements.
              </p>
            </div>
          </div>
        </header>

        <!-- Search & Filter Controls -->
        <div :class="$style.filterBar">
          <div :class="$style.inputGroup">
            <label>Blood Type</label>
            <select v-model="selectedType" :class="$style.selectInput">
              <option value="Any">All Types</option>
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

          <div :class="$style.inputGroup">
            <label>Search</label>
            <input 
              v-model="searchQuery" 
              type="text" 
              placeholder="Search by patient name..." 
              :class="$style.textInput" 
            />
          </div>
        </div>

        <!-- Loading State -->
        <div v-if="loading" :class="$style.loadingState">
          <div :class="$style.spinner"></div>
          <p>Loading recipients...</p>
        </div>

        <!-- Error State -->
        <div v-else-if="error" :class="$style.errorState">
          <p>{{ error }}</p>
          <button :class="$style.retryBtn" @click="loadRecipients">Retry</button>
        </div>

        <!-- Recipients Grid -->
        <div v-else :class="$style.recipientsGrid">
          <div 
            v-for="recipient in filteredRecipients" 
            :key="recipient._id" 
            :class="$style.recipientCard"
          >
            <div :class="$style.cardHeader">
              <span :class="$style.bloodBadge">{{ recipient.bloodType }}</span>
              <span :class="$style.urgencyTag">Active</span>
            </div>

            <h3 :class="$style.recName">{{ recipient.patientName }}</h3>
            <p :class="$style.recMeta">🩸 {{ recipient.bloodType }} · {{ recipient.bloodUnits }} Units needed</p>
            <p :class="$style.recUnits">Required: <strong>{{ recipient.bloodUnits }} Unit(s)</strong></p>
            <p v-if="recipient.user && typeof recipient.user !== 'string'" :class="$style.recMeta">
              👤 Created by: {{ recipient.user.name || 'Unknown' }}
            </p>
            <p :class="$style.recDate">📅 {{ formatDate(recipient.createdAt) }}</p>

            <button :class="$style.btnViewDetails" @click="openDetailsModal(recipient)">
              View Details
            </button>
          </div>
        </div>

        <!-- Empty State -->
        <div v-if="!loading && !error && recipients.length === 0" :class="$style.emptyState">
          <p>No recipients found.</p>
        </div>
      </div>
    </main>

    <!-- RECIPIENT DETAILS MODAL -->
    <Teleport to="body">
      <Transition name="modal-fade">
        <div v-if="isDetailsModalOpen && selectedRecipient" :class="$style.modalOverlay" @click.self="closeDetailsModal">
          <div :class="$style.modalCard">
            <!-- Modal Header -->
            <div :class="$style.modalHeader">
              <div :class="$style.headerIcon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
              </div>
              <div :class="$style.headerTitles">
                <h3>Recipient Details</h3>
                <p>{{ selectedRecipient.patientName }}</p>
              </div>
              <button :class="$style.btnClose" @click="closeDetailsModal" aria-label="Close Modal">&times;</button>
            </div>

            <!-- Modal Content -->
            <div :class="$style.modalBody">
              <div :class="$style.detailsGrid">
                <!-- Patient Name -->
                <div :class="$style.detailItem">
                  <span :class="$style.detailLabel">Patient Name</span>
                  <span :class="$style.detailValue">{{ selectedRecipient.patientName }}</span>
                </div>

                <!-- Blood Type -->
                <div :class="$style.detailItem">
                  <span :class="$style.detailLabel">Blood Type</span>
                  <span :class="[$style.detailValue, $style.bloodTypeBadge]">
                    {{ selectedRecipient.bloodType }}
                  </span>
                </div>

                <!-- Units Needed -->
                <div :class="$style.detailItem">
                  <span :class="$style.detailLabel">Units Needed</span>
                  <span :class="$style.detailValue">{{ selectedRecipient.bloodUnits }} Unit(s)</span>
                </div>

                <!-- Created By -->
                <div :class="$style.detailItem">
                  <span :class="$style.detailLabel">Created By</span>
                  <span :class="$style.detailValue">
                    {{ selectedRecipient.user && typeof selectedRecipient.user !== 'string' 
                      ? selectedRecipient.user.name || 'Unknown' 
                      : 'Unknown' }}
                  </span>
                </div>

                <!-- Created At -->
                <div :class="$style.detailItem">
                  <span :class="$style.detailLabel">Created At</span>
                  <span :class="$style.detailValue">{{ formatDate(selectedRecipient.createdAt) }}</span>
                </div>

                <!-- Updated At -->
                <div :class="$style.detailItem">
                  <span :class="$style.detailLabel">Last Updated</span>
                  <span :class="$style.detailValue">{{ formatDate(selectedRecipient.updatedAt) }}</span>
                </div>

                <!-- ID -->
                <div :class="$style.detailItem">
                  <span :class="$style.detailLabel">Recipient ID</span>
                  <span :class="[$style.detailValue, $style.idValue]">{{ selectedRecipient._id }}</span>
                </div>
              </div>

              <!-- Close Button -->
              <div :class="$style.modalActions">
                <button type="button" :class="$style.btnCloseModal" @click="closeDetailsModal">
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>

    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import AppNavbar from '@/components/AppNavbar.vue';
import AppFooter from '@/components/AppFooter.vue';
import { fetchAllRecipients } from '@/services/recipient.service';
import type { BloodRecipient } from '@/services/recipient.service';

// State
const recipients = ref<BloodRecipient[]>([]);
const loading = ref(false);
const error = ref<string | null>(null);
const selectedType = ref('Any');
const searchQuery = ref('');

// Details Modal state
const isDetailsModalOpen = ref(false);
const selectedRecipient = ref<BloodRecipient | null>(null);

// Load recipients from API
const loadRecipients = async () => {
  loading.value = true;
  error.value = null;
  
  try {
    console.log('📥 Loading recipients...');
    const data = await fetchAllRecipients();
    recipients.value = data;
    console.log('✅ Recipients loaded:', data.length);
  } catch (err: any) {
    console.error('❌ Failed to load recipients:', err);
    error.value = err.response?.data?.message || 'Failed to load recipients. Please try again.';
    recipients.value = [];
  } finally {
    loading.value = false;
  }
};

// Filter recipients
const filteredRecipients = computed(() => {
  return recipients.value.filter(item => {
    const matchesType = selectedType.value === 'Any' || item.bloodType === selectedType.value;
    const matchesSearch = item.patientName.toLowerCase().includes(searchQuery.value.toLowerCase());
    return matchesType && matchesSearch;
  });
});

// Format date
const formatDate = (dateString: string) => {
  if (!dateString) return 'N/A';
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  } catch {
    return dateString;
  }
};

// Details Modal functions
const openDetailsModal = (recipient: BloodRecipient) => {
  selectedRecipient.value = recipient;
  isDetailsModalOpen.value = true;
};

const closeDetailsModal = () => {
  isDetailsModalOpen.value = false;
  selectedRecipient.value = null;
};

// Load data on mount
onMounted(() => {
  loadRecipients();
});
</script>

<style module lang="scss">
$color-primary: #b91c1c;
$color-primary-hover: #991b1b;
$text-dark: #0f172a;
$text-muted: #64748b;
$border-color: #e2e8f0;

.pageWrapper {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #f8fafc;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.mainContent {
  flex: 1;
  padding: 2.5rem 1.5rem 4rem;
}

.container {
  max-width: 1080px;
  margin: 0 auto;
}

.btnBack {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: $text-muted;
  text-decoration: none;
  font-size: 0.9375rem;
  font-weight: 500;
  margin-bottom: 1.5rem;
  transition: color 0.2s;

  svg {
    width: 1.25rem;
    height: 1.25rem;
  }

  &:hover {
    color: $color-primary;
  }
}

.headerSection {
  margin-bottom: 2rem;
}

.headerRow {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
  flex-wrap: wrap;
}

.pageTitle {
  font-size: 2rem;
  font-weight: 800;
  color: $text-dark;
  margin: 0 0 0.5rem 0;
}

.pageSubtitle {
  font-size: 1rem;
  color: $text-muted;
  margin: 0;
}

.filterBar {
  background: #ffffff;
  padding: 1.25rem;
  border-radius: 0.75rem;
  border: 1px solid $border-color;
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 1.25rem;
  margin-bottom: 2rem;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }

  .inputGroup {
    display: flex;
    flex-direction: column;
    gap: 0.375rem;

    label {
      font-size: 0.8125rem;
      font-weight: 600;
      color: #334155;
    }

    .selectInput, .textInput {
      height: 2.625rem;
      padding: 0 0.875rem;
      border: 1px solid $border-color;
      border-radius: 0.5rem;
      font-size: 0.9375rem;
      outline: none;
      background: #ffffff;

      &:focus {
        border-color: $color-primary;
      }
    }
  }
}

.loadingState {
  text-align: center;
  padding: 4rem 0;
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

.errorState {
  text-align: center;
  padding: 3rem 0;
  color: #dc2626;
}

.retryBtn {
  padding: 0.5rem 1.5rem;
  background: $text-dark;
  color: #ffffff;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  font-weight: 500;
  margin-top: 0.5rem;

  &:hover {
    background: #000000;
  }
}

.emptyState {
  text-align: center;
  padding: 4rem 0;
  color: $text-muted;
  font-style: italic;
}

.recipientsGrid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;

  @media (max-width: 680px) {
    grid-template-columns: 1fr;
  }

  .recipientCard {
    background: #ffffff;
    border-radius: 0.875rem;
    padding: 1.5rem;
    border: 1px solid $border-color;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
    display: flex;
    flex-direction: column;

    .cardHeader {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;

      .bloodBadge {
        background-color: #fef2f2;
        color: $color-primary;
        font-weight: 800;
        padding: 0.25rem 0.625rem;
        border-radius: 0.375rem;
        font-size: 0.875rem;
      }

      .urgencyTag {
        font-size: 0.75rem;
        font-weight: 700;
        padding: 0.2rem 0.5rem;
        border-radius: 9999px;
        background-color: #dcfce7;
        color: #166534;
      }
    }

    .recName {
      font-size: 1.25rem;
      font-weight: 700;
      color: $text-dark;
      margin: 0 0 0.375rem 0;
    }

    .recMeta, .recUnits, .recDate {
      font-size: 0.875rem;
      color: $text-muted;
      margin: 0 0 0.375rem 0;
    }

    .btnViewDetails {
      width: 100%;
      margin-top: auto;
      padding: 0.625rem;
      background-color: $color-primary;
      border: none;
      border-radius: 0.5rem;
      color: #ffffff;
      font-weight: 600;
      font-size: 0.875rem;
      cursor: pointer;
      transition: background-color 0.2s;

      &:hover {
        background-color: $color-primary-hover;
      }
    }
  }
}

/* ============================================
   DETAILS MODAL STYLES
   ============================================ */
.modalOverlay {
  position: fixed;
  inset: 0;
  background-color: rgba(15, 23, 42, 0.65);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  z-index: 1000;
}

.modalCard {
  background: #ffffff;
  border-radius: 1rem;
  width: 100%;
  max-width: 520px;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  transform: translateZ(0);

  @media (max-width: 540px) {
    max-height: 95vh;
    border-radius: 0.875rem;
  }
}

.modalHeader {
  background: linear-gradient(135deg, $color-primary 0%, $color-primary-hover 100%);
  color: #ffffff;
  padding: 1.25rem 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  position: relative;
  flex-shrink: 0;

  .headerIcon {
    width: 2.75rem;
    height: 2.75rem;
    background: rgba(255, 255, 255, 0.15);
    border-radius: 0.625rem;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;

    svg {
      width: 1.375rem;
      height: 1.375rem;
    }
  }

  .headerTitles {
    flex: 1;

    h3 {
      margin: 0;
      font-size: 1.125rem;
      font-weight: 700;
      line-height: 1.2;
    }

    p {
      margin: 0.25rem 0 0 0;
      font-size: 0.8125rem;
      color: rgba(255, 255, 255, 0.9);
    }
  }

  .btnClose {
    background: transparent;
    border: none;
    color: #ffffff;
    font-size: 1.75rem;
    line-height: 1;
    cursor: pointer;
    opacity: 0.85;
    padding: 0.25rem;
    transition: opacity 0.2s, transform 0.2s;

    &:hover {
      opacity: 1;
      transform: scale(1.1);
    }
  }
}

/* Details Modal Body */
.modalBody {
  padding: 1.5rem;
  overflow-y: auto;
  flex: 1;
}

.detailsGrid {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.detailItem {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 0;
  border-bottom: 1px solid #f1f5f9;

  &:last-child {
    border-bottom: none;
  }

  .detailLabel {
    font-size: 0.8125rem;
    font-weight: 600;
    color: $text-muted;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .detailValue {
    font-size: 0.9375rem;
    font-weight: 500;
    color: $text-dark;
    text-align: right;
    max-width: 60%;
    word-break: break-word;

    &.bloodTypeBadge {
      display: inline-block;
      padding: 0.25rem 0.75rem;
      background-color: #fef2f2;
      color: $color-primary;
      border-radius: 0.375rem;
      font-weight: 700;
    }

    &.idValue {
      font-size: 0.75rem;
      font-weight: 400;
      color: $text-muted;
      font-family: monospace;
    }
  }
}

.modalActions {
  padding: 1rem 0 0 0;
  border-top: 1px solid $border-color;
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;

  @media (max-width: 540px) {
    padding: 0.875rem 0 0 0;
  }

  .btnCloseModal {
    padding: 0.625rem 1.5rem;
    background: $color-primary;
    border: none;
    border-radius: 0.5rem;
    color: #ffffff;
    font-weight: 600;
    font-size: 0.875rem;
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover {
      background-color: $color-primary-hover;
    }

    @media (max-width: 540px) {
      width: 100%;
    }
  }
}
</style>