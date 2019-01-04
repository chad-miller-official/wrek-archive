import Vue from 'vue'
import VueRouter from 'vue-router'

import App from './App.vue'

import Uploader from './components/Uploader.vue'
import FileList from './components/FileList.vue'

Vue.use(VueRouter)
Vue.config.productionTip = false

const routes = [
  {
    path: '/uploader',
    component: Uploader
  },
  {
    path: '/files',
    component: FileList
  }
]

const router = new VueRouter({
  base: __dirname,
  routes
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
