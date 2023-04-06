<template>
    <div class="client-page">
        <div class="columns is-multiline">
            <div class="column is-12">
                <h1 class="title">{{ client.surname }} {{ client.name}} {{ client.patronymic}}</h1>
            </div>

            <div class="column is-12">
                <h2 class="subtitle">{{ client.email }}</h2>
                <h2 class="subtitle">{{ client.role }}</h2>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'Client',
    data() {
        return {
            client: {}
        }
    },
    mounted() {
        this.getClient()
    },
    methods: {
        getClient() {
            const clientID = this.$route.params.id
            axios
                .get(`/api/v1/clients/${clientID}`)
                .then(response => {
                    this.client = response.data
                })
                .catch(error => {
                    console.log(JSON.stringify(error))
                })
        }
    }
}
</script>