import Vue from 'vue'
import VueRouter from 'vue-router'

import App from './App.vue'

import FileList from './components/FileList.vue'
import Home from './components/Home.vue'
import Uploader from './components/Uploader.vue'

Vue.use(VueRouter)
Vue.config.productionTip = false

const routes = [
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

const router = new VueRouter({
  base: __dirname,
  routes
})

new Vue({
  router,
  el: '#app',
  render: h => h(App),
})
