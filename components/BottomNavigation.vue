<template>
  <v-bottom-navigation
    v-model="bottomNav"
    app
  >
    <v-btn
      v-for="(item, index) in items"
      :key="index"
      :value="item.value"
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
        icon: 'mdi-chart-areaspline'
      }, {
        text: 'Browse',
        value: 'browse',
        icon: 'mdi-bookshelf'
      }, {
        text: 'Favorites',
        value: 'favorites',
        icon: 'mdi-heart'
      }, {
        text: 'Settings',
        value: 'settings',
        icon: 'mdi-cog'
      }],
      bottomNav: 'recent'
    }
  }
}
</script>
