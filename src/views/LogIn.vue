<template>
    <div class="initial-page">
        <div class="initial-form">
            <h1 class="initial-title">{{ $t('logIn') }}</h1>
            <form @submit.prevent="submitForm">
                <div class="initial-field">
                    <label class="initial-field-label">{{ $t('email') }}</label>
                    <input type="email" name="email" class="initial-input" v-model="email" placeholder="example@mail.ru">
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

// я передаю username и password
// хочу проверить: если такое существует, то мне бы хотелось получить ФИО, роль, емейл, айдишник (какой, из какой таблички? по какому айдишнику
// я смогу потом забирать статьи пользователя, его конспекты и т.д.?)
// import gql from 'graphql-tag'
// import { apolloClient } from '@/vue-apollo'


export default {
    name: 'LogIn',
    data() {
        return {
            email: '',
            password: '',
            errors: []
        }
    },
    methods: {
        // getUserInfo() {
        //     apolloClient
        //         .mutate({
        //             mutation: gql`
        //                 mutation GetUserInfo($email: String!, $password: String!) {
        //                     getUserInfo(email: $email, password: $password) {
        //                         user {
        //                             id
        //                             email
        //                             name
        //                             role
        //                         }
        //                     }
        //                 }
        //             `,
        //             variables: {
        //                 email: this.email,
        //                 password: this.password,
        //             },
        //         })
        //         .then(result => {
        //             console.log(result)
        //             let fullname = result.name.split(' ')
        //             let surname = ''
        //             let name = ''
        //             let patronymic = ''
        //             if (fullname.length > 1) {
        //                 surname = fullname[0]
        //                 name = fullname[1]
        //                 if (fullname.length == 3) {
        //                     patronymic = fullname[2]
        //                 }
        //             }

        //             this.$store.state.user.surname = surname
        //             this.$store.state.user.name = name
        //             this.$store.state.user.patronymic = patronymic
        //             this.$store.state.user.role = result.role
        //             this.$store.state.user.email = result.email

        //             this.$router.push('/articles')
        //         })
        //         .catch(error => {
        //             console.log(error)
        //         })
        // },



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
            
            await axios
                .get('/api/v1/users/me')
                .then(response => {
                    this.$store.commit('setUser', {'username': response.data.username, 'id': response.data.id})
                    localStorage.setItem('username', response.data.username)
                    localStorage.setItem('userid', response.data.id)
                })
                .catch(error => {
                    console.log(JSON.stringify(error))
                })

            axios
                .get('/api/v1/clients')
                .then(response => {
                    for (const property in response.data) {
                        if (response.data[property].email == this.$store.state.user.username) {
                            this.$store.state.user.surname = response.data[property].surname
                            this.$store.state.user.name = response.data[property].name
                            this.$store.state.user.patronymic = response.data[property].patronymic
                            this.$store.state.user.role = response.data[property].role
                        }
                    }
                    this.$router.push('/articles')
                })
                .catch(error => {
                    console.log(JSON.stringify(error))
                })
        }  
    }
}
</script>