import {
  RECEVER_COINS, RECEVER_SAVE_COIN,
  ADD_COIN, REMOVE_COIN, CLEAR_COIN,
  SCREEN_SHARE, STATISTICS_VIEW,
  API_FAILURE
} from '@/store/mutations'

import ENV from '@/environment'

import router from '@/router'
import coinService from '@/api/coin'
import * as clone from 'lodash/clone'
import * as uniqBy from 'lodash/uniqBy'

const state = {
  coins: [],
  statistics: [
    {
      coin: {}
    }
  ],
  isSaveModal: false,
  isVersionModal: (localStorage.getItem(ENV.APP_VERSION) ? false : true),
  statistics_tmp: JSON.parse(localStorage.getItem('accountant-coin')),
  statisticsView: [],
  totalView: 0,
  coinToken: '',
  coinLoading: false,
  isRenderCoinTmp: false
}

const getters = {
  coins: state => state.coins,
  statistics: state => state.statistics,
  isSaveModal: state => state.isSaveModal,
  isVersionModal: state => state.isVersionModal,
  statisticsView: state => state.statisticsView,
  totalView: state => state.totalView,
  coinToken: state => state.coinToken,
  coinLoading: state => state.coinLoading
}

const actions = {
  getCoins ({ state, commit, dispatch }) {
    if (state.statistics_tmp && state.statistics_tmp.length) {
      commit(RECEVER_SAVE_COIN)
    }
  },
  wsCoins ({ commit }, coins) {
    commit(RECEVER_COINS, coins)
  },
  addCoin ({commit}) {
    commit(ADD_COIN)
  },
  removeCoin ({ state, commit, dispatch }, idx) {
    if (state.statistics[idx].coin.codeshark_id) {
      coinService.removeCoin(state.statistics[idx].coin.codeshark_id)
        .then(res => {
          dispatch('notify', {
            mode: 'success',
            message: 'Data has been successfully deleted'
          })
          commit(REMOVE_COIN, idx)
        })
        .catch(errors => {
          commit(API_FAILURE, errors)
        })
    } else {
      commit(REMOVE_COIN, idx)
    }
  },
  screenShare ({ commit }, coins) {
    commit(SCREEN_SHARE, coins)
  },
  coinView ({ commit }, token) {
    commit(STATISTICS_VIEW, token)
  },
  saveCoin ({ state, commit, dispatch, rootGetters }, type) {
    if (state.statistics && state.statistics[0].coin.id) {
      let _saveArr = []
      let _saveTmp = clone(state.statistics)

      _saveTmp.filter(item => {
        if (item.coin.id) {
          _saveArr.push({
            coinName: item.coin.id,
            amount: item.coin.amount,
            priceBuy: item.coin.price_buy,
            id: item.coin.codeshark_id
          })
        }
      })

      if (type) {
        if (rootGetters.isAuth) {
          let _online = {
            coinDatas: _saveArr
          }
          coinService.saveCoin(_online)
            .then(res => {
              state.statistics.filter((item, key) => {
                let _resTmp = res.find(coin => coin.code_name === item.coin.id)
                if (_resTmp) {
                  state.statistics[key].coin.codeshark_id = _resTmp.id
                  _saveArr[key].id = _resTmp.id
                }
              })

              localStorage.setItem('accountant-coin', JSON.stringify(_saveArr))
              dispatch('notify', {
                mode: 'success',
                message: 'Data was saved successfully!'
              })
            })
            .catch(errors => commit(API_FAILURE, errors))
        } else {
          router.push({name: 'auth-register'})
          dispatch('notify', {
            mode: 'success',
            message: 'To continue using this feature, please register a new account !'
          })
        }
      } else {
        localStorage.setItem('accountant-coin', JSON.stringify(_saveArr))
        dispatch('notify', {
          mode: 'success',
          message: 'Data was saved successfully!'
        })
      }
    } else {
      dispatch('notify', {
        mode: 'info',
        message: 'Please choose one coin'
      })
    }

    state.isSaveModal = false
  },
  clearCoin ({ commit, dispatch }, type) {
    commit(CLEAR_COIN)
    dispatch('notify', {
      mode: 'success',
      message: 'Data has been successfully deleted'
    })
  },
  openSaveModal ({ state }) {
    state.isSaveModal = true
  },
  closeSaveModal ({ state }) {
    state.isSaveModal = false
  },
  versionModal ({ state }, status) {
    state.isVersionModal = status

    if (!status && !localStorage.getItem(ENV.APP_VERSION)) {
      localStorage.setItem(ENV.APP_VERSION, false)
      localStorage.removeItem(ENV.APP_OLD_VERSION)
    }
  },
  duplicateCoins ({ state, dispatch }, coinSelected) {
    let _coinsTmp = []
    let _coinSort = []

    setTimeout(() => {
      state.statistics.filter(item => {
        _coinsTmp.push(item.coin)
      })

      _coinsTmp = uniqBy(_coinsTmp, 'id')

      _coinsTmp.filter(item => {
        _coinSort.push({coin: item})
      })

      state.statistics = _coinSort
    }, 100)
  }
}

const mutations = {
  [RECEVER_COINS] (state, coins) {
    if (state.coins.length > 2) {
      state.coins.filter((coin, key) => {
        state.coins[key].price_usd = coins.find(item => item.id === coin.id).price_usd
      })
    } else {
      coins.forEach(item => {
        item.amount = null
        item.price_buy = null
      })

      state.coins = coins
    }
  },
  [RECEVER_SAVE_COIN] (state) {
    state.statistics = []
    state.statistics_tmp.filter((item, key) => {
      state.statistics.push({coin: state.coins.find(coin => coin.id === item.coinName)})

      state.statistics[key].coin.amount = item.amount
      state.statistics[key].coin.price_buy = item.priceBuy
      state.statistics[key].coin.codeshark_id = item.id
    })

    state.isRenderCoinTmp = true
  },
  [ADD_COIN] (state) {
    state.statistics.push({ coin: {} })
  },
  [REMOVE_COIN] (state, idx) {
    state.coins.find(item => {
      if (item.id === state.statistics[idx].coin.id) {
        item.amount = null
        item.total_current = null
        item.total_buy = null
        item.textProfitLoss = null
        item.profitLoss = null
        item.price_buy = null
      }
    })

    state.statistics.splice(idx, 1)

    if (localStorage.getItem('accountant-coin')) {
      let _saveArr = []
      let _saveTmp = clone(state.statistics)

      _saveTmp.filter(item => {
        if (item.coin.id) {
          _saveArr.push({
            coinName: item.coin.id,
            amount: item.coin.amount,
            priceBuy: item.coin.price_buy,
            id: item.coin.codeshark_id
          })
        }
      })

      localStorage.setItem('accountant-coin', JSON.stringify(_saveArr))
    }
  },
  [CLEAR_COIN] (state) {
    state.coins = []
    state.statistics = [{
      coin: {}
    }]
    state.statistics_tmp = []
    localStorage.removeItem('accountant-coin')
  },
  [SCREEN_SHARE] (state, coins) {
    let _token
    let _statistics = clone(coins)

    _statistics = _statistics.filter(item => item.coin.id)

    if (_statistics.length) {
      _token = $.base64.encode(JSON.stringify(_statistics))
      state.coinToken = _token
    }
  },
  [STATISTICS_VIEW] (state, token) {
    let _total = 0
    state.statisticsView = JSON.parse($.base64.decode(token))
    state.statisticsView.forEach(item => {
      if (item.coin.total_current) {
        item.coin.profit_loss = item.coin.total_current - item.coin.total_buy

        if (item.coin.profit_loss > 0) {
          item.coin.isProfitLoss = true
        } else {
          item.coin.isProfitLoss = false
        }

        _total += item.coin.total_current
      }
    })

    state.totalView = _total
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
