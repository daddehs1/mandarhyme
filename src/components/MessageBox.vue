<template>
<div @:keyup.up="deactivate" class="message-box" :class="classObject">
  <div @click="activate" class="message-box__trigger">
    <slot name="trigger"></slot>
  </div>
  <div @click="deactivate" class="message-box__wrapper">
  </div>
  <div class="message-box__contents">
    <span class="message-box__title">
      <slot name="title"></slot>
    </span>
    <span @click="deactivate" class="message-box__exit">X</span>
    <div class="message-box__message">
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
  props: ['id'],
  data() {
    return {
      addEventListenerFunc: event => {
        if (this.active && event.keyCode === 13) {
          this.deactivate()
        }
      }
    }
  },
  methods: {
    ...mapActions(['registerMessageBox', 'activateMessageBox', 'deactivateMessageBox']),
    activate() {
      this.activateMessageBox({
        id: this.id
      });
    },
    deactivate() {
      this.deactivateMessageBox({
        id: this.id
      });
    }
  },
  computed: {
    ...mapGetters(['messageBox']),
    classObject() {
      return {
        "message-box--active": this.active
      };
    },
    active() {
      return this.messageBox({
        id: this.id
      })
    }
  },
  created() {
    // this.$store.dispatch('registerMessageBox', {
    //   id: this.id
    // });
    // // register message box into store
    this.registerMessageBox({
      id: this.id
    });
  },
  mounted() {
    // globally listen to enter key in order to exit out of message box
    // use named function variable to be able to match in case of multiple listeners
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
        border: 0 solid $colorDarkBlue;
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
