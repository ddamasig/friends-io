<template>
  <v-container fluid>
    <v-app-bar app color="light">
      <v-toolbar-title>Notifications</v-toolbar-title>
    </v-app-bar>
    <v-row class="px-0">
      <v-col cols="12" class="px-0">
        <v-list class="px-0">
          <div
            v-for="(item, index) in notifications"
            :key="index"
            class="px-0"
          >
            <like-notification v-if="item.data.type === 'LikeNotification'" :notification="item" />
            <friend-request-notification v-if="item.data.type === 'FriendRequestNotification'" :notification="item" />
            <v-divider />
          </div>
        </v-list>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import moment from 'moment'
import LikeNotification from '~/components/LikeNotification'
import FriendRequestNotification from '~/components/FriendRequestNotification'

export default {
  /**
   * Imported components
   */
  components: {
    LikeNotification,
    FriendRequestNotification
  },

  /**
   * Pre-processed data
   */
  computed: {
    notifications () {
      return this.$store.getters['notifications/list']
    }
  },

  /**
   * Will be executed as soon as all data is ready
   */
  async created () {
    await this.getNotifications()
  },

  /**
   * Functions that can be used throughout the page.
   */
  methods: {
    /**
     * Fetch the notifications of the user from the database
     */
    async getNotifications () {
      await this.$store.dispatch('notifications/paginate', {})
    },
    /**
     * Returns the age of the notification
     */
    getAge (date) {
      const minutes = moment().diff(moment(date), 'minutes')

      if (minutes < 1) {
        return ' few seconds ago'
      } else if (minutes < 60) {
        return moment().diff(moment(date), 'minutes') + ' minutes ago'
      } else if (minutes < 1440) {
        return moment().diff(moment(date), 'hours') + ' hours ago'
      } else if (minutes < 43800) {
        return moment().diff(moment(date), 'days') + ' days ago'
      }
    }
  }
}
</script>
