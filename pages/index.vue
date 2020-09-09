<template>
  <v-container fluid class="mx-0">
    <app-bar-default />

    <v-row>
      <v-col
        v-for="(book, index) in books"
        :key="index"
        cols="12"
        class="px-0"
      >
        <v-card
          max-width="100%"
          class="mx-auto"
          flat
        >
          <v-list-item>
            <v-list-item-avatar contain color="grey">
              <v-img src="https://picsum.photos/100" />
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title class="accent--text line-clamp-1">
                {{ book.title }}
              </v-list-item-title>
              <v-list-item-subtitle>
                by {{ book.author.fullname }} on {{ book.date_published }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-img
            :src="book.thumbnail"
            height="194"
          />

          <v-card-text>
            {{ getShortDescription(book) }}
          </v-card-text>

          <v-card-actions>
            <v-btn
              text
              color="primary"
            >
              Read
            </v-btn>
            <v-btn
              text
              color="primary"
            >
              Download
            </v-btn>
            <v-spacer />
            <v-btn icon :color="getHeartColor(book)">
              <v-icon>mdi-heart</v-icon>
            </v-btn>
            <v-btn icon>
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </v-card-actions>
          <v-divider v-if="index !== books.length - 1" class="my-4 mt-5" />
        </v-card>
      </v-col>
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
      books: [{
        id: 1,
        title: 'Learner-Centered Leadership A Blueprint for Transformational Change in Learning Communities',
        description: 'The pace of change in our society is currently accelerating. Old concepts of authority and hierarchy have been challenged by the reality of a networked world, and bedrock ideas about what citizens need to know have been overturned by a constant drive to learn anew. For Devin Vodicka, the response to these challenges is both simple andall-encompassing: it is the learner who is constant in the new world, and therefore educators must empower the learner to drive their journey',
        author: {
          fullname: 'Devin Vodicka'
        },
        date_published: 'April 18, 2020',
        rating: 4.7,
        favorite_at: 'April 18, 2020',
        thumbnail: 'https://picsum.photos/300/200'
      }, {
        id: 2,
        title: 'Professional Development of Teacher Educators in Further Education',
        description: 'Professional Development of Teacher Educators in Further Education critically analyses the specific challenges relating to teacher educators in the English further education (FE), such as the diverse nature of learners and the variety of educational contexts. It focuses on the journeys to becoming teacher educators, their relevant teaching know-how and professional needs. This book combines theoretical frameworks with both qualitative and quantitative data to outline the pathways, professional identities, knowledge, and continuous professional development of teacher educators. This data is used to discuss the four main themes',
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
    getHeartColor (book) {
      if (book.favorite_at) {
        return 'red'
      }
      return ''
    },
    getShortDescription (book) {
      return `${book.description.substr(0, 150)}...`
    }
  }
}
</script>
