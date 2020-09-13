<template>
  <v-app-bar height="153vh" app color="light">
    <v-row align="center">
      <v-col class="text-center" cols="12">
        <h2 class="accent--text">
          <v-icon size="30" class="mb-1" color="primary">
            mdi-book-open-blank-variant
          </v-icon>
          posts.io
        </h2>
        <v-breadcrumbs class="px-0" :items="breadcrumbs">
          <template v-slot:divider>
            <v-icon>mdi-chevron-right</v-icon>
          </template>
          <template v-slot:item="{ item }">
            <v-breadcrumbs-item
              to="/posts"
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
          :items="posts"
          item-text="title"
          item-value="title"
        >
          <template v-slot:item="data">
            <v-list-item-content>
              <v-list-item-title light v-text="data.item.title" />
              <v-list-item-subtitle>
                by {{ data.item.author.fullname }} on {{ data.item.date_published }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </template>
        </v-autocomplete>
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
      }],
      posts: [{
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
  }
}
</script>
