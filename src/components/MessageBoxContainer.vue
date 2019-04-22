<template>
<div>
  <template v-for="mb in messageBoxesData">
    <message-box :mb-target="mb.target">
        <template v-slot:title>{{mb.title}}</template>
  <template v-slot:contents>
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

import {
  mapGetters
}
from 'vuex'

export default {
  name: "message-box-container",
  components: {
    MessageBox,
    Settings,
    About
  },
  data() {
    return {
      messageBoxesData: [{
          target: "about",
          title: "About",
          componentName: "about"
        },
        {
          target: "settings",
          title: "Settings",
          componentName: "settings"
        }
      ]
    }
  },
  computed: {
    ...mapGetters(['isMessageBoxRegistered']),
  }
}
</script>
