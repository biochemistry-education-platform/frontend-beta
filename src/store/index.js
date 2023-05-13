import { createStore } from 'vuex'

export default createStore({
  state: {
    user: {
      id: '',
      email: '',
      role: '',
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
      // if (localStorage.getItem('token')) {
      //   state.token = localStorage.getItem('token')
      //   state.isAuthenticated = true
      //   state.user.email = localStorage.getItem('username')
      //   state.user.id = localStorage.getItem('userid')
      // } else {
      //   state.user.id = ''
      //   state.user.email = 'example@mail.ru'
      //   state.user.role = 'Teacher'
      //   state.user.surname = 'Фамилия'
      //   state.user.name = 'Имя'
      //   state.user.patronymic = 'Отчество'
      //   state.token = ''
      //   state.isAuthenticated = false
      // }
        state.user.id = ''
        state.user.email = ''
        state.user.role = ''
        state.user.surname = ''
        state.user.name = ''
        state.user.patronymic = ''
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
    changeUser(state) {
      state.user.id = ''
      state.user.email = ''
      state.user.role = ''
      state.user.surname = ''
      state.user.name = ''
      state.user.patronymic = ''
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
