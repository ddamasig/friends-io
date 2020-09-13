import FriendRequest from '@/models/core/FriendRequest'

export const state = () => ({
  model: {
    id: null,
    name: null,
    email: null
  },
  meta: null,
  list: [],
  unreadList: []
})

export const getters = {
  list: state => state.list,
  meta: state => state.meta,
  model: state => state.model,
  unreadList: state => state.unreadList
}

export const mutations = {
  SET_LIST (state, data) {
    state.list = data
  },
  SET_UNREAD_LIST (state, data) {
    state.unreadList = data
  },
  SET_META (state, meta) {
    state.meta = meta
  },
  SET_DATA (state, data) {
    state.model = data
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
    let query = await FriendRequest

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
    const response = await this.$axios.put(`friend-requests/${model.id}`, model)

    commit('UPDATE', response.data.data)

    return response
  },
  async show ({ commit }, id) {
    const { data } = await FriendRequest
      .find(id)

    commit('SET_DATA', data)

    return data
  },
  async save ({ commit }, model) {
    const response = await this.$axios.post('friend-requests', model)

    return response
  },
  async destroy ({ commit }, model) {
    const response = await this.$axios.delete(`friend-requests/${model.id}`)

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
