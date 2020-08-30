<template>
  <v-app dark>
    <v-main>
      <nuxt />
    </v-main>
  </v-app>
</template>

<script>
export default {
  data () {
    return {}
  }
}
</script>

<style>
  .line-clamp-1 {
    line-clamp: 1;
  }

  .line-clamp-2 {
    line-clamp: 2;
  }

  .line-clamp-3 {
    line-clamp: 3 !important;
  }
  ::-webkit-scrollbar {
    width: 0px;
    background: transparent; /* make scrollbar transparent */
  }
</style>
