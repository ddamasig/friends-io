
export const state = () => ({
  message: null,
  visibility: false,
  color: false
})

export const getters = {
  message: state => state.message,
  visibility: state => state.visibility,
  color: state => state.color
}

export const mutations = {
  SET_COLOR (state, data) {
    state.color = data
  },
  SET_MESSAGE (state, data) {
    state.meta = data
  },
  SET_VISIBILITY (state, data) {
    state.visibility = data
  },
  SHOW (state, message) {
    state.message = message
    state.visibility = true
  }
}

export const actions = {
}
