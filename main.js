// main.js
import Vue from 'vue'
import App from './App.vue'
import router from './src/router' // 引入路由实例
import store from './utils/index' // 引入 Vuex store
import * as utils from './utils/utils'

Vue.config.productionTip = false

Vue.prototype.$utils = utils // 将工具函数绑定到 Vue 实例上

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')