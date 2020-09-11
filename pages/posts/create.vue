<template>
  <v-container fluid>
    <v-form
      id="form"
      ref="form"
      class="px-0"
      @submit.prevent="submit()"
    >
      <v-app-bar app color="light">
        <v-btn icon to="/">
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>

        <v-toolbar-title>Create Post</v-toolbar-title>

        <v-spacer />

        <v-btn
          type="submit"
          form="form"
          color="primary"
          :loading="isSubmitting"
        >
          Post
        </v-btn>
      </v-app-bar>
      <v-row dense>
        <v-col cols="12" class="accent--text mb-3">
          <v-list-item>
            <v-list-item-avatar>
              <v-img src="https://picsum.photos/100" />
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title v-text="$auth.user.name" />
              <v-list-item-subtitle v-text="$auth.user.email" />
            </v-list-item-content>
          </v-list-item>
        </v-col>
        <v-col cols="12" class="pas-0">
          <v-textarea
            v-model="model.description"
            outlined
            placeholder="What's on your mind?"
            counter="2048"
            rows="8"
            auto-grow
            dense
            :rules="rules.description"
          />
        </v-col>
        <v-col cols="12" class="py-0">
          <v-autocomplete
            v-model="model.friends"
            :search-input="searchInputs.friends"
            placeholder="Tag your friends"
            deletable-chips
            clearable
            auto-select-first
            open-on-clear
            :items="friends"
            item-text="name"
            return-object
            outlined
            multiple
            dense
            small-chips
          />
        </v-col>
        <v-col cols="12" class="py-0">
          <v-file-input
            ref="attachmentInput"
            v-model="model.images"
            prepend-inner-icon="mdi-camera"
            prepend-icon=""
            dense
            small-chips
            multiple
            outlined
            placeholder="Images"
          />
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
