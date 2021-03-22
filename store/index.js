export const actions = {
  async nuxtServerInit ({ dispatch }, context) {
    await dispatch('posts/loadPosts')
    await dispatch('posts/loadBlog')
  }
}
