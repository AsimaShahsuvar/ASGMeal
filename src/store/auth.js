import api from '../services/api'

const state = () => ({
  authorized: !!localStorage.getItem('user') || false,
  user: JSON.parse(localStorage.getItem('user')) || {
    'id': '',
    'first_name': '',
    'last_name': '',
    'type': '',
    'email': ''
  },
  building: localStorage.getItem('building') ?? false,
})

const getters = {

  GET_USER (state) {
    return state.user
  },
  IS_SUPER_ADMIN (state) {
    return state.user?.type === 'super_admin'
  },
  IS_ADMIN (state) {
    return state.user?.type === 'admin' || state.user?.type === 'super_admin'
  },

  GET_USER_NAME_FIRST_LETTER (state) {
    if (state.user?.first_name) {
      return state.user.first_name[0]
    } else {
      return ''
    }
  },

  IS_AUTH (state) {
    return state.authorized
  },

  GET_BUILDING (state) {
    return state.building
  }
}

const mutations = {

  SET_USER (state, payload) {
    localStorage.setItem('user', JSON.stringify(payload))
    state.user = payload
    state.authorized = true
  },

  CLEAR_USER (state) {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    state.user = null
  },

  SET_BUILDING(state,payload){
    localStorage.setItem('building', payload)
    state.building = payload
  }
}

const actions = {

  async LOGIN ({ commit, state, dispatch }, payload) {
    payload['device_type'] = 'web'
    const user = {
      'id': '',
      'first_name': '',
      'last_name': '',
      'patronymic': '',
      'type': '',
      'email': ''
    }
    // await api.get(import.meta.env.VITE_HOST_URL + '/sanctum/csrf-cookie')
    await api.post(import.meta.env.VITE_API_URL + '/Auth/login', payload)
      .then(async ({ data }) => {
        localStorage.setItem('token', data.token)
        commit('SET_USER', Object.assign(user, data.data))
      }).catch(e => {
        console.log(e)
      })
  },

  async GET_USER ({ commit },) {
    const user = {
      'id': '',
      'first_name': '',
      'last_name': '',
      'patronymic': '',
      'type': '',
      'email': ''
    }

    await api.get('/me')
      .then((response) => {
        commit('SET_USER', Object.assign(user, response.data))
      })
      .catch(() => {
        commit('CLEAR_USER')
      })
  },

  async SET_USER ({ commit, state }, payload) {
    commit('SET_USER', payload)
  },

  async LOGOUT ({ commit }) {
    await api.post('/logout')
      .finally(() => {
        window.location.href = '/login'
        commit('CLEAR_USER')
      })
  },

}

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
}
