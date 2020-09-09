<template>
  <v-container style="height: 100%;">
    <v-row align="center" style="height: 100%;">
      <v-col cols="12" class="text-center">
        <bounce-loader :loading="true" color="orange" :size="size" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import BounceLoader from 'vue-spinner/src/BounceLoader.vue'

export default {
  auth: 'guest',

  layout: 'blank',

  components: {
    BounceLoader
  },

  data () {
    return {
      token: this.$route.query.token ? this.$route.query.token : null
    }
  },

  mounted () {
    this.$auth.setToken('local', `Bearer ${this.token}`)
    this.$auth.setStrategy('local')

    this.$auth.fetchUser()
      .then(() => {
        return this.$router.push('/')
      })
      .catch((e) => {
        this.$auth.logout()
        return this.$router.push(`/auth/${this.$route.query.origin ? this.$route.query.origin : 'register'}?error=Your token appears to be invalid, please try again.`)
      })
  }
}
</script>
