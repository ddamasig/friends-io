<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" class="text-center accent--text">
        <h3>Write a New Post</h3>
      </v-col>
      <v-col cols="12" class="py-0">
        <v-textarea
          outlined
          label="What's on your mind?"
          counter="2048"
          rows="4"
          auto-grow
        />
      </v-col>
      <v-col cols="12" class="py-0">
        <v-autocomplete
          v-model="model.friends"
          :search-input="searchInputs.friends"
          label="Tag your friends"
          :items="friends"
          item-text="name"
          return-object
          outlined
          multiple
          chips
        />
      </v-col>
      <v-col cols="12" class="py-0">
        <v-file-input
          ref="attachmentInput"
          prepend-icon="mdi-camera"
          chips
          multiple
          outlined
          label="Images"
        />
      </v-col>
      <v-col cols="12">
        <v-btn
          block
          color="primary"
          style="text-transform: none"
        >
          Post
        </v-btn>
      </v-col>
      <v-col cols="12">
        <v-btn
          block
          color="accent"
          style="text-transform: none"
          to="/"
        >
          Cancel
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      model: {
        description: null,
        friends: null,
        images: []
      },
      searchInputs: {
        friends: null
      }
    }
  },

  computed: {
    /**
     * Return a collection of User models who are friends with the logged in user
     */
    friends () {
      return this.$store.getters['friends/list']
    }
  },

  async created () {
    await this.getFriends()
  },

  methods: {
    /**
     * Fetch the friends of the user from the databse
     */
    async getFriends () {
      await this.$store.dispatch('friends/paginate', {
        search: this.searchInputs.friends
      })
    }
  }
}
</script>
