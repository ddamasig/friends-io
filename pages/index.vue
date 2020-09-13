<template>
  <v-container fluid class="mx-0" style="height: 100%;">
    <app-bar-default />

    <v-row v-if="isLoadingPosts" align="center" style="height: 100%;">
      <v-col cols="12" class="text-center">
        <bounce-loader :loading="true" color="#1B498F" />
      </v-col>
    </v-row>

    <v-row v-else>
      <v-col
        v-for="(post, index) in posts"
        :key="index"
        cols="12"
        class="px-0"
      >
        <v-card
          max-width="100%"
          class="mx-auto"
          flat
          @click="viewPost(post)"
        >
          <v-list-item>
            <v-list-item-avatar contain color="grey">
              <v-img :src="`https://picsum.photos/${100 + index}/100`" />
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title class="accent--text line-clamp-1">
                <strong>
                  {{ post.uploader ? post.uploader.name : null }}
                </strong>
              </v-list-item-title>
              <v-list-item-subtitle>
                posted {{ getAge(post.created_at) }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

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

          <v-card-text>
            {{ getShortDescription(post) }}
          </v-card-text>
        </v-card>
        <v-card-actions>
          <v-btn
            text
            :color="getLike(post).color"
            style="text-transform: none;"
            @click="toggleLike(post)"
          >
            <v-badge
              :content="post.likes_count + ''"
              :color="getLike(post).color"
              inline
            >
              <v-icon class="mr-1">
                {{ getLike(post).icon }}
              </v-icon>
              <span>Like</span>
            </v-badge>
          </v-btn>
          <v-btn text color="accent" style="text-transform: none;">
            <v-badge
              :content="post.likes_count + ''"
              color="accent"
              inline
            >
              <v-icon class="mr-1">
                mdi-comment-outline
              </v-icon>
              <span>Comment</span>
            </v-badge>
          </v-btn>
          <v-spacer />
          <v-btn icon>
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </v-card-actions>
        <v-divider v-if="index !== posts.length - 1" class="my-4 mt-5" />
      </v-col>
      <v-col cols="12" class="v-col--load-more">
        <v-card flat>
          <v-card-text class="align-center">
            <v-btn text block color="primary" class="v-btn--load-more">
              See more posts
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>
      <v-btn
        fixed
        dark
        fab
        bottom
        right
        color="primary"
        class="v-btn--add-post"
        to="/posts/create"
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-row>
  </v-container>
</template>

<script>
import moment from 'moment'
import BounceLoader from 'vue-spinner/src/BounceLoader.vue'
import AppBarDefault from '~/components/AppBarDefault'

export default {
  components: {
    AppBarDefault,
    BounceLoader
  },

  /**
   * Will fetch data before loading the HTML
   */
  // async fetch ({ store }) {
  // },

  /**
   * Reactive properties
   */
  data () {
    return {
      isLoadingPosts: true
    }
  },

  /**
   * Pre-processed data
   */
  computed: {
    /**
     * Returns a collection of Post models
     */
    posts () {
      return this.$store.getters['posts/list']
    }
  },

  async created () {
    await this.getPosts()
  },

  /**
   * Functions which can be called throughout the app
   */
  methods: {
    /**
     * Returns an object containing a color and icon class depending if the post is liked by the user
     */
    getLike (post) {
      if (post.is_liked) {
        return {
          color: 'primary',
          icon: 'mdi-thumb-up'
        }
      }
      return {
        color: 'accent',
        icon: 'mdi-thumb-up-outline'
      }
    },
    /**
     * Return the full url of the image
     */
    getImageUrl (post, image) {
      if (post.images) {
        return `${process.env.STORAGE_URL}/${post.id}/${image.file_name}`
      }
      return ''
    },
    /**
     * Redirects to detail page
     */
    viewPost (post) {
      this.$router.push(`/posts/${post.id}`)
    },
    /**
     * Creates a new Like model in the backend
     */
    async toggleLike (post) {
      if (post.is_liked) {
        await this.$store.dispatch('posts/dislike', post)
        this.$store.commit('toast/SHOW', `You disliked ${post.uploader.name}'s post!`)
        return
      }
      await this.$store.dispatch('posts/like', post)
      this.$store.commit('toast/SHOW', `You liked ${post.uploader.name}'s post!`)
    },
    /**
     * Fetch a collection of Post models from the database
     */
    async getPosts () {
      this.isLoadingPosts = true

      await this.$store.dispatch('posts/paginate', {})
        .then(() => {
          this.isLoadingPosts = false
        })
        .catch(() => {})
    },
    /**
     * Returns an icon class depending on the parameter
     */
    getThumbIcon (post) {
      if (post.favorite_at) {
        return 'mdi-thumb-up'
      }
      return 'mdi-thumb-up-outline'
    },
    /**
     * Returns a color class depending on the parameter
     */
    getThumbColor (post) {
      if (post.favorite_at) {
        return 'primary'
      }
      return 'accent'
    },
    /**
     * Returns a trimmed version of a post description
     */
    getShortDescription (post) {
      if (post && post.description && post.description.length >= 150) {
        return `${post.description.substr(0, 150)}...`
      }
      return post.description
    },
    /**
     * Returns a human-readable version of the date parameter
     */
    toReadableDateTime (date) {
      if (date) {
        return moment(date).format('MMMM DD, YYYY hh:mm a')
      }
      return date
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
    }
  },
  /**
   * Configure what appears on the title bar.
   */
  head: () => ({
    title: 'News Feed'
  })
}
</script>
