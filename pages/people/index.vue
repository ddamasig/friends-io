<template>
  <v-container fluid class="px-0">
    <v-app-bar app color="light">
      <v-toolbar-title>Community</v-toolbar-title>
    </v-app-bar>
    <v-tabs
      v-model="tab"
    >
      <v-tab
        v-for="item in items"
        :key="item.tab"
      >
        {{ item.tab }}
      </v-tab>
    </v-tabs>

    <v-row
      v-if="isLoading"
      align="center"
      style="height: 100%;"
    >
      <v-col cols="12" class="text-center">
        <bounce-loader :loading="true" color="#1B498F" />
      </v-col>
    </v-row>

    <template v-else>
      <v-tabs-items v-model="tab" class="px-0 mx-0">
        <v-tab-item class="px-0 mx-0">
          <v-list class="px-0 mx-0">
            <div
              v-for="(friend, index) in friends"
              :key="index"
            >
              <v-list-item @click="visitFriend(friend)">
                <v-list-item-avatar class="my-auto">
                  <v-img src="https://picsum.photos/100/100" />
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title v-text="friend.name" />
                  <v-list-item-subtitle v-text="friend.email" />
                </v-list-item-content>
              </v-list-item>
              <v-divider />
            </div>
          </v-list>
        </v-tab-item>

        <v-tab-item class="px-0 mx-0">
          <v-list class="px-0 mx-0">
            <div
              v-for="(friendRequest, index) in friendRequests"
              :key="index"
            >
              <v-list-item @click="visitPerson(person)">
                <v-list-item-avatar class="my-auto">
                  <v-img :src="`https://picsum.photos/${100 + index}/100`" />
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title v-text="`${friendRequest.sender.name} sent you a friend request.`" />
                  <v-list-item-subtitle v-text="getAge(friendRequest.created_at)" />
                  <v-list-item-subtitle class="text-right">
                    <v-btn
                      small
                      color="primary"
                      @click.stop="accept(friendRequest)"
                    >
                      Accept
                    </v-btn>
                    <v-btn
                      small
                      color="red"
                      dark
                      @click.stop="reject(friendRequest)"
                    >
                      Reject
                    </v-btn>
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-divider />
            </div>
          </v-list>
        </v-tab-item>

        <v-tab-item class="px-0 mx-0">
          <v-list class="px-0 mx-0">
            <div
              v-for="(person, index) in people"
              :key="index"
            >
              <v-list-item @click="visitPerson(person)">
                <v-list-item-avatar class="my-auto">
                  <v-img :src="`https://picsum.photos/${100 + index}/100`" />
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title v-text="person.name" />
                  <v-list-item-subtitle v-text="person.email" />
                </v-list-item-content>

                <v-list-item-avatar>
                  <v-btn icon color="primary" @click="addFriend(person)">
                    <v-icon>mdi-account-plus</v-icon>
                  </v-btn>
                </v-list-item-avatar>
              </v-list-item>
              <v-divider />
            </div>
          </v-list>
        </v-tab-item>
      </v-tabs-items>
    </template>
  </v-container>
</template>

<script>
import moment from 'moment'

export default {
  /**
   * Retrieve data from the backend before rendering the HTML
   */
  async fetch ({ store }) {
    await store.dispatch('friends/paginate')
    await store.dispatch('people/paginate')
    await store.dispatch('friend-requests/paginate')
  },

  /**
   * Reactive properties
   */
  data () {
    return {
      isLoading: true,
      /**
       * Controls the tab contents
       */
      tab: 0,
      items: [{
        tab: 'Friends'
      }, {
        tab: 'Requests'
      }, {
        tab: 'Discover'
      }]
    }
  },

  /**
   * Pre-processed data
   */
  computed: {
    /**
     * Returns a collection of User instances which are not yet friends with the user
     */
    people () {
      return this.$store.getters['people/list']
    },
    /**
     * Returns a collection of Friend instances
     */
    friends () {
      return this.$store.getters['friends/list']
    },
    /**
     * Returns a collection of Friend instances
     */
    friendRequests () {
      return this.$store.getters['friend-requests/list']
    }
  },

  created () {
    this.isLoading = false
  },

  /**
   * Will execeute after the HTML is rendered
   */
  mounted () {
    if (this.$route.query.tab) {
      this.tab = 1
    }
  },

  /**
   * Functions available throughout the page
   */
  methods: {
    /**
     * Fetch the user's friends from the database
     */
    async getFriends () {
      await this.$store.dispatch('friends/paginate')
    },
    /**
     * Fetch the user's friends from the database
     */
    async getFriendRequests () {
      await this.$store.dispatch('friend-requests/paginate')
    },
    /**
     * Fetch a collection of User instances which are not friends with the user
     */
    async getPeople () {
      await this.$store.dispatch('friends/paginate')
    },
    /**
     * Redirect to a friends profile page
     */
    visitFriend (friend) {
      console.log('visiting friend')
    },
    /**
     * Redirect to a friends profile page
     */
    visitPerson (person) {
      console.log('visiting person')
    },
    /**
     * Returns the age of the post
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
    },
    /**
     * Accept the friend request
     */
    async accept (friendRequest) {
      await this.$store.dispatch('friend-requests/update', {
        id: friendRequest.id,
        status: 'accepted'
      })
        .then((response) => {
          this.$store.commit('toast/SHOW', `You are now friends with ${friendRequest.sender.name}.`)
          this.$store.commit('friend-requests/DELETE', friendRequest)
          this.$store.commit('friends/INSERT', friendRequest.sender)
        })
    },
    /**
     * Reject the friend request
     */
    async reject (friendRequest) {
      await this.$store.dispatch('friend-requests/update', {
        id: friendRequest.id,
        status: 'rejected'
      })
        .then((response) => {
          this.$store.commit('toast/SHOW', `You are rejected the friend request from ${friendRequest.sender.name}.`)
          this.$store.commit('friend-requests/DELETE', friendRequest)
        })
    },
    /**
     * Send a friend request
     */
    async addFriend (person) {
      await this.$store.dispatch('friend-requests/save', {
        user_id: person.id
      })
        .then((response) => {
          this.$store.commit('toast/SHOW', `Friend request sent to ${person.name}.`)
        })
    }
  }
}
</script>
