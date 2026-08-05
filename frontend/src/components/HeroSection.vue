<template>
  <section :class="$style.hero">
    <div :class="$style.heroCard">
      <!-- Decorative background layers -->
      <div :class="$style.circleAccentTop" aria-hidden="true"></div>
      <div :class="$style.circleAccentBottom" aria-hidden="true"></div>
      <svg :class="$style.waveAccent" viewBox="0 0 1200 260" preserveAspectRatio="none" aria-hidden="true">
        <path
          d="M0 210 C 180 170 340 230 520 190 C 700 150 860 210 1030 175 C 1110 158 1160 168 1200 150"
          fill="none"
          stroke="#c92a2a"
          stroke-width="2"
          opacity="0.18"
        />
      </svg>

      <div :class="$style.heroInner">
        <!-- Left: copy -->
        <div :class="$style.heroContent">
          <span :class="$style.badge">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#c92a2a" stroke-width="2" :class="$style.badgeIcon">
              <path stroke-linecap="round" stroke-linejoin="round" d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
            </svg>
            Every drop counts
          </span>

          <h1 :class="$style.heroTitle">
            Together, we can<br />
            save more
            <span :class="$style.heroTitleAccent">
              lives.
              <svg :class="$style.underlineSquiggle" viewBox="0 0 120 14" preserveAspectRatio="none" aria-hidden="true">
                <path d="M2 8 C 20 2, 45 12, 65 6 C 82 1, 100 9, 118 4" fill="none" stroke="#c92a2a" stroke-width="2.5" stroke-linecap="round" />
              </svg>
            </span>
            <svg :class="$style.titleHeartIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#c92a2a" stroke-width="1.75" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
            </svg>
          </h1>

          <p :class="$style.heroDescription">
            Your blood donation can bring hope, healing and<br />
            a second chance to someone in need.
          </p>

          <div :class="$style.heroActions">
            <button :class="$style.btnPrimary" type="button">
              Donate Now
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" :class="$style.btnIcon">
                <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
              </svg>
            </button>
            <button :class="$style.btnSecondary" type="button">
              Find a Drive Near You
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" :class="$style.btnIcon">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
              </svg>
            </button>
          </div>

          <div :class="$style.trustRow">
            <div :class="$style.avatarStack">
              <span :class="[$style.avatarChip, $style.avatarChip1]"></span>
              <span :class="[$style.avatarChip, $style.avatarChip2]"></span>
              <span :class="[$style.avatarChip, $style.avatarChip3]"></span>
            </div>
            <p :class="$style.trustText">
              Join <strong>10,000+</strong> lifesavers<br />
              making a difference every day.
            </p>
          </div>
        </div>

        <!-- Right: visual -->
        <div :class="$style.heroGraphicWrapper">
          <div :class="$style.dotsGrid" aria-hidden="true"></div>
          <div :class="$style.softCircle" aria-hidden="true"></div>

          <!-- Scattered decorative mini hearts -->
          <svg :class="[$style.miniHeart, $style.miniHeart1]" viewBox="0 0 24 24" fill="#f4a09a" aria-hidden="true">
            <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
          </svg>
          <svg :class="[$style.miniHeart, $style.miniHeart2]" viewBox="0 0 24 24" fill="none" stroke="#c92a2a" stroke-width="1.75" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
          </svg>
          <svg :class="[$style.miniHeart, $style.miniHeart3]" viewBox="0 0 24 24" fill="#e8b3ac" aria-hidden="true">
            <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
          </svg>
          <svg :class="[$style.miniHeart, $style.miniHeart4]" viewBox="0 0 24 24" fill="none" stroke="#c92a2a" stroke-width="1.75" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
          </svg>
          <svg :class="[$style.miniHeart, $style.miniHeart5]" viewBox="0 0 24 24" fill="#f4a09a" aria-hidden="true">
            <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
          </svg>

          <div :class="$style.dropWrap">
            <svg :class="$style.dropOutline" viewBox="0 0 220 260" aria-hidden="true">
              <path
                d="M110 4 C 110 4 24 118 24 178 C 24 222 62 256 110 256 C 158 256 196 222 196 178 C 196 118 110 4 110 4 Z"
                fill="none"
                stroke="#c92a2a"
                stroke-width="1.5"
                opacity="0.4"
              />
            </svg>

            <div :class="$style.imageDrop">
              <svg width="0" height="0" style="position:absolute">
                <defs>
                  <clipPath id="heroDropClip" clipPathUnits="objectBoundingBox">
                    <path d="M0.5,0.05 C0.5,0.05 0.13,0.44 0.13,0.68 C0.13,0.86 0.29,1 0.5,1 C0.71,1 0.87,0.86 0.87,0.68 C0.87,0.44 0.5,0.05 0.5,0.05 Z" />
                  </clipPath>
                </defs>
              </svg>
              <img
                src="@/assets/heroImage.webp"
                alt="Healthcare worker holding a blood bag and sample tube"
                :class="$style.heroImage"
              />
            </div>
          </div>

          <div :class="$style.miniBadge">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#c92a2a" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75 0 7.312 9.75 11.25 9.75 11.25s9.75-3.938 9.75-11.25c0-5.385-4.365-9.75-9.75-9.75z" />
            </svg>
          </div>

          <svg :class="$style.leafAccent" viewBox="0 0 120 120" aria-hidden="true">
            <path d="M6 112 C 36 92 58 66 92 16" fill="none" stroke="#c92a2a" stroke-width="1.25" opacity="0.45" />
            <path d="M52 66 C 60 54 76 52 86 59 C 78 70 62 74 52 66 Z" fill="none" stroke="#c92a2a" stroke-width="1.25" opacity="0.45" />
            <path d="M30 90 C 38 78 54 76 64 83 C 56 94 40 98 30 90 Z" fill="none" stroke="#c92a2a" stroke-width="1.25" opacity="0.45" />
            <path d="M70 40 C 78 28 94 26 104 33 C 96 44 80 48 70 40 Z" fill="none" stroke="#c92a2a" stroke-width="1.25" opacity="0.45" />
          </svg>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
</script>

<style module lang="scss">
$color-primary: #c92a2a;
$color-primary-hover: #a61e1e;
$color-ink: #111827;
$color-body: #4b5563;

.hero {
  background: #ffffff;
  padding: 1.25rem 1.25rem 0;

  .heroCard {
    position: relative;
    overflow: hidden;
    max-width: 1280px;
    margin: 0 auto;
    border-radius: 1.25rem;
    background: linear-gradient(100deg, #fbe4dd 0%, #fbe1da 45%, #f9d8cf 100%);
    padding: 4rem 3.5rem 3.5rem;

    @media (max-width: 768px) {
      padding: 2.75rem 1.5rem;
      border-radius: 1rem;
    }

    .circleAccentTop {
      position: absolute;
      top: -7rem;
      right: -3rem;
      width: 16rem;
      height: 16rem;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.3);
      z-index: 0;
    }

    .circleAccentBottom {
      position: absolute;
      bottom: -3rem;
      left: 32%;
      width: 6rem;
      height: 6rem;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.35);
      z-index: 0;

      @media (max-width: 900px) {
        display: none;
      }
    }

    .waveAccent {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      width: 100%;
      height: 7rem;
      z-index: 0;
    }
  }

  .heroInner {
    position: relative;
    z-index: 1;
    display: grid;
    grid-template-columns: 1fr 0.95fr;
    gap: 2rem;
    align-items: center;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  }

  /* Copy */
  .heroContent {
    max-width: 30rem;

    .badge {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.875rem;
      font-weight: 500;
      color: $color-ink;
      margin-bottom: 1.25rem;

      .badgeIcon {
        width: 1.125rem;
        height: 1.125rem;
      }
    }

    .heroTitle {
      font-size: 2.75rem;
      font-weight: 800;
      line-height: 1.18;
      color: $color-ink;
      margin-bottom: 1rem;

      @media (max-width: 768px) {
        font-size: 2.25rem;
      }

      @media (max-width: 420px) {
        font-size: 1.85rem;
      }

      .heroTitleAccent {
        position: relative;
        display: inline-block;
        color: $color-primary;

        .underlineSquiggle {
          position: absolute;
          left: 0;
          bottom: -0.35rem;
          width: 100%;
          height: 0.5rem;
        }
      }

      .titleHeartIcon {
        display: inline-block;
        width: 1.5rem;
        height: 1.5rem;
        margin-left: 0.25rem;
        vertical-align: middle;
      }
    }

    .heroDescription {
      font-size: 0.9375rem;
      line-height: 1.6;
      color: $color-body;
      margin-bottom: 1.5rem;
    }

    .heroActions {
      display: flex;
      flex-wrap: wrap;
      gap: 0.875rem;
      margin-bottom: 1.5rem;

      .btnIcon {
        width: 1rem;
        height: 1rem;
      }

      .btnPrimary {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.75rem 1.5rem;
        background: $color-primary;
        color: #ffffff;
        font-size: 0.9375rem;
        font-weight: 600;
        border: none;
        border-radius: 0.5rem;
        cursor: pointer;
        transition: background 0.18s ease, transform 0.18s ease;

        &:hover {
          background: $color-primary-hover;
          transform: translateY(-1px);
        }
      }

      .btnSecondary {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.75rem 1.5rem;
        background: #ffffff;
        color: $color-ink;
        font-size: 0.9375rem;
        font-weight: 500;
        border: 1px solid rgba(17, 24, 39, 0.12);
        border-radius: 0.5rem;
        cursor: pointer;
        transition: background-color 0.18s ease, transform 0.18s ease;

        .btnIcon {
          color: $color-primary;
        }

        &:hover {
          background: #fafafa;
          transform: translateY(-1px);
        }
      }
    }

    .trustRow {
      display: flex;
      align-items: center;
      gap: 0.75rem;

      .avatarStack {
        display: flex;
        flex-shrink: 0;

        .avatarChip {
          width: 2rem;
          height: 2rem;
          border-radius: 50%;
          border: 2px solid #fbe4dd;
          margin-left: -0.625rem;

          &:first-child {
            margin-left: 0;
          }
        }

        .avatarChip1 {
          background: linear-gradient(135deg, #6b7280, #9ca3af);
        }

        .avatarChip2 {
          background: linear-gradient(135deg, #f4a09a, #d9615c);
        }

        .avatarChip3 {
          background: linear-gradient(135deg, #3b4252, #4b5563);
        }
      }

      .trustText {
        font-size: 0.8125rem;
        line-height: 1.45;
        color: $color-body;
        margin: 0;

        strong {
          color: $color-primary;
        }
      }
    }
  }

  /* Visual */
  .heroGraphicWrapper {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    min-height: 24rem;

    .dotsGrid {
      position: absolute;
      top: 1rem;
      left: 6%;
      width: 5rem;
      height: 5rem;
      background-image: radial-gradient(circle, rgba(201, 42, 42, 0.3) 1.5px, transparent 1.5px);
      background-size: 12px 12px;
      z-index: 0;

      @media (max-width: 500px) {
        display: none;
      }
    }

    .softCircle {
      position: absolute;
      bottom: 6%;
      left: 8%;
      width: 4.5rem;
      height: 4.5rem;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.4);
      z-index: 0;
    }

    /* Scattered decorative mini hearts */
    .miniHeart {
      position: absolute;
      z-index: 0;
      animation: floatHeart 5s ease-in-out infinite;

      &.miniHeart1 {
        top: 20%;
        left: 1%;
        width: 1.375rem;
        height: 1.375rem;
        opacity: 0.75;
        animation-delay: 0s;
      }

      &.miniHeart2 {
        top: 8%;
        right: 22%;
        width: 1rem;
        height: 1rem;
        opacity: 0.6;
        animation-delay: 0.6s;

        @media (max-width: 500px) {
          display: none;
        }
      }

      &.miniHeart3 {
        bottom: 16%;
        right: 2%;
        width: 1.125rem;
        height: 1.125rem;
        opacity: 0.65;
        animation-delay: 1.2s;
      }

      &.miniHeart4 {
        top: 46%;
        left: -2%;
        width: 0.875rem;
        height: 0.875rem;
        opacity: 0.5;
        animation-delay: 1.8s;

        @media (max-width: 500px) {
          display: none;
        }
      }

      &.miniHeart5 {
        bottom: -1%;
        left: 26%;
        width: 1rem;
        height: 1rem;
        opacity: 0.55;
        animation-delay: 2.4s;
      }
    }

    .dropWrap {
      position: relative;
      z-index: 1;
      width: 100%;
      max-width: 20rem;
      aspect-ratio: 220 / 260;

      .dropOutline {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
      }

      .imageDrop {
        position: absolute;
        inset: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 6%;

        .heroImage {
          width: 100%;
          height: 100%;
          object-fit: cover;
          clip-path: url(#heroDropClip);
          filter: drop-shadow(0 16px 26px rgba(120, 30, 30, 0.3));
        }
      }
    }

    .miniBadge {
      position: absolute;
      top: -0.5rem;
      right: 4%;
      z-index: 2;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 2.75rem;
      height: 2.75rem;
      border-radius: 50%;
      background: #ffffff;
      border: 1.5px dashed rgba(201, 42, 42, 0.4);
      box-shadow: 0 8px 18px -6px rgba(17, 24, 39, 0.15);

      svg {
        width: 1.25rem;
        height: 1.25rem;
      }

      @media (max-width: 500px) {
        width: 2.25rem;
        height: 2.25rem;
        right: 0;

        svg {
          width: 1rem;
          height: 1rem;
        }
      }
    }

    .leafAccent {
      position: absolute;
      bottom: 4%;
      right: -2%;
      width: 6.5rem;
      height: 6.5rem;
      z-index: 0;

      @media (max-width: 500px) {
        display: none;
      }
    }
  }
}

@keyframes floatHeart {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-8px);
  }
}
</style>