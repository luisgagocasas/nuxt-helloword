<template>
  <div v-if="blog">
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
      <v-breadcrumbs-item :disabled="true">
        {{ blog.title }}
      </v-breadcrumbs-item>
    </v-breadcrumbs>
    <v-card class="mx-auto">
      <v-list three-line>
        <v-list-item>
          <v-list-item-avatar>
            <v-img src="https://cdn.vuetifyjs.com/images/lists/1.jpg" />
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>{{ blog.title }}</v-list-item-title>
            <!-- eslint-disable vue/no-v-html -->
            <v-list-item-content v-html="contentMarked" />
            <!-- eslint-enable -->
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card>
  </div>
</template>

<script>
import marked from 'marked'

export default {
  middleware: 'private',
  computed: {
    blog () {
      return this.$store.getters['posts/getBlog']
    },
    contentMarked () {
      return marked(this.blog.content)
    }
  },
  created () {
    this.$store.dispatch('posts/loadBlog', this.$route.params.id)
  }
}
</script>
