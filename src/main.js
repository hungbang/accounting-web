// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Default from '@/layouts/Default'
import router from '@/router'
import Vuetify from 'vuetify'
import VueProgressBar from 'vue-progressbar'
import VueClipboard from 'vue-clipboard2'
import i18n from './translated'
import store from './store'

import 'jquery-base64'
import 'babel-polyfill'
import 'vuetify/dist/vuetify.min.css'
import 'material-design-icons/iconfont/material-icons.css'

const progressBarOpts = {
  color: '#87ffc8',
  failedColor: '#ff0000',
  thickness: '3px',
  transition: {
    speed: '0.2s',
    opacity: '0.6s',
    termination: 300
  },
  autoRevert: true,
  location: 'top',
  inverse: false
}

Vue.use(Vuetify, {})
Vue.use(VueClipboard)
Vue.use(VueProgressBar, progressBarOpts)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  i18n,
  store,
  components: { Default },
  template: '<default />'
})
