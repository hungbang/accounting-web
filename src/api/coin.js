import { _api } from '@/common/api.service'

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
    return _api.get(`protected/coins`)
  },
  saveCoin (data) {
    return _api.post(`protected/coins`, data)
  }
}
