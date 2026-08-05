<template>
  <section :class="$style.hero">
    <div :class="$style.heroInner">
      <div :class="$style.heroContent">
        <div v-if="authStore.isAuthenticated" :class="$style.welcomeMessage">
          Welcome back, {{ displayName }} — you’re logged in and ready to help save lives.
        </div>
        <span :class="$style.badge">Trusted by 8 hospitals nationwide</span>
        
        <h1 :class="$style.heroTitle">
          Your blood can save three lives today
        </h1>
        
        <p :class="$style.heroDescription">
          Giving blood is a small act with a big impact. Join over 1,200 donors making a real difference in their community — one pint at a time.
        </p>
        
        <div :class="$style.heroActions">
          <button :class="$style.btnPrimary">Donate now</button>
          <button :class="$style.btnSecondary">Learn more</button>
        </div>
      </div>

      <!-- Life-Saving Visual Wrapper -->
      <div :class="$style.heroGraphicWrapper">
        <!-- Soft Background Radial Glow -->
        <div :class="$style.bgGlow"></div>

        <div :class="$style.imageCard">
          <!-- Overlay Blood Droplets Layer -->
          <div :class="$style.dropletsOverlay">
            <svg :class="[$style.droplet, $style.drop1]" viewBox="0 0 30 45">
              <path d="M15 0 C15 0 0 20 0 30 A15 15 0 0 0 30 30 C30 20 15 0 15 0 Z" fill="#c92a2a" />
            </svg>
            <svg :class="[$style.droplet, $style.drop2]" viewBox="0 0 30 45">
              <path d="M15 0 C15 0 0 20 0 30 A15 15 0 0 0 30 30 C30 20 15 0 15 0 Z" fill="#a61e1e" />
            </svg>
            <svg :class="[$style.droplet, $style.drop3]" viewBox="0 0 30 45">
              <path d="M15 0 C15 0 0 20 0 30 A15 15 0 0 0 30 30 C30 20 15 0 15 0 Z" fill="#e03131" />
            </svg>
          </div>

          <img 
            src="@/assets/blood.webp" 
            alt="Healthcare worker holding a blood bag and sample tube" 
            :class="$style.heroImage" 
          />

          <!-- Floating Badge 1: Top Right Heart Pulse -->
          <div :class="[$style.floatingBadge, $style.topRight]">
            <div :class="$style.iconCircle">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" :class="$style.heartIcon">
                <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
              </svg>
            </div>
            <span>1 Pint = 3 Lives Saved</span>
          </div>

          <!-- Floating Badge 2: Bottom Left Gratitude Badge -->
          <div :class="[$style.floatingBadge, $style.bottomLeft]">
            <div :class="$style.avatarGroup">
              <span :class="$style.miniHeart">❤️</span>
              <span :class="$style.miniHeart">❤️</span>
            </div>
            <div :class="$style.badgeText">
              <strong>1,240+</strong>
              <small>Hero Donors</small>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div :class="$style.carouselIndicators">
      <span :class="[$style.dot, $style.activeDot]"></span>
      <span :class="$style.dot"></span>
      <span :class="$style.dot"></span>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

const displayName = computed(() => {
  const name = authStore.username?.trim()
  return name ? name : 'there'
})
</script>

<style module lang="scss">
$color-primary: #c92a2a;
$color-primary-hover: #a61e1e;

.hero {
  position: relative;
  background: linear-gradient(90deg, #fce4dc 0%, #fad5cb 50%, #f7c6b8 100%);
  padding: 4rem 0 3rem;

  .heroInner {
    max-width: 1152px;
    margin: 0 auto;
    padding: 0 1.5rem;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 3rem;
    align-items: center;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  }

  .heroContent {
    max-width: 32rem;

    .welcomeMessage {
      display: inline-block;
      max-width: 100%;
      padding: 0.6rem 0.9rem;
      margin-bottom: 0.7rem;
      border-radius: 9999px;
      background: rgba(255, 255, 255, 0.82);
      border: 1px solid rgba(201, 42, 42, 0.18);
      color: #7f1d1d;
      font-size: 0.95rem;
      font-weight: 600;
      line-height: 1.5;
    }

    .badge {
      display: inline-block;
      padding: 0.25rem 0.75rem;
      background: rgba(240, 253, 244, 0.9);
      border: 1px solid rgba(34, 197, 94, 0.25);
      border-radius: 9999px;
      font-size: 0.75rem;
      font-weight: 600;
      margin-bottom: 1.5rem;
      color: #166534;
    }

    .heroTitle {
      font-size: 2.75rem;
      font-weight: 800;
      line-height: 1.15;
      color: #111827;
      margin-bottom: 1.25rem;
    }

    .heroDescription {
      font-size: 1.125rem;
      line-height: 1.6;
      color: #374151;
      margin-bottom: 2rem;
    }

    .heroActions {
      display: flex;
      gap: 1rem;

      .btnPrimary {
        padding: 0.75rem 1.5rem;
        background: $color-primary;
        color: #ffffff;
        font-weight: 500;
        border: none;
        border-radius: 0.375rem;
        cursor: pointer;

        &:hover {
          background: $color-primary-hover;
        }
      }

      .btnSecondary {
        padding: 0.75rem 1.5rem;
        background: #ffffff;
        color: #1f2937;
        font-weight: 500;
        border: none;
        border-radius: 0.375rem;
        cursor: pointer;

        &:hover {
          background: #f9fafb;
        }
      }
    }
  }

  /* Image & Droplet Overlay Styling */
  .heroGraphicWrapper {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;

    .bgGlow {
      position: absolute;
      width: 85%;
      height: 85%;
      background: radial-gradient(circle, rgba(201, 42, 42, 0.25) 0%, rgba(255, 255, 255, 0) 70%);
      filter: blur(20px);
      z-index: 0;
    }

    .imageCard {
      position: relative;
      z-index: 1;
      border-radius: 1.5rem;
      padding: 0.625rem;
      background: #ffffff;
      box-shadow: 0 20px 30px -10px rgba(180, 40, 40, 0.15), 0 10px 15px -5px rgba(0, 0, 0, 0.04);

      /* Dripping Overlay Elements */
      .dropletsOverlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 2;

        .droplet {
          position: absolute;
          filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.25));

          &.drop1 {
            top: 10px;
            left: 20%;
            width: 16px;
            animation: drip 3s infinite ease-in;
          }

          &.drop2 {
            top: 5px;
            left: 50%;
            width: 22px;
            animation: drip 2.5s infinite ease-in 0.8s;
          }

          &.drop3 {
            top: 15px;
            left: 75%;
            width: 14px;
            animation: drip 3.2s infinite ease-in 1.5s;
          }
        }
      }

      .heroImage {
        width: 100%;
        max-width: 27rem;
        height: auto;
        display: block;
        border-radius: 1.125rem;
        object-fit: cover;
      }

      .floatingBadge {
        position: absolute;
        background: #ffffff;
        padding: 0.625rem 1rem;
        border-radius: 1rem;
        display: flex;
        align-items: center;
        gap: 0.625rem;
        box-shadow: 0 12px 20px -4px rgba(0, 0, 0, 0.12);
        border: 1px solid #f3f4f6;
        z-index: 3;

        &.topRight {
          top: 1.25rem;
          right: -1rem;
          font-size: 0.8125rem;
          font-weight: 700;
          color: #111827;

          @media (max-width: 500px) {
            right: 0.5rem;
          }
        }

        &.bottomLeft {
          bottom: -1.25rem;
          left: -0.75rem;

          @media (max-width: 500px) {
            left: 0.5rem;
          }
        }

        .iconCircle {
          width: 2rem;
          height: 2rem;
          border-radius: 50%;
          background: #ffe3e3;
          display: flex;
          align-items: center;
          justify-content: center;

          .heartIcon {
            width: 1.125rem;
            height: 1.125rem;
            color: $color-primary;
            animation: pulse 2s infinite ease-in-out;
          }
        }

        .avatarGroup {
          display: flex;
          align-items: center;
          font-size: 1.125rem;
        }

        .badgeText {
          display: flex;
          flex-direction: column;

          strong {
            font-size: 0.875rem;
            color: #111827;
            line-height: 1.1;
          }

          small {
            font-size: 0.75rem;
            color: #6b7280;
          }
        }
      }
    }
  }

  .carouselIndicators {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    margin-top: 2rem;

    .dot {
      width: 0.5rem;
      height: 0.5rem;
      border-radius: 9999px;
      background-color: rgba(156, 163, 175, 0.6);

      &.activeDot {
        width: 1.5rem;
        background-color: $color-primary;
      }
    }
  }
}

/* Animations */
@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.18); }
  100% { transform: scale(1); }
}

@keyframes drip {
  0% {
    transform: translateY(0) scaleY(1);
    opacity: 0.9;
  }
  70% {
    transform: translateY(80px) scaleY(1.3);
    opacity: 0.8;
  }
  100% {
    transform: translateY(120px) scaleY(0.8);
    opacity: 0;
  }
}
</style>