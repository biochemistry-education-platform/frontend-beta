<template>
    <div class="biochemistry-page">
        <h1 class="biochemistry-page-title">{{ $t('favorites') }}</h1>
        <!-- <SearchForm v-bind:items="articles" v-on:filterit="filterit"/> -->
        <hr class="biochemistry-page-hr">
        <div class="articles-list">
            <div class="articles__article" v-for="article in filteredArticles" v-bind:key="article.id">
                <div class="article-type">
                    <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48"><path d="M277 777h275v-60H277v60Zm0-171h406v-60H277v60Zm0-171h406v-60H277v60Zm-97 501q-24 0-42-18t-18-42V276q0-24 18-42t42-18h600q24 0 42 18t18 42v600q0 24-18 42t-42 18H180Zm0-60h600V276H180v600Zm0-600v600-600Z"/></svg>
                </div>
                <hr class="article-separator">
                <div class="article__content">
                    <router-link :to="{ name: 'Article', params: { id: article.id }}" class="article__title">{{ article.title }}</router-link>
                    <div class="article__info">
                        <div class="article-info-item article-info__author">
                            <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48"><path d="M480 575q-66 0-108-42t-42-108q0-66 42-108t108-42q66 0 108 42t42 108q0 66-42 108t-108 42ZM160 896v-94q0-38 19-65t49-41q67-30 128.5-45T480 636q62 0 123 15.5t127.921 44.694q31.301 14.126 50.19 40.966Q800 764 800 802v94H160Zm60-60h520v-34q0-16-9.5-30.5T707 750q-64-31-117-42.5T480 696q-57 0-111 11.5T252 750q-14 7-23 21.5t-9 30.5v34Zm260-321q39 0 64.5-25.5T570 425q0-39-25.5-64.5T480 335q-39 0-64.5 25.5T390 425q0 39 25.5 64.5T480 515Zm0-90Zm0 411Z"/></svg>
                            <p>{{ article.author }}</p>
                        </div>
                        <div class="article-info-item article-info__date">
                            <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48"><path d="m627 769 45-45-159-160V363h-60v225l174 181ZM480 976q-82 0-155-31.5t-127.5-86Q143 804 111.5 731T80 576q0-82 31.5-155t86-127.5Q252 239 325 207.5T480 176q82 0 155 31.5t127.5 86Q817 348 848.5 421T880 576q0 82-31.5 155t-86 127.5Q708 913 635 944.5T480 976Zm0-400Zm0 340q140 0 240-100t100-240q0-140-100-240T480 236q-140 0-240 100T140 576q0 140 100 240t240 100Z"/></svg>
                            <p>{{ (new Date(Date.parse(article.publish_date.slice(0,19)))).toLocaleString('en-GB') }}</p>
                        </div>
                    </div>
                    <div class="article__tags-list" v-if="article.tags.length > 0">
                        <div class="article__tag" v-for="tag in article.tags">{{ tag }}</div>
                    </div>
                </div>
                <hr class="article-separator">
                <div class="article-favorite" @click="deleteArticle(article.id)">
                    <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48"><path d="m233 976 65-281L80 506l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z"/></svg>
                </div>
            </div>
        </div>
        
    </div>
</template>

<script>
import axios from 'axios'
import SearchForm from '@/components/SearchForm.vue'


export default {
    name: 'Favourites',
    components: {
        SearchForm,
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
            this.articles = [
                {
                    id: 1,
                    title: 'article title',
                    type: 'text_article',
                    author: 'author name',
                    tags: [],
                    publish_date: (new Date('05 October 2011 14:48 UTC')).toISOString()
                },
                {
                    id: 2,
                    title: 'article title2',
                    type: 'text_article',
                    author: 'author name2',
                    tags: ['белки', 'липиды'],
                    publish_date: (new Date('06 October 2011 16:48 UTC')).toISOString()
                },
                {
                    id: 3,
                    title: 'article title3',
                    type: 'text_article',
                    author: 'author name3',
                    tags: ['гормоны'],
                    publish_date: (new Date('07 October 2011 12:40 UTC')).toISOString()
                }
            ]
            this.filteredArticles = this.articles.reverse()
        },
        // getArticles() {
        //     axios
        //         .get('/api/v1/articles/')
        //         .then(response => {
        //             for (let i = 0; i < response.data.length; i++) {
        //                 this.articles.push(response.data[i])
        //                 this.filteredArticles.push(response.data[i])
        //             }
        //             this.filteredArticles = this.filteredArticles.reverse()
        //         })
        //         .catch(error => {
        //             console.log(JSON.stringify(error))
        //         })
        // },
        deleteArticle(id) {
            let index = -1
            this.filteredArticles.forEach(article => {
                if (article.id === id) {
                    index = this.filteredArticles.indexOf(article)
                }
            })
            this.filteredArticles.splice(index, 1)
            // и отправить запрос на удаление статьи из избранного
        },
        filterit(newArticles) {
            this.filteredArticles = newArticles
        }
    }
}
</script>
