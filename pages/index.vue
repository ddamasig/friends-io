<template>
  <v-container fluid class="mx-0">
    <app-bar-default />

    <v-row>
      <v-col
        v-for="(post, index) in posts"
        :key="index"
        cols="12"
        class="px-0"
      >
        <v-card
          max-width="100%"
          class="mx-auto"
          flat
          @click="viewPost(post)"
        >
          <v-list-item>
            <v-list-item-avatar contain color="grey">
              <v-img src="https://picsum.photos/100" />
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title class="accent--text line-clamp-1">
                {{ post.title }}
              </v-list-item-title>
              <v-list-item-subtitle>
                by {{ post.author.fullname }} on {{ post.date_published }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-img
            v-if="post.thumbnail"
            :src="post.thumbnail"
            height="194"
          />

          <v-card-text>
            {{ getShortDescription(post) }}
          </v-card-text>

          <v-card-actions>
            <v-btn text :color="getThumbColor(post)" style="text-transform: none;">
              <v-icon class="mr-1">
                {{ getThumbIcon(post) }}
              </v-icon>
              <span>Like</span>
            </v-btn>
            <v-btn text color="accent" style="text-transform: none;">
              <v-icon class="mr-1">
                mdi-comment-outline
              </v-icon>
              <span>Comment</span>
            </v-btn>
            <v-spacer />
            <v-btn icon>
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </v-card-actions>
          <v-divider v-if="index !== posts.length - 1" class="my-4 mt-5" />
        </v-card>
      </v-col>
      <v-col cols="12" class="v-col--load-more">
        <v-card flat>
          <v-cart-text class="align-center">
            <v-btn text block color="primary" class="v-btn--load-more">
              See more posts
            </v-btn>
          </v-cart-text>
        </v-card>
      </v-col>
      <v-btn
        fixed
        dark
        fab
        bottom
        right
        color="primary"
        class="v-btn--add-post"
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-row>
  </v-container>
</template>

<script>
import AppBarDefault from '~/components/AppBarDefault'

export default {
  components: {
    AppBarDefault
  },
  data () {
    return {
      posts: [{
        id: 1,
        title: 'Learner-Centered Leadership A Blueprint for Transformational Change in Learning Communities',
        description: 'The pace of change in our society is currently accelerating. Old concepts of authority and hierarchy have been challenged by the reality of a networked world, and bedrock ideas about what citizens need to know have been overturned by a constant drive to learn anew. For Devin Vodicka, the response to these challenges is both simple andall-encompassing: it is the learner who is constant in the new world, and therefore educators must empower the learner to drive their journey',
        author: {
          fullname: 'Devin Vodicka'
        },
        date_published: 'April 18, 2020',
        rating: 4.7,
        favorite_at: 'April 18, 2020'
        // thumbnail: 'https://picsum.photos/300/200'
      }, {
        id: 2,
        title: 'Professional Development of Teacher Educators in Further Education',
        description: 'Professional Development of Teacher Educators in Further Education critically analyses the specific challenges relating to teacher educators in the English further education (FE), such as the diverse nature of learners and the variety of educational contexts. It focuses on the journeys to becoming teacher educators, their relevant teaching know-how and professional needs. This post combines theoretical frameworks with both qualitative and quantitative data to outline the pathways, professional identities, knowledge, and continuous professional development of teacher educators. This data is used to discuss the four main themes',
        author: {
          fullname: 'Sia Loo'
        },
        date_published: 'April 18, 2020',
        rating: 4.7,
        favorite_at: 'April 18, 2020',
        thumbnail: 'https://picsum.photos/300/201'
      }, {
        id: 1,
        title: 'Learner-Centered Leadership A Blueprint for Transformational Change in Learning Communities',
        description: 'The pace of change in our society is currently accelerating. Old concepts of authority and hierarchy have been challenged by the reality of a networked world, and bedrock ideas about what citizens need to know have been overturned by a constant drive to learn anew. For Devin Vodicka, the response to these challenges is both simple andall-encompassing: it is the learner who is constant in the new world, and therefore educators must empower the learner to drive their journey',
        author: {
          fullname: 'Devin Vodicka'
        },
        date_published: 'April 18, 2020',
        rating: 4.7,
        favorite_at: 'April 18, 2020',
        thumbnail: 'https://picsum.photos/300/202'
      }, {
        id: 1,
        title: 'Learner-Centered Leadership A Blueprint for Transformational Change in Learning Communities',
        description: 'The pace of change in our society is currently accelerating. Old concepts of authority and hierarchy have been challenged by the reality of a networked world, and bedrock ideas about what citizens need to know have been overturned by a constant drive to learn anew. For Devin Vodicka, the response to these challenges is both simple andall-encompassing: it is the learner who is constant in the new world, and therefore educators must empower the learner to drive their journey',
        author: {
          fullname: 'Devin Vodicka'
        },
        date_published: 'April 18, 2020',
        rating: 4.7,
        favorite_at: 'April 18, 2020',
        thumbnail: 'https://picsum.photos/300/203'
      }]
    }
  },
  methods: {
    viewPost (post) {
      console.log('viewing post')
    },
    getThumbIcon (post) {
      if (post.favorite_at) {
        return 'mdi-thumb-up'
      }
      return 'mdi-thumb-up-outline'
    },
    getThumbColor (post) {
      if (post.favorite_at) {
        return 'primary'
      }
      return ''
    },
    getShortDescription (post) {
      return `${post.description.substr(0, 150)}...`
    }
  }
}
</script>
