<template>
    <div class="articles-list-page">
        <div class="columns is-multiline">
            <h1 class="title">Notes</h1>
        </div>
        <SearchForm v-bind:items="notes" v-on:filterit="filterit"/>
        <div class="column is-12" v-for="note in filteredNotes" v-bind:key="note.id">
            <div class="box">
                <h3 class="is-size-4 mb-4">{{ note.based_on_article }}</h3>
                <div style="display:flex; flex-direction: row; justify-content: space-between;">
                    <p>{{ note.created_by }}</p>
                    <router-link :to="{ name: 'Note', params: { id: note.id }}" class="button is-light">Details</router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import SearchForm from '@/components/SearchForm.vue'

export default {
    name: 'Notes',
    components: {
        SearchForm
    },
    data() {
        return {
            notes: [],
            filteredNotes: []
        }
    },
    mounted() {
        this.getNotes()
    },
    methods: {
        getNotes() {
            axios
                .get('/api/v1/notes/')
                .then(response => {
                    for (let i = 0; i < response.data.length; i++) {
                        this.notes.push(response.data[i])
                        this.filteredNotes.push(response.data[i])
                    }
                    this.filteredNotes = this.filteredNotes.reverse()
                    console.log(this.filteredNotes)
                })
                .catch(error => {
                    console.log(JSON.stringify(error))
                })
        },
        filterit(newNotes) {
            this.filteredNotes = newNotes
        }
    }
}
</script>
