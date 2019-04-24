import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
      path: '/',
      name: 'home',
      alias: '/home',
      component: Home
    },
    {
      path: '/search',
      name: 'search',
      component: function() {
        return import ( /* webpackChunkName: "about" */ './views/Search.vue')
      }
    }
  ]
})