<template>
  <v-container>
    <app-bar-default />

    <v-row>
      <v-col cols="12">
        <h3 class="text-center accent--text">
          Categories
        </h3>
      </v-col>
      <v-col cols="12">
        <v-autocomplete ref="searchInput" dense single-line outlined label="Type keywords here" />
      </v-col>
      <v-col
        v-for="(category, index) in categories"
        :key="index"
        cols="6"
        class="pa-1"
      >
        <v-card
          outlined
          height="25vh"
          @click="onClickCategory(category.id)"
        >
          <v-card-title>
            <v-spacer />
            <v-avatar
              size="75"
              tile
            >
              <v-icon color="primary" size="40">
                {{ category.icon }}
              </v-icon>
            </v-avatar>
            <v-spacer />
          </v-card-title>

          <v-card-actions>
            <v-spacer />
            <span>{{ category.title }}</span>
            <v-spacer />
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-btn
      fixed
      dark
      fab
      bottom
      style="margin-bottom: 8vh;"
      right
      color="primary"
      elevation="10"
      @click="onClickSearchButton()"
    >
      <v-icon>mdi-magnify</v-icon>
    </v-btn>
  </v-container>
</template>

<script>
import AppBarDefault from '~/components/AppBarDefault'

export default {
  components: {
    AppBarDefault
  },
  data () {
    return {
      showSearchOverlay: true,
      categories: [{
        id: 1,
        title: 'Mathematics',
        description: 'Adipisicing velit do reprehenderit incididunt aliquip eu consectetur tempor officia eiusmod.',
        icon: 'mdi-android-studio',
        color: 'purple'
      }, {
        id: 2,
        title: 'Science',
        description: 'Enim ea ex dolore et magna ullamco qui veniam do ut ea id.',
        icon: 'mdi-beaker',
        color: 'green'
      }, {
        id: 3,
        title: 'History',
        description: 'Duis esse quis qui exercitation elit eu reprehenderit.',
        icon: 'mdi-pillar',
        color: 'blue'
      }, {
        id: 4,
        title: 'Literature',
        description: 'Culpa sit officia esse officia ad sit tempor dolore reprehenderit id esse excepteur sunt tempor.',
        icon: 'mdi-book-open-outline',
        color: 'blue'
      }, {
        id: 5,
        title: 'Computer Studies',
        description: 'Culpa sit officia esse officia ad sit tempor dolore reprehenderit id esse excepteur sunt tempor.',
        icon: 'mdi-xml',
        color: 'blue'
      }, {
        id: 6,
        title: 'Photography',
        description: 'Dolore laborum ad exercitation dolore deserunt dolore ut.',
        icon: 'mdi-camera',
        color: 'brown'
      }]
    }
  },
  methods: {
    onClickSearchButton () {
      this.$refs.searchInput.focus()
    },
    onClickCategory (id) {
      this.$router.push(`/posts/${id}/contents`)
    },
    getHeartColor (book) {
      if (book.favorite_at) {
        return 'red'
      }
      return ''
    },
    getShortDescription (book) {
      return `${book.description.substr(0, 150)}...`
    }
  }
}
</script>
