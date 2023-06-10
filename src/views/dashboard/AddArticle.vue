<template>
    <div class="biochemistry-page page-flex">
        <div v-if="isMenuShown" class="darker-bg" @click="emit('closeMenu')"></div>
        <div v-if="isMobile" class="mobile-header">
            <div class="logo-block">
                <img src="@/assets/icons/logo.png">
                <p class="logo-name">plateaumed</p>
            </div>
            <svg @click="switchMenuDisplay" xmlns="http://www.w3.org/2000/svg" height="16" viewBox="0 96 960 960" width="16"><path d="M120 816v-60h720v60H120Zm0-210v-60h720v60H120Zm0-210v-60h720v60H120Z"/></svg>
        </div>
        <input type="text" class="add-article-title" v-on:change="saveTitle" v-model="articleTitle" :placeholder="$t('articleTitle')">
        <div class="tagline">        
            <p>{{ $t('tags') }}</p>
            <div v-if="type == 'recommend'" class="required-tag">{{ $t('recommend') }}</div>
            <div v-if="type == 'notification'" class="required-tag">{{ $t('notification') }}</div>
            <div v-if="user_role == 'Sno_student'" class="required-tag">{{ $t('sno') }}</div>
            <div class="tag-field" v-for="index in numberOfTags" :key="index">
                <Tags :initialTags="tags" :page="'AddArticle'" @addTag="addTag" @deleteTag="deleteTag" />
            </div>
            <div class="add-tag-btn" @click="addNewTag">
                <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 96 960 960" width="20"><path d="M453 776h60V610h167v-60H513V376h-60v174H280v60h173v166Zm27.266 200q-82.734 0-155.5-31.5t-127.266-86q-54.5-54.5-86-127.341Q80 658.319 80 575.5q0-82.819 31.5-155.659Q143 347 197.5 293t127.341-85.5Q397.681 176 480.5 176q82.819 0 155.659 31.5Q709 239 763 293t85.5 127Q880 493 880 575.734q0 82.734-31.5 155.5T763 858.316q-54 54.316-127 86Q563 976 480.266 976Zm.234-60Q622 916 721 816.5t99-241Q820 434 721.188 335 622.375 236 480 236q-141 0-240.5 98.812Q140 433.625 140 576q0 141 99.5 240.5t241 99.5Zm-.5-340Z"/></svg>
            </div>
        </div>
        <div v-if="type == 'notification'" class="add-article-extra-options">
            <input type="text" class="add-article-extra-option" v-model="place" :placeholder="$t('choosePlace')">
            <input type="text" class="add-article-extra-option" v-model="eventDate" :placeholder="$t('chooseDateTime')">
        </div>
        <hr class="biochemistry-page-hr aftertags-hr">
        <div class="add-article-text" id="maineditor">
        </div>
        <div class="add-article-footer">        
            <hr class="biochemistry-page-hr">
            <div class="attached-files" id="attached-files"></div>
            <div v-if="!isMobile" class="add-article-footer-actions">
                <div class="attach-file" @click="attachFile"><svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 96 960 960" width="20"><path d="M460 976q-91 0-155.5-62.5T240 760V330q0-64 45.5-109T395 176q65 0 110 45t45 110v394q0 38-26 64.5T460 816q-38 0-64-28.5T370 720V328h40v395q0 22 14.5 37.5T460 776q21 0 35.5-15t14.5-36V330q0-48-33.5-81T395 216q-48 0-81.5 33T280 330v432q0 73 53 123.5T460 936q75 0 127.5-51T640 760V328h40v431q0 91-64.5 154T460 976Z"/></svg>{{ $t('attachFile') }}</div>
                <div class="add-article-sending">
                    <input v-if="user_role == 'Student'" autocomplete="off" @input="filterReviewers" @keyup.native.enter="saveReviewer" v-model="chosenReviewer" type="text" class="add-article-reviewer" :placeholder="$t('chooseReviewer')">
                    <div v-if="areReviewersShown && filteredReviewers.length > 0" class="reviewers-block">
                        <div class="reviewer-option" v-for="reviewer in filteredReviewers" :key="reviewer.id">
                            <!-- TODO разместить здесь фото пользователя -->
                            <p @click="chooseReviewer(reviewer.id)">{{ reviewer.surname }} {{ reviewer.name }} {{ reviewer.secondname }}</p>
                        </div>
                    </div>
                    <form action="https://storage.yandexcloud.net/plateaumed" method="post" enctype="multipart/form-data">
                        <input type="hidden" name="key" value="users/uploads/${filename}" /><br />
                        <input type="hidden"   name="X-Amz-Credential" value="YCAJEChUZ1sDsIoQljzBKmcfw/20230610/ru-central1/s3/aws4_request" />
                        <input type="hidden"   name="acl" value="public-read" />
                        <input type="hidden"   name="X-Amz-Algorithm" value="AWS4-HMAC-SHA256" />
                        <input type="hidden"   name="X-Amz-Date" value="20230610T173419Z" />
                        <input type="hidden"   name="policy" value="eyJleHBpcmF0aW9uIjogIjIwMjMtMDYtMTBUMTg6MzQ6MTlaIiwgImNvbmRpdGlvbnMiOiBbeyJhY2wiOiAicHVibGljLXJlYWQifSwgWyJzdGFydHMtd2l0aCIsICIka2V5IiwgInVzZXJzL3VwbG9hZHMiXSwgeyJidWNrZXQiOiAicGxhdGVhdW1lZCJ9LCBbInN0YXJ0cy13aXRoIiwgIiRrZXkiLCAidXNlcnMvdXBsb2Fkcy8iXSwgeyJ4LWFtei1hbGdvcml0aG0iOiAiQVdTNC1ITUFDLVNIQTI1NiJ9LCB7IngtYW16LWNyZWRlbnRpYWwiOiAiWUNBSkVDaFVaMXNEc0lvUWxqekJLbWNmdy8yMDIzMDYxMC9ydS1jZW50cmFsMS9zMy9hd3M0X3JlcXVlc3QifSwgeyJ4LWFtei1kYXRlIjogIjIwMjMwNjEwVDE3MzQxOVoifV19" />
                        <input type="hidden" name="X-Amz-Signature" value="ed4fb4e9e2ec3b7a31e7e293b60d6bbe8168eb6a158483cfeb66245d7dd444ee" />
                        <input type="file" @change="saveFileName" multiple id="filename-input" name="file" /> <br />
                        <input type="submit" id="filesend-btn" name="submit" value="Загрузить" />
                    </form>
                    <button @click="sendFiles">send files</button>
                    <button class="publish-article-btn" @click="createArticle">{{ user_role == 'Student' ? $t('send') : $t('publish') }}</button>
                </div>
            </div>
            <div v-else class="add-article-footer-actions">
                <input v-if="user_role == 'Student'" autocomplete="off" @input="filterReviewers" @keyup.native.enter="saveReviewer" v-model="chosenReviewer" type="text" class="add-article-reviewer" :placeholder="$t('chooseReviewer')">
                <div class="mobile-add-article-btns">
                    <svg @click="attachFile" xmlns="http://www.w3.org/2000/svg" height="30" viewBox="0 96 960 960" width="30"><path d="M460 976q-91 0-155.5-62.5T240 760V330q0-64 45.5-109T395 176q65 0 110 45t45 110v394q0 38-26 64.5T460 816q-38 0-64-28.5T370 720V328h40v395q0 22 14.5 37.5T460 776q21 0 35.5-15t14.5-36V330q0-48-33.5-81T395 216q-48 0-81.5 33T280 330v432q0 73 53 123.5T460 936q75 0 127.5-51T640 760V328h40v431q0 91-64.5 154T460 976Z"/></svg>
                    <button class="publish-article-btn" @click="createArticle">{{ user_role == 'Student' ? $t('send') : $t('publish') }}</button>           
                </div>
            </div>
        </div>
        <ConfirmationModal v-if="showDeleteFileModal" @cancel="showDeleteFileModal = false" @delete="deleteFile" :text="chosenFileName" :type="'file'" />
    </div>
</template>

<script>
export default {
    name: 'AddArticle',
}
</script>

<script setup>
import gql from 'graphql-tag'
import { apolloClient } from '@/vue-apollo'
import Tags from '@/components/Tags.vue'
import ConfirmationModal from '@/components/ConfirmationModal.vue'
import { ref, reactive, defineProps, onMounted } from 'vue'
import { QuillEditor, Quill } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.bubble.css'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { toast } from 'bulma-toast'
import { useUserStore } from '@/stores/user'
// import store from '@/stores/user'

const i18n = useI18n()
const route = useRoute()
const userStore = useUserStore()

const emit = defineEmits(['openMenu', 'closeMenu'])

const props = defineProps({
    isMenuShown: Boolean,
    isMobile: Boolean
})

const router = useRouter()
let tags = ref(['липиды', 'белки', 'здоровье', 'СНО', 'медицина', 'тег', 'иммунитет', 'холестирин'])
// TODO загрузить список тегов с сервера ^^^ !!!
let chosenTags = ref([])
let numberOfTags = ref(1)
let article = reactive({
    title: '',
    text: '',
    tags: []
})
let fileList = new DataTransfer()
let reviewers = ref([])
let chosenReviewer = ref('')
let reviewerID = 0
let areReviewersShown = ref(false)
let filteredReviewers = ref([])
let type = ref('')
let user_role = ref('')
let articleTitle = ref('')
let chosenTags2 = []
let place = ref('')
let eventDate = ref('')
let chosenFileName = ref('')
let chosenFile
let showDeleteFileModal = ref(false)

const CREATE_ARTICLE_MUTATION = gql`
    mutation createArticle($name: String!, $articleText: JSONString!, $reviewer: Int!, $profileId: Int!, $tags: [String!]!) {
        createArticle(name: $name, articleText: $articleText, reviewer: $reviewer, profileId: $profileId, tags: $tags) {
            article {
                id
                name
                articleText
                publishDate
                reviewer {
                    id
                }
            }
        }
    }`

const CREATE_NOTIF_ARTICLE_MUTATION = gql`
    mutation($name: String, $notif_text: JSONString, $author: Int, $tags: [String]) {
        createNotification(name: $name, notifText: $notif_text, author: $author, tags: $tags) {
            notif {
                id
                name
                notifText
                author {
                    id
                    name
                    surname
                    secondname
                }
                creationDate
                notificationtagSet {
                    tagId {
                        name
                    }  
                }
            }
        }
    }`

const REVIEWERS_QUERY = gql`query {
    getReviewers {
        id,
        name,
        surname,
        secondname
    }
}`

let user = JSON.parse(userStore.$state.user)

onMounted(() => {
    user_role.value = user.role
    if (user_role.value == 'Student') {
        apolloClient
            .query({
                query: REVIEWERS_QUERY
            })
            .then(result => { 
                reviewers.value = result.data.getReviewers
                filteredReviewers.value = result.data.getReviewers
            })
            .catch(error => { console.log(error) })
    }
    type.value = route.params.type
    let colorVars = getComputedStyle(document.getElementsByClassName('theme')[0])
    let colors = [
        colorVars.getPropertyValue('--card-color'),
        colorVars.getPropertyValue('--background'),
        colorVars.getPropertyValue('--lines-color'), 
        colorVars.getPropertyValue('--text-extra'),                        
        colorVars.getPropertyValue('--text-color'),
        colorVars.getPropertyValue('--tags-color')
    ]

    var toolbarOptions = [            
        [{ 'header': [1, 2, 3,  false] }],            
        
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
        var quill = new Quill('#maineditor', {
            modules: {
                toolbar: toolbarOptions
            },
            placeholder: i18n.t('addArticlePlaceholder'),
            theme: 'bubble'
        })
    } else {
        var quill = new Quill('#maineditor', {
            modules: {
                toolbar: toolbarOptions
            },
            placeholder: i18n.t('mobileAddArticle'),
            theme: 'snow'
        })
    }
    if (type.value == 'recommend') {
        chosenTags.value.push(i18n.t('recommend'))
    } else if (type.value == 'notification') {
        chosenTags.value.push(i18n.t('notification'))
    } else if (user_role.value == 'Sno_student') {
        chosenTags.value.push(i18n.t('sno'))
    }
})

function addTag(chosenTag) {
    chosenTags.value.push(chosenTag)
}

async function addNewTag(event) {
    await (numberOfTags.value += 1)
    let inputsLength = document.getElementsByClassName('tag-input').length
    let lastInput = document.getElementsByClassName('tag-input')[inputsLength - 1]
    lastInput.focus()
}

function deleteTag(tagToDelete) {
    let inputs = document.getElementsByClassName('finished-tag')
    for (let input of inputs) {
        if (input.innerText == tagToDelete) {
            input.parentElement.parentElement.remove()
        }
    }
}

function createArticle() {
    const textarea = document.getElementsByClassName('ql-editor')[0]
    const children = textarea.children;

    let arr = []
    Array.from(children).forEach(element => {
        arr.push(toJSON(element))
    })
    let jsonresult = JSON.stringify(arr)

    JSON.parse(JSON.stringify(chosenTags.value)).forEach(value => chosenTags2.push(value))

    if (type.value == 'text') {
        if (user_role.value == 'Student' && chosenReviewer.value == '') {
            toast({
                message: i18n.t('noReviewer'),
                type: 'notification-danger',
                dismissible: true,
                pauseOnHover: true,
                duration: 2000,
                position: 'top-right',
            })
            return
        }
        apolloClient
            .mutate({
                mutation: CREATE_ARTICLE_MUTATION,
                variables: {
                    name: articleTitle.value,
                    articleText: jsonresult,
                    reviewer: reviewerID,
                    profileId: user.profileID,
                    tags: chosenTags2
                },
            })
            .then(result => {
                router.push({ name: 'Articles' })
                toast({
                    message: i18n.t('articleCreated'),
                    type: 'notification-success',
                    dismissible: true,
                    pauseOnHover: true,
                    duration: 2000,
                    position: 'top-right',
                })
            })
            .catch(error => {
                toast({
                    message: i18n.t('createArticleFailure') + '\n' + error,
                    type: 'notification-danger',
                    dismissible: true,
                    pauseOnHover: true,
                    duration: 2000,
                    position: 'top-right',
                })
            })
    } else if (type.value == 'notification') {
        let notificationText = {}
        notificationText.place = {}
        notificationText.place.date = eventDate.value
        notificationText.place.place = place.value
        notificationText.text = jsonresult
        let notifJson = JSON.stringify(notificationText)

        apolloClient
            .mutate({
                mutation: CREATE_NOTIF_ARTICLE_MUTATION,
                variables: {
                    name: articleTitle.value, 
                    notif_text: notifJson,
                    author: user.profileID,
                    tags: chosenTags2
                },
            })
            .then(result => {
                router.push({ name: 'Articles' })
                toast({
                    message: i18n.t('articleCreated'),
                    type: 'notification-success',
                    dismissible: true,
                    pauseOnHover: true,
                    duration: 2000,
                    position: 'top-right',
                })
            })
            .catch(error => {
                toast({
                    message: i18n.t('createArticleFailure') + '\n' + error,
                    type: 'notification-danger',
                    dismissible: true,
                    pauseOnHover: true,
                    duration: 2000,
                    position: 'top-right',
                })
            })
    }
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

function addFilesToList(files) {
    let fileArray = Array.from(files)
    let uploadedFileArray = Array.from(fileList.items)
    if (fileList.items.length > 0) {
        fileArray.forEach(file => {
            uploadedFileArray.forEach(fileUploaded => {
                if (file.name != fileUploaded.name) {
                    fileList.items.add(file)
                }
            })
        })
    } else { 
        fileArray.forEach(file => { fileList.items.add(file) })
    }
    console.log(fileList)
}

function saveFileName() {
    addFilesToList(document.getElementById('filename-input').files)
    let fileName = document.getElementById('filename-input').files[0].name
    let fileUrl = `https://storage.yandexcloud.net/plateaumed/users/uploads/${fileName}`
    
    let fileDiv = document.createElement('div')
    fileDiv.classList.add('attached-file')

    let fileLink = document.createElement('a')
    fileLink.setAttribute('download', fileName)
    fileLink.setAttribute('href', fileUrl)
    fileLink.innerHTML = fileName
    fileLink.classList.add('attached-file-link')

    let deleteSvg = document.createElementNS("http://www.w3.org/2000/svg", 'svg')
    let deletePath = document.createElementNS("http://www.w3.org/2000/svg", 'path')
    deletePath.setAttribute("d", "m249 849-42-42 231-231-231-231 42-42 231 231 231-231 42 42-231 231 231 231-42 42-231-231-231 231Z")
    deleteSvg.setAttribute('xmlns', "http://www.w3.org/2000/svg")
    deleteSvg.setAttribute('height', "16")
    deleteSvg.setAttribute('viewBox', "0 96 960 960")
    deleteSvg.setAttribute('width', "16")
    deleteSvg.style.fill = '#F65151'
    deleteSvg.style.cursor = 'pointer'
    deleteSvg.appendChild(deletePath)
    deleteSvg.classList.add('delete-file')
    deleteSvg.onclick = showModal

    fileDiv.appendChild(fileLink)
    fileDiv.appendChild(deleteSvg)

    document.getElementById('attached-files').appendChild(fileDiv)
    // document.getElementById('filesend-btn').click()
}

function sendFiles() {
    let uploadedFilesArray = Array.from(fileList.files)
    uploadedFilesArray.forEach(async (file) => {
        var dt = new DataTransfer()
        dt.items.add(file)
        document.getElementById('filename-input').files = dt.files
        console.log(document.getElementById('filename-input').files)
        await new Promise(r => setTimeout(r, 1000));
        document.getElementById('filesend-btn').click()
    })
    
}

function attachFile() {
    document.getElementById('filename-input').click()
}

function showModal() {
    showDeleteFileModal.value = true
    if (event.target.tagName == 'svg') {
        chosenFile = event.target.parentElement
        chosenFileName = event.target.parentElement.firstChild.innerHTML
    } else if (event.target.tagName == 'path') {
        chosenFile = event.target.parentElement.parentElement
        chosenFileName = event.target.parentElement.parentElement.firstChild.innerHTML
    }
   
}

function deleteFile() {
    chosenFile.remove()
    showDeleteFileModal.value = false
}

function switchMenuDisplay() {
    if (props.isMenuShown == false) {
        emit('openMenu', true)
    }
}

function filterReviewers() {
    areReviewersShown.value = true
    filteredReviewers.value = reviewers.value.filter(reviewer => {
        let fullname = `${reviewer.surname} ${reviewer.name} ${reviewer.secondname}`
        return fullname.toLowerCase().includes(chosenReviewer.value.toLowerCase())
    })
}

function chooseReviewer(id) {
    let rev = reviewers.value.find(r => r.id == id)
    reviewerID = id
    chosenReviewer.value = `${rev.surname} ${rev.name} ${rev.secondname}`
    areReviewersShown.value = false
}
</script>

<style>
*::selection {
    background: var(--tags-color);
}

::-webkit-scrollbar {
    width: 0;
}

.page-flex {
    display: flex;
    flex-direction: column;
    background: var(--card-color);
}
.add-article-title {
    margin-top: 30px;
    font-size: 32px;
    color: var(--text-color);
    font-weight: 500;
    border: none;
    background: none;
    outline: none;
}

.add-article-title::placeholder {
    color: var(--text-extra);
}

.tagline {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    flex-wrap: wrap;
    font-size: 18px;
    color: var(--text-color);
    margin-top: 10px;
}

.tagline::-webkit-scrollbar {
  display: none;
}

.tagline {
  scrollbar-width: none;
}

.tagline p {
    padding-left: 2px;
    padding-right: 12px;
    margin-bottom: 12px;
}

.required-tag {
    padding: 6px 12px;
    background: var(--tags-color);
    color: var(--tags-text);
    font-size: 16px;
    border-radius: 16px;
    display: flex;
    align-items: center;
    margin-bottom: 12px;
    margin-right: 12px;
}

.tag-field {
    padding-right: 12px;
    margin-bottom: 12px;
}

.biochemistry-page-hr {
    margin-top: 20px;
    margin-bottom: 20px;
}

.aftertags-hr {
    margin-top: 0;
    z-index: 15;
}

.add-article-text {
    width: 100%;
    font-size: 16px;
    color: var(--text-color);
    flex-grow: 1;
    z-index: 15;
}

.add-tag-btn svg {
    fill: var(--pages-color);
    margin-top: 6.5px;
    margin-bottom: 12px;
}

.add-article-footer {
    width: 100%;
}

.attached-files {
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
}

.attached-file {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding-right: 20px;
}

.attached-file-link {
    color: var(--text-color);
    font-size: 16px;
    text-decoration: underline;
    padding-right: 8px;
}

.add-article-footer-actions {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    position: relative;
    align-items: center;
    width: 100%;
    margin-bottom: 20px;
}

.attach-file {
    width: 180px;
    white-space: nowrap;
    color: var(--text-extra);
    font-size: 16px;
    cursor: pointer;
}

.attach-file svg {
    fill: var(--text-extra);
    transform: rotate(0deg);
}

.add-article-sending {
    display: flex;
    flex-direction: row;
    width: 80%;
    justify-content: flex-end;
}

.publish-article-btn {
    font-size: 20px;
    color: var(--card-color);
    background: var(--pages-color);
    border-radius: 10px;
    padding: 12px 24px;
    border: none;
    justify-self: flex-end;
    transition: 0.3s;
}

.publish-article-btn:hover {
    cursor: pointer;
    background: var(--menu-accent-darker);
}

.add-article-extra-options {
    display: flex;
    flex-direction: row;
    width: 100%;
    margin-bottom: 20px;
}

.add-article-extra-option {
    width: 30%;
    margin-right: 3%;
    background: none;
    border: none;
    outline: none;
    font-size: 16px;
    color: var(--text-color);
}

.add-article-reviewer {
    width: 200px;
    margin-right: 3%;
    background: none;
    border: none;
    outline: none;
    font-size: 16px;
    color: var(--text-color);
}

.add-article-reviewer::placeholder {
    color: var(--text-extra);
}

.reviewers-block {
    position: absolute;
    top: 0;
    transform: translate(-145px, -100%);
    right: 0;
    max-height: 200px;
    background: var(--card-color);
    border-radius: 10px;
    box-shadow: 0px 3.2375px 3.2375px rgba(0, 0, 0, 0.25);
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    padding: 12px;
    z-index: 25;
    overflow-y: scroll;
}

.reviewers-block p {
    margin-top: 12px;
    cursor: pointer;
    color: var(--text-color);
}

.add-article-extra-option::placeholder {
    color: var(--text-extra);
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

#maineditor {
    color: var(--text-color);
    border-radius: none;
}

#filename-input, #filesend-btn {
    display: none;
}

@media (max-width: 420px) {
    #maineditor {
        padding: 12px;
        border-radius: 0 0 20px 20px;
    }

    .add-article-title {
        margin-top: 24px;
        font-size: 24px;
    }

    .tagline {
        font-size: 16px;
    }

    .biochemistry-page-hr {
        margin-top: 12px;
        margin-bottom: 12px;
    }

    .add-article-footer-actions {
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        align-items: center;
        width: 100%;
        margin-bottom: 20px;
    }

    .add-article-reviewer {
        width: 100%;
        margin-right: 0;
    }

    .mobile-add-article-btns {
        display: flex;
        flex-direction: row;
        width: 100%;
        align-items: center;
        margin-top: 12px;
    }

    .mobile-add-article-btns svg {
        transform: rotate(45deg);
        fill: var(--text-extra);
        margin-right: 12px;
    }

    .publish-article-btn {
        font-size: 16px;
        border-radius: 20px;
        text-align: center;
        padding: 12px 12px;
        width: 100%;
    }
    .ql-toolbar.ql-snow {
        border-radius: 20px 20px 0 0;
    }
}
</style>