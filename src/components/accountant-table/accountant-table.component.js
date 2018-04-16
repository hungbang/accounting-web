import {
  mapActions,
  mapGetters
} from 'vuex'

import env from '@/environment'
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
      isDialog: false,
      dialogData: {}
    }
  },
  created () {
    this.getCoins();
  },
  computed: {
    ...mapGetters([
      'coins', 'statistics', 'sumTotal', 'coinToken'
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
      'coinTotalBuy',
      'screenShare',
      'notify'
    ]),
    showDetails(data) {
      this.isDialog = true;
    },
    closeDetails(event) {
      this.isDialog = event;
    },
    islose (coin) {
      return coin.total_current < coin.total_buy
    },
    copyToken () {
      if (this.statistics && this.statistics[0].coin.id) {
        this.screenShare()

        this.$copyText(`${env.DOMAIN}view?token=${this.coinToken}`)
          .then(res => {
            this.notify({
              mode: 'success',
              message: 'Copy to clipboard successfully'
            })
          }, error => {
            this.notify({
              mode: 'error',
              message: 'Failed to copy url'
            })
          })
      }
    }
  }
}
