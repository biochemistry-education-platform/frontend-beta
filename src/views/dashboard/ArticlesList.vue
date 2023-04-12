<template>
    <div class="articles-list-page">
        <div class="columns is-multiline">
            <h1 class="title">Articles</h1>
        </div>
        <div class="column is-12" v-for="article in articles" v-bind:key="article.id">
            <div class="box">
                <h3 class="is-size-4 mb-4">{{ article.article_title }}</h3>
                <div style="display:flex; flex-direction: row; justify-content: space-between;">
                    <p>{{ article.author }}</p>
                    <p>{{ (new Date(Date.parse(article.publish_date.slice(0,19)))).toLocaleString('en-GB') }}</p>
                    <router-link :to="{ name: 'Article', params: { id: article.id }}" class="button is-light">Details</router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'Articles',
    data() {
        return {
            articles: []
        }
    },
    mounted() {
        this.getArticles()
    },
    methods: {
        getArticles() {
            axios
                .get('/api/v1/articles/')
                .then(response => {
                    for (let i = 0; i < response.data.length; i++) {
                        this.articles.push(response.data[i])
                    }
                    this.articles = this.articles.reverse()
                })
                .catch(error => {
                    console.log(JSON.stringify(error))
                })
        }
    }
}
</script>