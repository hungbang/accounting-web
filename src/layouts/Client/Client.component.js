import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Client',
  components: {},
  props: [],
  data () {
    return {
      drawer: null,
      mini: false
    }
  },
  computed: {
    ...mapGetters([
      'isAuth'
    ])
  },
  methods: {
    ...mapActions([
      'signOut'
    ])
  }
}
