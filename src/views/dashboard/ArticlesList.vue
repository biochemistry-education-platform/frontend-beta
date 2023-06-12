<template>
    <div class="biochemistry-page">
        <div v-if="isMenuShown" class="darker-bg" @click="emit('closeMenu')"></div>
        <div v-if="isMobile" class="mobile-header">
            <div class="logo-block">
                <img src="@/assets/icons/logo.png">
                <p class="logo-name">plateaumed</p>
            </div>
            <svg @click="switchMenuDisplay" xmlns="http://www.w3.org/2000/svg" height="16" viewBox="0 96 960 960" width="16"><path d="M120 816v-60h720v60H120Zm0-210v-60h720v60H120Zm0-210v-60h720v60H120Z"/></svg>
        </div>
        <h1 class="biochemistry-page-title">{{ $t('feed') }}</h1>
        <SearchForm :items="articles" :isMobile="isMobile" v-on:filterit="filterit"/>
        <hr v-if="!isMobile" class="biochemistry-page-hr">
        <div class="articles-list">
            <div class="articles__article" v-for="article in filteredArticles" :key="article.id">
                <div class="article-type">
                    <svg v-if="article.type == 'Notification_article'" xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48"><path d="M180-80q-24 0-42-18t-18-42v-620q0-24 18-42t42-18h65v-60h65v60h340v-60h65v60h65q24 0 42 18t18 42v620q0 24-18 42t-42 18H180Zm0-60h600v-430H180v430Zm0-490h600v-130H180v130Zm0 0v-130 130Zm300 230q-17 0-28.5-11.5T440-440q0-17 11.5-28.5T480-480q17 0 28.5 11.5T520-440q0 17-11.5 28.5T480-400Zm-160 0q-17 0-28.5-11.5T280-440q0-17 11.5-28.5T320-480q17 0 28.5 11.5T360-440q0 17-11.5 28.5T320-400Zm320 0q-17 0-28.5-11.5T600-440q0-17 11.5-28.5T640-480q17 0 28.5 11.5T680-440q0 17-11.5 28.5T640-400ZM480-240q-17 0-28.5-11.5T440-280q0-17 11.5-28.5T480-320q17 0 28.5 11.5T520-280q0 17-11.5 28.5T480-240Zm-160 0q-17 0-28.5-11.5T280-280q0-17 11.5-28.5T320-320q17 0 28.5 11.5T360-280q0 17-11.5 28.5T320-240Zm320 0q-17 0-28.5-11.5T600-280q0-17 11.5-28.5T640-320q17 0 28.5 11.5T680-280q0 17-11.5 28.5T640-240Z"/></svg>
                    <svg v-else xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48"><path d="M277 777h275v-60H277v60Zm0-171h406v-60H277v60Zm0-171h406v-60H277v60Zm-97 501q-24 0-42-18t-18-42V276q0-24 18-42t42-18h600q24 0 42 18t18 42v600q0 24-18 42t-42 18H180Zm0-60h600V276H180v600Zm0-600v600-600Z"/></svg>
                </div>
                <hr v-if="!isMobile" class="article-separator">
                <div class="article__content">
                    <router-link :to="{ name: 'Article', params: { id: article.id }}" class="article__title">{{ article.title }}</router-link>
                    <div class="article__info">
                        <div class="article-info-item article-info__author">
                            <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48"><path d="M480 575q-66 0-108-42t-42-108q0-66 42-108t108-42q66 0 108 42t42 108q0 66-42 108t-108 42ZM160 896v-94q0-38 19-65t49-41q67-30 128.5-45T480 636q62 0 123 15.5t127.921 44.694q31.301 14.126 50.19 40.966Q800 764 800 802v94H160Zm60-60h520v-34q0-16-9.5-30.5T707 750q-64-31-117-42.5T480 696q-57 0-111 11.5T252 750q-14 7-23 21.5t-9 30.5v34Zm260-321q39 0 64.5-25.5T570 425q0-39-25.5-64.5T480 335q-39 0-64.5 25.5T390 425q0 39 25.5 64.5T480 515Zm0-90Zm0 411Z"/></svg>
                            <p>{{ article.author }}</p>
                        </div>
                        <div class="article-info-item article-info__date">
                            <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48"><path d="m627 769 45-45-159-160V363h-60v225l174 181ZM480 976q-82 0-155-31.5t-127.5-86Q143 804 111.5 731T80 576q0-82 31.5-155t86-127.5Q252 239 325 207.5T480 176q82 0 155 31.5t127.5 86Q817 348 848.5 421T880 576q0 82-31.5 155t-86 127.5Q708 913 635 944.5T480 976Zm0-400Zm0 340q140 0 240-100t100-240q0-140-100-240T480 236q-140 0-240 100T140 576q0 140 100 240t240 100Z"/></svg>
                            <p v-if="article.type == 'Article'">{{ article.publish_date }}</p>
                            <p v-else>{{ article.event_date }}    |    {{ article.event_place }}</p>
                        </div>
                    </div>
                    <div class="article__tags-list" v-if="article.tags.length > 0">
                        <div class="article__tag" v-for="tag in article.tags">{{ tag }}</div>
                    </div>
                </div>
                <hr v-if="!isMobile" class="article-separator">
                <div class="article-favorite" @click="switchSaved(article.id)">
                    <svg v-if="article.isSaved" xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48"><path d="m233 976 65-281L80 506l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z"/></svg>
                    <svg v-else xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48"><path d="m323 851 157-94 157 95-42-178 138-120-182-16-71-168-71 167-182 16 138 120-42 178Zm-90 125 65-281L80 506l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Zm247-355Z"/></svg>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Articles',
}
</script>

<script setup>
import SearchForm from '@/components/SearchForm.vue'
import { ref, defineEmits, defineProps, onMounted } from 'vue'
import gql from 'graphql-tag'
import { apolloClient } from '@/vue-apollo'
import { toast } from 'bulma-toast'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
// import store from '@/stores/user'

const i18n = useI18n()
const router = useRouter()
const userStore = useUserStore()

const emit = defineEmits(['openMenu', 'closeMenu'])

const props = defineProps({
    isMenuShown: Boolean,
    isMobile: Boolean
})

let articles = []
let filteredArticles = ref([])

let user = JSON.parse(userStore.$state.user)

const FAV_QUERY = gql`query GetUserFavour($userId: Int!) {
    getUserFavour(userId: $userId) {
        articleId {
            id
            name
        }
    }
}`

const ADD_TO_FAV = gql`mutation ($userId: Int!, $articleId: Int!) {
    addFavourite(userId: $userId, articleId: $articleId) {
        favour{
            articleId{
                id, 
                name
            }
        }
    }
}`

const REMOVE_FROM_FAV = gql`mutation ($userId: Int!, $articleId: Int!) {
    deleteFavourite(userId: $userId, articleId: $articleId) {
        favour{
            articleId{
            id, name
            }
        }
    }
}`

const ALL_ARTICLES_QUERY = gql`query {
  allArticles {
    id
    type
    name
    author {
      authorId {
        id
        name
        surname
        secondname
        role {
          roleName
        }
      }
    }
    reviewer {
      id
      name
      surname
      secondname
      role {
        roleName
      }
    }
    publishDate
    publishStatus
    articletagSet {
      tagId {
        name
      }
    }
  }
}`

const NOTIF_QUERY = gql`query {
    allNotifications{
        id
        name
        notifText
        author {
            id
            name
            surname
            secondname
        }
        notificationtagSet {
            tagId {
                id
                name
            }
        }
    }
}`

onMounted(async () => {
    await getArticles()
})

async function getArticles() {
    await apolloClient
        .query({
            query: ALL_ARTICLES_QUERY
        })
        .then(result => {
            result.data.allArticles.forEach(article => { 
                let authorFullName = article.author.authorId.surname + ' ' + article.author.authorId.name.charAt(0) + '.'
                if (article.author.authorId.secondname != "") { authorFullName += (' ' + article.author.authorId.secondname.charAt(0) + '.')}
                let reviewerFullName = ''
                if (article.author.authorId.id != article.reviewer.id) {
                    //есть и автор, и проверяющий
                    reviewerFullName = article.reviewer.surname + ' ' + article.reviewer.name.charAt(0) + '.'
                    if (article.reviewer.secondname != "") { reviewerFullName += (' ' + article.reviewer.secondname.charAt(0) + '.')}
                }
                let tagList = []
                article.articletagSet.forEach(tag => {
                    tagList.push(tag.tagId.name)
                })
                let date = new Date(Date.parse(article.publishDate)).toLocaleDateString('ru-RU', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                })
                let fdate = new Date(Date.parse(article.publishDate))
                articles.push({
                    id: article.id,
                    title: article.name,
                    type: article.type,
                    author: authorFullName,
                    reviewer: reviewerFullName,
                    tags: tagList,
                    publish_date: date,
                    filter_date: fdate,
                    isSaved: false
                })
            })
        })
        .catch(error => console.log(error))
    await apolloClient
        .query({
            query: NOTIF_QUERY
        })
        .then(result => { 
            result.data.allNotifications.forEach(notif => {
                let authorFullName = notif.author.surname + ' ' + notif.author.name.charAt(0) + '.'
                if (notif.author.secondname != "") { authorFullName += (' ' + notif.author.secondname.charAt(0) + '.')}
                let tagList = []
                notif.notificationtagSet.forEach(tag => {
                    tagList.push(tag.tagId.name)
                })
                let date = new Date(Date.parse(JSON.parse(notif.notifText).place.date)).toLocaleTimeString('ru-RU', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit', 
                    minute: '2-digit'
                })
                let fdate = new Date(Date.parse(JSON.parse(notif.notifText).place.date))
                articles.push({
                    id: notif.id,
                    title: notif.name,
                    type: 'Notification_article',
                    author: authorFullName,
                    reviewer: authorFullName,
                    tags: tagList,
                    event_date: date,
                    filter_date: fdate,
                    event_place: JSON.parse(notif.notifText).place.place,
                    isSaved: false
                })
            })
        })
        .catch(error => console.log(error))
        
        // articles.push({
        //             id: 9000,
        //             title: 'Конференция СНО биохимические маркеры патологии почек',
        //             type: 'notification_article',
        //             author: 'Селина А.',
        //             reviewer: 'Селина А.',
        //             tags: ['оповещение', 'СНО', 'маркеры', 'почки', 'патология'],
        //             filter_date: new Date(Date.parse('25 May 2023 16:48 UTC')),
        //             publish_date: new Date(Date.parse('25 May 2023 16:48 UTC')).toLocaleString('ru-RU', {
        //                 year: 'numeric',
        //                 month: '2-digit',
        //                 day: '2-digit'
        //             }),
        //             event_date: new Date(Date.parse(new Date('25 May 2023 12:00 UTC'))).toLocaleDateString('ru-RU', {
        //                 year: 'numeric',
        //                 month: '2-digit',
        //                 day: '2-digit',
        //                 hour: '2-digit',
        //                 minute:'2-digit'
        //             }),
        //             event_place: 'Webinar',
        //             isSaved: false
        //         })
        articles.forEach(article => filteredArticles.value.push(article))
        filteredArticles.value.sort((a,b) => new Date(b.filter_date) - new Date(a.filter_date))

        if (user.profileID != '') {
            await apolloClient
                .query({
                    query: FAV_QUERY,
                    variables: {
                        userId: user.profileID
                    }
                })
                .then(result => { 
                    if (result.data.getUserFavour.length > 0) {
                        let allFavours = []
                        result.data.getUserFavour.forEach(article => {
                            allFavours.push(article.articleId.id)
                        })
                        filteredArticles.value.forEach(article => {
                            if (allFavours.includes(article.id)) {
                                article.isSaved = true
                            }
                        })
                    }
                })
                .catch(error => { console.log(error) })
        }
}

function filterit(newArticles) {
    filteredArticles.value = newArticles
}

function switchMenuDisplay() {
    if (props.isMenuShown == false) {
        emit('openMenu', true)
    }
}

async function switchSaved(articleId) {
    let result = filteredArticles.value.findIndex(article => article.id == articleId)
    console.log(result)
    if (filteredArticles.value[result].isSaved) {
        filteredArticles.value[result].isSaved = false
        console.log(`удалить статью ${filteredArticles.value[result].title}`)
        await apolloClient
            .mutate({
                mutation: REMOVE_FROM_FAV,
                // тут айди профиля!! из стора
                variables: {
                    userId: 11, 
                    articleId: articleId
                },
            })
            .then(result => { console.log(result) })
            .catch(error => { console.log(error) })
        return
    } else {
        filteredArticles.value[result].isSaved = true
        console.log(`добавить статью ${filteredArticles.value[result].title}`)
        await apolloClient
            .mutate({
                mutation: ADD_TO_FAV,
                // тут айди профиля!! из стора
                variables: {
                    userId: 11, 
                    articleId: articleId
                },
            })
            .then(result => { console.log(result) })
            .catch(error => { console.log(error) })
        return
    }
}
</script>
