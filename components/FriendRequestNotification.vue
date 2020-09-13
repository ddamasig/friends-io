<template>
  <v-list-item
    class="blue lighten-5 py-2"
    :to="`/people?tab=requests`"
  >
    <v-list-item-avatar class="my-auto">
      <v-img src="https://picsum.photos/100/100" />
    </v-list-item-avatar>

    <v-list-item-content>
      <v-list-item-title
        :class="{ 'font-weight-medium' : notification.read_at === null }"
        v-text="`${notification.data.friend_request.sender.name} sent you a friend request`"
      />
      <v-list-item-subtitle>
        {{ getAge(notification.created_at) }}
      </v-list-item-subtitle>
    </v-list-item-content>
  </v-list-item>
</template>

<script>
import moment from 'moment'

export default {
  props: {
    notification: {
      type: Object,
      default: () => {}
    }
  },

  /**
   * Functions that can be accessed throughout the component
   */
  methods: {
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
