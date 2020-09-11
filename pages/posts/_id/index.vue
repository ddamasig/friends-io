<template>
  <v-container
    class="post-show--container"
    fluid
  >
    <v-row
      dense
      style="height: 8%;"
    >
      <v-col cols="12" class="text-right">
        <v-btn
          icon
          color="grey"
          to="/"
        >
          <v-icon>
            mdi-close
          </v-icon>
        </v-btn>
      </v-col>
    </v-row>

    <v-row
      align="end"
      style="height: 92%;"
      class="pb-5"
    >
      <v-col cols="12" class="pa-0">
        <v-carousel
          v-if="post.images.length > 0"
          :continuous="false"
          :show-arrows="false"
          hide-delimiter-background
          delimiter-icon="mdi-circle"
          height="300"
        >
          <v-carousel-item
            v-for="(image, i) in post.images"
            :key="i"
            :src="image.url"
          />
        </v-carousel>

        <div class="px-3 pt-4 light--text">
          <h4>
            {{ post.uploader ? post.uploader.name : null }}
          </h4>
          <p>{{ post.description }}</p>
          <small class="grey--text">{{ toReadableDateTime(post.created_at) }}</small>
        </div>
      </v-col>
    </v-row>

    <v-footer
      app
      class="post-show--footer"
      color="black"
    >
      <v-row dense>
        <v-col
          cols="12"
          align-self="start"
          class="pt-0"
        >
          <v-divider style="border-bottom: 1px solid grey" />

          <v-row align="center" justify="center">
            <v-col cols="3" class="text-center">
              <v-btn
                color="grey"
                block
                width="50%"
                icon
              >
                <v-badge
                  color="primary darken-1"
                  content="30"
                  overlap
                >
                  <v-icon class="mr-1">
                    mdi-thumb-up-outline
                  </v-icon>
                </v-badge>
              </v-btn>
            </v-col>

            <v-col cols="3" class="text-center">
              <v-btn
                color="grey"
                block
                width="50%"
                icon
              >
                <v-badge
                  color="primary darken-1"
                  content="30"
                  overlap
                >
                  <v-icon class="mr-1">
                    mdi-comment-outline
                  </v-icon>
                </v-badge>
              </v-btn>
            </v-col>

            <v-col cols="3" class="text-center">
              <v-btn
                color="grey"
                block
                width="50%"
                icon
              >
                <v-icon class="mr-1">
                  mdi-share
                </v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-footer>
  </v-container>
</template>

<script>
import moment from 'moment'

export default {
  layout: 'blank',

  /**
   * Fetch data from the backend before loading the HTML
   */
  async fetch ({ store, route }) {
    await store.dispatch('posts/show', route.params.id)
  },

  /**
   * Pre-processed data
   */
  computed: {
    post () {
      return this.$store.getters['posts/model']
    }
  },

  /**
   * Functions which can be used throughout the page
   */
  methods: {
    /**
     * Returns a human-readable version of the date parameter
     */
    toReadableDateTime (date) {
      if (date) {
        return moment(date).format('MMMM DD, YYYY hh:mm a')
      }
      return date
    }
  }
}
</script>
