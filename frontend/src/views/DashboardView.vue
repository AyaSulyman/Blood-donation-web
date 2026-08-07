<!-- src/views/DashboardView.vue -->

<template>
  <div :class="$style.pageWrapper">
    <!-- Imported Navbar -->
    <AppNavbar />

    <main :class="$style.mainContent">
      <div :class="$style.container">
        
        <!-- Header -->
        <header :class="$style.dashboardHeader">
          <div :class="$style.userMeta">
            <h1 :class="$style.title">My donation history</h1>
            <p :class="$style.subtitle">
              {{ userProfile.bloodType }} · {{ userProfile.city }} · {{ donations.length }} donations
            </p>
          </div>
          
          <button :class="$style.btnLogDonation" @click="openModal">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
            </svg>
            <span>Log donation</span>
          </button>
        </header>

        <!-- Stats Grid -->
        <section :class="$style.statsGrid">
          <div :class="$style.statCard">
            <span :class="$style.statLabel">Total donations</span>
            <span :class="$style.statValue">{{ donations.length }}</span>
          </div>

          <div :class="$style.statCard">
            <span :class="$style.statLabel">Next eligible</span>
            <span :class="$style.statValue">{{ userProfile.nextEligibleDays }} days</span>
          </div>

          <div :class="$style.statCard">
            <span :class="$style.statLabel">Lives helped</span>
            <span :class="$style.statValue">{{ donations.length * 3 }}</span>
          </div>
        </section>

        <!-- Donation History Table -->
        <section :class="$style.tableCard">
          <div :class="$style.tableResponsive">
            <table :class="$style.dataTable">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Location</th>
                  <th>Status</th>
                  <th :class="$style.alignRight">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-if="donations.length === 0">
                  <td colspan="4" :class="$style.emptyState">
                    No donations yet. Start by logging your first donation!
                  </td>
                </tr>
                <tr v-for="item in donations" :key="item.id">
                  <td :class="$style.dateCell">{{ formatDate(item.donationDate || item.date) }}</td>
                  <td :class="$style.locationCell">
                    <div :class="$style.locWrapper">
                      <span :class="$style.locBadge">{{ item.category || 'Hospital' }}</span>
                      <span>{{ item.centerName || item.donationCenter || item.location || 'Unknown' }}</span>
                    </div>
                  </td>
                  <td>
                    <span 
                      :class="[
                        $style.statusBadge, 
                        item.status === 'Completed' ? $style.badgeCompleted : $style.badgeScheduled
                      ]"
                    >
                      {{ item.status || 'Scheduled' }}
                    </span>
                  </td>
                  <td :class="[$style.alignRight, $style.actionIcons]">
                    <!-- View Details Button -->
                    <button 
                      :class="$style.iconBtn" 
                      title="View Details" 
                      @click="viewDonation(item.id)"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        width="20"
                        height="20"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M2.25 12S5.25 5.25 12 5.25 21.75 12 21.75 12 18.75 18.75 12 18.75 2.25 12 2.25 12z"
                        />
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M12 15.75A3.75 3.75 0 1012 8.25a3.75 3.75 0 000 7.5z"
                        />
                      </svg>
                    </button>
                    
                    <!-- Delete Button -->
                    <button 
                      :class="[$style.iconBtn, $style.textDanger]" 
                      title="Delete log" 
                      @click="deleteDonation(item.id)"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" width="20" height="20">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                      </svg>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <!-- Recipients Section -->
        <section :class="$style.recipientsSection">
          <div :class="$style.sectionHeader">
            <h2>All Recipients Needing Help</h2>
            <router-link to="/recipients" :class="$style.linkViewAll">View all recipients →</router-link>
          </div>

          <div :class="$style.recipientsGrid">
            <div v-if="recipientsLoading" :class="$style.loadingState">
              <div :class="$style.spinner"></div>
              <p>Loading recipients...</p>
            </div>
            <div v-else-if="recipientsError" :class="$style.errorState">
              <p>{{ recipientsError }}</p>
              <button :class="$style.retryBtn" @click="loadRecipients">Retry</button>
            </div>
            <div v-else-if="recipients.length === 0" :class="$style.emptyState">
              <p>No recipients found.</p>
            </div>
            <div v-for="recipient in recipients.slice(0, 3)" :key="recipient._id" :class="$style.recipientCard">
              <div :class="$style.recHeader">
                <span :class="$style.bloodBadge">{{ recipient.bloodType }}</span>
                <span :class="$style.urgencyTag">Active</span>
              </div>
              <h3 :class="$style.recName">{{ recipient.patientName }}</h3>
              <p :class="$style.recMeta">🩸 {{ recipient.bloodType }} · {{ recipient.bloodUnits }} Units needed</p>
              <p :class="$style.recUnits">Required: <strong>{{ recipient.bloodUnits }} Unit(s)</strong></p>
              
              <button :class="$style.btnViewDetails" @click="openRecipientDetails(recipient)">
                View Details
              </button>
            </div>
          </div>
        </section>

      </div>
    </main>

    <AppFooter />
  </div>

  <!-- PRO-DESIGN LOG DONATION MODAL -->
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="isModalOpen" :class="$style.modalOverlay" @click.self="closeModal">
        <div :class="$style.modalContainer">
          
          <!-- Banner Header -->
          <div :class="$style.modalBanner">
            <div :class="$style.bannerIcon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
            </div>
            <div>
              <h3 :class="$style.modalTitle">Log New Blood Donation</h3>
              <p :class="$style.modalSub">Record your recent or scheduled donation entry</p>
            </div>
            <button :class="$style.btnClose" @click="closeModal" aria-label="Close modal">&times;</button>
          </div>

          <!-- Form Body -->
          <form @submit.prevent="createDonation" :class="$style.modalBody">
            
            <!-- Category Selector Pills -->
            <div :class="$style.formGroup">
              <label :class="$style.fieldLabel">Donation Center Type</label>
              <div :class="$style.pillSelector">
                <button 
                  type="button" 
                  v-for="cat in categories" 
                  :key="cat"
                  :class="[$style.pillBtn, newDonation.category === cat ? $style.pillActive : '']"
                  @click="newDonation.category = cat"
                >
                  {{ cat }}
                </button>
              </div>
            </div>

            <!-- Center Selection Dropdown -->
            <div :class="$style.formGroup">
              <label for="center" :class="$style.fieldLabel">Hospital / Center</label>
              <div :class="$style.inputWithIcon">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
                <select 
                  id="center" 
                  v-model="newDonation.centerId" 
                  required 
                  :class="$style.formInput"
                  :disabled="centersLoading"
                >
                  <option value="" disabled>Select a donation center</option>
                  <option v-for="center in centers" :key="center._id" :value="center._id">
                    {{ center.name }} - {{ center.city }}
                  </option>
                </select>
              </div>
              <div v-if="centersLoading" :class="$style.loadingText">Loading centers...</div>
              <div v-else-if="centersError" :class="$style.errorText">{{ centersError }}</div>
            </div>

            <!-- Grid Row: Date & Units -->
            <div :class="$style.formRow">
              <div :class="$style.formGroup">
                <label for="date" :class="$style.fieldLabel">Donation Date</label>
                <input 
                  id="date" 
                  v-model="newDonation.date" 
                  type="date" 
                  required 
                  :class="$style.formInput" 
                />
              </div>

              <div :class="$style.formGroup">
                <label for="units" :class="$style.fieldLabel">Pints / Units</label>
                <select id="units" v-model="newDonation.units" :class="$style.formInput">
                  <option :value="1">1 Unit (450 ml)</option>
                  <option :value="2">2 Units (Double Red)</option>
                </select>
              </div>
            </div>

            <!-- Status Switcher -->
            <div :class="$style.formGroup">
              <label :class="$style.fieldLabel">Donation Status</label>
              <div :class="$style.statusRadioGroup">
                <label :class="[$style.radioCard, newDonation.status === 'Completed' ? $style.radioSelected : '']">
                  <input type="radio" value="Completed" v-model="newDonation.status" hidden />
                  <span :class="[$style.dot, $style.dotCompleted]"></span>
                  <div>
                    <strong>Completed</strong>
                    <small>Donation already fulfilled</small>
                  </div>
                </label>

                <label :class="[$style.radioCard, newDonation.status === 'Scheduled' ? $style.radioSelected : '']">
                  <input type="radio" value="Scheduled" v-model="newDonation.status" hidden />
                  <span :class="[$style.dot, $style.dotScheduled]"></span>
                  <div>
                    <strong>Scheduled</strong>
                    <small>Upcoming appointment</small>
                  </div>
                </label>
              </div>
            </div>

            <!-- Actions -->
            <div :class="$style.modalFooter">
              <button type="button" :class="$style.btnCancel" @click="closeModal">Cancel</button>
              <button type="submit" :class="$style.btnSubmit" :disabled="isSubmitting || centersLoading">
                {{ isSubmitting ? 'Saving...' : 'Save Donation Entry' }}
              </button>
            </div>
          </form>

        </div>
      </div>
    </Transition>
  </Teleport>

  <!-- RECIPIENT DETAILS MODAL -->
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="isRecipientModalOpen && selectedRecipient" :class="$style.modalOverlay" @click.self="closeRecipientDetails">
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
            <button :class="$style.btnClose" @click="closeRecipientDetails" aria-label="Close Modal">&times;</button>
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
              <button type="button" :class="$style.btnCloseModal" @click="closeRecipientDetails">
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import AppFooter from "@/components/AppFooter.vue";
import AppNavbar from "@/components/AppNavbar.vue";
import {
  getDonations,
  createDonation as createDonationApi,
  getDonationDetails,
} from "@/services/donation";
import { fetchCenters } from "@/services/center.service";
import { fetchAllRecipients } from "@/services/recipient.service";
import type { DonationCenter } from "@/services/center.service";
import type { BloodRecipient } from "@/services/recipient.service";

const router = useRouter();

// User profile data
const userProfile = ref({
  bloodType: "O+",
  city: "Beirut",
  nextEligibleDays: 14
});

// Donations data - fetched from API
const donations = ref<any[]>([]);

// Centers data - fetched from API
const centers = ref<DonationCenter[]>([]);
const centersLoading = ref(false);
const centersError = ref<string | null>(null);

// Recipients data - fetched from API
const recipients = ref<BloodRecipient[]>([]);
const recipientsLoading = ref(false);
const recipientsError = ref<string | null>(null);

// Modal state
const isModalOpen = ref(false);
const isSubmitting = ref(false);
const categories = ["Hospital", "Clinic", "Blood Bank", "Mobile Drive"];

const newDonation = ref({
  category: "Hospital",
  centerId: "",
  date: "",
  units: 1,
  status: "Completed"
});

// Recipient Details Modal state
const isRecipientModalOpen = ref(false);
const selectedRecipient = ref<BloodRecipient | null>(null);

// Helper function to format date
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

// Load centers from API
const loadCenters = async () => {
  centersLoading.value = true;
  centersError.value = null;
  
  try {
    console.log('📥 Loading centers...');
    const data = await fetchCenters();
    centers.value = data;
    console.log('✅ Centers loaded:', data.length);
  } catch (err: any) {
    console.error("❌ Failed to load centers:", err);
    centersError.value = err.response?.data?.message || 'Failed to load centers.';
    centers.value = [];
  } finally {
    centersLoading.value = false;
  }
};

// Load recipients from API
const loadRecipients = async () => {
  recipientsLoading.value = true;
  recipientsError.value = null;
  
  try {
    console.log('📥 Loading recipients...');
    const data = await fetchAllRecipients();
    recipients.value = data;
    console.log('✅ Recipients loaded:', data.length);
  } catch (err: any) {
    console.error("❌ Failed to load recipients:", err);
    recipientsError.value = err.response?.data?.message || 'Failed to load recipients.';
    recipients.value = [];
  } finally {
    recipientsLoading.value = false;
  }
};

// Modal functions
const openModal = () => {
  isModalOpen.value = true;
  // Set default date to today
  const today = new Date().toISOString().split('T')[0];
  newDonation.value.date = today;
  // Set default center if available
  if (centers.value.length > 0) {
    newDonation.value.centerId = centers.value[0]._id;
  }
};

const closeModal = () => {
  isModalOpen.value = false;
  isSubmitting.value = false;
  // Reset form
  newDonation.value = {
    category: "Hospital",
    centerId: "",
    date: "",
    units: 1,
    status: "Completed"
  };
};

// Recipient Details Modal functions
const openRecipientDetails = (recipient: BloodRecipient) => {
  selectedRecipient.value = recipient;
  isRecipientModalOpen.value = true;
};

const closeRecipientDetails = () => {
  isRecipientModalOpen.value = false;
  selectedRecipient.value = null;
};

// Load donations from API
const loadDonations = async () => {
  try {
    console.log('📥 Loading donations...');
    const data = await getDonations();
    console.log('✅ Donations loaded:', data);
    
    if (Array.isArray(data)) {
      donations.value = data.map((item: any) => ({
        id: item.id,
        date: item.donationDate || item.date,
        donationDate: item.donationDate,
        location: item.centerName || item.donationCenter || item.location,
        centerName: item.centerName,
        category: item.category || 'Hospital',
        status: item.status || 'Scheduled',
        units: item.units || 1,
        ...item
      }));
    } else {
      donations.value = [];
    }
  } catch (err: any) {
    console.error("❌ Failed to load donations:", err);
    if (err.response?.status === 401) {
      console.log('🔒 Unauthorized - redirecting to login');
    } else {
      alert('Failed to load donations. Please try again.');
    }
    donations.value = [];
  }
};

// Create donation via API
const createDonation = async () => {
  if (!newDonation.value.centerId || !newDonation.value.date) {
    alert('Please select a center and date.');
    return;
  }

  isSubmitting.value = true;
  
  try {
    console.log('📝 Creating donation...');
    
    const payload = {
      centerId: newDonation.value.centerId,
      donationDate: newDonation.value.date,
      units: newDonation.value.units,
    };
    
    console.log('📦 Payload:', payload);
    
    const response = await createDonationApi(payload);
    console.log('✅ Donation created successfully:', response);

    await loadDonations();
    closeModal();
  } catch (err: any) {
    console.error("❌ Failed to create donation:", err);
    const errorMessage = err.response?.data?.message || err.message || 'Failed to create donation. Please try again.';
    alert(errorMessage);
  } finally {
    isSubmitting.value = false;
  }
};

// View donation details
const viewDonation = async (id: string) => {
  try {
    console.log('👁️ Viewing donation:', id);
    router.push(`/donations/${id}`);
  } catch (err) {
    console.error("❌ Failed to view donation:", err);
    alert('Failed to load donation details.');
  }
};

// Delete donation
const deleteDonation = (id: string) => {
  if (confirm("Are you sure you want to delete this donation?")) {
    donations.value = donations.value.filter(item => item.id !== id);
  }
};

// Load data on mount
onMounted(() => {
  console.log('🚀 Dashboard mounted, loading data...');
  loadDonations();
  loadCenters();
  loadRecipients();
});
</script>

<style module lang="scss">
$color-primary: #b91c1c;
$color-primary-hover: #991b1b;
$bg-pink-stat: #fce8e6;
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
  padding: 3rem 1.5rem 5rem;
}

.container {
  max-width: 1080px;
  margin: 0 auto;
}

/* Dashboard Header */
.dashboardHeader {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;

  .title {
    font-size: 2.25rem;
    font-weight: 800;
    color: $text-dark;
    margin: 0 0 0.25rem 0;
  }

  .subtitle {
    font-size: 1rem;
    color: $text-muted;
    margin: 0;
  }

  .btnLogDonation {
    background-color: $color-primary;
    color: #ffffff;
    border: none;
    border-radius: 0.5rem;
    padding: 0.625rem 1.25rem;
    font-size: 0.9375rem;
    font-weight: 600;
    display: inline-flex;
    align-items: center;
    gap: 0.375rem;
    cursor: pointer;
    transition: background-color 0.2s ease;

    svg {
      width: 1.25rem;
      height: 1.25rem;
    }

    &:hover {
      background-color: $color-primary-hover;
    }
  }
}

/* Stats */
.statsGrid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }

  .statCard {
    background-color: $bg-pink-stat;
    border-radius: 0.875rem;
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;

    .statLabel {
      font-size: 0.9375rem;
      color: #991b1b;
      font-weight: 500;
    }

    .statValue {
      font-size: 2.25rem;
      font-weight: 800;
      color: #7f1d1d;
      line-height: 1;
    }
  }
}

/* History Table */
.tableCard {
  background: #ffffff;
  border-radius: 0.875rem;
  border: 1px solid $border-color;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
  overflow: hidden;
  margin-bottom: 3rem;

  .tableResponsive {
    overflow-x: auto;
  }

  .dataTable {
    width: 100%;
    border-collapse: collapse;
    text-align: left;

    th, td {
      padding: 1.125rem 1.5rem;
      border-bottom: 1px solid $border-color;
    }

    th {
      font-size: 0.875rem;
      font-weight: 600;
      color: $text-muted;
      background-color: #ffffff;
    }

    .dateCell {
      font-weight: 500;
      color: $text-dark;
    }

    .emptyState {
      text-align: center;
      padding: 2rem 1.5rem;
      color: $text-muted;
      font-style: italic;
    }

    .locWrapper {
      display: flex;
      align-items: center;
      gap: 0.5rem;

      .locBadge {
        background-color: #f1f5f9;
        color: #475569;
        font-size: 0.75rem;
        font-weight: 600;
        padding: 0.15rem 0.5rem;
        border-radius: 0.25rem;
      }
    }

    .alignRight {
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

    .actionIcons {
      display: flex;
      justify-content: flex-end;
      gap: 0.25rem;

      .iconBtn {
        background: transparent;
        border: none;
        cursor: pointer;
        padding: 0.25rem;
        color: #64748b;
        transition: color 0.2s ease;

        svg {
          width: 1.25rem;
          height: 1.25rem;
        }

        &:hover {
          color: #1e293b;
        }

        &.textDanger:hover {
          color: #dc2626;
        }
      }
    }
  }
}

/* Recipients Section */
.recipientsSection {
  margin-top: 2rem;

  .sectionHeader {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.25rem;

    h2 {
      font-size: 1.375rem;
      font-weight: 700;
      color: $text-dark;
      margin: 0;
    }

    .linkViewAll {
      color: $color-primary;
      text-decoration: none;
      font-weight: 600;
      font-size: 0.9375rem;

      &:hover {
        text-decoration: underline;
      }
    }
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

      .recHeader {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 0.875rem;

        .bloodBadge {
          background-color: #fef2f2;
          color: $color-primary;
          font-weight: 800;
          padding: 0.25rem 0.625rem;
          border-radius: 0.375rem;
          font-size: 0.875rem;
        }

        .urgencyTag {
          background-color: #dcfce7;
          color: #166534;
          font-size: 0.75rem;
          font-weight: 700;
          padding: 0.2rem 0.5rem;
          border-radius: 9999px;
        }
      }

      .recName {
        font-size: 1.125rem;
        font-weight: 700;
        color: $text-dark;
        margin: 0 0 0.375rem 0;
      }

      .recMeta, .recUnits {
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
}

.loadingState {
  grid-column: 1 / -1;
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

.errorState {
  grid-column: 1 / -1;
  text-align: center;
  padding: 2rem 0;
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
  grid-column: 1 / -1;
  text-align: center;
  padding: 3rem 0;
  color: $text-muted;
  font-style: italic;
}

/* Modal Overlay & Styling */
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

.modalContainer {
  background: #ffffff;
  border-radius: 1.25rem;
  width: 100%;
  max-width: 520px;
  overflow: hidden;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}

.modalBanner {
  background: linear-gradient(135deg, #b91c1c 0%, #991b1b 100%);
  padding: 1.5rem;
  color: #ffffff;
  display: flex;
  align-items: center;
  gap: 1rem;
  position: relative;

  .bannerIcon {
    width: 2.75rem;
    height: 2.75rem;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 0.75rem;
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
      width: 1.5rem;
      height: 1.5rem;
    }
  }

  .modalTitle {
    font-size: 1.25rem;
    font-weight: 700;
    margin: 0;
  }

  .modalSub {
    font-size: 0.875rem;
    margin: 0.125rem 0 0 0;
    opacity: 0.9;
  }

  .btnClose {
    position: absolute;
    top: 1rem;
    right: 1.25rem;
    background: transparent;
    border: none;
    color: #ffffff;
    font-size: 1.75rem;
    cursor: pointer;
    opacity: 0.8;

    &:hover {
      opacity: 1;
    }
  }
}

.modalBody {
  padding: 1.75rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;

  .fieldLabel {
    font-size: 0.8125rem;
    font-weight: 700;
    color: #334155;
    text-transform: uppercase;
    letter-spacing: 0.03em;
    margin-bottom: 0.5rem;
    display: block;
  }

  .pillSelector {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;

    .pillBtn {
      background: #f1f5f9;
      border: 1px solid transparent;
      padding: 0.4rem 0.875rem;
      border-radius: 9999px;
      font-size: 0.8125rem;
      font-weight: 600;
      color: #475569;
      cursor: pointer;
      transition: all 0.2s;

      &:hover {
        background: #e2e8f0;
      }

      &.pillActive {
        background: #fef2f2;
        border-color: #fecaca;
        color: $color-primary;
      }
    }
  }

  .inputWithIcon {
    position: relative;
    display: flex;
    align-items: center;

    svg {
      position: absolute;
      left: 0.875rem;
      width: 1.25rem;
      height: 1.25rem;
      color: $text-muted;
    }

    .formInput {
      padding-left: 2.75rem;
    }
  }

  .formInput {
    width: 100%;
    height: 2.75rem;
    padding: 0 0.875rem;
    border: 1px solid $border-color;
    border-radius: 0.625rem;
    font-size: 0.9375rem;
    outline: none;
    background-color: #ffffff;

    &:focus {
      border-color: $color-primary;
      box-shadow: 0 0 0 3px rgba(185, 28, 28, 0.1);
    }

    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
  }

  .loadingText {
    font-size: 0.75rem;
    color: $text-muted;
    margin-top: 0.25rem;
  }

  .errorText {
    font-size: 0.75rem;
    color: #dc2626;
    margin-top: 0.25rem;
  }

  .formRow {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }

  .statusRadioGroup {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.75rem;

    .radioCard {
      border: 1px solid $border-color;
      border-radius: 0.625rem;
      padding: 0.75rem;
      display: flex;
      align-items: center;
      gap: 0.75rem;
      cursor: pointer;
      transition: all 0.2s;

      strong {
        display: block;
        font-size: 0.875rem;
        color: $text-dark;
      }

      small {
        display: block;
        font-size: 0.75rem;
        color: $text-muted;
      }

      .dot {
        width: 0.75rem;
        height: 0.75rem;
        border-radius: 50%;
        flex-shrink: 0;

        &.dotCompleted {
          background-color: #22c55e;
        }

        &.dotScheduled {
          background-color: #f59e0b;
        }
      }

      &.radioSelected {
        border-color: $color-primary;
        background-color: #fef2f2;
      }
    }
  }

  .modalFooter {
    display: flex;
    justify-content: flex-end;
    gap: 0.75rem;
    margin-top: 0.5rem;
    padding-top: 1rem;
    border-top: 1px solid $border-color;

    .btnCancel {
      height: 2.75rem;
      padding: 0 1.25rem;
      background: #ffffff;
      border: 1px solid $border-color;
      border-radius: 0.625rem;
      color: $text-dark;
      font-weight: 600;
      cursor: pointer;

      &:hover {
        background: #f8fafc;
      }
    }

    .btnSubmit {
      height: 2.75rem;
      padding: 0 1.5rem;
      background: $color-primary;
      border: none;
      border-radius: 0.625rem;
      color: #ffffff;
      font-weight: 600;
      cursor: pointer;
      transition: background-color 0.2s;

      &:hover:not(:disabled) {
        background: $color-primary-hover;
      }

      &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
      }
    }
  }
}

/* Recipient Details Modal */
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