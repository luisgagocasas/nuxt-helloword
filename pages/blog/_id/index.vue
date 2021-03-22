<template>
  <div>
    <v-card v-if="blog" class="mx-auto">
      <v-list three-line>
        <v-list-item>
          <v-list-item-avatar>
            <v-img src="https://cdn.vuetifyjs.com/images/lists/1.jpg" />
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>{{ blog.title }}</v-list-item-title>
            <v-list-item-subtitle>{{ blog.body }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card>
  </div>
</template>

<script>
export default {
  computed: {
    blog () {
      return this.$store.getters['posts/getBlog']
    }
  },
  created () {
    this.$store.dispatch('posts/loadBlog', this.$route.params.id)
  }
}
</script>
