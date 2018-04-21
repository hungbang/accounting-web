import {
  COIN_TOTAL_BUY, COIN_TOTAL_CURRENT, SUM_TOTAL, PROFIT_LOSS, SCREEN_SHARE, STATISTICS_VIEW
} from '@/store/mutations'

import * as clone from 'lodash/clone'

const state = {
  total: 0,
  statisticsView: [],
  totalView: 0,
  coinToken: ''
}

const getters = {
  statisticsView: state => state.statisticsView,
  sumTotal: state => state.total,
  totalView: state => state.totalView,
  coinToken: state => state.coinToken
}

const actions = {
  coinTotalCurrent ({commit}, coin) {
    commit(COIN_TOTAL_CURRENT, coin)
    commit(SUM_TOTAL)
    commit(PROFIT_LOSS, coin)
  },
  coinTotalBuy ({commit}, coin) {
    commit(COIN_TOTAL_BUY, coin)
    commit(PROFIT_LOSS, coin)
  },
  screenShare ({ commit }, coins) {
    commit(SCREEN_SHARE, coins)
  },
  coinView ({ commit }, token) {
    commit(STATISTICS_VIEW, token)
  }
}

const mutations = {
  [COIN_TOTAL_CURRENT] (state, coin) {
    coin.total_current = coin.amount * coin.price_usd
  },
  [COIN_TOTAL_BUY] (state, coin) {
    coin.total_buy = coin.amount * coin.price_buy
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
