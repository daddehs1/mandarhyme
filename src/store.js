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
    settings: state => state.settings,
    // returns true if any in messageBoxes has true value
    messageBoxes: state => state.messageBoxes,
    isAnyMessageBoxOpen: state => Object.values(state.messageBoxes).reduce((acc, val) => acc || val.open, false),
    isMessageBoxOpen: state => params => state.messageBoxes[params.target].open,
    isMessageBoxRegistered: state => params => state.messageBoxes.hasOwnProperty(params.target)
  },
  mutations: {
    registerMessageBox(state, payload) {
      Vue.set(state.messageBoxes, payload.target, {
        open: false
      })
    },
    deregisterMessageBox(state, payload) {
      Vue.delete(state.messageBoxes, payload.target)
    },
    openMessageBox(state, payload) {
      Vue.set(state.messageBoxes[payload.target], "open", true)
    },
    closeMessageBox(state, payload) {
      Vue.set(state.messageBoxes[payload.target], "open", false)
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
    deregisterMessageBox: ({
      commit
    }, payload) => {
      commit('deregisterMessageBox', payload);
    },
    openMessageBox: ({
      commit
    }, payload) => {
      commit('openMessageBox', payload);
    },
    closeMessageBox: ({
      commit
    }, payload) => {
      commit('closeMessageBox', payload);
    },
    updateSetting: ({
      commit
    }, payload) => {
      commit('updateSetting', payload);
    }
  }
})