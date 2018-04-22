import {
  mapActions,
  mapGetters
} from 'vuex'

import env from '@/environment'

export default {
  name: 'AccountantSmartphone',
  components: {},
  props: [],
  data () {
    return {

    }
  },
  computed: {
    ...mapGetters([
      'coins', 'statistics'
    ]),
    isRemove() {
      return this.statistics.length > 1
    }
  },
  mounted () {

  },
  methods: {
    ...mapActions([
      'addCoin',
      'removeCoin'
    ]),
    islose (coin) {
      return coin.total_current < coin.total_buy
    },
    total (coin, type) {
      let _total = '-'

      switch (type) {
        case 'buy':
          if (coin.price_buy && coin.amount) {
            _total = coin.amount * coin.price_buy
            coin.total_buy = _total
          }
          break;
        case 'current':
          if (coin.price_usd && coin.amount) {
            _total = coin.amount * coin.price_usd
            coin.total_current = _total
          }
          break;
      }

      return _total
    },
    profitLoss (coin) {
      if (coin.total_current) {
        this.sumCoin()

        if (coin.total_buy) {
          let _profitLoss = coin.total_current - coin.total_buy

          if (_profitLoss > 0) {
            coin.textProfitLoss = 'trending_up'
          } else {
            coin.textProfitLoss = 'trending_down'
          }

          return _profitLoss
        }
      }
    },
    sumCoin () {
      let _total = 0

      this.statistics.forEach(item => {
        if (item.coin.total_current) {
          _total += item.coin.total_current
        }
      })

      this.sumTotal = _total
    }
  }
}
