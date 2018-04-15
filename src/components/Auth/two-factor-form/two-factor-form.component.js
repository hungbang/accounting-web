import ENV from '@/environment'

export default {
  name: 'TwoFactorForm',
  components: {},
  props: [],
  data () {
    return {
      valid: null,
      factorAuth: {
        data: null,
        rules: [
          v => !!v || this.$t('validate.required', { text: 'Factor Authentication' }),
          v => ENV.REGEX.ONLY_NUMBER.test(v) || this.$t('validate.number', { text: 'Factor Authentication' })
        ]
      }
    }
  },
  computed: {

  },
  mounted () {

  },
  methods: {

  }
}
