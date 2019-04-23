<template>
<!-- prevent default form submit behavior
  on submit, close corresponding message box -->
<form @submit.prevent="closeSettings" ref="settings-form">
  <info-container>
    <!-- render list of settings using data -->
    <info-group v-for="setting in settingsArray">
      <template v-slot:label>{{setting.labels.main}}</template>
      <template v-slot:content>
        <!-- switch box to choose between binary options -->
        <!-- call update on any change-->
        <switch-box :name="setting.name" double :checked="settings[setting.name]" @change.native="update">
          <!-- label for off state -->
          <template v-slot:label-left>{{setting.labels.left}}</template>
      <!-- label for on state -->
      <template v-slot:label-right>{{setting.labels.right}}</template>
      </switch-box>
      </template>
    </info-group>
    <info-group>
      <template v-slot:content>
        <!-- button used to close corresponding message box -->
        <Button class="settings__save" label="Save" />
      </template>
    </info-group>
  </info-container>
</form>
</template>

<script>
import {
  mapGetters,
  mapActions
} from 'vuex';

import Button from '@/components/Button.vue'
import SwitchBox from '@/components/SwitchBox.vue'
import InfoContainer from '@/components/InfoContainer.vue'
import InfoGroup from '@/components/InfoGroup.vue'

export default {
  name: 'settings',
  components: {
    Button,
    SwitchBox,
    InfoContainer,
    InfoGroup
  },
  data() {
    return {
      // array of information about settings options
      settingsArray: [{
          name: "characterSet",
          labels: {
            main: "Character Set",
            left: "Simplified",
            right: "Traditional"
          }
        },
        {
          name: "pronunciationSet",
          labels: {
            main: "Pronunciation",
            left: "Pinyin",
            right: "Zhuyin"
          }
        },
        {
          name: "defaultSortOrder",
          labels: {
            main: "Sort Order",
            left: "Frequency",
            right: "Alphabetical"
          }
        },
        {
          name: "defaultMatchTones",
          labels: {
            main: "Match Tones by Default",
            left: "No",
            right: "Yes"
          }
        }
      ]
    }
  },
  computed: {
    ...mapGetters(['settings'])
  },
  methods: {
    ...mapActions(['closeMessageBox', 'updateSetting']),
    // close the corresponding message box
    closeSettings() {
      this.closeMessageBox({
        target: 'settings'
      });
    },
    // relay any change in settings with the store 
    update(e) {
      var element = e.srcElement;
      var name = element.name;
      var value = element.checked;
      this.updateSetting({
        settingName: name,
        settingValue: value
      });
    }
  }
}
</script>
