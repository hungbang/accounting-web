import {
  mapActions,
  mapGetters
} from 'vuex'

export default {
  name: 'AccountantView',
  components: {},
  props: [],
  data() {
    return {
      headers: [{
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
          text: this.$t('accountant.table.title_total', {
            type: 'Buy'
          }),
          value: 'total',
          sortable: false
        },
        {
          text: this.$t('accountant.table.title_total', {
            type: 'Current'
          }),
          value: 'total',
          sortable: false
        },
        {
          text: this.$t('accountant.table.title_profit_loss'),
          value: 'profit_loss',
          sortable: false
        }
      ]
    }
  },
  created () {
    if (this.$route.query.token) {
      this.coinView(this.$route.query.token)
    } else {
      this.$router.push({ name: 'client-accountant' })
    }
  },
  computed: {
    ...mapGetters([
      'coins', 'statisticsView', 'totalView'
    ])
  },
  methods: {
    ...mapActions([
      'coinView',
      'coinTotalCurrent',
      'coinTotalBuy'
    ]),
    islose (coin) {
      return coin.total_current < coin.total_buy
    }
  }
}
