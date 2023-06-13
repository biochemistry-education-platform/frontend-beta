<template>
    <div class="article-page" id="article-page">
        <div v-if="(isMenuShown || showActions) && !hideForPdf" class="darker-bg" @click="closeMenus"></div>
        <div v-if="isMobile && !hideForPdf" class="mobile-header">
            <div class="logo-block">
                <img src="@/assets/icons/logo.png">
                <p class="logo-name">plateaumed</p>
            </div>
            <svg v-if="!hideForPdf" @click="switchMenuDisplay" xmlns="http://www.w3.org/2000/svg" height="16" viewBox="0 96 960 960" width="16"><path d="M120 816v-60h720v60H120Zm0-210v-60h720v60H120Zm0-210v-60h720v60H120Z"/></svg>
        </div>
        <div v-if="article.tags.length > 0" class="article-tags">
            <div v-for="tag in article.tags" class="article-tag">#{{ tag }}</div>
        </div>

        <div v-if="!isMobile" class="article-main">
            <h1 class="article-title">{{ article.title }}</h1>
        </div>

        <div class="mobile-article-title" v-if="isMobile && !hideForPdf"><h1 class="article-title">{{ article.title }}</h1><svg v-if="!hideForPdf" @click="showActions = true" xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 96 960 960" width="20"><path d="M479.858 896Q460 896 446 881.858q-14-14.141-14-34Q432 828 446.142 814q14.141-14 34-14Q500 800 514 814.142q14 14.141 14 34Q528 868 513.858 882q-14.141 14-34 14Zm0-272Q460 624 446 609.858q-14-14.141-14-34Q432 556 446.142 542q14.141-14 34-14Q500 528 514 542.142q14 14.141 14 34Q528 596 513.858 610q-14.141 14-34 14Zm0-272Q460 352 446 337.858q-14-14.141-14-34Q432 284 446.142 270q14.141-14 34-14Q500 256 514 270.142q14 14.141 14 34Q528 324 513.858 338q-14.141 14-34 14Z"/></svg></div>

        <div class="article-info">
            <div class="article-author">
                <div><img class="article-author-img" src="@/assets/icons/profile_img.png"></div>
                <div class="article-author-info">
                    <p class="article-author-name">{{ article.authorFullName }}</p>
                    <p class="article-author-extra">{{ article.authorRole == 'Teacher' ? $t('roleTeacher') : (article.authorRole == 'Sno_student' ? $t('roleSSS') : $t('roleStudent')) }}</p>
                    <p class="article-author-extra">{{ article.creation_date }}</p>
                </div>
            </div>

            <div class="article-event-info">
                <p>{{ article.event_date }}</p>
                <p>{{ article.event_place }}</p>
            </div>

            <div v-if="!isMobile && !hideForPdf" class="article-actions">
                <div v-if="user_role != ''" class="article-action"><p>{{ $t('toFavorites') }}</p><svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 96 960 960" width="20"><path d="m323 851 157-94 157 95-42-178 138-120-182-16-71-168-71 167-182 16 138 120-42 178Zm-90 125 65-281L80 506l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Zm247-355Z"/></svg></div>
                <div class="article-action" v-on:click="getPdf"><p>{{ $t('download')}}</p><svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 96 960 960" width="20"><path d="M220 896q-24 0-42-18t-18-42V693h60v143h520V693h60v143q0 24-18 42t-42 18H220Zm260-153L287 550l43-43 120 120V256h60v371l120-120 43 43-193 193Z"/></svg></div>
            </div>
        </div>
        
        <hr v-if="!isMobile">

        <div class="article-text" id="articleText"></div>
        <div v-if="isMobile && showActions && !hideForPdf" class="mobile-article-actions">
            <div v-if="user_role != ''" class="mobile-article-action"><svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 96 960 960" width="20"><path d="m323 851 157-94 157 95-42-178 138-120-182-16-71-168-71 167-182 16 138 120-42 178Zm-90 125 65-281L80 506l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Zm247-355Z"/></svg><p>{{ $t('toFavorites') }}</p></div>
            <div class="mobile-article-action" v-on:click="getPdf"><svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 96 960 960" width="20"><path d="M220 896q-24 0-42-18t-18-42V693h60v143h520V693h60v143q0 24-18 42t-42 18H220Zm260-153L287 550l43-43 120 120V256h60v371l120-120 43 43-193 193Z"/></svg><p>{{ $t('download')}}</p></div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'NotifArticle',
}
</script>

<script setup>
import { ref, reactive, onMounted, defineProps, defineEmits } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import gql from 'graphql-tag'
import { apolloClient } from '@/vue-apollo'
import { QuillEditor, Quill } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.bubble.css';
import { toast } from 'bulma-toast'
import { useI18n } from 'vue-i18n'
import { useUserStore } from '@/stores/user'
import html2pdf from "html2pdf.js"

const i18n = useI18n()
const route = useRoute()
const router = useRouter()
const userStore = useUserStore()

const emit = defineEmits(['openMenu', 'closeMenu'])

const props = defineProps({
    isMenuShown: Boolean,
    isMobile: Boolean
})

let showActions = ref(false)
let hideForPdf = ref(false)
let showAcceptArticleModal = ref(false)
let showDeclineArticleModal = ref(false)

let user = JSON.parse(userStore.$state.user)

const GET_NOTIF_ARTICLE_QUERY = gql`query GetNotificationById ($id: Int!) {
    getNotificationById(id: $id) {
        id
        name
        notificationtagSet {
            tagId {
                name
            }
        }
        notifText
        creationDate
        author {
            author {
                authorId {
                    id
                    name
                    surname
                    secondname
                    role {
                        roleName
                    }
                    photo
                }
            }
        }      
    }
}`

let article = reactive({
    title: '',
    text: '',
    tags: [],
    creation_date: new Date(Date.now()),
    authorID: 0,
    authorFullName: '',
    authorRole: '',
    event_date: new Date(Date.now()),
    event_place: ''
})

let user_role = ref('')

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
            query: GET_NOTIF_ARTICLE_QUERY,
            variables: {
                id: articleID
            }
        })
        .then(result => {
            console.log(result)
            article.title = result.data.getNotificationById.name
            let text = JSON.parse(result.data.getNotificationById.notifText)
            let date = new Date(Date.parse(text.place.date)).toLocaleTimeString('ru-RU', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit', 
                minute: '2-digit'
            })
            article.event_date = date
            article.event_place = text.place.place
            article.text = text.text
            let author = result.data.getNotificationById.author.author.authorId
            result.data.getNotificationById.notificationtagSet.forEach(tag => article.tags.push(tag.tagId.name))
            let cdate = new Date(Date.parse(result.data.getNotificationById.creationDate)).toLocaleDateString('ru-RU', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
            })
            article.creation_date = cdate
            article.authorID = author.id,
            article.authorFullName = author.surname + ' ' + author.name + (author.secondname != '' ? (' ' + author.secondname) : '')
            article.authorRole = author.role.roleName
        })
        .catch(error => console.log(error))
    if (user) { user_role.value = user.role } else { user_role.value = ''}

    let text = JSON.parse(article.text)
    let place = document.getElementsByClassName('ql-editor')[0]
    place.removeChild(place.firstChild)
    Object.entries(text).forEach(entry => {
        const [key, value] = entry
        let node = toDOM(JSON.stringify(value))
        place.appendChild(node)
    })
}

function toJSON(element) {
    let propFix = { for: 'htmlFor', class: 'className' };
    let specialGetters = {
        style: (node) => node.style.cssText,
    }
    let attrDefaultValues = { style: '' }
    let obj = {
        nodeType: element.nodeType
    }
    if (element.tagName) {
        obj.tagName = element.tagName.toLowerCase();
    } else if (element.nodeName) {
        obj.nodeName = element.nodeName;
    }
    if (element.nodeValue) {
        obj.nodeValue = element.nodeValue;
    }
    let attrs = element.attributes;
    if (attrs) {
        let defaultValues = new Map()
        for (let i = 0; i < attrs.length; i++) {
            let name = attrs[i].nodeName
            defaultValues.set(name, attrDefaultValues[name])
        }
        let arr = []
        for (let [name, defaultValue] of defaultValues) {
            let propName = propFix[name] || name
            let specialGetter = specialGetters[propName]
            let value = specialGetter ? specialGetter(element) : element[propName]
            if (value !== defaultValue) {
                arr.push([name, value])
            }
        }
        if (arr.length) {
            obj.attributes = arr
        }
    }
    let childNodes = element.childNodes
    if (obj.tagName !== 'textarea' && childNodes && childNodes.length) {
        let arr = (obj.childNodes = []);
        for (let i = 0; i < childNodes.length; i++) {
            arr[i] = toJSON(childNodes[i])
        }
    }
    return obj
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

.article-event-info{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.article-event-info p{
    font-weight: 500;
    font-size: 24px;
    color: var(--text-color);
}
</style>