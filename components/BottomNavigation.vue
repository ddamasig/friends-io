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
        text: '',
        value: 'home',
        icon: 'mdi-home',
        link: '/'
      }, {
        text: '',
        value: 'notifications',
        icon: 'mdi-bell',
        link: '/notifications'
      }, {
        text: '',
        value: 'favorites',
        icon: 'mdi-heart',
        link: '/favorites'

      }, {
        text: '',
        value: 'profile',
        icon: 'mdi-account',
        link: '/profile'

      }],
      bottomNav: 'recent'
    }
  }
}
</script>
