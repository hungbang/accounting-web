import {
  mapActions,
  mapGetters
} from 'vuex'

import env from '@/environment'

import AccountantTable from '@/components/accountant-table'
import AccountantSmartphone from '@/components/accountant-smartphone'

export default {
  name: 'Accountant',
  components: {
    AccountantTable,
    AccountantSmartphone
  },
  props: [],
  data () {
    return {

    }
  },
  computed: {
    ...mapGetters([
      'statistics', 'coinToken'
    ])
  },
  mounted () {

  },
  methods: {
    ...mapActions([
      'screenShare',
      'notify'
    ]),
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
