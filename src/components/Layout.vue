<template>
<div>

  <!-- MAIN CONTENT -->
  <div class="main-wrapper">
    <router-view/>
  </div>

  <!-- FOOTER -->
  <!-- if home page, will always display footer
  else display only if large screen -->
  <template v-if="footerEnabled">
    <foot-bar/>
  </template>

  <template v-else>
    <mq-layout mq="laptop+">
      <foot-bar/>
    </mq-layout>
  </template>


  <!-- HEADER -->
  <div class="header-bar">
    <div class="header-bar__logo-box">
      <Logo/>
    </div>
    <div class="header-bar__title">
      <div class="header-bar__text-box">
        <span class="header-bar__text--front">Manda</span>
        <span class="header-bar__text--back">Rhyme</span>
      </div>
      <mq-layout mq="tablet+">
        <div class="header-bar__sub-header">
          <span class="header-bar__sub-caption">a rhyming dictionary for Mandarin Chinese</span>
        </div>
      </mq-layout>
    </div>
    <mq-layout mq="laptop+" class="nav-bar-mqw-laptop-p">
      <nav-bar />
    </mq-layout>

    <mq-layout :mq="['tablet', 'mobile']">
      <small-nav/>
    </mq-layout>

  </div>
</div>
</template>

<script>
import FootBar from '@/components/FootBar.vue'
import Logo from '@/components/Logo.vue'
import NavBar from '@/components/NavBar.vue'
import SmallNav from '@/components/SmallNav.vue'

export default {
  name: "layout",
  components: {
    FootBar,
    Logo,
    NavBar,
    SmallNav
  },
  computed: {
    footerEnabled() {
      return this.$route.name == "home"
    }
  }
}
</script>

<style lang="scss">
.u-message-box-lock {
    .header-bar {
        border-bottom: 0 !important;
        box-shadow: none !important;
        height: 100vh;
        overflow: visible;

        &__logo-box {
            opacity: 0;
        }

        &__title {
            opacity: 0;
        }
    }

    .small-nav {
        &__nav-wrapper {
            overflow: visible;
        }
    }

    .main-wrapper {
        height: 0;
        opacity: 0;
        overflow: hidden;
    }

    .foot-bar {
        height: 0;
        opacity: 0;
        overflow: hidden;
    }
}

.header-bar {
    z-index: 1;
    position: fixed;
    top: 0;
    overflow: visible;

    .mq-mobile &,
    .mq-tablet & {
        box-shadow: none;
        border-bottom-width: 2px;
    }

    width: 100vw;
    height: $headerHeight;
    background-color: $colorWhite;
    border-bottom-width: 5px;
    border-bottom-style: solid;
    border-color: $colorDarkBlue;
    display: flex;
    flex-direction: row;
    align-items: center;
    box-shadow: 0 0 3px 3px rgba(black, .15);

    &__title {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
    }

    &__text-box {
        margin-right: 2rem;
        //font-size: 2.6rem;
        font-size: 4vh;
    }

    &__text {
        &--front {
            color: $colorDarkBlue;
        }

        &--back {
            color: $colorOrange;
        }
    }

    &__sub-header {}

    &__sub-caption {
        color: $colorBlack;
        //font-size: 1.5rem;
        font-size: 1.3rem;
        font-weight: 100;
    }

    &__logo-box {
        margin-left: 2.5rem;
        margin-right: 2rem;
        height: 8vh;
        width: 8vh;
    }
}

.main-wrapper {
    position: fixed;
    top: $headerHeight;
    z-index: 1;
    height: $mainHeight;

    .mq-mobile &,
    .mq-tablet & {
        //height: #{$mainHeight + $footerHeight};
        height: auto;
        position: static;
        top: unset;
        padding-top: $headerHeight;
    }
    width: 100%;
    //overflow: scroll;
}
</style>
