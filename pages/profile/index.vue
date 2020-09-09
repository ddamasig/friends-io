<template>
  <v-container
    id="container"
    class="pt-0"
    :style="{ backgroundImage: `url('https://picsum.photos/400/300')` }"
  >
    <v-row
      id="first-row"
      justify="center"
      align="center"
    >
      <v-col
        cols="12"
        class="text-center"
      >
        <v-card class="profile-card">
          <v-card-title
            class="text-center"
            style="width: 100%;"
          >
            <v-avatar
              size="120"
              color="grey"
              class="center-content elevation-5"
            >
              <img src="https://picsum.photos/200" alt="profile">
            </v-avatar>
          </v-card-title>
          <v-card-text>
            <h2>{{ $auth ? $auth.user.name : null }}</h2>
            <p>{{ $auth ? $auth.user.email : null }}</p>
            <p>
              Adipisicing sunt consectetur consectetur aliqua velit ea eiusmod ullamco incididunt aliqua eiusmod aute. Consequat ad labore tempor proident duis tempor sint amet excepteur. Voluptate eu ex deserunt irure tempor sit ipsum adipisicing aute. Voluptate nostrud in Lorem irure do aute tempor.
            </p>

            <v-btn
              color="primary"
              elevation="0"
              @click="logout()"
            >
              Logout
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

export default {
  data () {
    return {
    }
  },

  methods: {
    /**
     * Unauthorize user then redirect to login page
     */
    logout () {
      this.$auth.logout()
      this.$router.push('/auth/login')
    }
  }
}
</script>

<style>
#container {
    height: 100%;
    background-repeat: repeat-x;
    background-size: 100% auto;
}

.center-content {
  margin-left: auto;
  margin-right: auto;
}

.profile-card {
  margin-top: 20vh;
}
</style>
