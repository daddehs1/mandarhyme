<template>
<div class="message-box" :class="classObject">
  <!-- close message box if clicking outside of contents -->
  <div @click="close" class="message-box__wrapper">
  </div>
  <div class="message-box__contents">
    <span class="message-box__title">
      <!-- slot for the title of the message box, displayed at the top -->
      <slot name="title"></slot>
    </span>
    <!-- "X" to close the message box, displayed at the top right -->
    <span @click="close" class="message-box__exit">X</span>
    <div class="message-box__message">
      <!-- slot for the content of the message box, displayed under the title -->
      <slot name="contents"></slot>
    </div>
  </div>
</div>
</template>

<script>
import {
  mapGetters,
  mapActions
} from 'vuex';

export default {
  name: 'message-box',
  // mb-target refers to the message-box target
  // is used to communicate with store
  props: ['mb-target'],

  methods: {
    // actions mapped from the store
    ...mapActions(['closeMessageBox', 'activateMessageBox', 'deactivateMessageBox']),

    /**
     * [helper function to attach a keypress listener to the window for closing on enter press]
     * @param  {[Event Object]} event The Event Object associated with the keypress
     */
    addEventListenerFunc(event) {
      // if this message box is open AND the key pressed is "enter"
      if (this.isOpen && event.keyCode === 13) {
        this.close();
      }
    },

    /**
     * [communicate with store to close this message box]
     */
    close() {
      this.closeMessageBox({
        target: this.mbTarget
      });
    }
  },
  computed: {
    // getters mapped from store
    ...mapGetters(['isMessageBoxOpen']),

    // helper to bind class to component root
    classObject() {
      return {
        // modifier class to signify message box is open
        "message-box--active": this.isOpen
      };
    },

    // communicates with store to determine whether this message box is open
    isOpen() {
      return this.isMessageBoxOpen({
        target: this.mbTarget
      })
    }
  },
  mounted() {
    // globally listen to enter key in order to exit out of message box
    // use named method to be able to match in case of multiple listeners
    window.addEventListener('keyup', this.addEventListenerFunc);
  },
  destroyed() {
    window.removeEventListener('keyup', this.addEventListenerFunc);
  }
}
</script>

<style lang="scss">
.message-box {
    &__wrapper {
        position: fixed;
        width: 0;
        height: 0;
        top: 0;
        left: 0;
        -webkit-transform: translate3d(0, 0, 0);
        transform: translate3d(0, 0, 0);
        z-index: 1000;
        background-color: $colorLightGrey;
        overflow: hidden;
        opacity: 0;
        transition: height 0s 0.2s, width 0s 0.2s, opacity 0.2s;
    }

    &__contents {
        position: fixed;
        height: 0;
        width: 0;
        top: 5vh;
        left: 5vw;
        padding: 2rem;
        text-align: center;
        -webkit-transform: translate3d(0, 0, 0);
        transform: translate3d(0, 0, 0);
        z-index: 2000;
        border: 0 solid darkblue;
        opacity: 0;
        background-color: $colorWhite;
        overflow: hidden;
        transition: height 0s 0.2s, width 0s 0.2s, border 0s 0.2s, opacity 0.2s;
    }

    &__title {
        display: block;
        color: $colorOrange;
        font-size: 2.4rem;
        font-weight: 300;
        margin-bottom: 0.5rem;
    }

    &__message {
        color: $colorBlack;
        font-size: 1.4rem;
        overflow-y: scroll;
        -webkit-overflow-scrolling: touch;
        height: 100%;
    }

    &__exit {
        font-size: 1.6rem;
        color: $colorDarkOrange;
        position: absolute;
        top: 1rem;
        right: 2rem;
        cursor: pointer;
    }

    $mb: &;
    &--active {
        #{$mb} {
            &__wrapper {
                height: 100%;
                width: 100%;
                opacity: 100;
                transition: opacity 0s;
            }

            &__contents {
                height: 90%;
                width: 90%;
                top: 5vh;
                left: 5vw;
                border: 2px solid $colorDarkBlue;
                opacity: 100;
                box-shadow: 0.3rem 0.3rem 0.3rem rgba($colorBlack, .2);
                transition: opacity 0.2s;
            }
        }
    }
}
//TODO: Add modal-open modifier (through store?) to prevent body from scrolling
</style>
