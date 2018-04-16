import { ADD_COIN, REMOVE_COIN, RECEVER_COINS, COIN_TOTAL_BUY, COIN_TOTAL_CURRENT, SUM_TOTAL, PROFIT_LOSS, API_FAILURE } from '@/store/mutations'
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
  coinTotalCurrent ({commit}, coin) {
    commit(COIN_TOTAL_CURRENT, coin)
    commit(SUM_TOTAL)
    commit(PROFIT_LOSS, coin)
  },
  coinTotalBuy ({commit}, coin) {
    commit(COIN_TOTAL_BUY, coin)
    commit(PROFIT_LOSS, coin)
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
        item.textProfitLoss = null
        item.profitLoss = null
        item.price_buy = null
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
  },
  [PROFIT_LOSS] (state, coin) {
    if (coin.total_current && coin.total_buy) {
      coin.profit_loss = coin.total_current - coin.total_buy

      if (coin.profit_loss > 0) {
        coin.isProfitLoss = true
        coin.textProfitLoss = 'trending_up'
      } else {
        coin.isProfitLoss = false
        coin.textProfitLoss = 'trending_down'
      }
    } else {
      coin.isProfitLoss = null
      coin.profit_loss = '-'
      coin.textProfitLoss = 'trending_flat'
    }
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
