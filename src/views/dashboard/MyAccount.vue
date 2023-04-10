<template>
    <div class="my-account-page">
        <h1 class="title">My account</h1>

        <p><b>Username:</b> {{ $store.state.user.username }}</p>
        <p><b>Name:</b> {{ $store.state.user.surname }} {{ $store.state.user.name }} {{ $store.state.user.patronymic }}</p>
        <p><b>{{ $store.state.user.role }}</b></p>
        <hr>

        <button @click="logout()" class="button is-danger">Log out</button>
    </div>
</template>

<script>
import axios from 'axios'
import store from '@/store'

export default {
    name: 'MyAccount',
    async mounted() {
        await this.getMyInfo()
    },
    methods: {
        logout() {
            axios
                .post('/api/v1/token/logout/')
                .then(response => {
                    axios.defaults.headers.common["Authorization"] = ""
                    localStorage.removeItem('username')
                    localStorage.removeItem('userid')
                    localStorage.removeItem('token')
                    this.$store.commit('removeToken')
                    this.$router.push('/')
                })
                .catch(error => {
                        if (error.response) {
                            console.log(JSON.stringify(error.response.data))
                        } else if (error.message) {
                            console.log(JSON.stringify(error.message))
                        } else {
                            console.log(JSON.stringify(error))
                        }
                    })
        },
        getMyInfo() {
            axios
                .get('/api/v1/clients')
                .then(response => {
                    for (const property in response.data) {
                        if (response.data[property].email == store.state.user.username) {
                            store.state.user.surname = response.data[property].surname
                            store.state.user.name = response.data[property].name
                            store.state.user.patronymic = response.data[property].patronymic
                            store.state.user.role = response.data[property].role
                        }
                    }
                })
                .catch(error => {
                    console.log(JSON.stringify(error))
                })
        }
    }
}
</script>