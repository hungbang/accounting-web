import { mapActions } from 'vuex'

export default {
  name: 'Enabled',
  components: {},
  props: [],
  created () {
    this.enabledAccount()
  },
  data () {
    return {

    }
  },
  computed: {

  },
  methods: {
    ...mapActions([
      'enabled'
    ]),
    enabledAccount () {
      var _data = {
        token: this.$route.query.token
      }
      this.enabled(_data)
    }
  }
}
