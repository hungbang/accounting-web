import Notification from '@/components/notification'

export default {
  name: 'Default',
  components: {
    Notification
  },
  data () {
    return {
      direction: 'top',
      fab: false,
      transition: 'slide-y-reverse-transition',
      languague: [
        'en', 'vn'
      ]
    }
  },
  created () {
    //  [App.vue specific] When App.vue is first loaded start the progress bar
    this.$Progress.start()
    //  hook the progress bar to start before we move router-view
    this.$router.beforeEach((to, from, next) => {
      //  does the page we want to go to have a meta.progress object
      if (to.meta.progress !== undefined) {
        let meta = to.meta.progress
        // parse meta tags
        this.$Progress.parseMeta(meta)
      }
      //  start the progress bar
      this.$Progress.start()
      //  continue to next page
      next()
    })
    //  hook the progress bar to finish after we've finished moving router-view
    this.$router.afterEach((to, from) => {
      //  finish the progress bar
      this.$Progress.finish()
      window.scrollTo(0, 0)
    })
  },
  computed: {
    showLang () {
      return this.$i18n.locale
    }
  },
  mounted () {
    this.$Progress.finish()
  },
  methods: {
    changeLanguague (lang) {
      this.$i18n.locale = lang
    }
  }
}
