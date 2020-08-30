<template>
  <v-container class="fill-height">
    <v-row class="align-center">
      <v-col class="text-center" cols="12">
        <h1 class="accent--text">
          <v-icon size="50" class="mb-1" color="primary">
            mdi-book-open-blank-variant
          </v-icon>
          Books.io
        </h1>
      </v-col>
      <v-col cols="12">
        <v-text-field
          filled
          rounded
          label="Email"
          type="email"
          single-line
          hide-details
          prepend-inner-icon="mdi-email"
        />
      </v-col>
      <v-col cols="12">
        <v-text-field
          filled
          rounded
          label="Password"
          type="password"
          single-line
          hide-details
          prepend-inner-icon="mdi-lock"
        />
      </v-col>
      <v-col cols="12">
        <v-btn
          color="primary"
          large
          block
          rounded
        >
          <v-icon class="mr-1">
            mdi-login
          </v-icon>
          Login
        </v-btn>
      </v-col>
      <v-col cols="12">
        <v-btn
          large
          class="accent--text"
          block
          rounded
          text
        >
          <v-icon class="mr-1">
            mdi-account-plus
          </v-icon>
          Create an Account
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

export default {
  layout: 'login',
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>
