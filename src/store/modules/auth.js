import { AUTH_LOGIN, AUTH_LOGOUT, API_FAILURE } from '@/store/mutations'

import router from '@/router'
import auth from '@/api/auth'
import coinService from '@/api/coin'
import ENV from '@/environment'
import i18n from '@/translated'
import helper from '@/common/helper.service'

const state = {
  isLoading: false,
  currentUser: {},
  accessToken: !!window.localStorage.getItem(ENV.LOCALSTORAGE.TOKEN),
  refreshtoken: !!window.localStorage.getItem(ENV.LOCALSTORAGE.REFRESH_TOKEN)
}

// getters
const getters = {
  isRegister: state => state.isRegister,
  currentUser: state => state.currentUser,
  isAuth: state => {
    return state.accessToken && state.refreshtoken
  },
  isLoading: state => state.isLoading
}

const actions = {
  signUp ({ commit, dispatch }, data) {
    auth.signUp(data)
      .then(res => auth.enabledUser(res.userId))
      .then(() => {
        dispatch('notify', {
          mode: 'success',
          message: i18n.t('register.success')
        })
        router.push({name: 'auth-login'})
      }).catch(errors => commit(API_FAILURE, errors))
  },
  signIn ({ state, commit, rootState }, data) {
    state.isLoading = true
    auth.getToken(helper.queryString(data))
      .then(response => {
        commit(AUTH_LOGIN, response)
        router.push({name: 'client-accountant'})
      })
      .then(() => coinService.getUserCoin())
      .then(res => {
        let _saveArr = []
        res.filter(coin => {
          _saveArr.push({
            coinName: coin.code_name,
            amount: coin.amount,
            priceBuy: coin.price_buy
          })
        })
        rootState.CoinModules.statistics_tmp = _saveArr
        localStorage.setItem('accountant-coin', JSON.stringify(_saveArr))
        state.isLoading = false
      })
      .catch(errors => commit(API_FAILURE, errors))
  },
  signOut ({commit, rootState}) {
    rootState.CoinModules.coins = []
    rootState.CoinModules.statistics = [{
      coin: {}
    }]
    rootState.CoinModules.statistics_tmp = []
    commit('AUTH_LOGOUT')
  }
}

const mutations = {
  [AUTH_LOGIN] (state, response) {
    state.refreshtoken = response.refresh_token
    state.accessToken = response.access_token
    localStorage.setItem(ENV.LOCALSTORAGE.TOKEN, response.access_token)
    localStorage.setItem(ENV.LOCALSTORAGE.REFRESH_TOKEN, response.refresh_token)
  },
  [AUTH_LOGOUT] (state) {
    localStorage.removeItem(ENV.LOCALSTORAGE.TOKEN)
    localStorage.removeItem(ENV.LOCALSTORAGE.REFRESH_TOKEN)
    state.refreshtoken = ''
    state.accessToken = ''
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
