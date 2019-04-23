<template>
<div class="small-nav" :class="classObject">
  <div @click="toggleNav" class="small-nav__icon">
    <plus-circle-icon/>
  </div>
  <div class="small-nav__nav-wrapper">
    <div class="small-nav__background">
      <nav-bar/>
    </div>
  </div>
</div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import {
  PlusCircleIcon
} from 'vue-feather-icons'

export default {
  name: 'small-nav',
  data() {
    return {
      navOn: false
    }
  },
  methods: {
    toggleNav() {
      this.navOn = !this.navOn
    }
  },
  computed: {
    classObject() {
      return {
        'small-nav--enabled': this.navOn
      }
    }
  },
  components: {
    NavBar,
    PlusCircleIcon
  }
}
</script>

<style lang="scss">
.small-nav {
    .u-message-box-lock &__icon {
        display: none;
    }

    &__icon {
        position: fixed;
        top: 1rem;
        right: 1rem;
        color: $colorDarkOrange;
        z-index: 2;
        transition: 0.3s transform;
    }

    &__background,
    &__nav-wrapper {
        position: absolute;
        top: 0;
        left: 0;
        background-color: $colorWhite;

        height: calc(#{$headerHeight} - 3px);
        width: 100vw;

        .u-has-scrolled.mq-mobile.u-can-shrink & {
            height: calc((#{$headerHeight} / 2) - 3px);
        }
    }

    &__background {
        width: 100vw;
        z-index: 1;
        display: flex;
        justify-content: space-evenly;
        transition: height $navShrinkTime ease-in-out;
        padding-right: 2rem;
    }

    &__nav-wrapper {
        width: 0;
        left: 0;
        z-index: 1;
        overflow: hidden;
        transition: height $navShrinkTime ease-in-out, width $navShrinkTime ease-in-out;
    }

    $this: &;
    &--enabled {
        #{$this} {
            &__icon {
                transform: rotate(45deg) translate(-1.5px, 1px);
                transform-origin: center;
            }

            &__nav-wrapper {
                width: 100vw;
            }
        }
    }
}
</style>
