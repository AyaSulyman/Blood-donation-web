<template>
  <div :class="$style.page">
    <AppNavbar />

    <main>
      <section :class="$style.intro">
        <div :class="$style.introInner">
          <span :class="$style.badge">About LifeDrop</span>
          <h1 :class="$style.introTitle">Every drop brings someone back from the edge</h1>
          <p :class="$style.introText">
            LifeDrop connects donors with hospitals and blood drives, making it simple to give
            blood, find where you're needed, and see the difference each donation makes.
          </p>
        </div>
      </section>

      <StatsSection />

      <section :class="$style.mission">
        <div :class="$style.missionInner">
          <h2 :class="$style.sectionTitle">Our mission</h2>
          <p :class="$style.missionText">
            Blood can't be manufactured — it can only come from someone willing to give it.
            Hospitals regularly run short, and the gap between what's needed and what's
            available often comes down to how easy it is for a willing donor to actually show
            up. LifeDrop closes that gap: one simple place to find a nearby drive or urgent
            request, register as a donor, and give with confidence.
          </p>
        </div>
      </section>

      <section :class="$style.steps">
        <h2 :class="$style.sectionTitle">How it works</h2>
        <p :class="$style.sectionSubtitle">From sign-up to saving a life, in four simple steps.</p>

        <div :class="$style.stepsGrid">
          <div v-for="(step, index) in steps" :key="step.title" :class="$style.stepCard">
            <span :class="$style.stepNumber">{{ index + 1 }}</span>
            <h3 :class="$style.cardTitle">{{ step.title }}</h3>
            <p :class="$style.cardDescription">{{ step.description }}</p>
          </div>
        </div>
      </section>

      <section :class="$style.eligibility">
        <div :class="$style.eligibilityInner">
          <div>
            <h2 :class="$style.sectionTitle">Before you donate</h2>
            <p :class="$style.sectionSubtitle">
              A quick overview — your care team will confirm everything on the day.
            </p>
          </div>

          <ul :class="$style.eligibilityList">
            <li v-for="item in eligibilityPoints" :key="item">
              <svg :class="$style.checkIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
              <span>{{ item }}</span>
            </li>
          </ul>
        </div>
      </section>

      

      <CallToActionFooter />
    </main>

    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import AppNavbar from '@/components/AppNavbar.vue'
import StatsSection from '@/components/StatsSection.vue'
import CallToActionFooter from '@/components/CallToActionFooter.vue'
import AppFooter from '@/components/AppFooter.vue'

interface Step {
  title: string
  description: string
}

const steps: Step[] = [
  { title: 'Sign up', description: 'Create your donor account with your blood type and contact info.' },
  { title: 'Find a drive', description: 'Browse nearby donation centers or urgent hospital requests.' },
  { title: 'Donate', description: 'Show up for your appointment — the process takes under 30 minutes.' },
  { title: 'Track your impact', description: 'See how many donations you\'ve made and lives you\'ve helped.' },
]

// TODO: replace with real, sourced eligibility guidance (e.g. from WHO or a local blood bank)
// before this goes live — these are placeholder talking points, not medical advice.
const eligibilityPoints: string[] = [
  'Generally, donors must be at least 17 years old and in good general health',
  'A minimum weight requirement usually applies (commonly around 50kg / 110lb)',
  'You should wait a set number of weeks between donations',
  'Your information stays confidential and is only used for donation matching',
]

// TODO: swap in your actual team members

</script>

<style module lang="scss">
$color-primary: #c92a2a;
$color-primary-hover: #a61e1e;
$color-border: #e5e7eb;

.page {
  min-height: 100vh;
  background-color: #ffffff;
  color: #1f2937;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  -webkit-font-smoothing: antialiased;
}

.intro {
  background: linear-gradient(90deg, #fce4dc 0%, #fad5cb 50%, #f7c6b8 100%);
  padding: 4rem 0 3rem;

  .introInner {
    max-width: 1152px;
    margin: 0 auto;
    padding: 0 1.5rem;
    max-width: 40rem;

    .badge {
      display: inline-block;
      padding: 0.25rem 0.75rem;
      background: rgba(255, 255, 255, 0.6);
      border: 1px solid rgba(255, 255, 255, 0.4);
      border-radius: 9999px;
      font-size: 0.75rem;
      font-weight: 500;
      margin-bottom: 1.5rem;
    }

    .introTitle {
      font-size: 2.5rem;
      font-weight: 800;
      line-height: 1.15;
      color: #111827;
      margin: 0 0 1.25rem;
    }

    .introText {
      font-size: 1.125rem;
      line-height: 1.6;
      color: #374151;
      margin: 0;
    }
  }
}

.sectionTitle {
  font-size: 1.75rem;
  font-weight: 700;
  color: #111827;
  margin: 0;
}

.sectionSubtitle {
  color: #6b7280;
  margin-top: 0.5rem;
  margin-bottom: 2rem;
}

.mission {
  max-width: 1152px;
  margin: 0 auto;
  padding: 4rem 1.5rem 0;

  .missionInner {
    max-width: 44rem;
  }

  .missionText {
    color: #374151;
    line-height: 1.7;
    margin-top: 1rem;
  }
}

.steps {
  max-width: 1152px;
  margin: 0 auto;
  padding: 4rem 1.5rem;

  .stepsGrid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1.5rem;

    @media (max-width: 900px) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: 560px) {
      grid-template-columns: 1fr;
    }
  }

  .stepCard {
    padding: 1.5rem;
    border: 1px solid $color-border;
    border-radius: 0.75rem;
    background: #ffffff;
  }

  .stepNumber {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 2rem;
    height: 2rem;
    border-radius: 9999px;
    background: rgba(201, 42, 42, 0.1);
    color: $color-primary;
    font-weight: 700;
    font-size: 0.875rem;
    margin-bottom: 1rem;
  }

  .cardTitle {
    font-size: 1rem;
    font-weight: 700;
    color: #111827;
    margin: 0 0 0.5rem 0;
  }

  .cardDescription {
    font-size: 0.875rem;
    color: #6b7280;
    line-height: 1.5;
    margin: 0;
  }
}

.eligibility {
  background: #fafafa;
  border-top: 1px solid $color-border;
  border-bottom: 1px solid $color-border;
  padding: 4rem 0;

  .eligibilityInner {
    max-width: 1152px;
    margin: 0 auto;
    padding: 0 1.5rem;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 3rem;
    align-items: start;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  }

  .eligibilityList {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 1rem;

    li {
      display: flex;
      align-items: flex-start;
      gap: 0.75rem;
      color: #374151;
      font-size: 0.9375rem;
      line-height: 1.5;
    }
  }

  .checkIcon {
    flex-shrink: 0;
    width: 1.25rem;
    height: 1.25rem;
    color: $color-primary;
    margin-top: 0.125rem;
  }
}

</style>