<template>
  <div class="text-center ma-2">
    <v-snackbar
      :value="visibility"
      color="primary"
      timeout="2000"
    >
      {{ message }}

      <template v-slot:action="{ attrs }">
        <v-btn
          dark
          text
          v-bind="attrs"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>

export default {
  computed: {
    duration () {
      return this.$store.getters['toast/duration']
    },
    visibility () {
      return this.$store.getters['toast/visibility']
    },
    message () {
      return this.$store.getters['toast/message']
    }
  },
  created () {
    setTimeout(() => {
      this.$store.commit('toast/SET_VISIBILITY', false)
    }, 2000)
  }
}
</script>
