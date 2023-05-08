import { createStore } from 'vuex'

export default createStore({
  state: {
    user: {
      id: '',
      email: '',
      role: 'Student',
      surname: '',
      name: '',
      patronymic: ''
    },
    isAuthenticated: false,
    token: ''
  },
  getters: {
  },
  mutations: {
    initializeStore(state) {
      if (localStorage.getItem('token')) {
        state.token = localStorage.getItem('token')
        state.isAuthenticated = true
        state.user.email = localStorage.getItem('email')
        state.user.id = localStorage.getItem('userid')
      } else {
        state.user.id = ''
        state.user.email = 'example@mail.ru'
        state.user.role = 'Student'
        state.user.surname = 'Фамилия'
        state.user.name = 'Имя'
        state.user.patronymic = 'Отчество'
        state.token = ''
        state.isAuthenticated = false
      }
    },
    setToken(state, token) {
      state.token = token
      state.isAuthenticated = true
    },
    removeToken(state) {
      state.user.id = ''
      state.user.email = ''
      state.token = ''
      state.isAuthenticated = false
    },
    setUser(state, user) {
      state.user = user
    }
  },
  actions: {
  },
  modules: {
  }
})
