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
      'coins', 'statistics', 'sumTotal'
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
      'removeCoin',
      'coinTotalCurrent',
      'coinTotalBuy'
    ]),
    islose (coin) {
      return coin.total_current < coin.total_buy
    }
  }
}
