<template>
<div>
  <!-- render list of message boxes from component data -->
  <template v-for="mb in messageBoxesData">
    <!-- only render message box if it is currently registered
    message box is registered iff a corresponding
    message-box-link is currently mounted with the same target -->
    <message-box :mb-target="mb.target" v-if="isMessageBoxRegistered({target: mb.target})">
        <template v-slot:title>{{mb.title}}</template>
  <template v-slot:contents>
    <!-- dynamically render component associated with this message box as the contents -->
      <component :is="mb.componentName"></component>
    </template>
  </message-box>
  </template>
</div>
</template>

<script>
import MessageBox from '@/components/MessageBox.vue'
import Settings from '@/components/Settings.vue'
import About from '@/components/About.vue'
import MatchTonesHelp from '@/components/MatchTonesHelp.vue'

import {
  mapGetters
}
from 'vuex'

export default {
  name: "message-box-container",
  components: {
    MessageBox,
    Settings,
    About,
    MatchTonesHelp
  },
  data() {
    return {
      // array of information about message boxes
      messageBoxesData: [{
          target: "about",
          title: "About",
          componentName: "about"
        },
        {
          target: "settings",
          title: "Settings",
          componentName: "settings"
        },
        {
          target: "matchTonesHelp",
          title: "Tone Matching",
          componentName: "match-tones-help"
        }
      ]
    }
  },
  computed: {
    ...mapGetters(['isMessageBoxRegistered']),
  }
}
</script>
