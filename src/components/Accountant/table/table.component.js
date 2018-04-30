import { mapActions, mapGetters} from 'vuex'

export default {
  name: 'AccountantTable',
  components: { },
  props: [],
  data() {
    return {
      headers: [{
          text: '',
          value: 'name',
          sortable: false,
          width: '50px'
        },
        {
          text: this.$t('accountant.table.title_name'),
          align: 'left',
          sortable: false,
          value: 'name',
          width: '250px'
        },
        {
          text: this.$t('accountant.table.title_amount'),
          value: 'amount',
          width: '200px',
          sortable: false
        },
        {
          text: this.$t('accountant.table.title_price', {
            type: 'Buy'
          }),
          value: 'price_buy',
          width: '200px',
          sortable: false
        },
        {
          text: this.$t('accountant.table.title_price', {
            type: 'Current'
          }),
          value: 'price_current',
          width: '150px',
          sortable: false
        },
        {
          text: this.$t('accountant.table.title_total', { type: 'Buy' }),
          value: 'total',
          sortable: false
        },
        {
          text: this.$t('accountant.table.title_total', { type: 'Current' }),
          value: 'total',
          sortable: false
        },
        {
          text: this.$t('accountant.table.title_profit_loss'),
          value: 'profit_loss',
          sortable: false
        }
      ],
      sumTotal: 0,
      customFilter (item, queryText, itemText) {

        const hasValue = val => val != null ? val : ''
        const coinName = hasValue(item.name)
        const coinSymbol = hasValue(item.symbol)
        const query = hasValue(queryText)

        return ((coinName.toString()
          .toLowerCase()
          .indexOf(query.toString().toLowerCase()) > -1) || (coinSymbol.toString()
          .toLowerCase()
          .indexOf(query.toString().toLowerCase()) > -1))
      }
    }
  },
  created () {
    this.getCoins()
  },
  computed: {
    ...mapGetters([
      'coins', 'statistics'
    ]),
    isRemove() {
      return this.statistics.length > 1
    }
  },
  methods: {
    ...mapActions([
      'getCoins',
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
