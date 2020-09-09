<template>
  <v-container fluid>
    <v-form
      id="form"
      ref="form"
      @submit.prevent="submit()"
    >
      <v-row>
        <v-col cols="12" class="text-center accent--text">
          <h3>Write a New Post</h3>
        </v-col>
        <v-col cols="12" class="py-0">
          <v-textarea
            v-model="model.description"
            outlined
            label="What's on your mind?"
            counter="2048"
            rows="4"
            auto-grow
            :rules="rules.description"
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
            v-model="model.images"
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
            type="submit"
            form="form"
            :loading="isSubmitting"
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
            :disabled="isSubmitting"
          >
            Cancel
          </v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      /**
       * Controls the button loader
       */
      isSubmitting: false,
      /**
       * Contains the form inputs
       */
      model: {
        images: [],
        description: null,
        friends: []
      },
      /**
       * Contains the search queries for autocomplete elements
       */
      searchInputs: {
        friends: null
      },
      /**
       * Contains the rules that can be used for inputs for this page.
       */
      rules: {
        description: [
          v => !!v || 'This field is required',
          v => (v && v.length <= 2048) || 'Description cannot exceed 2048 characters.'
        ]
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
    },
    /**
     * Publish the post
     */
    async submit () {
      /**
       * Validate the form first
       */
      const isInvalid = !this.$refs.form.validate()

      if (isInvalid) {
        return false
      }

      /**
       * Show the post loader
       */
      this.isSubmitting = true

      /**
       * Transfer the model contents to form data for Laravel Vue compatibilty
       */
      const formData = new FormData()

      formData.append('description', this.model.description)

      this.model.friends.forEach((friend) => {
        formData.append('friend_ids[]', friend.id)
      })

      this.model.images.forEach((image) => {
        formData.append('images[]', image)
      })

      await this.$store.dispatch('posts/save', formData)
        .then((response) => {
          this.$store.commit('posts/UNSHIFT', response.data.data)
          this.$router.push('/')
        })
    }
  }
}
</script>
