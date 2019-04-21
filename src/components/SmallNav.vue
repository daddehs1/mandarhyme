<template>
<div class="small-nav" :class="classObject">
  <div @click="toggleNav" class="small-nav__icon">
    <plus-circle-icon/>
  </div>
  <div class="small-nav__nav-wrapper">
    <nav-bar/>
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
        transition: transform 0.5s ease;
        z-index: 999;
    }

    &__nav-wrapper {
        position: fixed;
        top: 0;
        left: 0;
        width: 0;
        display: flex;
        justify-content: space-evenly;
        background-color: $colorWhite;
        overflow: hidden;
        z-index: 1;
        transition: width 0.5s ease;
        height: calc(#{$headerHeight} - 3px);
    }

    $this: &;
    &--enabled {
        #{$this} {
            &__icon {
                transform: rotate(45deg) translate(-1.5px, 1px);
                transform-origin: center;
            }

            &__nav-wrapper {
                width: 100%;
            }
        }
    }
}
</style>
