import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    settings: {
      characterSet: false,
      pronunciationSet: false,
      defaultSortOrder: false,
      defaultMatchTones: false
    },
    messageBoxes: {}
  },
  getters: {
    // returns true if any in messageBoxes has true value
    settings: state => state.settings,
    messageBoxOpen: state => Object.values(state.messageBoxes).reduce((acc, val) => acc || val, false),
    messageBox: state => params => state.messageBoxes[params.id]
  },
  mutations: {
    registerMessageBox(state, payload) {
      Vue.set(state.messageBoxes, payload.id, false)
    },
    activateMessageBox(state, payload) {
      Vue.set(state.messageBoxes, payload.id, true)
    },
    deactivateMessageBox(state, payload) {
      Vue.set(state.messageBoxes, payload.id, false)
    },
    updateSetting(state, payload) {
      Vue.set(state.settings, payload.settingName, payload.settingValue);
    }
  },
  actions: {
    registerMessageBox: ({
      commit
    }, payload) => {
      commit('registerMessageBox', payload);
    },
    activateMessageBox: ({
      commit
    }, payload) => {
      commit('activateMessageBox', payload);
    },
    deactivateMessageBox: ({
      commit
    }, payload) => {
      commit('deactivateMessageBox', payload);
    },
    updateSetting: ({
      commit
    }, payload) => {
      commit('updateSetting', payload);
    }
  }
})