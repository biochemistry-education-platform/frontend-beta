<template>
    <div v-if="user.role != 'Student'" class="biochemistry-page">
        <h1 class="biochemistry-page-title">{{ $t('forChecking') }}</h1>
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
                            <p>{{ article.creation_date }}</p>
                        </div>
                    </div>
                    <div class="article__tags-list" v-if="article.tags.length > 0">
                        <div class="article__tag" v-for="tag in article.tags">{{ tag }}</div>
                    </div>
                </div>
                <hr class="article-separator">
                <div class="article-checking">
                    <svg @click="acceptArticle(article.id)" class="article-status-accept" xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48"><path d="m421 758 283-283-46-45-237 237-120-120-45 45 165 166Zm59 218q-82 0-155-31.5t-127.5-86Q143 804 111.5 731T80 576q0-83 31.5-156t86-127Q252 239 325 207.5T480 176q83 0 156 31.5T763 293q54 54 85.5 127T880 576q0 82-31.5 155T763 858.5q-54 54.5-127 86T480 976Zm0-60q142 0 241-99.5T820 576q0-142-99-241t-241-99q-141 0-240.5 99T140 576q0 141 99.5 240.5T480 916Zm0-340Z"/></svg>
                    <hr class="article-separator">
                    <svg @click="declineArticle(article.id)" class="article-status-decline" xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48"><path d="m330 768 150-150 150 150 42-42-150-150 150-150-42-42-150 150-150-150-42 42 150 150-150 150 42 42Zm150 208q-82 0-155-31.5t-127.5-86Q143 804 111.5 731T80 576q0-83 31.5-156t86-127Q252 239 325 207.5T480 176q83 0 156 31.5T763 293q54 54 85.5 127T880 576q0 82-31.5 155T763 858.5q-54 54.5-127 86T480 976Zm0-60q142 0 241-99.5T820 576q0-142-99-241t-241-99q-141 0-240.5 99T140 576q0 141 99.5 240.5T480 916Zm0-340Z"/></svg>
                </div>
            </div>
        </div>
        
    </div>
</template>

<script>
export default {
    name: 'ArticlesForChecking',
}
</script>

<script setup>
import SearchForm from '@/components/SearchForm.vue'
import { ref, reactive, defineProps, onMounted } from 'vue'
import gql from 'graphql-tag'
import { apolloClient } from '@/vue-apollo'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()

let articles = []
let filteredArticles = ref([])

let user = JSON.parse(userStore.$state.user)

const ARTICLES_FOR_CHECKING_QUERY = gql`query GetArticlesByReviewer($reviewId: Int!) {
    getArticlesReview(reviewId: $reviewId) {
        id
        name
        articleText
        creationDate
        author {
            authorId {
                id
                name
                surname
                secondname
            }
        }
        articletagSet {
            tagId {
                name
            }
        }
        publishStatus
    }
}`

onMounted(async () => {
    await getArticlesForChecking()
})

async function getArticlesForChecking() {
    await apolloClient
        .query({
            query: ARTICLES_FOR_CHECKING_QUERY,
            variables: {
                reviewId: Number(user.profileID)
            }
        })
        .then(result => {
            console.log(result)
            result.data.getArticlesReview.forEach(suggestedArticle => {
                let authorFullName = suggestedArticle.author.authorId.surname + ' ' + suggestedArticle.author.authorId.name.charAt(0) + '.'
                if (suggestedArticle.author.authorId.secondname != "") { authorFullName += (' ' + suggestedArticle.author.authorId.secondname.charAt(0) + '.')}
                let tagList = []
                suggestedArticle.articletagSet.forEach(tag => {
                    tagList.push(tag.tagId.name)
                })
                let date = new Date(Date.parse(suggestedArticle.creationDate)).toLocaleDateString('ru-RU', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                })
                let fdate = new Date(Date.parse(suggestedArticle.creationDate))
                let article = {
                    id: suggestedArticle.id,
                    title: suggestedArticle.name,
                    type: 'text_article',
                    author: authorFullName,
                    tags: tagList,
                    creation_date: date,
                    filter_date: fdate,
                }
                articles.push(article)
            })
        })
        .catch(error => console.log(error))
    
    articles.forEach(article => filteredArticles.value.push(article))
    filteredArticles.value.sort((a,b) => new Date(b.filter_date) - new Date(a.filter_date))
}

function acceptArticle(articleID) {
    console.log('accepted article!')
}
function declineArticle(articleID) {
    console.log('declined article!')
}
</script>

<style>
.article-checking {
    display: flex;
    align-items: center;
}

.article-checking svg:hover {
    cursor: pointer;
}

.article-checking svg {
    width: 110px;
    height: 30px;
    padding-left: 40px;
    padding-right: 40px;
}

.article-status-accept {
    fill: var(--menu-accent);
}

.article-status-decline {
    fill: var(--danger);
}
</style>
