import { mapGetters } from 'vuex'

export default {
  name: 'notification',
  components: {},
  props: [],
  data () {
    return {
      notify: false
    }
  },
  computed: {
    ...mapGetters([
      'notifyOpen',
      'notifyObj'
    ]),
    notifyIcon () {
      switch (this.notifyObj.mode) {
        case 'success':
          return 'check_circle'
        case 'error':
          return 'error'
        case 'warning':
          return 'warning'
        case 'info':
          return 'info'
      }
    }
  },
  watch: {
    notifyOpen (newVal, oldVal) {
      this.notify = newVal
    }
  }
}
