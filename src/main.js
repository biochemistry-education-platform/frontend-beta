import { createApp, provide, h } from 'vue'
import { DefaultApolloClient } from '@vue/apollo-composable'
import { createI18n } from 'vue-i18n'
import { createPinia } from "pinia"
import App from './App.vue'
import router from './router'
import store from './stores/user'
import messages from '@/i18n'
import { apolloClient } from './vue-apollo'

const i18n = createI18n({
    locale: 'ru-RU',
    fallbackLocale: 'en-US',
    legacy: false,
    messages,
})

const app = createApp({
    setup () {
        provide(DefaultApolloClient, apolloClient)
    },
  
    render: () => h(App),
})

app.use(i18n).use(createPinia()).use(router).mount('#app')
