import { mapGetters } from 'vuex'
import AuthRegisterForm from '@/components/Auth/register-form'

export default {
  name: 'Register',
  components: { AuthRegisterForm },
  computed: {
    ...mapGetters([
      'isRegister'
    ]),
    register_title () {
      return this.isRegister ? this.$t('register.success') : this.$t('register.title')
    }
  }
}
