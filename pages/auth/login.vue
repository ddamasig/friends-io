<template>
  <v-container class="fill-height">
    <v-form
      id="form"
      ref="form"
      @submit.prevent="login()"
    >
      <v-row class="align-center px-4">
        <v-col class="text-center" cols="12">
          <v-icon
            size="50"
            class="mb-1"
            color="primary"
          >
            mdi-account-group
          </v-icon>
          <h1 class="accent--text">
            friends.io
          </h1>
        </v-col>
        <v-col cols="12" class="mb-0 pb-0">
          <v-text-field
            v-model="model.email"
            outlined
            label="Email"
            type="email"
            single-line
            prepend-inner-icon="mdi-email"
            :rules="rules.email"
          />
        </v-col>
        <v-col cols="12" class="mt-0 pt-0">
          <v-text-field
            v-model="model.password"
            outlined
            label="Password"
            type="password"
            single-line
            prepend-inner-icon="mdi-lock"
            :rules="rules.password"
          />
        </v-col>
        <v-col cols="12">
          <v-btn
            color="primary"
            large
            block
            type="submit"
            form="form"
            :loading="isLoggingIn"
            :disabled="isLoggingInUsingGoogle"
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
            color="accent"
            block
            form="none"
            :loading="isLoggingInUsingGoogle"
            :disabled="isLoggingIn"
            @click="socialLogin('google')"
          >
            <v-icon class="mr-1">
              mdi-google
            </v-icon>
            Login using Google
          </v-btn>
        </v-col>
      </v-row>
    </v-form>

    <div class="text-center ma-2">
      <v-snackbar v-model="snackbar.show" color="accent">
        {{ snackbar.message }}

        <template v-slot:action="{ attrs }">
          <v-btn
            color="primary"
            text
            v-bind="attrs"
            @click="snackbar.show = false"
          >
            Close
          </v-btn>
        </template>
      </v-snackbar>
    </div>
  </v-container>
</template>

<script>

export default {
  /**
   * Do not use auth middleware for this route.
   */
  auth: 'guest',

  /**
   * User the layout without the bottom navigation.
   */
  layout: 'blank',

  data () {
    return {
      /**
       * Controls the loading state of the login button
       */
      isLoggingIn: false,
      isLoggingInUsingGoogle: false,
      /**
       * Contains the credentials to be passed
       */
      model: {
        email: null,
        password: null
      },
      /**
       * Contains the rules that can be used for inputs for this page.
       */
      rules: {
        email: [
          v => !!v || 'Please enter your e-mail.',
          v => /.+@.+\..+/.test(v) || 'Please enter a valid e-mail.'
        ],
        password: [
          v => !!v || 'Please enter your password',
          v => (v && v.length >= 8) || 'Your password must be atleast 8 characters.'
        ]
      },
      /**
       * Controls the v-snackbar element for displaying errors.
       */
      snackbar: {
        show: false,
        message: null
      }
    }
  },

  computed: {
    baseUrl () {
      return process.env.BASE_URL
    }
  },

  methods: {
    /**
     * Attempt to authenticate user using the credentials.
     */
    async login () {
      /**
       * Validate the credentials before making an HTTP request.
       */
      const isInvalid = !this.$refs.form.validate()

      if (isInvalid) {
        return false
      }

      this.isLoggingIn = true

      try {
        /**
         * Login using the Nuxt auth module. See config in nuxt.config.js.
         */
        await this.$auth.loginWith('local', {
          data: this.model
        })

        /**
         * Upon successfull login redirect to home page.
         */
        this.$router.push('/')
      } catch (error) {
        /**
         * Show login button loader and reset password field upon error.
         */
        this.isLoggingIn = false
        this.model.password = null

        /**
         * Use snackbar to display what went wrong.
         */
        if (error.response) {
          this.snackbar.message = error.response.data.error.message
          this.snackbar.show = true
        }
      }
    },
    /**
     * Attempt to login using socialite
     */
    socialLogin (service) {
      if (service === 'google') {
        this.isLoggingInUsingGoogle = true
      }

      window.location.replace(`${this.baseUrl}/login/google`)
    }
  },
  /**
   * Configure what appears on the title bar.
   */
  head: () => ({
    title: 'Login'
  })
}
</script>
