<template>
    <div class="article-page" id="article-page">
        <div v-if="isMenuShown || showActions" class="darker-bg" @click="closeMenus"></div>
        <div v-if="isMobile" class="mobile-header">
            <div class="logo-block">
                <img src="@/assets/icons/logo.png">
                <p class="logo-name">plateaumed</p>
            </div>
            <svg @click="switchMenuDisplay" xmlns="http://www.w3.org/2000/svg" height="16" viewBox="0 96 960 960" width="16"><path d="M120 816v-60h720v60H120Zm0-210v-60h720v60H120Zm0-210v-60h720v60H120Z"/></svg>
        </div>
        <div v-if="article.tags.length > 0" class="article-tags">
            <div v-for="tag in article.tags" class="article-tag">#{{ tag }}</div>
        </div>
        <h1 v-if="!isMobile" class="article-title">{{ article.title }}</h1>
        <div class="mobile-article-title" v-if="isMobile"><h1 class="article-title">{{ article.title }}</h1><svg @click="showActions = true" xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 96 960 960" width="20"><path d="M479.858 896Q460 896 446 881.858q-14-14.141-14-34Q432 828 446.142 814q14.141-14 34-14Q500 800 514 814.142q14 14.141 14 34Q528 868 513.858 882q-14.141 14-34 14Zm0-272Q460 624 446 609.858q-14-14.141-14-34Q432 556 446.142 542q14.141-14 34-14Q500 528 514 542.142q14 14.141 14 34Q528 596 513.858 610q-14.141 14-34 14Zm0-272Q460 352 446 337.858q-14-14.141-14-34Q432 284 446.142 270q14.141-14 34-14Q500 256 514 270.142q14 14.141 14 34Q528 324 513.858 338q-14.141 14-34 14Z"/></svg></div>

        <div class="article-info">
            <div class="article-author">
                <div><img class="article-author-img" src="@/assets/icons/profile_img.png"></div>
                <div class="article-author-info">
                    <p class="article-author-name">{{ article.author }}</p>
                    <p class="article-author-extra">{{ role == 'Teacher' ? $t('roleTeacher') : (role == 'Sno_student' ? $t('roleSSS') : $t('roleStudent')) }}</p>
                    <p class="article-author-extra">{{ date }}</p>
                </div>
            </div>

            <div v-if="!isMobile && !hideForPdf" class="article-actions">
                <div v-if="user_role != ''" class="article-action"><p>{{ $t('toFavorites') }}</p><svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 96 960 960" width="20"><path d="m323 851 157-94 157 95-42-178 138-120-182-16-71-168-71 167-182 16 138 120-42 178Zm-90 125 65-281L80 506l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Zm247-355Z"/></svg></div>
                <div v-if="user_role != 'Teacher' && user_role != ''" class="article-action"><p>{{ $t('toNote') }}</p><svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 96 960 960" width="20"><path d="M277 777h275v-60H277v60Zm0-171h406v-60H277v60Zm0-171h406v-60H277v60Zm-97 501q-24 0-42-18t-18-42V276q0-24 18-42t42-18h600q24 0 42 18t18 42v600q0 24-18 42t-42 18H180Zm0-60h600V276H180v600Zm0-600v600-600Z"/></svg></div>
                <div class="article-action" v-on:click="getPdf"><p>{{ $t('download')}}</p><svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 96 960 960" width="20"><path d="M220 896q-24 0-42-18t-18-42V693h60v143h520V693h60v143q0 24-18 42t-42 18H220Zm260-153L287 550l43-43 120 120V256h60v371l120-120 43 43-193 193Z"/></svg></div>
            </div>
        </div>
        
        <hr v-if="!isMobile">

        <div class="article-text" id="articleText"></div>
        <button v-show="isSelected" id="add-selected-text-btn" v-on:click="getSelectedText">{{ $t('writeToNote') }}</button>
        <div v-if="isMobile && showActions && !hideForPdf" class="mobile-article-actions">
            <div v-if="user_role != ''" class="mobile-article-action"><svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 96 960 960" width="20"><path d="m323 851 157-94 157 95-42-178 138-120-182-16-71-168-71 167-182 16 138 120-42 178Zm-90 125 65-281L80 506l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Zm247-355Z"/></svg><p>{{ $t('toFavorites') }}</p></div>
            <div v-if="user_role != 'Teacher' && user_role != ''" class="mobile-article-action"><svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 96 960 960" width="20"><path d="M277 777h275v-60H277v60Zm0-171h406v-60H277v60Zm0-171h406v-60H277v60Zm-97 501q-24 0-42-18t-18-42V276q0-24 18-42t42-18h600q24 0 42 18t18 42v600q0 24-18 42t-42 18H180Zm0-60h600V276H180v600Zm0-600v600-600Z"/></svg><p>{{ $t('toNote') }}</p></div>
            <div class="mobile-article-action" v-on:click="getPdf"><svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 96 960 960" width="20"><path d="M220 896q-24 0-42-18t-18-42V693h60v143h520V693h60v143q0 24-18 42t-42 18H220Zm260-153L287 550l43-43 120 120V256h60v371l120-120 43 43-193 193Z"/></svg><p>{{ $t('download')}}</p></div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Article',
}
</script>

<script setup>
import axios from 'axios'
import { ref, reactive, onMounted, defineProps, defineEmits } from 'vue'
import { useRoute } from 'vue-router'
import store from '@/store'
import gql from 'graphql-tag'
import { apolloClient } from '@/vue-apollo'
import { QuillEditor, Quill } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.bubble.css';
import { toast } from 'bulma-toast'
import { useI18n } from 'vue-i18n'
import { jsPDF } from 'jspdf'
import { pdfExporter } from 'quill-to-pdf'
import html2pdf from "html2pdf.js"

const i18n = useI18n()

const emit = defineEmits(['openMenu', 'closeMenu'])

const props = defineProps({
    isMenuShown: Boolean,
    isMobile: Boolean
})

let showActions = ref(false)
let hideForPdf = ref(false)

const GET_ARTICLE_QUERY = gql`
    query getArticle($id: Int!) {
        getArticle(id: $id) {
            id
            name
            author {
                authorId {
                    name
                    surname
                    secondname
                    role {
                        roleName
                    }
                }
            }
            reviewer {
                name
                surname
                secondname
                role {
                    roleName
                }
            }
            publishDate
            publishStatus
            articleText
            articletagSet {
                tagId {
                    name
                }
            }
        }
    }`

const fileDownload = require('js-file-download')
let isSelected = ref(false)
let article = reactive({
    author: '',
    tags: [],
    text: '',
    title: ''
})
let date = ref('')
let role = ref('')
let user_role = ref('')
const route = useRoute()
let quill

onMounted(async () => {
    quill = new Quill('#articleText', {
        readOnly: true,
        theme: 'bubble'
    })
    await getArticle()
})

function switchMenuDisplay() {
    if (props.isMenuShown == false) {
        emit('openMenu')
    }
}

function closeMenus() {
    emit('closeMenu')
    showActions.value = false
}

async function getArticle() {
    const articleID = route.params.id
    await apolloClient
        .query({
            query: GET_ARTICLE_QUERY,
            variables: {
                id: articleID
            }
        })
        .then(result => {
            article.title = result.data.getArticle.name
            article.text = JSON.stringify(result.data.getArticle.articleText)
            let author = result.data.getArticle.author.authorId
            article.author = author.surname + ' ' + author.name + (author.secondname != '' ? (' ' + author.secondname) : '')
            result.data.getArticle.articletagSet.forEach(tag => article.tags.push(tag.tagId.name))
            article.publish_date = result.data.getArticle.publishDate
            date.value = new Date(Date.parse(article.publish_date)).toLocaleDateString('ru-RU', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
            })
            role.value = author.role.roleName
        })
        .catch(error => console.log(error))
    user_role.value = store.state.user.role

    let text = JSON.parse(article.text)
    let place = document.getElementsByClassName('ql-editor')[0]
    place.removeChild(place.firstChild)
    Object.entries(text).forEach(entry => {
        const [key, value] = entry
        let node = toDOM(JSON.stringify(value))
        place.appendChild(node)
    })
}

function toDOM(input) {
    let obj = typeof input === 'string' ? JSON.parse(input) : input
    let propFix = { for: 'htmlFor', class: 'className' }
    let node
    let nodeType = obj.nodeType
    switch (nodeType) {
        case 1: {
            node = document.createElement(obj.tagName)
            if (obj.attributes) {
                for (let [attrName, value] of obj.attributes) {
                    let propName = propFix[attrName] || attrName
                    node[propName] = value
                }
            }
            break
        }
        case 3: {
            return document.createTextNode(obj.nodeValue)
        }
        case 8: {
            return document.createComment(obj.nodeValue)
        }
        case 11: {
            node = document.createDocumentFragment()
            break
        }
        default: {
            return document.createDocumentFragment()
        }
    }
    if (obj.childNodes && obj.childNodes.length) {
        for (let childNode of obj.childNodes) {
            node.appendChild(toDOM(childNode))
        }
    }
    return node
}

async function getPdf() {
    await (hideForPdf.value = true)
    html2pdf(document.getElementById("article-page"), {
        margin: 1,
        filename: `${article.title}.pdf`,
    })
    hideForPdf.value = false
}

document.onselectionchange = () => { showButton() }

async function showButton() {
    let select = window.getSelection()
    if (select != '' && store.state.user.role != 'Teacher') {
        await (isSelected = true)
        let rect = select.getRangeAt(0).getBoundingClientRect()
        let menu = document.getElementById('add-selected-text-btn')
        menu.style.cssText += `left:${(rect.left + rect.right) / 2 - 14}px;top:${rect.bottom + 4}px; display: flex;`                
    }
    else {
        isSelected = false
        let menu = document.getElementById('add-selected-text-btn')
        menu.style.cssText += `display: none;`
    }
}

async function getSelectedText(event) {
    if (window.getSelection()) {
        let isExist = false
        var select = window.getSelection()
        let menu = document.getElementById('add-selected-text-btn')
        menu.style.cssText += `display: none;`
        // await axios
        //     .get('/api/v1/notes/')
        //     .then(response => {
        //         for (let i = 0; i < response.data.length; i++) {
        //             // TODO !!! check not by title but by id (check if the note based on this article already exists)
        //             if (article.title === response.data[i].based_on_article) {
        //                 // add text to the existing note
        //                 isExist = true
        //                 let current_text = response.data[i].text
        //                 current_text = current_text.substring(0, current_text.length-1)
        //                 let new_text = `${current_text},{"nodeType":1,"tagName":"p","childNodes":[{"nodeType":3,"nodeName":"#text","nodeValue":"${select.toString()}"}]}]`
        //                 axios
        //                     .patch(`/api/v1/notes/${response.data[i].id}/`, {text: new_text})
        //                     .then(response => {
        //                         toast({
        //                             message: $t('noteEdited'),
        //                             type: 'is-success',
        //                             dismissible: true,
        //                             pauseOnHover: true,
        //                             duration: 2000,
        //                             position: 'top-right',
        //                         })
        //                     })
        //                     .catch(error => {
        //                         console.log(JSON.stringify(error))
        //                     })
        //             }                      
        //         }
        //         if (isExist == false) {
        //             const articleID = route.params.id
        //             let title = article.title
        //             let note = {
        //                 text: `[{"nodeType":1,"tagName":"p","childNodes":[{"nodeType":3,"nodeName":"#text","nodeValue":"${select.toString()}"}]}]`,
        //                 based_on_article: articleID
        //             }
        //             axios
        //                 .post('/api/v1/notes/', note)
        //                 .then(response => {
        //                     toast({
        //                         message: $t('noteCreated'),
        //                         type: 'is-success',
        //                         dismissible: true,
        //                         pauseOnHover: true,
        //                         duration: 2000,
        //                         position: 'top-right',
        //                     })
        //                 })
        //                 .catch(error => {
        //                     console.log(JSON.stringify(error))
        //                 })
        //         }
        //     })
        isSelected = false
        window.getSelection().empty()
        toast({
            message: i18n.t('noteCreated'),
            type: 'notification-success',
            dismissible: true,
            pauseOnHover: true,
            duration: 2000,
            position: 'top-right',
        })
    }
}
</script>

<style>
#articleText {
    color: var(--text-color);
}

.notification-success {
    background-color: #66D9D3;
    border-radius: 16px;
    color: white;
}

.notification-danger {
    background-color: #F65151;
    border-radius: 16px;
    color: white;
}
</style>