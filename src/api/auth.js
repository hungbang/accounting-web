import { _api, api } from '@/common/api.service'

export default {
  verify (data) {
    return _api.post('auth/credentials/verify', data)
  },
  getToken (data) {
    return _api.post('auth/token', data)
  },
  signUp (data) {
    return _api.post('auth/register', data)
  },
  enabled (data) {
    return api.get('http://chuonghd.vantechdns.net/registration/confirm', {
      params: data
    })
  }
}
