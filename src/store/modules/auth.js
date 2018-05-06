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
  signUp ({ state, commit, dispatch }, data) {
    state.isLoading = true
    auth.signUp(data)
      .then(res => auth.enabledUser(res.userId))
      .then(() => {
        dispatch('notify', {
          mode: 'success',
          message: i18n.t('register.success')
        })
        state.isLoading = false
        router.push({name: 'auth-login'})
      }).catch(errors => {
        state.isLoading = false
        commit(API_FAILURE, errors)
      })
  },
  signIn ({ state, commit, rootState }, data) {
    state.isLoading = true
    auth.getToken(helper.queryString(data))
      .then(response => {
        commit(AUTH_LOGIN, response)
      })
      .then(() => coinService.getUserCoin())
      .then(res => {
        let _saveArr = []
        res.filter(coin => {
          _saveArr.push({
            coinName: coin.code_name,
            amount: coin.amount,
            priceBuy: coin.price_buy,
            id: coin.id
          })
        })
        rootState.CoinModules.statistics_tmp = _saveArr
        localStorage.setItem('accountant-coin', JSON.stringify(_saveArr))
        state.isLoading = false
        router.push({name: 'client-accountant'})
      })
      .catch(errors => {
        state.isLoading = false
        commit(API_FAILURE, errors)
        if (state.accessToken) {
          router.push({name: 'client-accountant'})
        }
      })
  },
  signOut ({commit, rootState}) {
    rootState.CoinModules.coins.filter((coin, key) => {
      if (rootState.CoinModules.statistics_tmp && rootState.CoinModules.statistics_tmp.length > 0 && rootState.CoinModules.statistics_tmp.find(_coin => _coin.coinName === coin.id)) {
        coin.amount = null
        coin.total_current = null
        coin.total_buy = null
        coin.textProfitLoss = null
        coin.profitLoss = null
        coin.price_buy = null
      }
    })
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
    localStorage.removeItem('accountant-coin')
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
