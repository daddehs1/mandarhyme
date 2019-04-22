<template>
<ul class="nav-bar" role="navigation">
  <router-link :to="{name: 'home'}">
    <li class="nav-bar__item">
      <home-icon class="nav-bar__icon" />
      <span>Home</span>
    </li>
  </router-link>
  <message-box-link mb-target="about">
    <li class="nav-bar__item">
      <info-icon class="nav-bar__icon" />
      <span>About</span>
    </li>
  </message-box-link>
  <message-box-link mb-target="settings">
    <li class="nav-bar__item u-global-last-of-type">
      <settings-icon class="nav-bar__icon" />
      <span>Settings</span>
    </li>
  </message-box-link>
</ul>
</template>

<script>
import MessageBoxLink from '@/components/MessageBoxLink.vue'

import {
  HomeIcon,
  InfoIcon,
  SettingsIcon
} from 'vue-feather-icons'

export default {
  name: 'nav-bar',
  components: {
    MessageBoxLink,
    HomeIcon,
    InfoIcon,
    SettingsIcon,
  }
}
</script>

<style lang="scss">
.nav-bar {
    &-mqw-laptop-p {
        // pushes element to the right-most edge
        margin-left: auto !important;
        margin-right: 2rem !important;
    }

    //margin-right: 3rem;
    color: $colorDarkOrange;
    padding: 0;
    list-style: none;
    font-size: 1.6rem;
    font-weight: 400;
    letter-spacing: 0.5px;
    display: flex;
    flex-direction: row;
    align-items: center;

    &__item {
        &:not(.u-global-last-of-type) {
            margin-right: 3rem;
        }
        display: flex;
        align-items: center;
        user-select: none;
        cursor: pointer;
    }

    &__icon {
        margin-right: 0.5rem;
        margin-bottom: 3px;
    }
}
</style>
