<template>
  <v-container>
    <p>Please wait...</p>
  </v-container>
</template>

<script>
export default {
  auth: 'guest',

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
