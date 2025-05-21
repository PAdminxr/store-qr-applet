// main.js

import Vue from 'vue'

import App from './App.vue'
import * as utils from './utils/utils'
Vue.prototype.$utils = utils
import store from './utils/index'

Vue.config.productionTip = false


const app = new Vue({
  store,
  render: h => h(App)
})

app.$mount('#app')