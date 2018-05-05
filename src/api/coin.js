import { _api, _apiAuth } from '@/common/api.service'

export default {
  coins () {
    return _api.get(`accountants/coins/supported`)
  },
  checkCoin (data) {
    return _api.get(`accountants/coins/supported/${data.name}`)
  },
  getDetails (data) {
    return _api.get(`accountants/coins/supported/${data.name}/${data.amount}`)
  },
  getUserCoin () {
    return _apiAuth.get(`protected/coins`)
  },
  saveCoin (data) {
    return _apiAuth.post(`protected/coins`, data)
  }
}
