<template>
    <!-- <div v-if="store.state.user.role != 'Teacher'" class="note-page" id="note-page"> -->
    <div class="note-page" id="note-page">
        <div v-if="(isMenuShown || showActions) && !hideForPdf" class="darker-bg" @click="closeMenus"></div>
        <div v-if="isMobile && !hideForPdf" class="mobile-header">
            <div class="logo-block">
                <img src="@/assets/icons/logo.png">
                <p class="logo-name">plateaumed</p>
            </div>
            <svg v-if="!hideForPdf" @click="switchMenuDisplay" xmlns="http://www.w3.org/2000/svg" height="16" viewBox="0 96 960 960" width="16"><path d="M120 816v-60h720v60H120Zm0-210v-60h720v60H120Zm0-210v-60h720v60H120Z"/></svg>
        </div>
        <div v-if="note.tags.length > 0" class="article-tags">
            <div v-for="tag in note.tags" class="article-tag">#{{ tag }}</div>
        </div>
        <div v-if="!isMobile" class="note-main">
            <h1 class="note-title">{{ $t('note') }} «{{ note.based_on_article }}»</h1>
            <div class="note-main-actions">
                <button v-if="!isEditMode" class="note-green-btn" @click="editNote">{{ $t('edit') }}</button>
                <button v-if="isEditMode" class="note-green-btn" @click="saveNote">{{ $t('save') }}</button>
                <button class="note-red-btn" @click="showDeleteNoteModal = true">{{ $t('delete') }}</button>
            </div>
        </div>
        <div class="mobile-note-title" v-if="isMobile && !hideForPdf"><h1 class="note-title">{{ $t('note') }} «{{ note.based_on_article }}»</h1><svg @click="showActions = true" xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 96 960 960" width="20"><path d="M479.858 896Q460 896 446 881.858q-14-14.141-14-34Q432 828 446.142 814q14.141-14 34-14Q500 800 514 814.142q14 14.141 14 34Q528 868 513.858 882q-14.141 14-34 14Zm0-272Q460 624 446 609.858q-14-14.141-14-34Q432 556 446.142 542q14.141-14 34-14Q500 528 514 542.142q14 14.141 14 34Q528 596 513.858 610q-14.141 14-34 14Zm0-272Q460 352 446 337.858q-14-14.141-14-34Q432 284 446.142 270q14.141-14 34-14Q500 256 514 270.142q14 14.141 14 34Q528 324 513.858 338q-14.141 14-34 14Z"/></svg></div>
        
        <div class="article-info">
            <div class="article-author">
                <div><img class="article-author-img" src="@/assets/icons/profile_img.png"></div>
                <div class="article-author-info">
                    <p class="article-author-name">{{ article_author.name }}</p>
                    <p class="article-author-extra">{{ article_author.role == 'Teacher' ? $t('roleTeacher') : (article_author.role == 'Sno_student' ? $t('roleSSS') : $t('roleStudent')) }}</p>
                    <!-- <p class="article-author-extra">{{ date }}</p> -->
                </div>
            </div>

            <div v-if="!isMobile && !hideForPdf" class="note-actions">
                <div class="note-action"><p>{{ $t('toArticle') }}</p><svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 96 960 960" width="20"><path d="M277 777h275v-60H277v60Zm0-171h406v-60H277v60Zm0-171h406v-60H277v60Zm-97 501q-24 0-42-18t-18-42V276q0-24 18-42t42-18h600q24 0 42 18t18 42v600q0 24-18 42t-42 18H180Zm0-60h600V276H180v600Zm0-600v600-600Z"/></svg></div>
                <div class="note-action" v-on:click="getPdf"><p>{{ $t('download')}}</p><svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 96 960 960" width="20"><path d="M220 896q-24 0-42-18t-18-42V693h60v143h520V693h60v143q0 24-18 42t-42 18H220Zm260-153L287 550l43-43 120 120V256h60v371l120-120 43 43-193 193Z"/></svg></div>
            </div>
        </div>

        <hr v-if="!isMobile">

        <div class="note-text" id="noteText"></div>
        <div v-if="isMobile && showActions && !hideForPdf" class="mobile-note-actions">
            <div v-if="user_role != '' && !isEditMode" class="mobile-note-action action-green" @click="editNote"><svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 96 960 960" width="20"><path d="M180 876h44l443-443-44-44-443 443v44Zm614-486L666 262l42-42q17-17 42-17t42 17l44 44q17 17 17 42t-17 42l-42 42Zm-42 42L248 936H120V808l504-504 128 128Zm-107-21-22-22 44 44-22-22Z"/></svg><p>{{ $t('edit') }}</p></div>
            <div v-if="user_role != '' && isEditMode" class="mobile-note-action action-green" @click="saveNote"><svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 96 960 960" width="20"><path d="m421 758 283-283-46-45-237 237-120-120-45 45 165 166Zm59 218q-82 0-155-31.5t-127.5-86Q143 804 111.5 731T80 576q0-83 31.5-156t86-127Q252 239 325 207.5T480 176q83 0 156 31.5T763 293q54 54 85.5 127T880 576q0 82-31.5 155T763 858.5q-54 54.5-127 86T480 976Zm0-60q142 0 241-99.5T820 576q0-142-99-241t-241-99q-141 0-240.5 99T140 576q0 141 99.5 240.5T480 916Zm0-340Z"/></svg><p>{{ $t('save') }}</p></div>
            <div class="mobile-note-action"><svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 96 960 960" width="20"><path d="M277 777h275v-60H277v60Zm0-171h406v-60H277v60Zm0-171h406v-60H277v60Zm-97 501q-24 0-42-18t-18-42V276q0-24 18-42t42-18h600q24 0 42 18t18 42v600q0 24-18 42t-42 18H180Zm0-60h600V276H180v600Zm0-600v600-600Z"/></svg><p>{{ $t('toArticle') }}</p></div>
            <div class="mobile-note-action" v-on:click="getPdf"><svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 96 960 960" width="20"><path d="M220 896q-24 0-42-18t-18-42V693h60v143h520V693h60v143q0 24-18 42t-42 18H220Zm260-153L287 550l43-43 120 120V256h60v371l120-120 43 43-193 193Z"/></svg><p>{{ $t('download')}}</p></div>
            <div v-if="user_role != ''" class="mobile-note-action action-red" @click="deleteNote"><svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 96 960 960" width="20"><path d="m249 849-42-42 231-231-231-231 42-42 231 231 231-231 42 42-231 231 231 231-42 42-231-231-231 231Z"/></svg><p>{{ $t('delete') }}</p></div>
        </div>
        <ConfirmationModal v-if="showDeleteNoteModal" @cancel="showDeleteNoteModal = false" @delete="deleteNote" :text="note.based_on_article" :type="'note'" />
    </div>
</template>

<script>
export default {
    name: 'Note',
}
</script>

<script setup>
import { ref, reactive, onMounted, defineProps, defineEmits } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ConfirmationModal from '@/components/ConfirmationModal.vue'
// import store from '@/stores/user'
import { QuillEditor, Quill } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.bubble.css'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import gql from 'graphql-tag'
import { apolloClient } from '@/vue-apollo'
import { toast } from 'bulma-toast'
import { useI18n } from 'vue-i18n'
import html2pdf from "html2pdf.js"

const router = useRouter()
const i18n = useI18n()

const emit = defineEmits(['openMenu', 'closeMenu'])

const props = defineProps({
    isMenuShown: Boolean,
    isMobile: Boolean
})

let showActions = ref(false)
let hideForPdf = ref(false)
let showDeleteNoteModal = ref(false)

function switchMenuDisplay() {
    if (props.isMenuShown == false) {
        emit('openMenu')
    }
}

let article = reactive({})

function closeMenus() {
    emit('closeMenu')
    showActions.value = false
}

let article_author = reactive({
    photo: '',
    name: '',
    role: ''
})

let article_reviewer = reactive({
    photo: '',
    name: '',
    role: ''
})

let note = reactive({
    based_on_article: '',
    text: '',
    tags: []
}) 

const route = useRoute()
let isEditMode = ref(false)
let quill


const GET_NOTE = gql`query GetNoteByIdQuery($noteId: Int!) {
    getNoteById(id: $noteId) {
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
                    photo
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
                photo
                role {
                    roleName
                } 
            }
            publishDate
        }
        noteText
  }
}`

const EDIT_NOTE_MUTATION = gql`mutation UpdateNoteMutation($noteId: Int!, $noteText: JSONString!) {
    updateNote(noteId: $noteId, noteText: $noteText) {
        note {
            id
            noteText
        }
    }
}`

const DELETE_NOTE_MUTATION = gql`mutation DeleteNoteMutation($noteId: ID!) {
    deleteNote(noteId: $noteId) {
        note {
            id
        }
    }
}`

async function getNote() {
    const noteID = route.params.id
    await apolloClient
        .query({
            query: GET_NOTE,
            variables: {
                noteId: noteID
            }
        })
        .then(result => { 
            let full_a_name = `${result.data.getNoteById.articleId.author.authorId.surname} ${result.data.getNoteById.articleId.author.authorId.name} ${result.data.getNoteById.articleId.author.authorId.secondname}`
            let full_r_name = `${result.data.getNoteById.articleId.reviewer.surname} ${result.data.getNoteById.articleId.reviewer.name} ${result.data.getNoteById.articleId.reviewer.secondname}`
            let taglist = []
            result.data.getNoteById.articleId.articletagSet.forEach(tag => taglist.push(tag.tagId.name))
            note.based_on_article = result.data.getNoteById.articleId.name
            note.tags = taglist
            article_author.name = full_a_name
            article_author.role = result.data.getNoteById.articleId.author.authorId.role.roleName
            article_author.photo = result.data.getNoteById.articleId.author.authorId.photo
            article_reviewer.name = full_r_name
            article_reviewer.role = result.data.getNoteById.articleId.reviewer.role.roleName
            article_reviewer.photo = result.data.getNoteById.articleId.reviewer.photo
            note.text = result.data.getNoteById.noteText
        })
    let text = JSON.parse(note.text)
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

async function saveNote(event) {
    const noteID = route.params.id
    const textarea = document.getElementsByClassName('ql-editor')[0]
    const children = textarea.children

    let arr = []
    Array.from(children).forEach(element => {
        arr.push(toJSON(element))
    })
    let jsonresult = JSON.stringify(arr)
    note.text = jsonresult

    await (isEditMode.value = false)

    let noteText = document.getElementById('noteText')
    noteText.classList.add('ql-disabled')
    let quillEditor = document.getElementsByClassName('ql-editor')[0]
    quillEditor.setAttribute('contenteditable','false')

    apolloClient
        .mutate({
            mutation: EDIT_NOTE_MUTATION,
            variables: {
                noteId: noteID,
                noteText: note.text,
            },
        })
        .then(result => {
            toast({
                message: i18n.t('noteEdited'),
                type: 'notification-success',
                dismissible: true,
                pauseOnHover: true,
                duration: 2000,
                position: 'top-right',
            })
        })
        .catch(error => {
            toast({
                message: i18n.t('editNoteFailure'),
                type: 'notification-danger',
                dismissible: true,
                pauseOnHover: true,
                duration: 2000,
                position: 'top-right',
            })
        })
}

async function editNote(event) {
    await (isEditMode.value = true)
    let noteText = document.getElementById('noteText')
    noteText.classList.remove('ql-disabled')
    let quillEditor = document.getElementsByClassName('ql-editor')[0]
    quillEditor.setAttribute('contenteditable','true')
}

async function getPdf() {
    await (hideForPdf.value = true)
    html2pdf(document.getElementById("note-page"), {
        margin: 1,
        filename: `${note.based_on_article}.pdf`,
    })
    hideForPdf.value = false
}

function deleteNote(event) {
    const noteID = route.params.id
    apolloClient
        .mutate({
            mutation: DELETE_NOTE_MUTATION,
            variables: {
                noteId: noteID,
            },
        })
        .then(result => {
            showDeleteNoteModal.value = false
            toast({
                message: i18n.t('noteDeleted'),
                type: 'notification-success',
                dismissible: true,
                pauseOnHover: true,
                duration: 2000,
                position: 'top-right',
            })
            router.push({ name: 'Notes' })
        })
        .catch(error => { console.log(error) })
}

onMounted(async () => {
    let colorVars = getComputedStyle(document.getElementsByClassName('theme')[0])
    let colors = [
        colorVars.getPropertyValue('--card-color'),
        colorVars.getPropertyValue('--background'),
        colorVars.getPropertyValue('--lines-color'), 
        colorVars.getPropertyValue('--text-extra'),                        
        colorVars.getPropertyValue('--text-color'),
        colorVars.getPropertyValue('--tags-color')
    ]

    const toolbarOptions = [            
        [{ 'header': [1, 2, 3,  false] }],            
        
        [{ 'font': [] }],

        ['bold', 'italic', 'underline'],                  
        
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],    
        
        [{ 'align': ['', 'center', 'right', 'justify'] }],            
        
        ['image', 'link'],      

        [{ 'color': ['', colors[0], colors[1], colors[2], colors[3], colors[4], colors[5],
                        '#47FDB0', '#40E3CC', '#52E4FA', '#40A2E3', '#4785FD', '#9359FF', '#A637E6', 
                        '#73F2BC', '#6EE0D0', '#7AE1F0', '#6EB2E0', '#739EF2', '#A87FF3', '#B567E2', 
                        '#FFF436', '#FFBF2E', '#FA7325', '#E63034', '#FF4F63', '#E62EA2', '#E82DFA',   
                        '#F3EC67', '#F3C761', '#F0915B', '#E26365', '#F37886', '#E261B2', '#E360F0'] }, 

            { 'background': ['', colors[0], colors[1], colors[2], colors[3], colors[4], colors[5],
                            '#47FDB0', '#40E3CC', '#52E4FA', '#40A2E3', '#4785FD', '#9359FF', '#A637E6', 
                            '#73F2BC', '#6EE0D0', '#7AE1F0', '#6EB2E0', '#739EF2', '#A87FF3', '#B567E2', 
                            '#FFF436', '#FFBF2E', '#FA7325', '#E63034', '#FF4F63', '#E62EA2', '#E82DFA',   
                            '#F3EC67', '#F3C761', '#F0915B', '#E26365', '#F37886', '#E261B2', '#E360F0'] }],
    ]
    
    if (props.isMobile == false) {
        quill = new Quill('#noteText', {
            modules: {
                toolbar: toolbarOptions
            },
            readOnly: true,
            theme: 'bubble'
        })
    } else {
        quill = new Quill('#noteText', {
            modules: {
                toolbar: toolbarOptions
            },
            readOnly: true,
            theme: 'snow'
        })
    }
    await getNote()
})
</script>

<style>
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

#noteText {
    border-radius: none;
}

@media (max-width: 420px) {
    #noteText {
        padding: 12px;
        border-radius: 0 0 20px 20px;
    }
    
    .ql-toolbar.ql-snow {
        border-radius: 20px 20px 0 0;
    }
}
</style>
