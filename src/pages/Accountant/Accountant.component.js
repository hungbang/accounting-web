import { mapActions, mapGetters } from 'vuex'

import { Sock, StompClient } from '@/common/socket'
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
  created () {
    Sock.onopen = () => {
      StompClient.subscribe('/stock/price', (val) => {
        this.wsCoins(JSON.parse(val.body))
      })
    }
  },
  computed: {
    ...mapGetters([
      'coins'
    ])
  },
  methods: {
    ...mapActions([
      'wsCoins'
    ])
  }
}
