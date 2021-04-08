export const state = () => ({
  _auth: []
})

export const actions = {
  async loadAuth ({ commit }) {
    const data = await this.$strapi.user

    commit('setAuth', data)
  }
}

export const getters = {
  getAuth (state) {
    return state._auth
  }
}

export const mutations = {
  setAuth (state, auth) {
    state._auth = auth
  }
}
