<template>
    <div class="initial-page">
        <div class="initial-form">
            <h1 class="initial-title">{{ $t('signUp') }}</h1>
            <form @submit.prevent="submitForm">
                <div class="initial-field">
                    <label class="initial-field-label">{{ $t('email') }}</label>
                    <input type="email" name="username" class="initial-input" v-model="username" placeholder="example@mail.ru">
                </div>
                <div class="initial-field">
                    <label class="initial-field-label">{{ $t('surname') }}</label>
                    <input type="text" name="surname" class="initial-input" v-model="surname" :placeholder="$t('surnamePlaceholder')">
                </div>
                <div class="initial-field">
                    <label class="initial-field-label">{{ $t('name') }}</label>
                    <input type="text" name="name" class="initial-input" v-model="name" :placeholder="$t('namePlaceholder')">
                </div>
                <div class="initial-field">
                    <label class="initial-field-label">{{ $t('password') }}</label>
                    <input type="password" name="name" class="initial-input" v-model="password" placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;">
                </div>
                <div class="student-field">
                    <input type="checkbox" name="student" id="student" v-model="student" checked>                    
                    <label for="student" class="student-label">{{ $t('student') }}</label>
                </div>
                <button class="initial-btn">{{ $t('toSignUp') }}</button>
                <p class="initial-link">{{ $t('alreadySigned') }}<router-link :to="{name: 'LogIn'}" class="initial-link">{{ $t('toLogIn') }}</router-link></p>
            </form>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'SignUp',
    data() {
        return {
            username: '',
            surname: '',
            name: '',
            patronymic: '',
            password: '',
            repeat: '',
            student: true,
            errors: []
        }
    },
    methods: {
        async submitForm(e) {
            const formData = {
                username: this.username,
                surname: this.surname,
                name: this.name,
                patronymic: this.patronymic,
                password: this.password,
                student: this.student
            }

            const client = {
                email: this.username, 
                surname: this.surname,
                name: this.name,
                patronymic: this.patronymic,
                role: this.student === true ? 'Студент' : 'Преподаватель'
            }

            await axios
                .post('/api/v1/users/', formData)
                .then(response => {
                    console.log(response)
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
            
            axios.defaults.headers.common["Authorization"] = ""

            localStorage.removeItem('token')

            const logInData = {
                username: this.username,
                password: this.password
            }

            await axios
                .post('/api/v1/token/login/', logInData)
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
                .post('/api/v1/clients/', client)
                .then(response => {
                    toast({
                        message: 'The client has been created',
                        type: 'is-success',
                        dismissible: true,
                        pauseOnHover: true,
                        duration: 2000,
                        position: 'top-right',
                    })

                })
                .catch(error => {
                    console.log(JSON.stringify(error))
                })
            
            this.$router.push('/dashboard/articles')
        }
    }
}
</script>