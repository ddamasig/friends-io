<template>
  <v-bottom-navigation
    v-model="bottomNav"
    app
    color="primary"
  >
    <v-btn
      v-for="(item, index) in items"
      :key="index"
      :value="item.value"
      :to="item.link"
    >
      <span>{{ item.text }}</span>
      <v-icon>{{ item.icon }}</v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>

<script>
export default {
  data () {
    return {
      items: [{
        text: 'Popular',
        value: 'popular',
        icon: 'mdi-chart-areaspline',
        link: '/'
      }, {
        text: 'Browse',
        value: 'browse',
        icon: 'mdi-bookshelf',
        link: '/books'
      }, {
        text: 'Favorites',
        value: 'favorites',
        icon: 'mdi-heart',
        link: '/favorites'

      }, {
        text: 'Settings',
        value: 'settings',
        icon: 'mdi-cog',
        link: '/settings'

      }],
      bottomNav: 'recent'
    }
  }
}
</script>
