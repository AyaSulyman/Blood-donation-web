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
          <h1 :class="$style.pageTitle">Blood Recipients Needing Help</h1>
          <p :class="$style.pageSubtitle">
            Browse verified emergency blood requests from hospitals and medical centers across Lebanon.
          </p>
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
            <label>City or Hospital</label>
            <input 
              v-model="searchQuery" 
              type="text" 
              placeholder="e.g. Beirut or AUBMC..." 
              :class="$style.textInput" 
            />
          </div>
        </div>

        <!-- Recipients Grid -->
        <div :class="$style.recipientsGrid">
          <div 
            v-for="recipient in filteredRecipients" 
            :key="recipient.id" 
            :class="$style.recipientCard"
          >
            <div :class="$style.cardHeader">
              <span :class="$style.bloodBadge">{{ recipient.bloodType }}</span>
              <span 
                :class="[
                  $style.urgencyTag, 
                  recipient.urgency === 'Critical' ? $style.critical : $style.high
                ]"
              >
                {{ recipient.urgency }}
              </span>
            </div>

            <h3 :class="$style.recName">{{ recipient.name }}</h3>
            <p :class="$style.recMeta">🏥 {{ recipient.hospital }}, {{ recipient.city }}</p>
            <p :class="$style.recUnits">Required: <strong>{{ recipient.units }} Unit(s)</strong></p>
            <p :class="$style.recNotes" v-if="recipient.notes">"{{ recipient.notes }}"</p>

            <button :class="$style.btnRespond" @click="openDonationForm(recipient)">
              Donate for {{ recipient.name.split(' ')[0] }}
            </button>
          </div>
        </div>
      </div>
    </main>

    <!-- ENHANCED DONATION FORM MODAL -->
    <Teleport to="body">
      <Transition name="modal-fade">
        <div v-if="isModalOpen && selectedRecipient" :class="$style.modalOverlay" @click.self="closeDonationForm">
          <div :class="$style.modalCard">
            <!-- Modal Header -->
            <div :class="$style.modalHeader">
              <div :class="$style.headerIcon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
              </div>
              <div :class="$style.headerTitles">
                <h3>Pledge Blood Donation</h3>
                <p>For {{ selectedRecipient.name }} ({{ selectedRecipient.bloodType }})</p>
              </div>
              <button :class="$style.btnClose" @click="closeDonationForm" aria-label="Close Modal">&times;</button>
            </div>

            <!-- Modal Content & Form -->
            <form @submit.prevent="submitDonation" :class="$style.modalForm">
              <div :class="$style.modalScrollArea">
                <!-- Overview Info Card -->
                <div :class="$style.summaryCard">
                  <div :class="$style.summaryRow">
                    <span :class="$style.summaryLabel">Hospital Target:</span>
                    <span :class="$style.summaryValue">{{ selectedRecipient.hospital }} ({{ selectedRecipient.city }})</span>
                  </div>
                  <div :class="$style.summaryRow">
                    <span :class="$style.summaryLabel">Blood Needed:</span>
                    <span :class="$style.summaryBadge">{{ selectedRecipient.bloodType }} — {{ selectedRecipient.units }} Unit(s)</span>
                  </div>
                </div>

                <!-- Input Fields -->
                <div :class="$style.formField">
                  <label for="donorName">Full Name <span :class="$style.required">*</span></label>
                  <input id="donorName" v-model="form.donorName" type="text" placeholder="e.g. Aya Sulyman" required :class="$style.input" />
                </div>

                <div :class="$style.formField">
                  <label for="donorPhone">Phone Number <span :class="$style.required">*</span></label>
                  <input id="donorPhone" v-model="form.donorPhone" type="tel" placeholder="+961 70 000 000" required :class="$style.input" />
                </div>

                <div :class="$style.formRow">
                  <div :class="$style.formField">
                    <label for="pledgedUnits">Units to Donate</label>
                    <select id="pledgedUnits" v-model="form.unitsPledged" :class="$style.input">
                      <option :value="1">1 Unit (450 ml)</option>
                      <option :value="2">2 Units</option>
                    </select>
                  </div>

                  <div :class="$style.formField">
                    <label for="targetDate">Intended Date <span :class="$style.required">*</span></label>
                    <input id="targetDate" v-model="form.targetDate" type="date" required :class="$style.input" />
                  </div>
                </div>

                <div :class="$style.formField">
                  <label for="notes">Notes for Hospital / Family</label>
                  <textarea id="notes" v-model="form.notes" rows="3" placeholder="e.g. Available tomorrow morning after 9 AM..." :class="$style.textarea"></textarea>
                </div>
              </div>

              <!-- Fixed Form Footer Controls -->
              <div :class="$style.modalActions">
                <button type="button" :class="$style.btnCancel" @click="closeDonationForm">Cancel</button>
                <button type="submit" :class="$style.btnSubmit">Confirm Pledge</button>
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
import { ref, computed } from 'vue';
import AppNavbar from '@/components/AppNavbar.vue';
import AppFooter from '@/components/AppFooter.vue';

interface Recipient {
  id: number;
  name: string;
  bloodType: string;
  city: string;
  hospital: string;
  units: number;
  urgency: 'Critical' | 'High' | 'Normal';
  notes?: string;
}

const selectedType = ref('Any');
const searchQuery = ref('');

const recipients = ref<Recipient[]>([
  { id: 101, name: 'Hadi Sleiman', bloodType: 'O+', city: 'Beirut', hospital: 'AUBMC', units: 2, urgency: 'Critical', notes: 'Needed urgently for surgery tomorrow morning.' },
  { id: 102, name: 'Nour El Hage', bloodType: 'O+', city: 'Sidon', hospital: 'Labib Medical Center', units: 1, urgency: 'High', notes: 'Post-trauma recovery.' },
  { id: 103, name: 'Maya Khoury', bloodType: 'A-', city: 'Byblos', hospital: 'Notre Dame des Secours', units: 3, urgency: 'Critical', notes: 'Emergency ICU requirement.' },
  { id: 104, name: 'Tarek Ziad', bloodType: 'B+', city: 'Beirut', hospital: 'Hotel Dieu de France', units: 2, urgency: 'High', notes: 'Scheduled treatment.' },
  { id: 105, name: 'Youssef Ali', bloodType: 'AB+', city: 'Tyre', hospital: 'Hiram Hospital', units: 1, urgency: 'Normal', notes: 'Routine transfusion.' },
]);

const filteredRecipients = computed(() => {
  return recipients.value.filter(item => {
    const matchesType = selectedType.value === 'Any' || item.bloodType === selectedType.value;
    const matchesSearch = item.city.toLowerCase().includes(searchQuery.value.toLowerCase()) || 
                          item.hospital.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                          item.name.toLowerCase().includes(searchQuery.value.toLowerCase());
    return matchesType && matchesSearch;
  });
});

/* Modal Form State Logic */
const isModalOpen = ref(false);
const selectedRecipient = ref<Recipient | null>(null);

const form = ref({
  donorName: '',
  donorPhone: '',
  unitsPledged: 1,
  targetDate: new Date().toISOString().split('T')[0],
  notes: ''
});

const openDonationForm = (recipient: Recipient) => {
  selectedRecipient.value = recipient;
  isModalOpen.value = true;
};

const closeDonationForm = () => {
  isModalOpen.value = false;
  selectedRecipient.value = null;
  form.value = {
    donorName: '',
    donorPhone: '',
    unitsPledged: 1,
    targetDate: new Date().toISOString().split('T')[0],
    notes: ''
  };
};

const submitDonation = () => {
  if (!selectedRecipient.value) return;
  alert(`Thank you, ${form.value.donorName}! Your pledge to donate blood for ${selectedRecipient.value.name} at ${selectedRecipient.value.hospital} has been registered.`);
  closeDonationForm();
};
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

        &.critical {
          background-color: #fee2e2;
          color: #991b1b;
        }

        &.high {
          background-color: #fef3c7;
          color: #92400e;
        }
      }
    }

    .recName {
      font-size: 1.25rem;
      font-weight: 700;
      color: $text-dark;
      margin: 0 0 0.375rem 0;
    }

    .recMeta, .recUnits {
      font-size: 0.875rem;
      color: $text-muted;
      margin: 0 0 0.375rem 0;
    }

    .recNotes {
      font-size: 0.875rem;
      font-style: italic;
      color: #475569;
      background-color: #f8fafc;
      padding: 0.625rem;
      border-radius: 0.375rem;
      margin: 0.5rem 0 1rem 0;
    }

    .btnRespond {
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

/* ==========================================================================
   FORM DESIGN & RESPONSIVE MODAL STYLES
   ========================================================================== */

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

.modalForm {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  flex: 1;
}

.modalScrollArea {
  padding: 1.5rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;

  @media (max-width: 540px) {
    padding: 1.125rem;
    gap: 1rem;
  }
}

/* Summary Box */
.summaryCard {
  background-color: #fef2f2;
  border: 1px dashed #fca5a5;
  border-radius: 0.625rem;
  padding: 0.875rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  .summaryRow {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.8125rem;

    .summaryLabel {
      color: #64748b;
    }

    .summaryValue {
      font-weight: 600;
      color: $text-dark;
    }

    .summaryBadge {
      font-weight: 700;
      color: $color-primary;
    }
  }
}

/* Form Group Controls */
.formField {
  display: flex;
  flex-direction: column;
  gap: 0.375rem;

  label {
    font-size: 0.8125rem;
    font-weight: 600;
    color: #334155;

    .required {
      color: $color-primary;
    }
  }

  .input, .textarea {
    width: 100%;
    padding: 0.625rem 0.875rem;
    border: 1px solid $border-color;
    border-radius: 0.5rem;
    font-size: 0.9375rem;
    color: $text-dark;
    background-color: #ffffff;
    outline: none;
    font-family: inherit;
    transition: border-color 0.2s, box-shadow 0.2s;

    @media (max-width: 540px) {
      min-height: 2.75rem; /* Better touch target for mobile */
    }

    &::placeholder {
      color: #94a3b8;
    }

    &:focus {
      border-color: $color-primary;
      box-shadow: 0 0 0 3px rgba(185, 28, 28, 0.12);
    }
  }

  .textarea {
    resize: vertical;
    min-height: 80px;
  }
}

/* Responsive Grid Form Layout */
.formRow {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;

  @media (max-width: 540px) {
    grid-template-columns: 1fr; /* Mobile collapse */
    gap: 1rem;
  }
}

/* Modal Bottom Actions */
.modalActions {
  padding: 1rem 1.5rem;
  background-color: #f8fafc;
  border-top: 1px solid $border-color;
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
  flex-shrink: 0;

  @media (max-width: 540px) {
    padding: 0.875rem 1.125rem;
  }

  .btnCancel {
    padding: 0.625rem 1.25rem;
    background: #ffffff;
    border: 1px solid $border-color;
    border-radius: 0.5rem;
    color: #475569;
    font-weight: 600;
    font-size: 0.875rem;
    cursor: pointer;
    transition: background-color 0.2s, color 0.2s;

    &:hover {
      background-color: #f1f5f9;
      color: $text-dark;
    }

    @media (max-width: 540px) {
      flex: 1;
    }
  }

  .btnSubmit {
    padding: 0.625rem 1.25rem;
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

    @media (max-width: 540px) {
      flex: 2;
    }
  }
}
</style>