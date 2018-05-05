import { mapActions, mapGetters } from 'vuex'
import ENV from '@/environment'

export default {
  name: 'login-form',
  components: {},
  props: [],
  data () {
    return {
      valid: true,
      snackbar: false,
      password: {
        data: '',
        show: true,
        rules: [
          v => !!v || this.$t('validate.required', { text: 'password' }),
          v => (v && v.length) >= 8 || this.$t('validate.min', { number: 8 })
        ]
      },
      email: {
        data: '',
        rules: [
          v => !!v || this.$t('validate.required', { text: 'E-Mail' }),
          v => ENV.REGEX.EMAIL.test(v) || this.$t('validate.email.valid')
        ]
      }
    }
  },
  computed: {
    ...mapGetters([
      'isLoading'
    ]),
    passwordType () {
      return (this.password.show ? 'password' : 'text')
    },
    passwordIcon () {
      return (this.password.show ? 'visibility_off' : 'visibility')
    }
  },
  mounted () {

  },
  methods: {
    ...mapActions([
      'notify',
      'signIn'
    ]),
    login () {
      if (this.$refs.form.validate()) {
        var _data = {
          username: this.email.data,
          password: this.password.data,
          grant_type: 'password',
          enabled: true
        }
        this.signIn(_data)
      }
    },
    passwordIconCB () {
      this.password.show = !this.password.show
    }
  }
}
