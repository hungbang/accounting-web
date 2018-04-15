import { ADD_COIN, REMOVE_COIN, RECEVER_COINS, COIN_TOTAL_BUY, COIN_TOTAL_CURRENT, SUM_TOTAL, API_FAILURE } from '@/store/mutations'
import coinService from '@/api/coin'

const state = {
  coins: [],
  statistics: [
    {
      coin: {}
    }
  ],
  total: 0
}

const getters = {
  coins: state => state.coins,
  statistics: state => state.statistics,
  sumTotal: state => state.total
}

const actions = {
  getCoins ({ commit }) {
    coinService.coins()
      .then(res => commit(RECEVER_COINS, res))
      .catch(errors => commit(API_FAILURE, errors))
  },
  coinTotalCurrent ({commit}, idx) {
    commit(COIN_TOTAL_CURRENT, idx)
    commit(SUM_TOTAL)
  },
  coinTotalBuy ({commit}, idx) {
    commit(COIN_TOTAL_BUY, idx)
  },
  addCoin ({commit}) {
    commit(ADD_COIN)
  },
  removeCoin ({ commit }, idx) {
    commit(REMOVE_COIN, idx)
    commit(SUM_TOTAL)
  }
}

const mutations = {
  [RECEVER_COINS] (state, coins) {
    coins.forEach(item => {
      item.amount = null
      item.price_buy = null
    })

    state.coins = coins
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
      }
    })

    state.statistics.splice(idx, 1)
  },
  [COIN_TOTAL_CURRENT] (state, coin) {
    coin.total_current = coin.amount * coin.price_usd
  },
  [COIN_TOTAL_BUY] (state, coin) {
    coin.total_buy = coin.amount * coin.price_buy
  },
  [SUM_TOTAL] (state) {
    let _total = 0

    state.statistics.forEach(item => {
      if (item.coin.total_current) {
        _total += item.coin.total_current
      }
    })

    state.total = _total
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
