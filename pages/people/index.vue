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
              v-for="(people, index) in people"
              :key="index"
            >
              <v-list-item @click="visitPerson(people)">
                <v-list-item-avatar class="my-auto">
                  <v-img :src="`https://picsum.photos/${100 + index}/100`" />
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title v-text="people.name" />
                  <v-list-item-subtitle v-text="people.email" />
                </v-list-item-content>
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
export default {
  /**
   * Retrieve data from the backend before rendering the HTML
   */
  async fetch ({ store }) {
    await store.dispatch('friends/paginate')
    await store.dispatch('people/paginate')
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
    }
  },

  created () {
    this.isLoading = false
  },

  /**
   * Functions available throughout the page
   */
  methods: {
    /**
     * Fetch the user's friends from the database
     */
    async getFriends () {
      await this.$store.dispatch('friends/paginate', { isFriend: true })
    },
    /**
     * Fetch a collection of User instances which are not friends with the user
     */
    async getPeople () {
      await this.$store.dispatch('friends/paginate', { isFriend: false })
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
     * Send a friend request
     */
    sendFriendRequest () {
      console.log('sending friend request')
    }
  }
}
</script>
