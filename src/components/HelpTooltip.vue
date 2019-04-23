<template>
<div class="help-tooltip">
  <message-box-link :mb-target="this.mbTarget">
    <help-circle-icon class="help-tooltip__icon" />
  </message-box-link>
</div>
</template>

<script>
import MessageBoxLink from '@/components/MessageBoxLink.vue'

import {
  HelpCircleIcon
} from 'vue-feather-icons'

export default {
  name: 'help-tooltip',
  // mb-target refers to the message-box target for this tooltip
  props: ["mb-target"],
  components: {
    MessageBoxLink,
    HelpCircleIcon
  }
}
</script>

<style lang="scss" scoped>
.help-tooltip {
    &__icon {
        cursor: pointer;
        height: 2.2rem;
        width: 2.2rem;

        // colors the inside of the icon
        & circle {
            stroke: $colorDarkBlue !important;

        }

        & line,
        & path {
            stroke: $colorDarkOrange !important;
        }
    }
}
</style>
