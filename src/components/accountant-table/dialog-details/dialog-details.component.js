export default {
  name: 'DialogDetails',
  components: {},
  props: [
    'isOpen', 'coin'
  ],
  data () {
    return {

    }
  },
  computed: {

  },
  mounted () {

  },
  methods: {
    closeModal () {
      this.$emit('closeModal', false);
    }
  }
}
