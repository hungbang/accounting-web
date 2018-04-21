import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'ModalSave',
  components: {},
  props: [],
  data () {
    return {

    }
  },
  computed: {
    ...mapGetters([
      'isSaveModal'
    ])
  },
  methods: {
    ...mapActions([
      'closeSaveModal',
      'saveCoin'
    ])
  }
}
