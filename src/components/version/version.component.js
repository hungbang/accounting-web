import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'version',
  components: {},
  props: [],
  data () {
    return {

    }
  },
  computed: {
    ...mapGetters([
      'isVersionModal'
    ])
  },
  mounted () {

  },
  methods: {
    ...mapActions([
      'versionModal'
    ])
  }
}
