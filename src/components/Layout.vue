<template>
<div class="layout" :class="classObject">
  <!-- MAIN CONTENT -->
  <div class="main-wrapper" ref="main">
    <router-view/>
  </div>

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
    <div class="header-bar__bar">
      <mq-layout mq="laptop+">
        <nav-bar />
      </mq-layout>
    </div>

    <mq-layout :mq="['tablet', 'mobile']">
      <small-nav/>
    </mq-layout>
  </div>

  <!-- MESSAGE BOXES -->
  <message-box-container/>


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
</div>
</template>

<script>
import {
  mapGetters
}
from 'vuex'

import FootBar from '@/components/FootBar.vue'
import Logo from '@/components/Logo.vue'
import NavBar from '@/components/NavBar.vue'
import SmallNav from '@/components/SmallNav.vue'
import MessageBoxContainer from '@/components/MessageBoxContainer.vue'

export default {
  name: "layout",
  data() {
    return {
      hasScrolled: false
    }
  },
  components: {
    FootBar,
    Logo,
    NavBar,
    SmallNav,
    MessageBoxContainer
  },
  methods: {
    updateMainScroll(e) {
      var element = this.$refs.main;
      // give threshold so doesn't trigger immediately
      const SCROLL_THRESHOLD = 50;
      var scrollAmount = e.srcElement.scrollingElement.scrollTop;
      this.hasScrolled = scrollAmount > SCROLL_THRESHOLD;
    }
  },
  computed: {
    ...mapGetters(['isAnyMessageBoxOpen']),
    classObject() {
      var classObject = {
        'u-message-box-lock': this.isAnyMessageBoxOpen,
        'u-has-scrolled': this.hasScrolled,
        'u-can-shrink': this.$route.name != "home"
      }
      classObject['mq-' + this.$mq] = true;
      return classObject;
    },
    footerEnabled() {
      return this.$route.name == "home"
    }
  },
  created() {
    window.addEventListener('scroll', this.updateMainScroll);
  },
  destroyed() {
    window.removeEventListener('scroll', this.updateMainScroll);
  }
}
</script>

<style lang="scss">
// .u-message-box-lock {
//     .header-bar {
//         border-bottom: 0 !important;
//         box-shadow: none !important;
//         height: 100vh;
//         overflow: visible;
//
//         &__logo-box {
//             opacity: 0;
//         }
//
//         &__title {
//             opacity: 0;
//         }
//     }
//
//     .small-nav {
//         &__nav-wrapper {
//             overflow: visible;
//         }
//     }
//
//     .main-wrapper {
//         height: 0;
//         opacity: 0;
//         overflow: hidden;
//     }
//
//     .foot-bar {
//         height: 0;
//         opacity: 0;
//         overflow: hidden;
//     }
// }

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

    transition: $navShrinkTime all ease-in-out;
    .u-has-scrolled.mq-mobile.u-can-shrink & {
        height: calc(#{$headerHeight} / 2);

        &__text-box {
            font-size: 2.5vh;
        }

        &__logo-box {
            //transform: scale(.5);
            height: 4vh;
            width: calc(4vh + 2px);
            overflow: hidden;
            margin-left: 1rem;
            margin-right: 1rem;

            .logo {
                //border-color: $colorDarkBlue;
                padding: 1px;
            }
        }
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

        transition: $navShrinkTime all ease-in-out;
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
        transition: $navShrinkTime all ease-in-out;
    }

    &__bar {
        .mq-desktop &,
        .mq-laptop & {
            // pushes element to the right-most edge
            margin-left: auto !important;
            margin-right: 2rem !important;
        }
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
