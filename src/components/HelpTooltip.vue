<template>
<div class="help-tooltip">
  <help-circle-icon class="help-tooltip__icon" />
  <div class="help-tooltip__message-box">
    <span class="help-tooltip__message"><slot >Finds only rhyming words that also have the same tone pattern as the search term</slot></span>
  </div>
</div>
</template>

<script>
import {
  HelpCircleIcon
} from 'vue-feather-icons'

export default {
  name: 'help-tooltip',
  components: {
    HelpCircleIcon
  }
}
</script>

<style lang="scss" scoped>
.help-tooltip {
    display: flex;
    align-items: center;
    position: relative;

    &__message {
        color: $colorDarkOrange;
    }

    &__message-box {
        box-sizing: content-box;
        width: 15rem;
        background-color: $colorWhite;
        border: 2px solid $colorDarkBlue;
        border-radius: 2rem;
        position: absolute;
        top: 125%;
        // center box above icon
        right: calc(50%);
        overflow: hidden;
        opacity: 0;
        transition: opacity 0.2s;
        padding: 1rem 1.5rem;
    }

    &__icon {
        cursor: pointer;
        height: 2.2rem;
        width: 2.2rem;

        // colors the inside of the icon
        & circle {
            color: $colorDarkBlue;
        }

        & line,
        & path {
            color: $colorDarkOrange;
        }

        &:hover {
            & ~ .help-tooltip__message-box {
                opacity: 100;
            }
        }
    }
}
</style>
