import {
  mapActions,
  mapGetters
} from 'vuex'

import DialogDetails from '@/components/accountant-table/dialog-details'

export default {
  name: 'AccountantTable',
  components: {
    DialogDetails
  },
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
          width: '150px',
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
          text: this.$t('accountant.table.title_total', { type: 'Buy' }),
          value: 'total',
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
          text: this.$t('accountant.table.title_total', { type: 'Current' }),
          value: 'total',
          sortable: false
        }
      ],
      isDialog: false,
      dialogData: {}
    }
  },
  created () {
    this.getCoins();
  },
  computed: {
    ...mapGetters([
      'coins', 'statistics', 'sumTotal'
    ]),
    isRemove() {
      return this.statistics.length > 1
    }
  },
  methods: {
    ...mapActions([
      'getCoins',
      'addCoin',
      'removeCoin',
      'coinTotalCurrent',
      'coinTotalBuy'
    ]),
    setFocus(data) {
      if (data.name && data.amount) {
        this.getCoinDetails(data)
      }
    },
    showDetails(data) {
      this.isDialog = true;
    },
    closeDetails(event) {
      this.isDialog = event;
    },
    islose (coin) {
      return coin.total_current < coin.total_buy
    }
  }
}
