import './assets/styles'

import Vue from 'vue'

import App from './App.vue'
import { useElementUI, useErrorHandler } from './hooks'
import router from './router'

Vue.config.productionTip = false

useElementUI(Vue)
useErrorHandler(Vue)

new Vue({ router, render: h => h(App) }).$mount('#app')
