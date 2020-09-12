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
    notifications () {
      return this.$store.getters['notifications/list']
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
        badge: this.notifications ? this.notifications.length : null
      }, {
        text: '',
        value: 'favorites',
        icon: 'mdi-heart',
        link: '/favorites'

      }, {
        text: '',
        value: 'profile',
        icon: 'mdi-account',
        link: '/profile'

      }]
    }
  }
}
</script>
