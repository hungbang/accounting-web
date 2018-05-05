import { _api } from '@/common/api.service'

export default {
  getToken (data) {
    return _api.post('http://etz.trade/oauth/token', data, {
      headers: {
        'content-type': 'application/x-www-form-urlencoded;charset=UTF-8',
        Authorization: 'Basic ' + btoa('accountant-client:android-secret')
      }
    })
  },
  signUp (data) {
    return _api.post('http://etz.trade/api/public/users', data)
  },
  enabledUser (userId) {
    return _api.get(`http://etz.trade/api/public/users/enabled/${userId}`)
  }
}
