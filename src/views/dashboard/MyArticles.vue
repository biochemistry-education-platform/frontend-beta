<template>
    <div class="biochemistry-page">
        <div v-if="isMenuShown" class="darker-bg"></div>
        <div v-if="isMobile" class="mobile-header">
            <img src="@/assets/icons/logo_text.png">
            <svg @click="switchMenuDisplay" xmlns="http://www.w3.org/2000/svg" height="16" viewBox="0 96 960 960" width="16"><path d="M120 816v-60h720v60H120Zm0-210v-60h720v60H120Zm0-210v-60h720v60H120Z"/></svg>
        </div>
        <h1 class="biochemistry-page-title">{{ $t('myArticles') }}</h1>
        <!-- <SearchForm v-bind:items="articles" v-on:filterit="filterit"/> -->
        <hr v-if="!isMobile" class="biochemistry-page-hr">
        <div class="articles-list">
            <div class="articles__article" v-for="article in filteredArticles" :key="article.id">
                <div class="article-type">
                    <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48"><path d="M277 777h275v-60H277v60Zm0-171h406v-60H277v60Zm0-171h406v-60H277v60Zm-97 501q-24 0-42-18t-18-42V276q0-24 18-42t42-18h600q24 0 42 18t18 42v600q0 24-18 42t-42 18H180Zm0-60h600V276H180v600Zm0-600v600-600Z"/></svg>
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
                            <p>{{ article.publish_date }}</p>
                        </div>
                    </div>
                    <div class="article__tags-list" v-if="article.tags.length > 0">
                        <div class="article__tag" v-for="tag in article.tags">{{ tag }}</div>
                    </div>
                </div>
                <hr v-if="!isMobile" class="article-separator">
                <div v-if="current_role != 'Student'" class="article-favorite" @click="article.isSaved = !article.isSaved">
                    <svg v-if="article.isSaved" xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48"><path d="m233 976 65-281L80 506l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z"/></svg>
                    <svg v-else xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48"><path d="m323 851 157-94 157 95-42-178 138-120-182-16-71-168-71 167-182 16 138 120-42 178Zm-90 125 65-281L80 506l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Zm247-355Z"/></svg>
                </div>
                <div v-if="current_role == 'Student'" class="article-status">
                    <svg v-if="article.status == 'accepted'" class="article-status-accepted" xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48"><path d="m421 758 283-283-46-45-237 237-120-120-45 45 165 166Zm59 218q-82 0-155-31.5t-127.5-86Q143 804 111.5 731T80 576q0-83 31.5-156t86-127Q252 239 325 207.5T480 176q83 0 156 31.5T763 293q54 54 85.5 127T880 576q0 82-31.5 155T763 858.5q-54 54.5-127 86T480 976Zm0-60q142 0 241-99.5T820 576q0-142-99-241t-241-99q-141 0-240.5 99T140 576q0 141 99.5 240.5T480 916Zm0-340Z"/></svg>
                    <svg v-if="article.status == 'declined'" class="article-status-declined" xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48"><path d="m330 768 150-150 150 150 42-42-150-150 150-150-42-42-150 150-150-150-42 42 150 150-150 150 42 42Zm150 208q-82 0-155-31.5t-127.5-86Q143 804 111.5 731T80 576q0-83 31.5-156t86-127Q252 239 325 207.5T480 176q83 0 156 31.5T763 293q54 54 85.5 127T880 576q0 82-31.5 155T763 858.5q-54 54.5-127 86T480 976Zm0-60q142 0 241-99.5T820 576q0-142-99-241t-241-99q-141 0-240.5 99T140 576q0 141 99.5 240.5T480 916Zm0-340Z"/></svg>
                    <svg v-if="article.status == 'checking'" class="article-status-checking" xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48"><path d="M266.118 626Q287 626 301.5 611.382q14.5-14.617 14.5-35.5Q316 555 301.382 540.5q-14.617-14.5-35.5-14.5Q245 526 230.5 540.618q-14.5 14.617-14.5 35.5Q216 597 230.618 611.5q14.617 14.5 35.5 14.5Zm214 0Q501 626 515.5 611.382q14.5-14.617 14.5-35.5Q530 555 515.382 540.5q-14.617-14.5-35.5-14.5Q459 526 444.5 540.618q-14.5 14.617-14.5 35.5Q430 597 444.618 611.5q14.617 14.5 35.5 14.5Zm213 0Q714 626 728.5 611.382q14.5-14.617 14.5-35.5Q743 555 728.382 540.5q-14.617-14.5-35.5-14.5Q672 526 657.5 540.618q-14.5 14.617-14.5 35.5Q643 597 657.618 611.5q14.617 14.5 35.5 14.5ZM480.266 976q-82.734 0-155.5-31.5t-127.266-86q-54.5-54.5-86-127.341Q80 658.319 80 575.5q0-82.819 31.5-155.659Q143 347 197.5 293t127.341-85.5Q397.681 176 480.5 176q82.819 0 155.659 31.5Q709 239 763 293t85.5 127Q880 493 880 575.734q0 82.734-31.5 155.5T763 858.316q-54 54.316-127 86Q563 976 480.266 976Zm.234-60Q622 916 721 816.5t99-241Q820 434 721.188 335 622.375 236 480 236q-141 0-240.5 98.812Q140 433.625 140 576q0 141 99.5 240.5t241 99.5Zm-.5-340Z"/></svg>   
                </div>
            </div>
        </div>
        
    </div>
</template>

<script>
export default {
    name: 'MyArticles',
}
</script>

<script setup>
import SearchForm from '@/components/SearchForm.vue'
// import store from '@/stores/user'
import { ref, defineEmits, defineProps, onMounted } from 'vue'
import gql from 'graphql-tag'
import { apolloClient } from '@/vue-apollo'
import { toast } from 'bulma-toast'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

const i18n = useI18n()
const router = useRouter()
let current_role = ref('')

const emit = defineEmits(['openMenu', 'closeMenu'])

const props = defineProps({
    isMenuShown: Boolean,
    isMobile: Boolean
})

let articles = []
let filteredArticles = ref([])

onMounted(async () => {
    await getArticles()
})

async function getArticles() {
    // current_role.value = store.state.user.role
    current_role.value = 'Student'
    articles = [
        {
            id: 1,
            title: 'Название статьи',
            type: 'text_article',
            author: 'Фамилия Имя',
            tags: ['СНО'],
            publish_date: new Date(Date.parse(new Date('02 May 2023 19:24 UTC'))).toLocaleDateString('ru-RU', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
            }),
            status: 'declined'
        },
        {
            id: 2,
            title: 'Название статьи2',
            type: 'text_article',
            author: 'Фамилия Имя',
            tags: ['белки', 'липиды'],
            publish_date: new Date(Date.parse(new Date('04 May 2023 16:50 UTC'))).toLocaleDateString('ru-RU', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
            }),
            status: 'accepted'
        },
        {
            id: 3,
            title: 'Название статьи3',
            type: 'text_article',
            author: 'Фамилия Имя',
            tags: ['гормоны'],
            publish_date: new Date(Date.parse(new Date('05 May 2023 11:37 UTC'))).toLocaleDateString('ru-RU', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
            }),
            status: 'checking'
        },
        {
            id: 4,
            title: 'Название статьи4',
            type: 'text_article',
            author: 'Фамилия Имя',
            tags: ['белки', 'липиды'],
            publish_date: new Date(Date.parse(new Date('06 May 2023 18:21 UTC'))).toLocaleDateString('ru-RU', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
            }),
            status: 'accepted'
        }
    ]
    filteredArticles.value = articles.reverse()
}

function filterit(newArticles) {
    filteredArticles.value = newArticles
}

function switchMenuDisplay() {
    if (props.isMenuShown == false) {
        emit('openMenu', true)
    }
}
</script>
