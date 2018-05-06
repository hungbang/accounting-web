import { NOTIFY_CLEAR, NOTIFY_OPEN, API_FAILURE } from '@/store/mutations'
import env from '@/environment'
// import router from '@/router'

const state = {
  notifyObj: {},
  notifyOpen: false,
  notifyClose: ''
}

// getters
const getters = {
  notifyOpen: state => state.notifyOpen,
  notifyObj: state => state.notifyObj
}

const actions = {
  notify ({ commit }, notifyObj) {
    commit(NOTIFY_OPEN, notifyObj)

    commit(NOTIFY_CLEAR)
  }
}

const mutations = {
  [NOTIFY_OPEN] (state, notifyObj) {
    state.notifyObj = notifyObj

    state.notifyOpen = true
  },
  [NOTIFY_CLEAR] (state) {
    if (state.notifyClose) {
      clearTimeout(state.notifyClose)
    }

    state.notifyClose = setTimeout(() => {
      state.notifyOpen = false
      state.notifyObj = {}
    }, env.NOTIFY.DURATION)
  },
  [API_FAILURE] (state, errors) {
    if (errors.response) {
      var _data = errors.response.data
      var _msg

      if (_data.errorMessage) {
        _msg = _data.errorMessage
      }

      if (_data.fieldErrors) {
        _data.fieldErrors.forEach(element => {
          _msg += `<br />- ${element.field}`
        })
      }

      if (errors.response.status === 500) {
        _msg = 'Something went wrong'
      }

      actions.notify(this, {
        mode: 'error',
        message: _msg
      })

      // console.log(errors.response.data, 'data')
      // console.log(errors.response.status, 'status')
      // console.log(errors.response.headers, 'headers')
    } else if (errors.request) {
      actions.notify(this, {
        mode: 'error',
        message: 'Something went wrong'
      })
    } else if (errors.error) {
      actions.notify(this, {
        mode: 'error',
        message: errors.error
      })
    }
    // router.push({name: 'auth-login'})
    // console.log(errors.config)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
