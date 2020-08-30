<template>
  <v-app-bar height="153vh" app color="light">
    <v-row align="center">
      <v-col class="text-center" cols="12">
        <h2 class="accent--text">
          <v-icon size="30" class="mb-1" color="primary">
            mdi-book-open-blank-variant
          </v-icon>
          Books.io
        </h2>
        <v-breadcrumbs class="px-0" :items="breadcrumbs">
          <template v-slot:divider>
            <v-icon>mdi-chevron-right</v-icon>
          </template>
          <template v-slot:item="{ item }">
            <v-breadcrumbs-item
              to="/books"
            >
              <v-icon v-if="item.icon">
                {{ item.icon }}
              </v-icon>
              <span v-else>
                {{ item.text }}
              </span>
            </v-breadcrumbs-item>
          </template>
        </v-breadcrumbs>
        <v-autocomplete
          ref="searchInput"
          class="pb-0"
          dense
          single-line
          outlined
          hide-details
          label="Type keywords here"
        />
      </v-col>
    </v-row>
  </v-app-bar>
</template>

<script>
export default {
  data () {
    return {
      breadcrumbs: [{
        text: 'home',
        icon: 'mdi-home'
      }, {
        text: 'Mathematics'
      }, {
        text: 'Algebra'
      }]
    }
  }
}
</script>
