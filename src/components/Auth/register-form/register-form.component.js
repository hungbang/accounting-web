import { mapGetters, mapActions } from 'vuex'
import ENV from '@/environment/'

export default {
  name: 'RegisterForm',
  components: {},
  props: [],
  data () {
    return {
      valid: true,
      firstname: {
        data: null,
        rules: [
          v => !!v || this.$t('validate.required', {text: 'First Name'})
        ]
      },
      lastname: {
        data: null,
        rules: [
          v => !!v || this.$t('validate.required', {text: 'Last Name'})
        ]
      },
      email: {
        data: null,
        rules: [
          v => !!v || this.$t('validate.required', {text: 'E-Mail'}),
          v => ENV.REGEX.EMAIL.test(v) || this.$t('validate.email.valid')
        ]
      },
      pass: {
        data: null,
        show: true,
        rules: [
          v => !!v || this.$t('validate.required', {text: 'Password'}),
          v => (v && v.length) >= 8 || this.$t('validate.min', {number: 8})
        ]
      },
      pass_confirm: {
        data: null,
        show: true,
        rules: [
          v => !!v || this.$t('validate.required', {text: 'Password Confirm'}),
          v => (v && v.length) >= 8 || this.$t('validate.min', {number: 8}),
          v => this.isConfirm(v) || this.$t('validate.pass.confirm')
        ]
      }
    }
  },
  computed: {
    ...mapGetters([
      'isRegister'
    ]),
    passType () {
      return (this.pass.show ? 'password' : 'text')
    },
    passIcon () {
      return (this.pass.show ? 'visibility_off' : 'visibility')
    },
    passConfirmType () {
      return (this.pass_confirm.show ? 'password' : 'text')
    },
    passConfirmIcon () {
      return (this.pass_confirm.show ? 'visibility_off' : 'visibility')
    }
  },
  methods: {
    ...mapActions([
      'notify',
      'signUp'
    ]),
    register () {
      if (this.$refs.form.validate()) {
        var data = {
          firstName: this.firstname.data,
          lastName: this.lastname.data,
          email: this.email.data,
          password: this.pass.data,
          confirmPassword: this.pass_confirm.data
        }

        this.signUp(data)
      }
    },
    isConfirm (v) {
      if (v === this.pass.data) {
        return true
      }
      return false
    },
    passIconCB () {
      this.pass.show = !this.pass.show
    },
    passConfirmIconCB () {
      this.pass_confirm.show = !this.pass_confirm.show
    }
  }
}
