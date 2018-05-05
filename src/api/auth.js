import { api } from '@/common/api.service'

export default {
  getToken (data) {
    return api.post('https://etz.trade/oauth/token', data, {
      headers: {
        'content-type': 'application/x-www-form-urlencoded;charset=UTF-8',
        Authorization: 'Basic ' + btoa('accountant-client:android-secret')
      }
    })
  },
  signUp (data) {
    return api.post('https://etz.trade/api/public/users', data)
  },
  enabledUser (userId) {
    return api.get(`https://etz.trade/api/public/users/enabled/${userId}`)
  }
}
