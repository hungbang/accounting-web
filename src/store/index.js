import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from './debug/logger'
import NotifyModules from './modules/notify'
import AuthModules from './modules/auth'
import CoinModules from './modules/coin'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    NotifyModules,
    AuthModules,
    CoinModules
  },
  plugins: debug ? [createLogger()] : []
})
