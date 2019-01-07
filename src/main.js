import Vue from 'vue'
import VueRouter from 'vue-router'

import App from './App.vue'

import FileList from './components/FileList.vue'
import Home from './components/Home.vue'
import Uploader from './components/Uploader.vue'

Vue.use(VueRouter)
Vue.config.productionTip = false

const ROUTES = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/files',
    component: FileList
  },
  {
    path: '/uploader',
    component: Uploader
  }
]

const ROUTER = new VueRouter({
  base: __dirname,
  routes: ROUTES
})

new Vue({
  router: ROUTER,
  el: '#app',
  render: h => h(App),
})
