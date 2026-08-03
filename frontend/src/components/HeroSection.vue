<template>
  <section :class="$style.hero">
    <div :class="$style.heroInner">
      <div :class="$style.heroContent">
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

      <div :class="$style.heroGraphicWrapper">
        <div :class="$style.heroShape">
          <div :class="$style.dropperTip"></div>
          <div :class="$style.whiteBar"></div>
        </div>
        <div :class="$style.heroShadow"></div>
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

  .heroGraphicWrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;

    .heroShape {
      width: 20rem;
      height: 20rem;
      background-color: #f3b3a3;
      border-top-left-radius: 9999px;
      border-top-right-radius: 9999px;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;

      .dropperTip {
        width: 2.5rem;
        height: 4rem;
        background-color: $color-primary;
        border-top-left-radius: 9999px;
        border-top-right-radius: 9999px;
        position: absolute;
        top: 2rem;
      }

      .whiteBar {
        position: absolute;
        width: 5rem;
        height: 1rem;
        background-color: rgba(255, 255, 255, 0.8);
        border-radius: 9999px;
        transform: rotate(-12deg);
      }
    }

    .heroShadow {
      width: 18rem;
      height: 1.5rem;
      background: rgba(127, 29, 29, 0.1);
      border-radius: 9999px;
      filter: blur(4px);
      margin-top: -0.75rem;
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
</style>