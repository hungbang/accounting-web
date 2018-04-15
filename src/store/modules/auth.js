import { AUTH_LOGIN, AUTH_LOGOUT, AUTH_REGISTER, AUTH_ENABLED, API_FAILURE } from '@/store/mutations'

import router from '@/router'
import auth from '@/api/auth'
import ENV from '@/environment'
import i18n from '@/translated'

const state = {
  isRegister: false,
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
  }
}

const actions = {
  signUp ({ commit }, data) {
    auth.signUp(data)
      .then(response => {
        commit(AUTH_REGISTER, response)
      })
      .catch(errors => commit(API_FAILURE, errors))
  },
  signIn ({ commit }, data) {
    auth.verify(data)
      .then(response => auth.getToken(response))
      .then(response => {
        commit(AUTH_LOGIN, response)
        router.push({name: 'client-home'})
      })
      .catch(errors => commit(API_FAILURE, errors))
  },
  signOut ({commit}) {
    commit('AUTH_LOGOUT')
  },
  enabled ({commit, dispatch}, data) {
    auth.enabled(data)
      .then(response => {
        commit(AUTH_ENABLED, response)
        dispatch('notify', {
          mode: 'success',
          message: i18n.t('enabled.msg_success')
        })
      })
      .catch(errors => commit(API_FAILURE, errors))
  }
}

const mutations = {
  [AUTH_LOGIN] (state, response) {
    state.refreshtoken = response.refreshToken
    state.accessToken = response.accessToken
    localStorage.setItem(ENV.LOCALSTORAGE.TOKEN, response.accessToken)
    localStorage.setItem(ENV.LOCALSTORAGE.REFRESH_TOKEN, response.refreshToken)
  },
  [AUTH_LOGOUT] (state) {
    localStorage.clear()
    state.refreshtoken = ''
    state.accessToken = ''
    router.push({name: 'client-home'})
  },
  [AUTH_REGISTER] (state, response) {
    state.isRegister = true
  },
  [AUTH_ENABLED] (state, response) {
    router.push({name: 'auth-login'})
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
