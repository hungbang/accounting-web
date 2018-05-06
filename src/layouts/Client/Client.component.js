import { mapGetters, mapActions } from 'vuex'
import env from '@/environment'

import VersionModal from '@/components/version'

export default {
  name: 'Client',
  components: {
    VersionModal
  },
  props: [],
  data () {
    return {
      drawer: null,
      mini: false,
      isVersionModal: false
    }
  },
  computed: {
    ...mapGetters([
      'isAuth',
      'coinToken',
      'statistics'
    ])
  },
  methods: {
    ...mapActions([
      'signOut',
      'coinRefresh',
      'openSaveModal',
      'clearCoin',
      'screenShare',
      'notify',
      'versionModal',
      'saveCoin'
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
      } else {
        this.notify({
          mode: 'info',
          message: 'Please choose one coin'
        })
      }
    }
  }
}
