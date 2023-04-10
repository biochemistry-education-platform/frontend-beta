<template>
    <div class="signup-page">
        <div class="columns">
            <div class="column is-4 is-offset-4">
                <h1 class="title">Sign up</h1>

                <form @submit.prevent="submitForm">
                    <div class="field">
                        <label>E-mail</label>
                        <div class="control">
                            <input type="email" name="username" class="input" v-model="username">
                        </div>
                    </div>

                    <div class="field">
                        <label>Surname</label>
                        <div class="control">
                            <input type="text" name="surname" class="input" v-model="surname">
                        </div>
                    </div>

                    <div class="field">
                        <label>Name</label>
                        <div class="control">
                            <input type="text" name="name" class="input" v-model="name">
                        </div>
                    </div>

                    <div class="field">
                        <label>Patronymic</label>
                        <div class="control">
                            <input type="text" name="patronymic" class="input" v-model="patronymic">
                        </div>
                    </div>

                    <div class="field">
                        <label>Password</label>
                        <div class="control">
                            <input type="password" name="password" class="input" v-model="password">
                        </div>
                    </div>

                    <div class="field">
                        <label>Repeat password</label>
                        <div class="control">
                            <input type="password" name="password" class="input" v-model="repeat">
                        </div>
                    </div>

                    <div class="field">
                        <div class="control">
                            <input type="checkbox" id="student" name="student" v-model="student" checked>
                            <label for="student">I am student</label>
                        </div>
                    </div>

                    <div class="notification is-danger" v-if="errors.length">
                        <p
                            v-for="error in errors"
                            v-bind:key="error"
                        >
                            {{ error }}
                        </p>
                    </div>

                    <div class="field">
                        <div class="control">
                            <button class="button is-success">Sign up</button>
                        </div>
                    </div>
                </form>

                <hr>

                Already have an account? <router-link to="/log-in">Log in</router-link>
            </div>
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
            if (this.password != this.repeat) {
                console.log('passwords are different')
            } else {
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

                        console.log(response.data)
                        
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
}
</script>