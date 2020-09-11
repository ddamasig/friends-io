import Post from '@/models/post/Post'

export const state = () => ({
  model: {
    id: null,
    title: null,
    description: null,
    uploader_id: null,
    uploader: null,
    created_at: null
  },
  meta: null,
  list: []
})

export const getters = {
  list: state => state.list,
  meta: state => state.meta,
  model: state => state.model
}

export const mutations = {
  SET_LIST (state, data) {
    state.list = data
  },
  SET_META (state, meta) {
    state.meta = meta
  },
  SET_DATA (state, data) {
    state.model = data
  },
  UNSHIFT (state, data) {
    console.log('unshifting:')
    console.log(data)
    state.list.unshift(data)
  },
  INSERT (state, data) {
    state.list.push(data)
  },
  UPDATE (state, data) {
    const listIndex = state.list.map(l => l.id).indexOf(data.id)

    state.list.splice(listIndex, 1, data)
  },
  DELETE (state, data) {
    const listIndex = state.list.map(l => l.id).indexOf(data.id)

    state.list.splice(listIndex, 1)
  }
}

export const actions = {
  async paginate ({ commit }, { page = 1, status = null, itemsPerPage = 20 } = {}) {
    let query = await Post
      .include('uploader')

    if (status && status !== 'all') {
      query = query.where('status', status)
    }

    const { data, meta } = await query
      .page(page)
      .limit(itemsPerPage)
      .get()

    commit('SET_LIST', data)
    commit('SET_META', meta)

    return data
  },
  async update ({ commit }, model) {
    const response = await this.$axios.put(`Posts/${model.id}`, model)

    commit('UPDATE', response.data.data)

    return response
  },
  async show ({ commit }, id) {
    const { data } = await Post
      .include('addresses')
      .find(id)

    commit('SET_DATA', data)

    return data
  },
  async save ({ commit }, model) {
    const response = await this.$axios.post('posts', model)

    return response
  },
  async like ({ commit }, post) {
    const response = await this.$axios.post(`posts/${post.id}/like`)
      .then((response) => {
        commit('UPDATE', response.data)
      })

    return response
  },
  async dislike ({ commit }, post) {
    const response = await this.$axios.post(`posts/${post.id}/dislike`)
      .then((response) => {
        commit('UPDATE', response.data)
      })

    return response
  },
  async destroy ({ commit }, model) {
    const response = await this.$axios.delete(`Posts/${model.id}`)

    commit('DELETE', model)

    return response
  },
  async updateOrCreate ({ dispatch }, model) {
    if (model.id) {
      return await dispatch('update', model)
    }

    return await dispatch('save', model)
  }
}
