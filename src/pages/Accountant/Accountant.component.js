import {
  mapActions,
  mapGetters
} from 'vuex'

import env from '@/environment'

import AccountantTable from '@/components/Accountant/table'
import AccountantSmartphone from '@/components/Accountant/smartphone'
import AccountantSaveModal from '@/components/Accountant/modal-save'

export default {
  name: 'Accountant',
  components: {
    AccountantTable,
    AccountantSmartphone,
    AccountantSaveModal
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
        this.screenShare(this.statistics)

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
