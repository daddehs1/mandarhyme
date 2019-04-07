import Vue from 'vue'
import App from './App.vue'
import VueMq from 'vue-mq'

import router from './router'
import store from './store'

Vue.config.productionTip = false

Vue.use(VueMq, {
  breakpoints: {
    mobile: 450,
    tablet: 900,
    laptop: 1250,
    desktop: Infinity,
  },
  defaultBreakpoint: 'desktop'
});

new Vue({
  router,
  store,
  render: function(h) {
    return h(App)
  }
}).$mount('#app')