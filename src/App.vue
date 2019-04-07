<template>
<div id="app" :class="classObject">
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
  <div class="main-wrapper">
    <router-view/>
  </div>
  <div class="foot-bar">
    <span class="foot-bar__text">Made by <span class="foot-bar__name">@daddehs1</span></span>
  </div>
</div>
</template>

<script>
import {
  mapGetters
} from 'vuex'

import Logo from '@/components/Logo.vue'
import NavBar from '@/components/NavBar.vue'
import SmallNav from '@/components/SmallNav.vue'

export default {
  components: {
    Logo,
    NavBar,
    SmallNav
  },
  computed: {
    ...mapGetters(['messageBoxOpen']),
    classObject() {
      var classObject = {
        'u-message-box-lock': this.messageBoxOpen,
      }
      classObject['mq-' + this.$mq] = true;
      return classObject;
    }
  }
}
</script>

<style lang="scss">
@import "./sass/global.scss";
</style>

<style lang="scss" scoped>
#app {
    height: 100%;
    width: 100%;

    &.u-message-box-lock {
        overflow: hidden !important;
    }
}

.layout {
    height: 100%;
    display: grid;
    grid-template-rows: 3fr 6fr 1fr;

    &__header {
        background-color: #5DAE79;
    }

    &__body {
        background-color: white;
    }

    &__footer {
        background-color: white;
    }
}

.main-heading {
    text-align: center;
    &__primary {}
}
</style>
