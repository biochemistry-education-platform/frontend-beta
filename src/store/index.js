import { createStore } from 'vuex'

export default createStore({
  state: {
    user: {
      id: '',
      email: 'example@mail.ru',
      role: 'Teacher',
      surname: 'Фамилия',
      name: 'Имя',
      patronymic: 'Отчество'
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
        state.user.email = localStorage.getItem('username')
        state.user.id = localStorage.getItem('userid')
      } else {
        state.user.id = ''
        state.user.email = 'example@mail.ru'
        state.user.role = 'Teacher'
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
