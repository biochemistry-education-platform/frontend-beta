import { createApp, provide, h } from 'vue'
import { DefaultApolloClient } from '@vue/apollo-composable'
import { createI18n } from 'vue-i18n'
import App from './App.vue'
import router from './router'
import store from './store'
// import axios from 'axios'
import messages from '@/i18n'
import { apolloClient } from './vue-apollo'

const i18n = createI18n({
    locale: 'ru-RU',
    fallbackLocale: 'en-US',
    legacy: false,
    messages,
})

// axios.defaults.baseURL = 'http://127.0.0.1:8000'
const app = createApp({
    setup () {
        provide(DefaultApolloClient, apolloClient)
    },
  
    render: () => h(App),
})

app.use(i18n)
// app.use(store).use(router, axios).mount('#app')
app.use(store).use(router).mount('#app')
