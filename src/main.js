import { Vue } from 'vue'
import { createI18n } from 'vue-i18n'
import App from './App.vue'
import router from './router'
import store from './store'
// import axios from 'axios'
import messages from '@/i18n'
import { apolloProvider } from './vue-apollo'

const i18n = createI18n({
    locale: 'ru-RU',
    fallbackLocale: 'en-US',
    legacy: false,
    messages,
})

new Vue({
    router,
    store,
    i18n,
    apolloProvider: apolloProvider,
    render: h => h(App)
}).$mount('#app')
