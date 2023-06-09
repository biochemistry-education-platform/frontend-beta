<template>
    <div class="biochemistry-page">
        <div v-if="isMenuShown" class="darker-bg" @click="emit('closeMenu')"></div>
        <div v-if="isMobile" class="mobile-header">
            <img src="@/assets/icons/logo_text.png">
            <svg @click="switchMenuDisplay" xmlns="http://www.w3.org/2000/svg" height="16" viewBox="0 96 960 960" width="16"><path d="M120 816v-60h720v60H120Zm0-210v-60h720v60H120Zm0-210v-60h720v60H120Z"/></svg>
        </div>
        <h1 class="biochemistry-page-title">{{ $t('notes') }}</h1>
        <!-- <SearchForm v-bind:items="notes" v-on:filterit="filterit"/> -->
        <hr v-if="!isMobile" class="biochemistry-page-hr">
        <div class="notes-list">
            <div class="notes__note" v-for="note in filteredNotes" v-bind:key="note.id">
                <div class="note__content">
                    <router-link :to="{ name: 'Note', params: { id: note.id }}" class="note__title">{{ $t('note') }} «{{ note.based_on_article }}»</router-link>
                    <div class="article__info">
                        <div class="article-info-item article-info__author">
                            <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48"><path d="M480 575q-66 0-108-42t-42-108q0-66 42-108t108-42q66 0 108 42t42 108q0 66-42 108t-108 42ZM160 896v-94q0-38 19-65t49-41q67-30 128.5-45T480 636q62 0 123 15.5t127.921 44.694q31.301 14.126 50.19 40.966Q800 764 800 802v94H160Zm60-60h520v-34q0-16-9.5-30.5T707 750q-64-31-117-42.5T480 696q-57 0-111 11.5T252 750q-14 7-23 21.5t-9 30.5v34Zm260-321q39 0 64.5-25.5T570 425q0-39-25.5-64.5T480 335q-39 0-64.5 25.5T390 425q0 39 25.5 64.5T480 515Zm0-90Zm0 411Z"/></svg>
                            <p>{{ note.article_author.surname }} {{ note.article_author.name }} {{ note.article_author.secondname }}</p>
                        </div>
                        <div v-if="note.article_author.id != note.article_reviewer.id" class="article-info-item article-info__author">
                            <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48"><path d="M480 575q-66 0-108-42t-42-108q0-66 42-108t108-42q66 0 108 42t42 108q0 66-42 108t-108 42ZM160 896v-94q0-38 19-65t49-41q67-30 128.5-45T480 636q62 0 123 15.5t127.921 44.694q31.301 14.126 50.19 40.966Q800 764 800 802v94H160Zm60-60h520v-34q0-16-9.5-30.5T707 750q-64-31-117-42.5T480 696q-57 0-111 11.5T252 750q-14 7-23 21.5t-9 30.5v34Zm260-321q39 0 64.5-25.5T570 425q0-39-25.5-64.5T480 335q-39 0-64.5 25.5T390 425q0 39 25.5 64.5T480 515Zm0-90Zm0 411Z"/></svg>
                            <p>{{ note.article_reviewer.surname }} {{ note.article_reviewer.name }} {{ note.article_reviewer.secondname }}</p>
                        </div>
                        <div class="article-info-item article-info__date">
                            <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48"><path d="m627 769 45-45-159-160V363h-60v225l174 181ZM480 976q-82 0-155-31.5t-127.5-86Q143 804 111.5 731T80 576q0-82 31.5-155t86-127.5Q252 239 325 207.5T480 176q82 0 155 31.5t127.5 86Q817 348 848.5 421T880 576q0 82-31.5 155t-86 127.5Q708 913 635 944.5T480 976Zm0-400Zm0 340q140 0 240-100t100-240q0-140-100-240T480 236q-140 0-240 100T140 576q0 140 100 240t240 100Z"/></svg>
                            <p>{{ note.article_publish_date }}</p>
                        </div>
                    </div>
                    <div class="article__tags-list" v-if="note.article_tags.length > 0">
                        <div class="article__tag" v-for="tag in note.article_tags">{{ tag }}</div>
                    </div>
                </div>
                <hr v-if="!isMobile" class="note-separator">
                <div class="note-delete">
                    <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48"><path d="m249 849-42-42 231-231-231-231 42-42 231 231 231-231 42 42-231 231 231 231-42 42-231-231-231 231Z"/></svg>
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
// import store from '@/stores/user'
import { ref, defineEmits, defineProps, onMounted } from 'vue'
import gql from 'graphql-tag'
import { apolloClient } from '@/vue-apollo'
import { toast } from 'bulma-toast'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

const i18n = useI18n()
const router = useRouter()

const emit = defineEmits(['openMenu', 'closeMenu'])

const props = defineProps({
    isMenuShown: Boolean,
    isMobile: Boolean
})

let articles = []
let notes = []
let filteredNotes = ref([])

const GET_NOTES_QUERY = gql`query GetNotesByUserQuery($userId: Int!) {
    getNoteByUser(id: $userId) {
        id
        articleId {
            id
            name
            articletagSet {
                tagId {
                    id
                    name
                }
            }
            author {
                authorId {
                    id
                    name
                    surname
                    secondname
                }
            }
            reviewer {
                id
                name
                surname
                secondname
            }
            publishDate
        }
    }
}`
onMounted(async () => {
    await getNotes()
})

async function getNotes() {
    await apolloClient
        .query({
            query: GET_NOTES_QUERY,
            variables: {
                // userId: store.state.user.id
                userId: 11
            }
        })
        .then(result => { result.data.getNoteByUser.forEach(note => {
            let taglist = []
            note.articleId.articletagSet.forEach(tag => taglist.push(tag.tagId.name))
            let newNote = {
                id: note.id,
                based_on_article: note.articleId.name,
                article_author: note.articleId.author.authorId,
                article_reviewer: note.articleId.reviewer,
                article_publish_date: new Date(Date.parse(new Date(note.articleId.publishDate))).toLocaleDateString('ru-RU', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                }),
                filter_date: new Date(Date.parse(note.articleId.publishDate)),
                article_tags: taglist
            }
            notes.push(newNote)
        })})
    // notes = [
    //     {
    //         id: 1,
    //         based_on_article: 'Медицина в литературе',
    //         article_author: 'Онегин Е.',
    //         article_publish_date: new Date(Date.parse(new Date('23 May 2023 16:48 UTC'))).toLocaleDateString('ru-RU', {
    //             year: 'numeric',
    //             month: '2-digit',
    //             day: '2-digit',
    //         }),
    //         article_tags: ['литература', 'дуэли']
    //     },
    //     {
    //         id: 2,
    //         based_on_article: 'Статья с полным форматированием',
    //         article_author: 'Быстрых Е.',
    //         article_publish_date: new Date(Date.parse(new Date('25 May 2023 10:28 UTC'))).toLocaleDateString('ru-RU', {
    //             year: 'numeric',
    //             month: '2-digit',
    //             day: '2-digit',
    //         }),
    //         article_tags: ['форматирование', 'платформа']
    //     }
    // ]
    notes.forEach(note => filteredNotes.value.push(note))
    filteredNotes.value.sort((a,b) => new Date(b.filter_date) - new Date(a.filter_date))
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
