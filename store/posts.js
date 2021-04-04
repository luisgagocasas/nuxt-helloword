export const state = () => ({
  _posts: [],
  _blog: []
})

export const actions = {
  async loadPosts ({ commit }) {
    const data = await this.$strapi.$blogs.find()

    commit('setPosts', data)
  },
  async loadBlog ({ commit, state }, payload) {
    await this.$strapi.$blogs.findOne(payload).then((data) => {
      commit('setBlog', data)
    }).catch(() => {
      commit('setBlog', null)
    })
  }
}

export const getters = {
  getPosts (state) {
    return state._posts
  },
  getBlog: (state) => {
    return state._blog
  }
}

export const mutations = {
  setPosts (state, posts) {
    state._posts = posts
  },
  setBlog (state, blog) {
    state._blog = blog
  }
}
