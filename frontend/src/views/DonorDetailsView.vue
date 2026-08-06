<template>
  <div :class="$style.pageWrapper">
    <AppNavbar />

    <main :class="$style.mainContent">
      <div :class="$style.container">

        <router-link to="/donate" :class="$style.btnBack">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd"
              d="M17 10a.75.75 0 01-.75.75H5.612l4.158 3.96a.75.75 0 11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 111.04 1.08L5.612 9.25H16.25A.75.75 0 0117 10z"
              clip-rule="evenodd" />
          </svg>
          <span>Back to Donors</span>
        </router-link>


        <div v-if="loading">
          Loading donor...
        </div>


        <div v-else-if="error">
          {{ error }}
        </div>


        <div v-else-if="donor" :class="$style.profileGrid">

          <!-- Main Profile Card -->
          <div :class="$style.mainCard">

            <div :class="$style.profileHeader">

              <div :class="$style.bloodBadge">
                {{ donor.bloodType }}
              </div>


              <div :class="$style.headerInfo">

                <div :class="$style.nameRow">
                  <h1 :class="$style.donorName">
                    {{ donor.name }}
                  </h1>

                  <span :class="$style.badgeVerified">
                    Verified Donor
                  </span>
                </div>


                <p :class="$style.location">
                  📍 {{ donor.city }}, Lebanon
                </p>

              </div>

            </div>


            <hr :class="$style.divider" />


            <!-- Stats -->
            <div :class="$style.statsBar">

              <div :class="$style.statItem">
                <span :class="$style.statLabel">
                  Blood Type
                </span>

                <span :class="$style.statValue">
                  {{ donor.bloodType }}
                </span>
              </div>


              <div :class="$style.statItem">
                <span :class="$style.statLabel">
                  Last Donation
                </span>

                <span :class="$style.statValue">
                  {{ donor.lastDonated }}
                </span>
              </div>


              <div :class="$style.statItem">
                <span :class="$style.statLabel">
                  Availability
                </span>

                <span :class="[$style.statValue, $style.textSuccess]">
                  Ready to donate
                </span>
              </div>

            </div>



            <div :class="$style.section">

              <h3>
                About the Donor
              </h3>


              <p :class="$style.bioText">

                {{ donor.name }} is a verified blood donor
                from {{ donor.city }}.
                The donor's last donation was
                {{ donor.lastDonated }}.

              </p>

            </div>



            <div :class="$style.section">

              <h3>
                Donation Request
              </h3>


              <div :class="$style.contactActions">

                <button
                  @click="submitRequest"
                  :class="[$style.actionBtn, $style.btnCall]"
                >

                  <svg xmlns="http://www.w3.org/2000/svg"
                       viewBox="0 0 20 20"
                       fill="currentColor">

                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>

                  </svg>


                  Send Request

                </button>

              </div>

            </div>


          </div>




          <!-- Request Form -->

          <div :class="$style.sideCard">

            <h3>
              Send Request
            </h3>


            <p :class="$style.sideText">

              Notify this donor directly with your hospital details and urgency status.

            </p>



            <form
              @submit.prevent="submitRequest"
              :class="$style.requestForm"
            >


              <div :class="$style.formGroup">

                <label>
                  Hospital / Medical Center
                </label>


                <input
                  type="text"
                  placeholder="e.g. Hotel Dieu de France"
                  required
                  :class="$style.formInput"
                />

              </div>



              <div :class="$style.formGroup">

                <label>
                  Urgency Level
                </label>


                <select :class="$style.formInput">

                  <option>
                    Normal (Within 24-48 hrs)
                  </option>

                  <option>
                    High (Within 12 hrs)
                  </option>

                  <option>
                    Critical (Immediate)
                  </option>

                </select>

              </div>




              <div :class="$style.formGroup">

                <label>
                  Message / Details
                </label>


                <textarea
                  rows="3"
                  placeholder="Provide room number or contact person..."
                  :class="$style.formTextarea"
                ></textarea>


              </div>




              <button
                type="submit"
                :class="$style.btnSubmit"
              >

                Send Direct Emergency Request

              </button>



            </form>

          </div>


        </div>


      </div>
    </main>


    <AppFooter />

  </div>
</template>



<script setup lang="ts">

import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

import { getDonorById } from "@/services/donor";

import AppNavbar from "@/components/AppNavbar.vue";
import AppFooter from "@/components/AppFooter.vue";


interface Donor {

  id: string;

  name: string;

  city: string;

  bloodType: string;

  lastDonated: string;

}



const route = useRoute();


const donor = ref<Donor | null>(null);

const loading = ref(true);

const error = ref("");



const donorId = route.params.id as string;



onMounted(async () => {

  try {

    donor.value = await getDonorById(donorId);

    console.log("Donor:", donor.value);


  } catch (err) {

    console.error(err);

    error.value = "Failed to load donor.";

  } finally {

    loading.value = false;

  }

});




const submitRequest = () => {

  if (!donor.value)
    return;


  alert(
    `Emergency request sent to ${donor.value.name}!`
  );

};

</script>

<style module lang="scss">
$color-primary: #dc2626;
$color-primary-dark: #b91c1c;
$color-text-main: #0f172a;
$color-text-muted: #64748b;
$border-color: #e2e8f0;

.pageWrapper {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #f8fafc;
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
  color: $color-text-muted;
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

.profileGrid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 1.75rem;

  @media (max-width: 860px) {
    grid-template-columns: 1fr;
  }
}

.mainCard, .sideCard {
  background: #ffffff;
  border-radius: 1rem;
  padding: 2rem;
  border: 1px solid $border-color;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.03);
}

.profileHeader {
  display: flex;
  align-items: center;
  gap: 1.5rem;

  .bloodBadge {
    width: 4rem;
    height: 4rem;
    border-radius: 1rem;
    background-color: #fef2f2;
    color: $color-primary;
    font-size: 1.75rem;
    font-weight: 800;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #fecaca;
  }

  .headerInfo {
    .nameRow {
      display: flex;
      align-items: center;
      gap: 0.75rem;

      .donorName {
        font-size: 1.75rem;
        font-weight: 800;
        color: $color-text-main;
        margin: 0;
      }

      .badgeVerified {
        background-color: #dcfce7;
        color: #15803d;
        font-size: 0.75rem;
        font-weight: 700;
        padding: 0.25rem 0.625rem;
        border-radius: 9999px;
      }
    }

    .location {
      font-size: 0.9375rem;
      color: $color-text-muted;
      margin: 0.25rem 0 0 0;
    }
  }
}

.divider {
  border: 0;
  height: 1px;
  background-color: $border-color;
  margin: 1.75rem 0;
}

.statsBar {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  background-color: #f8fafc;
  padding: 1rem 1.25rem;
  border-radius: 0.75rem;
  margin-bottom: 2rem;

  .statItem {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;

    .statLabel {
      font-size: 0.75rem;
      color: $color-text-muted;
      font-weight: 500;
    }

    .statValue {
      font-size: 0.9375rem;
      font-weight: 700;
      color: $color-text-main;

      &.textSuccess {
        color: #16a34a;
      }
    }
  }
}

.section {
  margin-bottom: 1.75rem;

  h3 {
    font-size: 1.125rem;
    font-weight: 700;
    color: $color-text-main;
    margin: 0 0 0.75rem 0;
  }

  .bioText {
    font-size: 0.9375rem;
    line-height: 1.6;
    color: #475569;
    margin: 0;
  }
}

.contactActions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;

  @media (max-width: 500px) {
    grid-template-columns: 1fr;
  }

  .actionBtn {
    height: 2.75rem;
    border-radius: 0.625rem;
    text-decoration: none;
    font-weight: 600;
    font-size: 0.9375rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    transition: all 0.2s ease;

    svg {
      width: 1.125rem;
      height: 1.125rem;
    }

    &.btnCall {
      background-color: $color-primary;
      color: #ffffff;

      &:hover {
        background-color: $color-primary-dark;
      }
    }

    &.btnEmail {
      background-color: #0284c7;
      color: #ffffff;

      &:hover {
        background-color: #0369a1;
      }
    }
  }
}

/* Side Card Form */
.sideCard {
  h3 {
    font-size: 1.25rem;
    font-weight: 700;
    margin: 0 0 0.5rem 0;
    color: $color-text-main;
  }

  .sideText {
    font-size: 0.875rem;
    color: $color-text-muted;
    margin: 0 0 1.5rem 0;
    line-height: 1.5;
  }

  .requestForm {
    display: flex;
    flex-direction: column;
    gap: 1.125rem;

    .formGroup {
      display: flex;
      flex-direction: column;
      gap: 0.375rem;

      label {
        font-size: 0.8125rem;
        font-weight: 600;
        color: #334155;
      }

      .formInput, .formTextarea {
        width: 100%;
        padding: 0.625rem 0.875rem;
        border: 1px solid $border-color;
        border-radius: 0.5rem;
        font-size: 0.875rem;
        outline: none;

        &:focus {
          border-color: $color-primary;
        }
      }
    }

    .btnSubmit {
      height: 2.75rem;
      background-color: $color-primary;
      color: #ffffff;
      border: none;
      border-radius: 0.5rem;
      font-weight: 600;
      font-size: 0.875rem;
      cursor: pointer;
      margin-top: 0.5rem;
      transition: background-color 0.2s;

      &:hover {
        background-color: $color-primary-dark; 
      
      
      }
    }
  }
}
</style>
