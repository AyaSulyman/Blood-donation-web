<template>
  <footer :class="$style.mainFooter">
    <div :class="$style.footerContainer">
      <div :class="$style.brandCol">
        <div :class="$style.brand">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" :class="$style.brandIcon">
            <path d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75 0 7.312 9.75 11.25 9.75 11.25s9.75-3.938 9.75-11.25c0-5.385-4.365-9.75-9.75-9.75z" />
          </svg>
          <span :class="$style.brandTitle">LifeDrop</span>
        </div>
        <p :class="$style.brandTagline">
          Connecting donors with hospitals to save lives across the community.
        </p>
      </div>

      <div :class="$style.linksCol">
        <h4 :class="$style.columnTitle">Quick Links</h4>
        <ul>
          <li><a href="#">About Us</a></li>
          <li><a href="#">How It Works</a></li>
          <li><a href="#">Donation Centers</a></li>
          <li><a href="#">Upcoming Events</a></li>
        </ul>
      </div>

      <div :class="$style.linksCol">
        <h4 :class="$style.columnTitle">Support</h4>
        <ul>
          <li><a href="#">Eligibility Requirements</a></li>
          <li><a href="#">Donor FAQ</a></li>
          <li><a href="#">Contact Us</a></li>
          <li><a href="#">Privacy Policy</a></li>
        </ul>
      </div>
    </div>

    <div :class="$style.bottomBar">
      <div :class="$style.bottomInner">
        <p>© 2026 LifeDrop. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
</script>

<style module lang="scss">
$color-primary: #c92a2a;
$color-border: #2d2422;

.mainFooter {
  background-color: #160e0d;
  color: #a1a1aa;
  border-top: 1px solid $color-border;
  padding-top: 4rem;

  .footerContainer {
    max-width: 1152px;
    margin: 0 auto;
    padding: 0 1.5rem 3rem;
    display: grid;
    grid-template-columns: 2fr 1fr 1fr;
    gap: 3rem;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
      gap: 2rem;
    }
  }

  .brandCol {
    .brand {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-bottom: 1rem;

      .brandIcon {
        width: 1.5rem;
        height: 1.5rem;
        color: $color-primary;
      }

      .brandTitle {
        font-size: 1.25rem;
        font-weight: 700;
        color: #ffffff;
      }
    }

    .brandTagline {
      font-size: 0.875rem;
      line-height: 1.5;
      color: #9ca3af;
      max-width: 22rem;
      margin: 0;
    }
  }

  .linksCol {
    .columnTitle {
      font-size: 0.875rem;
      font-weight: 600;
      color: #ffffff;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      margin: 0 0 1rem 0;
    }

    ul {
      list-style: none;
      padding: 0;
      margin: 0;

      li {
        margin-bottom: 0.75rem;

        a {
          color: #9ca3af;
          text-decoration: none;
          font-size: 0.875rem;
          transition: color 0.2s ease;

          &:hover {
            color: $color-primary;
          }
        }
      }
    }
  }

  .bottomBar {
    border-top: 1px solid $color-border;
    padding: 1.5rem 0;

    .bottomInner {
      max-width: 1152px;
      margin: 0 auto;
      padding: 0 1.5rem;
      font-size: 0.8125rem;
      color: #6b7280;

      p {
        margin: 0;
      }
    }
  }
}
</style>