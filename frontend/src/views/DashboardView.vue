<template>
  <div :class="$style.pageWrapper">
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
                <tr v-for="item in donations" :key="item.id">
                  <td :class="$style.dateCell">{{ item.date }}</td>
                  <td :class="$style.locationCell">
                    <div :class="$style.locWrapper">
                      <span :class="$style.locBadge">{{ item.category || 'Hospital' }}</span>
                      <span>{{ item.location }}</span>
                    </div>
                  </td>
                  <td>
                    <span 
                      :class="[
                        $style.statusBadge, 
                        item.status === 'Completed' ? $style.badgeCompleted : $style.badgeScheduled
                      ]"
                    >
                      {{ item.status }}
                    </span>
                  </td>
                  <td :class="[$style.alignRight, $style.actionIcons]">
                    <button :class="[$style.iconBtn, $style.textDanger]" title="Delete log" @click="deleteDonation(item.id)">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
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
            <h2>Matching Recipients Needing Help</h2>
            <router-link to="/recipients" :class="$style.linkViewAll">View all recipients →</router-link>
          </div>

          <div :class="$style.recipientsGrid">
            <div v-for="recipient in matchingRecipients" :key="recipient.id" :class="$style.recipientCard">
              <div :class="$style.recHeader">
                <span :class="$style.bloodBadge">{{ recipient.bloodType }}</span>
                <span :class="$style.urgencyTag">{{ recipient.urgency }}</span>
              </div>
              <h3 :class="$style.recName">{{ recipient.name }}</h3>
              <p :class="$style.recMeta">📍 {{ recipient.hospital }}, {{ recipient.city }}</p>
              <p :class="$style.recUnits">Units needed: <strong>{{ recipient.units }} Unit(s)</strong></p>
              
              <button :class="$style.btnRespond" @click="respondToRequest(recipient)">
                Respond to Request
              </button>
            </div>
          </div>
        </section>

      </div>
    </main>

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

              <!-- Location Input -->
              <div :class="$style.formGroup">
                <label for="location" :class="$style.fieldLabel">Hospital / Center Name</label>
                <div :class="$style.inputWithIcon">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                  <input 
                    id="location" 
                    v-model="newDonation.location" 
                    type="text" 
                    placeholder="e.g. Beirut Red Cross or AUBMC" 
                    required 
                    :class="$style.formInput" 
                  />
                </div>
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
                <button type="submit" :class="$style.btnSubmit">
                  Save Donation Entry
                </button>
              </div>
            </form>

          </div>
        </div>
      </Transition>
    </Teleport>

    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import AppNavbar from '@/components/AppNavbar.vue';
import AppFooter from '@/components/AppFooter.vue';

interface Donation {
  id: number;
  date: string;
  location: string;
  category: string;
  units: number;
  status: 'Completed' | 'Scheduled';
}

interface Recipient {
  id: number;
  name: string;
  bloodType: string;
  city: string;
  hospital: string;
  units: number;
  urgency: string;
}

const categories = ['Red Cross', 'Hospital', 'Mobile Drive', 'Private Clinic'];

const userProfile = ref({
  bloodType: 'O+',
  city: 'Beirut',
  nextEligibleDays: 12,
});

const donations = ref<Donation[]>([
  { id: 1, date: 'Jun 14, 2026', location: 'Beirut Red Cross', category: 'Red Cross', units: 1, status: 'Completed' },
  { id: 2, date: 'Mar 2, 2026', location: 'AUBMC', category: 'Hospital', units: 1, status: 'Completed' },
  { id: 3, date: 'Sep 30, 2026', location: 'Sidon Clinic', category: 'Private Clinic', units: 1, status: 'Scheduled' },
]);

const matchingRecipients = ref<Recipient[]>([
  { id: 101, name: 'Hadi Sleiman', bloodType: 'O+', city: 'Beirut', hospital: 'AUBMC', units: 2, urgency: 'Critical' },
  { id: 102, name: 'Nour El Hage', bloodType: 'O+', city: 'Sidon', hospital: 'Labib Medical Center', units: 1, urgency: 'High' },
]);

// Modal State Management
const isModalOpen = ref(false);
const newDonation = ref({
  category: 'Red Cross',
  location: '',
  date: new Date().toISOString().split('T')[0],
  units: 1,
  status: 'Completed' as 'Completed' | 'Scheduled',
});

const openModal = () => {
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
  newDonation.value = {
    category: 'Red Cross',
    location: '',
    date: new Date().toISOString().split('T')[0],
    units: 1,
    status: 'Completed',
  };
};

const createDonation = () => {
  const formattedDate = new Date(newDonation.value.date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  donations.value.unshift({
    id: Date.now(),
    category: newDonation.value.category,
    location: newDonation.value.location,
    date: formattedDate,
    units: newDonation.value.units,
    status: newDonation.value.status
  });

  closeModal();
};

const deleteDonation = (id: number) => {
  if (confirm('Are you sure you want to remove this log?')) {
    donations.value = donations.value.filter(d => d.id !== id);
  }
};

// Response logic auto-fills modal and triggers it to open
const respondToRequest = (recipient: Recipient) => {
  newDonation.value = {
    category: 'Hospital',
    location: `${recipient.hospital} (${recipient.name})`,
    date: new Date().toISOString().split('T')[0],
    units: recipient.units,
    status: 'Scheduled',
  };
  isModalOpen.value = true;
};
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
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
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

      .iconBtn {
        background: transparent;
        border: none;
        cursor: pointer;
        padding: 0.25rem;
        color: #64748b;

        svg {
          width: 1.25rem;
          height: 1.25rem;
        }

        &.textDanger:hover {
          color: #dc2626;
        }
      }
    }
  }
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

      &:hover {
        background: $color-primary-hover;
      }
    }
  }
}

/* Recipients Section */
.recipientsSection {
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
          background-color: #fee2e2;
          color: #991b1b;
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
        margin: 0 0 0.5rem 0;
      }

      .btnRespond {
        width: 100%;
        margin-top: 1rem;
        padding: 0.625rem;
        background-color: #ffffff;
        border: 1px solid #cbd5e1;
        border-radius: 0.5rem;
        color: $text-dark;
        font-weight: 600;
        font-size: 0.875rem;
        cursor: pointer;

        &:hover {
          background-color: $color-primary;
          border-color: $color-primary;
          color: #ffffff;
        }
      }
    }
  }
}
</style>