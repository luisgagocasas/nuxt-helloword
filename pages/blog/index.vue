<template>
  <div>
    <v-breadcrumbs :large="true">
      <v-breadcrumbs-divider />
      <v-breadcrumbs-item>
        <nuxt-link to="/blog">
          Blog
        </nuxt-link>
      </v-breadcrumbs-item>
      <v-icon
        :small="true"
      >
        mdi-forward
      </v-icon>
      <v-breadcrumbs-item>
        <nuxt-link to="/blog/new">
          Create a new post
        </nuxt-link>
      </v-breadcrumbs-item>
    </v-breadcrumbs>
    <v-card max-width="90%" class="mx-auto">
      <v-list three-line>
        <nuxt-link v-for="(post, index) in posts" :key="post.id" :to="'/blog/' + post.id">
          <v-list-item :key="post.title">
            <v-list-item-avatar>
              <v-img src="https://cdn.vuetifyjs.com/images/lists/1.jpg" />
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>{{ post.title }}</v-list-item-title>
              <v-list-item-subtitle>{{ post.summary }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-divider :key="index" />
        </nuxt-link>
      </v-list>
    </v-card>
  </div>
</template>

<script>
export default {
  middleware: 'private',
  head: {
    title: 'my website title',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'my website description'
      }
    ]
  },
  computed: {
    posts () {
      return this.$store.getters['posts/getPosts']
    }
  }
}
</script>
