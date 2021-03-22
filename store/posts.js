const state = () => ({
  _posts: [],
  _blog: []
})

const actions = {
  async loadPosts ({ commit }) {
    const { data } = await this.$axios.get('https://jsonplaceholder.typicode.com/posts')

    commit('setPosts', data)
  },
  async loadBlog ({ commit, state }, payload) {
    await this.$axios.get(
      `https://jsonplaceholder.typicode.com/posts/${payload}/`
    ).then((data) => {
      commit('setBlog', data.data)
    }).catch(() => {
      commit('setBlog', null)
    })
  }
}

const getters = {
  getPosts (state) {
    return state._posts
  },
  getBlog: (state) => {
    return state._blog
  }
}

const mutations = {
  setPosts (state, posts) {
    state._posts = posts
  },
  setBlog (state, blog) {
    state._blog = blog
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
