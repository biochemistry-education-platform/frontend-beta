<template>
    <div class="initial-page">
        <div class="initial-form">
            <h1 class="initial-title">{{ $t('logIn') }}</h1>
            <form @submit.prevent="submitForm">
                <div class="initial-field">
                    <label class="initial-field-label">{{ $t('email') }}</label>
                    <input type="email" name="username" class="initial-input" v-model="username" placeholder="example@mail.ru">
                </div>
                <div class="initial-field">
                    <label class="initial-field-label">{{ $t('password') }}</label>
                    <input type="password" name="name" class="initial-input" v-model="password" placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;">
                </div>
                <button class="initial-btn">{{ $t('toLogIn') }}</button>
                <p class="initial-link">{{ $t('dontSigned') }}<router-link :to="{name: 'SignUp'}" class="initial-link">{{ $t('toSignUp') }}</router-link></p>
            </form>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'LogIn',
    data() {
        return {
            username: '',
            password: '',
            errors: []
        }
    },
    methods: {
        async submitForm(e) {
            axios.defaults.headers.common["Authorization"] = ""

            localStorage.removeItem('token')

            const formData = {
                username: this.username,
                password: this.password
            }

            await axios
                .post('/api/v1/token/login/', formData)
                .then(response => {
                    const token = response.data.auth_token
                    this.$store.commit('setToken', token)
                    axios.defaults.headers.common["Authorization"] = "Token " + token
                    localStorage.setItem('token', token)
                })
                .catch(error => {
                    if (error.response) {
                        for (const property in error.response.data) {
                            this.errors.push(`${property}: ${error.response.data[property]}`)
                        }
                        console.log(JSON.stringify(error.response.data))
                    } else if (error.message) {
                        console.log(JSON.stringify(error.message))
                    } else {
                        console.log(JSON.stringify(error))
                    }
                })
            
            axios
                .get('/api/v1/users/me')
                .then(response => {
                    this.$store.commit('setUser', {'username': response.data.username, 'id': response.data.id})
                    localStorage.setItem('username', response.data.username)
                    localStorage.setItem('userid', response.data.id)

                    this.$router.push('/teacher/articles')
                })
                .catch(error => {
                    console.log(JSON.stringify(error))
                })
        }   
    }
}
</script>