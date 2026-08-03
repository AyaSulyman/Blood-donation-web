<template>
  <footer :class="$style.footer">
    <div :class="$style.footerInner">
      <div>
        <h3 :class="$style.ctaTitle">Ready to make a difference?</h3>
        <p :class="$style.ctaSubtitle">Book your first donation appointment in under 2 minutes.</p>
      </div>
      <button :class="$style.btnCta">Book appointment</button>
    </div>
  </footer>
</template>

<script setup lang="ts">
</script>

<style module lang="scss">
$color-primary: #c92a2a;
$color-primary-hover: #a61e1e;

.footer {
  background-color: #1c1311;
  color: #ffffff;
  padding: 3rem 0;

  .footerInner {
    max-width: 1152px;
    margin: 0 auto;
    padding: 0 1.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;

    @media (max-width: 768px) {
      flex-direction: column;
      align-items: flex-start;
      gap: 1.5rem;
    }

    .ctaTitle {
      font-size: 1.5rem;
      font-weight: 700;
      margin: 0;
    }

    .ctaSubtitle {
      color: #9ca3af;
      font-size: 0.875rem;
      margin-top: 0.25rem;
      margin-bottom: 0;
    }

    .btnCta {
      padding: 0.75rem 1.5rem;
      background: $color-primary;
      color: #ffffff;
      font-weight: 500;
      border: none;
      border-radius: 0.375rem;
      cursor: pointer;
      white-space: nowrap;

      &:hover {
        background: $color-primary-hover;
      }

      @media (max-width: 768px) {
        width: 100%;
      }
    }
  }
}
</style>