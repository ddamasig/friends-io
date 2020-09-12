import Notification from '@/models/core/Notification'

export const state = () => ({
  model: {
    id: null,
    name: null,
    email: null
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
    let query = await Notification

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
  }
}
