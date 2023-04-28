<template>
    <div class="add-article-page">
        <div class="columns is-multiline">
            <div class="column is-12">
                <h1 class="title">Add article</h1>
            </div>

            <div class="column is-12">
                <h2 class="is-size-5 mb-4">Reviewer</h2>

                <div class="select">
                    <select name="author" v-model="article.author">
                        <option value="" disabled selected>Select a teacher to check your article</option>
                        <option
                            v-for="author in clients"
                            v-bind:key="author.id"
                            v-bind:value="author">
                            {{ author.surname }} {{ author.name }} {{ author.patronymic }}
                        </option>
                    </select>
                </div>

                <div class="box mt-4" v-if="article.author">
                    <p>{{ article.author.surname }} {{ article.author.name }} {{ article.author.patronymic }}</p>
                    <p>{{ article.author.role }}</p>
                </div>
            </div>

            <div class="column is-12">
                <ArticleForm v-bind:initialArticle="article" v-bind:initialTags="tags"></ArticleForm>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import { toast } from 'bulma-toast'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';

import ArticleForm from '@/components/ArticleForm.vue'

export default {
    name: 'StudentAddArticle',
    components: {
        ArticleForm, 
        QuillEditor
    },
    data() {
        return {
            article: {
                author: ''
            },
            clients: [],
            tags: []
        }
    },
    async mounted() {
        await this.getClients()
        await this.getTags()
    },
    methods: {
        getClients() {
            axios
                .get('/api/v1/clients')
                .then(response => {
                    for (let i = 0; i < response.data.length; i++) {
                        if (response.data[i].role === 'Преподаватель') {
                            this.clients.push(response.data[i])
                        }
                    }
                })
                .catch(error => {
                    console.log(JSON.stringify(error))
                })
        },
        getTags() {
            axios
                .get('/api/v1/tags')
                .then(response => {
                    for (let i = 0; i < response.data.length; i++) {
                        this.tags.push(response.data[i].name)
                    }
                })
                .catch(error => {
                    console.log(JSON.stringify(error))
                })
        }
    }
}
</script>