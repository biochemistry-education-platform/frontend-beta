<template>
    <div v-if="this.$store.state.user.role != 'Teacher'" class="biochemistry-page">
        <h1 class="biochemistry-page-title">{{ $t('notes') }}</h1>
        <!-- <SearchForm v-bind:items="notes" v-on:filterit="filterit"/> -->
        <hr class="biochemistry-page-hr">
        <div class="notes-list">
            <div class="notes__note" v-for="note in filteredNotes" v-bind:key="note.id">
                <div class="note__content">
                    <router-link :to="{ name: 'Note', params: { id: note.id }}" class="note__title">{{ $t('note') }} «{{ note.based_on_article }}»</router-link>
                    <div class="article__info">
                        <div class="article-info-item article-info__author">
                            <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48"><path d="M480 575q-66 0-108-42t-42-108q0-66 42-108t108-42q66 0 108 42t42 108q0 66-42 108t-108 42ZM160 896v-94q0-38 19-65t49-41q67-30 128.5-45T480 636q62 0 123 15.5t127.921 44.694q31.301 14.126 50.19 40.966Q800 764 800 802v94H160Zm60-60h520v-34q0-16-9.5-30.5T707 750q-64-31-117-42.5T480 696q-57 0-111 11.5T252 750q-14 7-23 21.5t-9 30.5v34Zm260-321q39 0 64.5-25.5T570 425q0-39-25.5-64.5T480 335q-39 0-64.5 25.5T390 425q0 39 25.5 64.5T480 515Zm0-90Zm0 411Z"/></svg>
                            <p>{{ note.article_author }}</p>
                        </div>
                        <div class="article-info-item article-info__date">
                            <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48"><path d="m627 769 45-45-159-160V363h-60v225l174 181ZM480 976q-82 0-155-31.5t-127.5-86Q143 804 111.5 731T80 576q0-82 31.5-155t86-127.5Q252 239 325 207.5T480 176q82 0 155 31.5t127.5 86Q817 348 848.5 421T880 576q0 82-31.5 155t-86 127.5Q708 913 635 944.5T480 976Zm0-400Zm0 340q140 0 240-100t100-240q0-140-100-240T480 236q-140 0-240 100T140 576q0 140 100 240t240 100Z"/></svg>
                            <p>{{ (new Date(Date.parse(note.article_publish_date.slice(0,19)))).toLocaleString('en-GB') }}</p>
                        </div>
                    </div>
                    <div class="article__tags-list" v-if="note.article_tags.length > 0">
                        <div class="article__tag" v-for="tag in note.article_tags">{{ tag }}</div>
                    </div>
                </div>
                <hr class="note-separator">
                <div class="note-delete">
                    <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48"><path d="m249 849-42-42 231-231-231-231 42-42 231 231 231-231 42 42-231 231 231 231-42 42-231-231-231 231Z"/></svg>
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
            articles: [],
            filteredNotes: []
        }
    },
    mounted() {
        this.getNotes()
    },
    methods: {
        getNotes() {
            this.notes = [
                {
                    id: 1,
                    based_on_article: 'Name of the article',
                    article_author: 'Author Name',
                    article_publish_date: (new Date('16 April 2023 16:48 UTC')).toISOString(),
                    article_tags: ['белки']
                },
                {
                    id: 2,
                    based_on_article: 'Article name',
                    article_author: 'Author Name',
                    article_publish_date: (new Date('06 May 2023 10:28 UTC')).toISOString(),
                    article_tags: ['липиды']
                }

            ]
            this.filteredNotes = this.notes.reverse()
        },
        // async getNotes() {
        //     await axios
        //         .get('/api/v1/notes/')
        //         .then(response => {
        //             for (let i = 0; i < response.data.length; i++) {
        //                 this.notes.push(response.data[i])
        //                 this.filteredNotes.push(response.data[i])
        //             }
        //             this.filteredNotes = this.filteredNotes.reverse()
        //         })
        //         .catch(error => {
        //             console.log(JSON.stringify(error))
        //         })
        //     axios
        //         .get('/api/v1/articles/')
        //         .then(response => {
        //             Array.from(response.data).forEach(article => {
        //                 for (let i = 0; i < this.filteredNotes.length; i++) {
        //                     if (this.filteredNotes[i].based_on_article == article.title) {
        //                         // нашла соответствующую статью
        //                         this.filteredNotes[i].article_author = article.author
        //                         this.filteredNotes[i].article_publish_date = article.publish_date
        //                         this.filteredNotes[i].article_tags = article.tags
        //                     }
        //                 }
        //             })
        //         })
        //         .catch(error => {
        //             console.log(JSON.stringify(error))
        //         })
        // },
        filterit(newNotes) {
            this.filteredNotes = newNotes
        }
    }
}
</script>
