export const state = () => ({
  usersData: {}
})

export const mutations = {
  setUserData (state, userData) {
    state.usersData = userData
  }
}

export const actions = {
  getData ({ commit }) {
    this.$auth.fetchUser()
      .then((response) => {
        commit('setUserData', response.data)
      })
  }

}

export const getters = {}
