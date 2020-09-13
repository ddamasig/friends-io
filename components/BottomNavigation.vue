<template>
  <v-bottom-navigation
    v-model="bottomNav"
    app
    color="primary"
  >
    <v-btn
      v-for="(item, index) in items"
      :key="index"
      :value="item.value"
      :to="item.link"
    >
      <v-badge
        v-if="item.badge"
        :content="item.badge"
        color="red"
        overlap
      >
        <v-icon>{{ item.icon }}</v-icon>
      </v-badge>

      <v-icon v-else>
        {{ item.icon }}
      </v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>

<script>
import lodash from 'lodash'

export default {

  /**
   * Fetch data from the backend before rendering the HTML
   */
  async fetch ({ store }) {
    await store.dispatch('notifications/paginate')
  },

  /**
   * Reactive properties
   */
  data () {
    return {
      bottomNav: 'recent'
    }
  },

  /**
   * Pre-processed data
   */
  computed: {
    unreadNotifications () {
      return this.$store.getters['notifications/unreadList']
    },
    items () {
      return [{
        text: '',
        value: 'home',
        icon: 'mdi-home',
        link: '/'
      }, {
        text: '',
        value: 'notifications',
        icon: 'mdi-bell',
        link: '/notifications',
        badge: this.unreadNotifications ? this.unreadNotifications.length : null
      }, {
        text: '',
        value: 'people',
        icon: 'mdi-account-group',
        link: '/people'

      }, {
        text: '',
        value: 'profile',
        icon: 'mdi-account-circle',
        link: '/profile'

      }]
    }
  },

  /**
   * Will be executed once the component has been rendered
   */
  mounted () {
    this.listenForNotifications()
  },

  /**
   * Functions that can be used throughout the page
   */
  methods: {
    /**
     * Fetch user notifications from database
     */
    getNotifications: lodash.debounce(async function () {
      await this.$store.dispatch('notifications/paginate')
    }, 500),
    /*
     * Listen for socket events using laravel echo
     */
    listenForNotifications () {
      this.$echo
        .channel('friendsio_database_user-channel')
        .listen('.LikeEvent', (notification) => {
          this.getNotifications()
        })

      /**
       * User private channels after the broadcast authetication issue is fixed
       */

      // this.$echo
      //   .channel(`friendsio_database_private-Core.Models.User.${this.$auth.user.id}`)
      //   .listen('.LikeEvent', (notification) => {
      //     this.$store.commit('notifications/INSERT', notification)
      //   })
      // .listen('Illuminate\\Notifications\\Events\\BroadcastNotificationCreated', (notification) => {
      //   console.log(notification)
      //   this.$store.commit('notifications/INSERT', notification)
      // })
    }

  }
}
</script>
