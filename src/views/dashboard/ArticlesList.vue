<template>
    <div class="articles-list-page">
        <div class="columns is-multiline">
            <h1 class="title">Articles</h1>
        </div>
        <SearchForm v-bind:items="articles" v-on:filterit="filterit"/>
        <div class="column is-12" v-for="article in filteredArticles" v-bind:key="article.id">
            <div class="box">
                <h3 class="is-size-4 mb-4 article-title">{{ article.title }}</h3>
                <div class="tags-list" v-if="article.tags.length > 0">
                    <div class="tag-div button is-success" v-for="tag in article.tags">{{ tag }}</div>
                </div>
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
import SearchForm from '@/components/SearchForm.vue'

export default {
    name: 'Articles',
    components: {
        SearchForm
    },
    data() {
        return {
            articles: [],
            filteredArticles: []
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
                        this.filteredArticles.push(response.data[i])
                    }
                    this.filteredArticles = this.filteredArticles.reverse()
                })
                .catch(error => {
                    console.log(JSON.stringify(error))
                })
        },
        filterit(newArticles) {
            this.filteredArticles = newArticles
        }
    }
}
</script>

<style>
.article-title {
    margin: 8px !important;
}
.tags-list {
    display: flex;
    flex-direction: row;
    margin-bottom: 8px;
}
.tag-div {
    margin-right: 14px;
    height: 1.5rem;
}
</style>