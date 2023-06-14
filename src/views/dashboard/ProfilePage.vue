<template>
    <div class="my-account-page">
        <div v-if="!isMobile" class="my-account__header">
            <h1 class="my-account__title">{{ $t('profileTitle') }}</h1>
            <button @click="logout()" class="logout-btn">{{ $t('logOut') }}</button>
        </div>
        <div v-if="isMenuShown" class="darker-bg" @click="emit('closeMenu')"></div>
        <div v-if="isMobile" class="mobile-header">
            <div class="logo-block">
                <img src="@/assets/icons/logo.png">
                <p class="logo-name">plateaumed</p>
            </div>
            <div class="mobile-profile-actions">
                <svg @click="logout()" class="logout-icon" xmlns="http://www.w3.org/2000/svg" height="16" viewBox="0 96 960 960" width="16"><path d="M489 936v-60h291V276H489v-60h291q24 0 42 18t18 42v600q0 24-18 42t-42 18H489Zm-78-185-43-43 102-102H120v-60h348L366 444l43-43 176 176-174 174Z"/></svg>
                <svg @click="switchMenuDisplay" xmlns="http://www.w3.org/2000/svg" height="16" viewBox="0 96 960 960" width="16"><path d="M120 816v-60h720v60H120Zm0-210v-60h720v60H120Zm0-210v-60h720v60H120Z"/></svg>
            </div>
        </div>
        <hr v-if="!isMobile" class="my-account__hr">
        <div class="my-account__content">
            <div class="my-account__info">
                <form action="https://storage.yandexcloud.net/plateaumed" method="post" enctype="multipart/form-data">
                    <input type="hidden" name="key" value='users/uploads/${filename}' /><br />
                    <input type="hidden" name="X-Amz-Credential" :value="yandexStorage.cred" />
                    <input type="hidden" name="acl" value="public-read" />
                    <input type="hidden" name="X-Amz-Algorithm" :value="yandexStorage.alg" />
                    <input type="hidden" name="X-Amz-Date" :value="yandexStorage.date" />
                    <input type="hidden" name="policy" :value="yandexStorage.policy" />
                    <input type="hidden" name="X-Amz-Signature" :value="yandexStorage.sign" />
                    <input type="file" @change="attachFile" id="filename-input" name="file" /> <br />
                    <input type="submit" id="filesend-btn" name="submit" value="Загрузить" />
                </form>
                <img v-if="user.photo" @click="chooseProfilePhoto" id="profile-img" class="my-account__img" :src="user.photo">
                <img v-else @click="chooseProfilePhoto" id="profile-img" class="my-account__img" src="@/assets/icons/profile_img.png">
                <!-- TODO если есть фото в профиле (из запроса на сервер) то в src подставить его, иначе - то, что указано выше -->
                <div class="my-account-name-block">
                    <h2 class="my-account-name">{{ user.surname }} {{ user.name }} {{ user.patronymic }}</h2>
                    <svg class="my-account-name-edit-btn" @click="isModalShown = true" xmlns="http://www.w3.org/2000/svg" height="28" viewBox="0 96 960 960" width="28"><path d="M180 876h44l443-443-44-44-443 443v44Zm614-486L666 262l42-42q17-17 42-17t42 17l44 44q17 17 17 42t-17 42l-42 42Zm-42 42L248 936H120V808l504-504 128 128Zm-107-21-22-22 44 44-22-22Z"/></svg>
                </div>
                
                <p class="my-account-role">{{ user.role == 'Teacher' ? $t('roleTeacher') : (user.role == 'Sno_student' ? $t('roleSSS') : $t('roleStudent')) }}</p>
                <p class="my-account-mail">{{ user.email }}</p>
                <button class="my-account-password-btn">{{ $t('changePassword') }}</button>
                <hr v-if="!isMobile" class="my-account-info-hr">
                <div class="my-account-channels">
                    <div class="my-account-channel">
                        <img src="@/assets/icons/mail-icon.png">
                        <div v-if="isMailFilled" class="filled-channel-block">
                            <p class="my-account-channel-filled">{{ channels.mail }}</p>
                            <svg class="channel-edit-btn" @click="editChannel('mail')" xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 96 960 960" width="20"><path d="M180 876h44l443-443-44-44-443 443v44Zm614-486L666 262l42-42q17-17 42-17t42 17l44 44q17 17 17 42t-17 42l-42 42Zm-42 42L248 936H120V808l504-504 128 128Zm-107-21-22-22 44 44-22-22Z"/></svg>
                            <svg class="channel-delete-btn" @click="deleteChannel('mail')" xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 96 960 960" width="20"><path d="m249 849-42-42 231-231-231-231 42-42 231 231 231-231 42 42-231 231 231 231-42 42-231-231-231 231Z"/></svg>
                        </div>
                        <input v-else class="my-account-channel-empty" id="mail-input" @keyup.native.enter="saveChannel('mail')" type="text" placeholder="address@mail.ru">
                    </div>
                    <div class="my-account-channel">
                        <img src="@/assets/icons/vk-icon.png">
                        <div v-if="isVkFilled" class="filled-channel-block">
                            <p class="my-account-channel-filled">{{ channels.vk }}</p>
                            <svg class="channel-edit-btn" @click="editChannel('vk')" xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 96 960 960" width="20"><path d="M180 876h44l443-443-44-44-443 443v44Zm614-486L666 262l42-42q17-17 42-17t42 17l44 44q17 17 17 42t-17 42l-42 42Zm-42 42L248 936H120V808l504-504 128 128Zm-107-21-22-22 44 44-22-22Z"/></svg>
                            <svg class="channel-delete-btn" @click="deleteChannel('vk')" xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 96 960 960" width="20"><path d="m249 849-42-42 231-231-231-231 42-42 231 231 231-231 42 42-231 231 231 231-42 42-231-231-231 231Z"/></svg>
                        </div>
                        <input v-else class="my-account-channel-empty" id="vk-input" @keyup.native.enter="saveChannel('vk')" type="text" placeholder="vk.com/id123456">
                    </div>
                    <div class="my-account-channel">
                        <img src="@/assets/icons/telegram-icon.png">
                        <div v-if="isTgFilled" class="filled-channel-block">
                            <p class="my-account-channel-filled">{{ channels.tg }}</p>
                            <svg class="channel-edit-btn" @click="editChannel('tg')" xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 96 960 960" width="20"><path d="M180 876h44l443-443-44-44-443 443v44Zm614-486L666 262l42-42q17-17 42-17t42 17l44 44q17 17 17 42t-17 42l-42 42Zm-42 42L248 936H120V808l504-504 128 128Zm-107-21-22-22 44 44-22-22Z"/></svg>
                            <svg class="channel-delete-btn" @click="deleteChannel('tg')" xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 96 960 960" width="20"><path d="m249 849-42-42 231-231-231-231 42-42 231 231 231-231 42 42-231 231 231 231-42 42-231-231-231 231Z"/></svg>
                        </div>
                        <input v-else class="my-account-channel-empty" id="tg-input" @keyup.native.enter="saveChannel('tg')" type="text" placeholder="@Example">
                    </div>
                </div>
            </div>
            <div class="my-account__subscriptions">                    
                <div class="tags-subscriptions">
                    <h2 class="subscription-title">{{ $t('tagsSubscriptions') }}</h2>
                    <div class="tags-subscriptions-content">
                        <div v-for="tag, index in subscriptedTags" :key="index" class="subscription-tag finished-tag"><p>{{ tag }}</p><svg @click="deleteTagModal(tag)" class="delete-tag-sub-btn" xmlns="http://www.w3.org/2000/svg" height="18" viewBox="0 96 960 960" width="18"><path d="m249 849-42-42 231-231-231-231 42-42 231 231 231-231 42 42-231 231 231 231-42 42-231-231-231 231Z"/></svg></div>
                        <!-- <svg @click="addNewTag" class="add-tag-subscription" xmlns="http://www.w3.org/2000/svg" height="27" viewBox="0 96 960 960" width="27"><path d="M453 776h60V610h167v-60H513V376h-60v174H280v60h173v166Zm27.266 200q-82.734 0-155.5-31.5t-127.266-86q-54.5-54.5-86-127.341Q80 658.319 80 575.5q0-82.819 31.5-155.659Q143 347 197.5 293t127.341-85.5Q397.681 176 480.5 176q82.819 0 155.659 31.5Q709 239 763 293t85.5 127Q880 493 880 575.734q0 82.734-31.5 155.5T763 858.316q-54 54.316-127 86Q563 976 480.266 976Zm.234-60Q622 916 721 816.5t99-241Q820 434 721.188 335 622.375 236 480 236q-141 0-240.5 98.812Q140 433.625 140 576q0 141 99.5 240.5t241 99.5Zm-.5-340Z"/></svg> -->
                        <div class="tag-field" v-for="index in numberOfTags" :key="index">
                            <Tags :initialTags="allTags" :page="'Profile'" @addTag="addTagSubscription" @deleteTag="deleteTagModal" />
                        </div>
                        <ConfirmationModal v-if="showDeleteTagModal" @cancel="showDeleteTagModal = false" @delete="deleteTagSubscription(tagnameToDelete)" :text="tagnameToDelete" :type="'tag'" />
                        <svg @click="addNewTag" class="add-tag-subscription" xmlns="http://www.w3.org/2000/svg" height="27" viewBox="0 96 960 960" width="27"><path d="M453 776h60V610h167v-60H513V376h-60v174H280v60h173v166Zm27.266 200q-82.734 0-155.5-31.5t-127.266-86q-54.5-54.5-86-127.341Q80 658.319 80 575.5q0-82.819 31.5-155.659Q143 347 197.5 293t127.341-85.5Q397.681 176 480.5 176q82.819 0 155.659 31.5Q709 239 763 293t85.5 127Q880 493 880 575.734q0 82.734-31.5 155.5T763 858.316q-54 54.316-127 86Q563 976 480.266 976Zm.234-60Q622 916 721 816.5t99-241Q820 434 721.188 335 622.375 236 480 236q-141 0-240.5 98.812Q140 433.625 140 576q0 141 99.5 240.5t241 99.5Zm-.5-340Z"/></svg>
                    </div>    
                </div>

                <div class="authors-subscriptions">
                    <h2 class="subscription-title">{{ $t('authorsSubscriptions') }}</h2>
                    <div class="authors-subscriptions-content">
                        <div v-for="author, index in subscriptedAuthors" :key="index">
                            <div class="subscription-author">
                                <p v-if="!isMobile" class="subscription-author-number">{{ index + 1 }}</p>
                                <hr v-if="!isMobile" class="vertical-hr">
                                <div class="subscription-author-content">
                                    <img class="subscription-author-img" src="@/assets/icons/profile_img.png">
                                    <div class="subscription-author-info">
                                        <p class="subscription-author-name">{{ author.fullname }}</p>
                                        <p class="subscription-author-role">{{ author.role == 'Teacher' ? $t('roleTeacher') : (author.role == 'Sno_student' ? $t('roleSSS') : $t('roleStudent')) }}</p>
                                    </div>                  
                                </div>
                                <hr v-if="!isMobile" class="vertical-hr">
                                <div @click="showDeleteAuthorModal = true" class="delete-subscription-author"><svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48"><path d="m249 849-42-42 231-231-231-231 42-42 231 231 231-231 42 42-231 231 231 231-42 42-231-231-231 231Z"/></svg></div>
                                <ConfirmationModal v-if="showDeleteAuthorModal" @cancel="showDeleteAuthorModal = false" @delete="deleteAuthorSubscription(author.id)" :text="author.fullname" :type="'author'" />
                            </div>
                            <hr v-if="!isMobile" class="authors-subscription-hr">
                        </div>
                        <input v-if="authorSubAdding" autocomplete="off" @input="filterAuthors" v-model="chosenAuthor" type="text" class="add-author-sub-input" :placeholder="$t('chooseAuthor')">
                        <div v-if="areAuthorsShown && filteredAuthors.length > 0" class="authors-block">
                            <div class="reviewer-option" v-for="author in filteredAuthors" :key="author.id">
                                <!-- TODO разместить здесь фото пользователя -->
                                <p @click="chooseAuthor(author.id)">{{ author.fullname }}</p>
                            </div>
                        </div>
                        <div class="add-author-subscription">
                            <svg @click="authorSubAdding = true" xmlns="http://www.w3.org/2000/svg" height="36" viewBox="0 96 960 960" width="36"><path d="M453 776h60V610h167v-60H513V376h-60v174H280v60h173v166Zm27.266 200q-82.734 0-155.5-31.5t-127.266-86q-54.5-54.5-86-127.341Q80 658.319 80 575.5q0-82.819 31.5-155.659Q143 347 197.5 293t127.341-85.5Q397.681 176 480.5 176q82.819 0 155.659 31.5Q709 239 763 293t85.5 127Q880 493 880 575.734q0 82.734-31.5 155.5T763 858.316q-54 54.316-127 86Q563 976 480.266 976Zm.234-60Q622 916 721 816.5t99-241Q820 434 721.188 335 622.375 236 480 236q-141 0-240.5 98.812Q140 433.625 140 576q0 141 99.5 240.5t241 99.5Zm-.5-340Z"/></svg>
                        </div>  
                    </div>
                </div>
                
                <div v-if="user.role == 'Teacher'" class="my-account-sss">
                    <h2 class="my-account-sss-title">{{ $t('sssLeads') }}</h2>
                    <div class="my-account-sss-content">
                        <div v-for="sss_user, index in sss" :key="index">
                            <div class="my-account-sss-user">
                                <p class="my-account-sss-user-number">{{ index + 1 }}</p>
                                <hr v-if="!isMobile" class="vertical-hr">
                                <div class="my-account-sss-user-name">
                                    <img src="@/assets/icons/profile_img.png">
                                    <p>{{ sss_user.surname }} {{ sss_user.name }} {{ sss_user.patronymic }}</p>
                                </div>
                                <hr v-if="!isMobile" class="vertical-hr">
                                <p class="my-account-delete-sss-user"><svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48"><path d="m249 849-42-42 231-231-231-231 42-42 231 231 231-231 42 42-231 231 231 231-42 42-231-231-231 231Z"/></svg></p>
                            </div>
                            <hr v-if="!isMobile" class="my-account-sss-hr">
                        </div>
                        <div class="my-account-sss-add-user">
                            <svg xmlns="http://www.w3.org/2000/svg" height="36" viewBox="0 96 960 960" width="36"><path d="M453 776h60V610h167v-60H513V376h-60v174H280v60h173v166Zm27.266 200q-82.734 0-155.5-31.5t-127.266-86q-54.5-54.5-86-127.341Q80 658.319 80 575.5q0-82.819 31.5-155.659Q143 347 197.5 293t127.341-85.5Q397.681 176 480.5 176q82.819 0 155.659 31.5Q709 239 763 293t85.5 127Q880 493 880 575.734q0 82.734-31.5 155.5T763 858.316q-54 54.316-127 86Q563 976 480.266 976Zm.234-60Q622 916 721 816.5t99-241Q820 434 721.188 335 622.375 236 480 236q-141 0-240.5 98.812Q140 433.625 140 576q0 141 99.5 240.5t241 99.5Zm-.5-340Z"/></svg>
                        </div>  
                    </div>
                </div>
            </div>
            
        </div>
        <div v-if="isModalShown" class="edit-name-modal-bg" @click="isModalShown = false"></div>
        <div v-if="isModalShown" class="edit-name-modal">
            <h2 class="edit-name-modal-title">{{ $t('changeInfo') }}</h2>
            <div class="initial-field edit-name-modal-field">
                <label class="initial-field-label">{{ $t('name') }}</label>
                <input type="text" name="name" class="initial-input" v-model="tempUser.name" :placeholder="$t('namePlaceholder')">
            </div>
            <div class="initial-field edit-name-modal-field">
                <label class="initial-field-label">{{ $t('patronymic') }}</label>
                <input type="text" name="patronymic" class="initial-input" v-model="tempUser.patronymic" :placeholder="$t('patronymicPlaceholder')">
            </div>
            <div class="initial-field edit-name-modal-field">
                <label class="initial-field-label">{{ $t('surname') }}</label>
                <input type="text" name="surname" class="initial-input" v-model="tempUser.surname" :placeholder="$t('surnamePlaceholder')">
            </div>
            <button class="modal-edit-name-btn" @click="changeMyInfo">{{ $t('save') }}</button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Profile',
}
</script>

<script setup>
import Tags from '@/components/Tags.vue'
import ConfirmationModal from '@/components/ConfirmationModal.vue'
import { useRouter } from 'vue-router'
import { ref, reactive, onMounted, defineProps, defineEmits } from 'vue'
import gql from 'graphql-tag'
import { apolloClient } from '@/vue-apollo'
import { toast } from 'bulma-toast'
import { useI18n } from 'vue-i18n'
import { useUserStore } from '@/stores/user'

const router = useRouter()
const i18n = useI18n()
const userStore = useUserStore()

const emit = defineEmits(['openMenu', 'closeMenu'])

const props = defineProps({
    isMenuShown: Boolean,
    isMobile: Boolean
})

let user = JSON.parse(userStore.$state.user)

let channels = reactive({
    mail: '',
    vk: '',
    tg: ''
})

let tempUser = reactive({
    name: user.name,
    patronymic: user.patronymic,
    surname: user.surname
})

let showDeleteTagModal = ref(false)
let showDeleteAuthorModal = ref(false)
let tagAdding = ref(false)
let authorSubAdding = ref(false)
let areAuthorsShown = ref(false)
let chosenAuthor = ref('')
let allTags = ref([])
let subscriptedTags = ref([])
let allAuthors = ref([])
let subscriptedAuthors = ref([])
let filteredAuthors = ref([])
let numberOfTags = ref(0)
let tagnameToDelete = ref('')
let isMailFilled = ref(false)
let isVkFilled = ref(false)
let isTgFilled = ref(false)
let isModalShown = ref(false)
let yandexStorage = reactive({
    url: '',
    key: '',
    alg: '',
    cred: '',
    date: '',
    policy: '',
    sign: ''
})
let sss = ref([{
                surname: 'Иванов',
                name: 'Иван',
                patronymic: 'Иванович',
            },
            {
                surname: 'Константинопольская',
                name: 'Анастасия',
                patronymic: 'Александровна',
            },
            {
                surname: 'Фамилия',
                name: 'Имя',
                patronymic: 'Отчество',
            }])

const MY_INFO_QUERY = gql`query($userId: Int!) {
    getProfile(id: $userId) {
        id
        user
        name
        surname
        secondname
        photo
        channels
        getNotification
        tagsubscriptionSet {
            tagId {
                name
            }
        }
        authorsubscriptionSet {
            id
            authorId {
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
        }
    }
}`

const ALL_TAGS = gql`query {
    allTags {
        id
        name
    }
}`

const ALL_AUTHORS = gql`query{
    allAuthors{
        authorId {
            id
            role {
                roleName
            }
            photo
            name
            surname
            secondname
        }
    }
}`

const ADD_TAG_SUBSCRIPTION = gql`mutation AddTagToUser($userId: Int!, $tagId: Int!) {
    addTagToUser(userId: $userId, tagId: $tagId) {
        tagSubscription {
            id
            userId {
                id
                name
            }
            tagId {
                id
                name
            }
        }
    }
}`

const REMOVE_TAG_SUBSCRIPTION = gql`mutation DeleteTagFromUser($userId: Int!, $tagId: Int!) {
    deleteTagFromUser(userId: $userId, tagId: $tagId) {
        tagSubscription {
            id
            userId {
                id
                name
            }
            tagId {
                id
                name
            }
        }
    }
}`

const ADD_AUTHOR_SUBSCRIPTION = gql`mutation AddAuthorToUser($userId: Int!, $authorId: Int!) {
    addAuthorToUser(userId: $userId, authorId: $authorId) {
        authorSubscription {
            id
            userId {
                id
                user
                name
            }
            authorId {
                authorId {
                    id
                    user
                    name
                }
            }
        }
    }
}`

const REMOVE_AUTHOR_SUBSCRIPTION = gql`mutation DeleteAuthorFromUser($userId: Int!, $authorId: Int!) {
    deleteAuthorFromUser(userId: $userId, authorId: $authorId) {
        authorSubscription {
            id
            userId {
                id
                user
                name
            }
            authorId {
                authorId {
                    id
                    user
                    name
                }
            }
        }
    }
}`

const GET_STORAGE = gql`query {
    getStorageData
}`

const PHOTO_UPDATE = gql`mutation UpdateUserProfile($userId: Int!, $photo: String) {
    updateProfile(userId: $userId, photo: $photo) {
        profile {
            id
            photo
        }
    }
}`

onMounted(async () => {
    await getMyInfo()
    await getAllTags()
    await getAllAuthors()
    await getStorageData()
})

function logout() {
    userStore.removeToken()
    userStore.removeUser()

    router.push({name: 'LogIn'})
}

async function getMyInfo() {
    await apolloClient
        .query({
            query: MY_INFO_QUERY,
            variables: {
                userId: Number(user.profileID)
            }
        })
        .then(result => {
            user.photo = result.data.getProfile.photo
            result.data.getProfile.tagsubscriptionSet.forEach(tag => {
                subscriptedTags.value.push(tag.tagId.name)
            })
            let userChannels = JSON.parse(result.data.getProfile.channels)
            console.log(userChannels)
            let mail = userChannels.mail
            let vk = userChannels.vk
            let tg = userChannels.tg
            if (mail != '_') {
                channels.mail = mail
                isMailFilled.value = true
            }
            if (vk != '_') {
                channels.vk = vk
                isVkFilled.value = true
            }
            if (tg != '_') {
                channels.tg = tg
                isTgFilled.value = true
            }
            result.data.getProfile.authorsubscriptionSet.forEach(author => {
                subscriptedAuthors.value.push({
                    id: author.authorId.authorId.id,
                    fullname: author.authorId.authorId.surname + ' ' + author.authorId.authorId.name + (author.authorId.authorId.secondname != '' ? (' ' + author.authorId.authorId.secondname) : ''),
                    role: author.authorId.authorId.role.roleName,
                    photo: author.authorId.authorId.photo
                })
            })
        })
        .catch(error => console.log(error))
}

async function getAllTags() {
    await apolloClient
        .query({
            query: ALL_TAGS,
            variables: {
                userId: user.userID
            }
        })
        .then(result => {
            result.data.allTags.forEach(tag => {
                let newTag = {
                    id: tag.id,
                    name: tag.name
                }
                allTags.value.push(newTag)
            })
        })
        .catch(error => console.log(error))
}

async function getAllAuthors() {
    await apolloClient
        .query({
            query: ALL_AUTHORS,
            variables: {
                userId: user.userID
            }
        })
        .then(result => {
            result.data.allAuthors.forEach(author => {
                let newAuthor = {
                    id: author.authorId.id,
                    fullname: author.authorId.surname + ' ' + author.authorId.name + (author.authorId.secondname != '' ? (' ' + author.authorId.secondname) : ''),
                    role: author.authorId.role.roleName,
                    photo: author.authorId.photo
                }
                allAuthors.value.push(newAuthor)
                filteredAuthors.value.push(newAuthor)
            })
        })
        .catch(error => console.log(error))
}

async function getStorageData() {
    await apolloClient
        .query({
            query: GET_STORAGE,
        })
        .then(result => { 
            yandexStorage.url = 'https://storage.yandexcloud.net/plateaumed'
            let fields = JSON.parse(result.data.getStorageData.replaceAll('\'', '\"')).fields
            // yandexStorage.key = `users/uploads/${filename}`
            yandexStorage.alg = 'AWS4-HMAC-SHA256'
            yandexStorage.cred = 'YCAJEyFpGK-G7qKl-OrHy-k3Z/20230613/ru-central1/s3/aws4_request'
            yandexStorage.policy = 'eyJleHBpcmF0aW9uIjogIjIwMjMtMDYtMTNUMTg6NDY6NDJaIiwgImNvbmRpdGlvbnMiOiBbeyJhY2wiOiAicHVibGljLXJlYWQifSwgWyJzdGFydHMtd2l0aCIsICIka2V5IiwgInVzZXJzL3VwbG9hZHMiXSwgeyJidWNrZXQiOiAicGxhdGVhdW1lZCJ9LCBbInN0YXJ0cy13aXRoIiwgIiRrZXkiLCAidXNlcnMvdXBsb2Fkcy8iXSwgeyJ4LWFtei1hbGdvcml0aG0iOiAiQVdTNC1ITUFDLVNIQTI1NiJ9LCB7IngtYW16LWNyZWRlbnRpYWwiOiAiWUNBSkV5RnBHSy1HN3FLbC1Pckh5LWszWi8yMDIzMDYxMy9ydS1jZW50cmFsMS9zMy9hd3M0X3JlcXVlc3QifSwgeyJ4LWFtei1kYXRlIjogIjIwMjMwNjEzVDE3NDY0MloifV19'
            yandexStorage.date = '20230613T174642Z'
            yandexStorage.sign = '31772e9fb68f49d8ea437487759441d8feb8559585f311ed5f31d106796ad63c'
            // Object.entries(fields).forEach(entry => {
            //     const [key, value] = entry
            //     if (key == 'x-amz-date') {
            //         yandexStorage.date = value
            //     }
            //     if (key == 'x-amz-signature') {
            //         yandexStorage.sign = value
            //     }})
        })
        .catch(error => { console.log(error) })
}

function switchMenuDisplay() {
    if (props.isMenuShown == false) {
        emit('openMenu', true)
    }
}

function addTagSubscription(chosenTag) {
    let tagID = allTags.value.find(tag => tag.name == chosenTag)
    if (tagID){
        if (!subscriptedTags.value.includes(chosenTag)) {
            apolloClient
                .mutate({
                    mutation: ADD_TAG_SUBSCRIPTION,
                    variables: {
                        userId: user.profileID,
                        tagId: tagID.id
                    },
                })
                .then(result => { console.log(result) })
                .catch(error => { console.log(error) })
        } else {
            toast({
                message: i18n.t('alreadySubscriptedTag'),
                type: 'notification-danger',
                dismissible: true,
                pauseOnHover: true,
                duration: 4000,
                position: 'top-right',
            })
            let incorrectTagNumber = document.getElementsByClassName('tags-subscriptions-content')[0].children.length - 2
            document.getElementsByClassName('tags-subscriptions-content')[0].children.item(incorrectTagNumber).remove()
        }
    } else {
        toast({
            message: i18n.t('tagDoesntExist'),
            type: 'notification-danger',
            dismissible: true,
            pauseOnHover: true,
            duration: 4000,
            position: 'top-right',
        })
        let incorrectTagNumber = document.getElementsByClassName('tags-subscriptions-content')[0].children.length - 2
        document.getElementsByClassName('tags-subscriptions-content')[0].children.item(incorrectTagNumber).remove()
    }  
}

async function addNewTag(event) {
    await (numberOfTags.value += 1)
    tagAdding.value = true
}

function deleteTagModal(tag) {
    tagnameToDelete.value = tag
    showDeleteTagModal.value = true
}

async function deleteTagSubscription(tagToDelete) {
    let inputs = document.getElementsByClassName('finished-tag')
    for (let input of inputs) {
        if (input.innerText == tagToDelete) {
            if (input.classList.length > 1) {
                input.remove()
            } else { input.parentElement.parentElement.remove() }
            let tagID = allTags.value.find(tag => tag.name == tagToDelete).id
            await apolloClient
                .mutate({
                    mutation: REMOVE_TAG_SUBSCRIPTION,
                    variables: {
                        userId: user.profileID,
                        tagId: tagID
                    },
                })
                .then(result => { console.log(result) })
                .catch(error => { console.log(error) })
        }
    }
    showDeleteTagModal.value = false
}

function filterAuthors() {
    areAuthorsShown.value = true
    filteredAuthors.value = allAuthors.value.filter(author => { return author.fullname.toLowerCase().includes(chosenAuthor.value.toLowerCase())})
}

function chooseAuthor(id) {
    let newAuthorSub = allAuthors.value.find(author => author.id == id)
    areAuthorsShown.value = false

    if (newAuthorSub) {
        chosenAuthor.value = newAuthorSub.fullname
        let alreadySub = subscriptedAuthors.value.findIndex(author => author.id == id)
        if (alreadySub == -1) {
            subscriptedAuthors.value.push(newAuthorSub)
            authorSubAdding.value = false
            apolloClient
                .mutate({
                    mutation: ADD_AUTHOR_SUBSCRIPTION,
                    variables: {
                        userId: user.userID,
                        authorId: id
                    },
                })
                .then(result => { console.log(result) })
                .catch(error => { console.log(error) })
        } else {
            toast({
                message: i18n.t('alreadySubscriptedAuthor'),
                type: 'notification-danger',
                dismissible: true,
                pauseOnHover: true,
                duration: 4000,
                position: 'top-right',
            })
        }
    } else {
        toast({
            message: i18n.t('tagDoesntExist'),
            type: 'notification-danger',
            dismissible: true,
            pauseOnHover: true,
            duration: 4000,
            position: 'top-right',
        })
    }
    chosenAuthor.value = ''
}

async function deleteAuthorSubscription(authorID) {
    await apolloClient
        .mutate({
            mutation: REMOVE_AUTHOR_SUBSCRIPTION,
            variables: {
                userId: user.userID,
                authorId: authorID
            },
        })
        .then(result => { console.log(result) })
        .catch(error => { console.log(error) })
    let authorToDelete = subscriptedAuthors.value.findIndex(author => author.id == authorID)
    subscriptedAuthors.value.splice(authorToDelete, 1)
    showDeleteAuthorModal.value = false
}

function attachFile() {
    let fileArray = Array.from(document.getElementById('filename-input').files)
    if (fileArray.length > 1) {
        toast({
            message: i18n.t('onlyOneFile'),
            type: 'notification-danger',
            dismissible: true,
            pauseOnHover: true,
            duration: 2000,
            position: 'top-right',
        })
    }
    else {
        changeProfilePhoto(document.getElementById('filename-input').files[0])
        console.log(document.getElementById('filename-input').files[0])
        document.getElementById('filesend-btn').click()
    }
}

function chooseProfilePhoto() {
    document.getElementById('filename-input').click()
}

function changeProfilePhoto(file) {
    if (file.type.match('image.*')) {
        let fileName = file.name
        let fileUrl = `https://storage.yandexcloud.net/plateaumed/users/uploads/${fileName}`
        apolloClient
            .mutate({
                mutation: PHOTO_UPDATE,
                variables: {
                    userId: user.userID,
                    photo: fileUrl
                },
            })
            .then(result => { 
                document.getElementById('profile-img').src = fileUrl
            })
            .catch(error => { console.log(error) }) 
    } else {
        toast({
            message: i18n.t('onlyImg'),
            type: 'notification-danger',
            dismissible: true,
            pauseOnHover: true,
            duration: 4000,
            position: 'top-right',
        })
    }
}

function changeMyInfo() {
    user.name = tempUser.name
    user.patronymic = tempUser.patronymic
    user.surname = tempUser.surname
    userStore.setUser(user)
    // TODO запрос на сервер для изменения имени
    isModalShown.value = false
}

async function editChannel(messenger) {
    if (messenger == 'mail') {
        await (isMailFilled.value = false)
        document.getElementById('mail-input').value = channels.mail
    } else if (messenger == 'vk') {
        await (isVkFilled.value = false)
        document.getElementById('vk-input').value = channels.vk
    } else if (messenger == 'tg') {
        await (isTgFilled.value = false)
        document.getElementById('tg-input').value = channels.tg
    }
}

async function saveChannel(messenger) {
    if (messenger == 'mail') {
        await (channels.mail = document.getElementById('mail-input').value)
        isMailFilled.value = true
    } else if (messenger == 'vk') {
        await (channels.vk = document.getElementById('vk-input').value)
        isVkFilled.value = true
    } else if (messenger == 'tg') {
        await (channels.tg = document.getElementById('tg-input').value)
        isTgFilled.value = true
    }
    if (channels.mail == '') { channels.mail = '_'}
    if (channels.vk == '') { channels.vk = '_'}
    if (channels.tg == '') { channels.tg = '_'}
    let chan = {
        mail: channels.mail,
        vk: channels.vk,
        tg: channels.tg
    }
    let userChannels = JSON.stringify(chan)
    apolloClient
        .mutate({
            mutation: gql`mutation UpdateUserProfile($userId: Int!, $channels: JSONString!) {
                updateProfile(userId: $userId, channels: $channels) {
                    profile {
                        id
                        role {
                            roleName
                        }
                        channels
                        photo
                        getNotification
                        name
                        surname
                        secondname
                    }
                }
            }`,
            variables: {
                userId: user.userID,
                channels: userChannels
            },
        })
        .then(result => { console.log(result) })
        .catch(error => { console.log(error) })
}

async function deleteChannel(messenger) {
    if (messenger == 'mail') {
        await (channels.mail = '_')
        isMailFilled.value = false
    } else if (messenger == 'vk') {
        await (channels.vk = '_')
        isVkFilled.value = false
    } else if (messenger == 'tg') {
        await (channels.tg = '_')
        isTgFilled.value = false
    }
    let chan = {
        mail: channels.mail,
        vk: channels.vk,
        tg: channels.tg
    }
    let userChannels = JSON.stringify(chan)
    apolloClient
        .mutate({
            mutation: gql`mutation UpdateUserProfile($userId: Int!, $channels: JSONString!) {
                updateProfile(userId: $userId, channels: $channels) {
                    profile {
                        id
                        role {
                            roleName
                        }
                        channels
                        photo
                        getNotification
                        name
                        surname
                        secondname
                    }
                }
            }`,
            variables: {
                userId: user.userID,
                channels: userChannels
            },
        })
        .then(result => { console.log(result) })
        .catch(error => { console.log(error) })
}
</script>

<style>
.my-account-page {
    width: 100%;
    height: 100vh;
    background: var(--background);
    padding: 0;
}

.my-account__header {
    padding-top: 20px;
    width: 80%;
    margin: auto;
    display: flex;
    flex-direction: row;
    justify-content: space-between
}

.my-account__title {
    font-size: 32px;
    color: var(--text-color);
    font-weight: 500;
}

.my-account__hr {
    background: var(--lines-color);
    height: 2px;
    width: 80%;
    margin: 20px auto;
}

.my-account__content {
    width: 80%;
    height: calc(100vh - 170px);
    margin: 40px auto;
    display: flex;
    flex-direction: row;
    padding: 0;
}

.my-account__info {
    width: 500px;
    height: 628px;
    background: var(--card-color);
    box-shadow: 0px 3.2375px 3.2375px rgba(0, 0, 0, 0.25);
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 0;
}

.my-account__img{
    width: 160px;
    height: 160px;
    border-radius: 50%;
    margin: 0px 0 20px 0;
}

.my-account__img:hover{
    cursor: pointer;
}

.my-account-name-block {
    display: flex;
    flex-direction: row;
    align-items: center;
}

.my-account-name {
    color: var(--text-color);
    font-size: 28px;
    font-weight: 500;
    margin: 0;
    letter-spacing: normal;
}

.my-account-name-edit-btn {
    fill: var(--text-extra);
    padding-left: 8px;
    cursor: pointer;
}

.my-account-role, .my-account-mail {
    font-size: 16px;
    color: var(--text-extra);
    margin: 0;
    letter-spacing: normal;
}

.my-account-password-btn {
    background: var(--pages-color);
    width: 400px;
    height: 40px;
    color: var(--card-color);
    font-size: 16px;
    line-height: 16px;
    padding: 12px 0;
    text-align: center;
    border: none;
    border-radius: 10px;
    margin: 24px 0 0 0;
}

.my-account-info-hr {
    background: var(--lines-color);
    height: 1px;
    width: 400px;
    margin: 20px auto;
}

.my-account-channels {
    display: flex;
    flex-direction: column;
    width: 400px;
    margin-bottom: 24px;
    margin-top: 0;
}

.my-account-channel {
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 40px;
    margin-bottom: 20px;
}

.my-account-channel img{
    margin-right: 20px;
}

.filled-channel-block{
    display: flex;
    flex-direction: row;
    align-items: center;
}

.my-account-channel-filled {
    font-size: 20px;
    color: var(--text-color);
}

.channel-edit-btn {
    fill: var(--text-extra);
    margin: 0 12px;
    cursor: pointer;
}

.channel-delete-btn {
    fill: var(--danger);
    cursor: pointer;
}

.my-account-channel-empty {
    width: 340px;
    border: none;
    border-bottom: 1px solid var(--lines-color);
    height: 26px;
    font-size: 18px;
    outline: none;
    color: var(--text-color);
    background: var(--card-color);
}

.my-account-channel-empty::placeholder {
    font-size: 18px;
    color: var(--lines-color)
}

.my-account__subscriptions {
    width: calc(100% - 500px - 40px);
    margin-left: 40px;
    height: 100%;
    overflow-y: scroll;
    overflow-x: hidden;
}

.my-account__subscriptions::-webkit-scrollbar {
  display: none;
}
 .my-account__subscriptions {
  scrollbar-width: none;
}

.subscription-title, .my-account-sss-title {
    font-size: 28px;
    color: var(--text-color);
    padding: 20px 0 0 40px;
}

.tags-subscriptions, .authors-subscriptions, .my-account-sss {
    width: 100%;
    background: var(--card-color);
    box-shadow: 0px 3.2375px 3.2375px rgba(0, 0, 0, 0.25);
    margin-bottom: 40px;
    margin-top: 0;
    border-radius: 0;
}

.tags-subscriptions-content {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 20px 40px;
}

.subscription-tag {
    background: var(--tags-color);
    color: var(--tags-text);
    font-size: 16px;
    border-radius: 16px;
    padding: 6px 12px;
    margin-right: 20px;
    display: flex;
    flex-direction: row;
    align-items: center;
}

.delete-tag-sub-btn {
    margin-left: 8px;
    fill: var(--tags-text);
}

.add-tag-subscription {
    fill: var(--pages-color);
}
.authors-subscriptions-content, .my-account-sss-content {
    position: relative;
    width: calc(100% - 80px);
    margin: auto;
    padding-top: 20px;
}

.subscription-author, .my-account-sss-user {
    display: flex;
    flex-direction: row;
}

.subscription-author-number, .my-account-sss-user-number {
    width: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--text-color);
}

.vertical-hr {
    border: none;
    border-right: 1px solid var(--lines-color);
    height: 40px;
    width: 1px;
    margin: 0;
}

.subscription-author-content {
    display: flex;
    flex-direction: row;
    flex: 1;
    justify-content: space-between;
    padding: 0 34px 0 12px;
    align-items: center;
    font-size: 16px;
    color: var(--text-color);
}

.subscription-author-info {
    display: flex;
    flex-direction: row;
    flex: 1;
    justify-content: space-between;
    align-items: center;
}

.subscription-author-name {
    display: flex;
    flex-direction: row;
    align-items: center;
}

.add-author-sub-input {
    width: calc(100% - 80px);
    margin: auto;
    background: none;
    border: none;
    outline: none;
    font-size: 16px;
    color: var(--text-color);
}

.add-author-sub-input::placeholder {
    color: var(--text-extra);
}

.authors-block {
    position: absolute;
    bottom: 0;
    transform: translateY(calc(100% - 40px));
    left: 0;
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

.authors-block p {
    margin-top: 12px;
    cursor: pointer;
    color: var(--text-color);
}

.my-account-sss-user-name {
    display: flex;
    flex-direction: row;
    flex: 1;
    justify-content: flex-start;
    padding: 0 34px 0 12px;
    align-items: center;
    font-size: 16px;
    color: var(--text-color);
}

.subscription-author-img, .my-account-sss-user-name img{
    width: 40px;
    height: 40px;
    margin-right: 12px;
}

.subscription-author-name {
    margin-right: auto;
}

.subscription-author-role {
    font-size: 12px;
    color: var(--text-extra);
}

.delete-subscription-author, .my-account-delete-sss-user {
    width: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.delete-subscription-author svg, .my-account-delete-sss-user svg{
    fill: var(--danger);
    width: 24px;
    height: auto;
}

.authors-subscription-hr, .my-account-sss-hr {
    width: 100%;
    height: 1px;
    background: var(--lines-color);
}

.add-author-subscription, .my-account-sss-add-user {
    text-align: center;
}

.add-author-subscription svg, .my-account-sss-add-user svg{
    fill: var(--pages-color);
    transform: translateY(-20%);
}

.logout-btn {
    background: var(--danger);
    border-radius: 10px;
    padding: 0px 16px;
    font-size: 16px;
    color: #FFFFFF;
    border: none;
    line-height: 40px;
    height: 40px;
}

.logout-btn:hover {
    cursor: pointer;
}

.tag-field {
    margin-right: 20px;
}

.edit-name-modal-bg {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.2);
    z-index: 15;
}

.edit-name-modal {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 20;
    width: 500px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: var(--card-color);
    box-shadow: 0px 3.2375px 3.2375px rgba(0, 0, 0, 0.25);
    border-radius: 0;
}

.edit-name-modal-field {
    z-index: 25;
}

.edit-name-modal-title {
    color: var(--text-color);
    font-size: 24px;
    margin-bottom: 12px;
}

.modal-edit-name-btn {
    background: var(--pages-color);
    width: 400px;
    height: 40px;
    color: var(--card-color);
    font-size: 16px;
    line-height: 16px;
    padding: 12px 0;
    text-align: center;
    border: none;
    border-radius: 10px;
    margin: 12px 30px 8px 30px;
    cursor: pointer;
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

#filename-input, #filesend-btn {
    display: none;
}

@media (max-width: 420px) {
    .my-account-page {
        background: var(--phone-bg);
        height: auto;
        padding: 12px 20px;
    }

    .mobile-profile-actions {
        display: flex;
        flex-direction: row;
        width: 62px;
        justify-content: space-between;
    }

    .logout-icon {
        fill: var(--danger) !important;
    }

    .my-account__content {
        width: 100%;
        height: auto;
        margin: 0;
        display: flex;
        flex-direction: column;
        margin-top: 74px;
    }

    .my-account__info {
        width: 100%;
        height: 355px;
        box-shadow: none;
        display: flex;
        flex-direction: column;
        align-items: center;
        border-radius: 20px;        
        padding: 20px;
    }

    .my-account__img {
        width: 100px;
        height: 100px;
        margin: 0;
        margin-top: -70px;
    }

    .my-account-name {
        font-size: 16px;
        margin: 16px 0;
        letter-spacing: -0.05em;
    }

    .my-account-role, .my-account-mail {
        font-size: 12px;
        margin: 0;
        letter-spacing: normal;
    }

    .my-account-role {
        margin-bottom: 8px;
    }

    .my-account-mail {
        margin-bottom: 12px;
    }

    .my-account-password-btn {
        width: 100%;
        height: 45px;
        font-size: 16px;
        border-radius: 20px;
        margin: 0 auto;
        line-height: 45px;
        padding: 0;
    }

    .my-account-channels {
        width: 100%;
        margin-bottom: 0;
        margin-top: 16px;
    }

    .my-account-channel {
        height: 24px;
    }

    .my-account-channel img {
        margin-right: 12px;
        height: auto;
        width: 24px;
    }

    .my-account-channel-filled {
        font-size: 12px;
    }

    .my-account-channel-empty {
        width: 100%;
        height: 24px;
        font-size: 12px;
    }

    .my-account-channel-empty::placeholder {
        font-size: 12px;
    }

    .my-account__subscriptions {
        width: 100%;
        margin-left: 0;
        height: auto;
    }

    .tags-subscriptions, .authors-subscriptions, .my-account-sss {
        width: 100%;
        padding: 16px 20px;
        margin-top: 16px;
        margin-bottom: 0;
        border-radius: 16px;
        box-shadow: none;
    }

    .subscription-title {
        font-size: 16px;
        padding: 0 0 16px 0;
    }

    .tags-subscriptions-content {
        padding: 0;
    }

    .subscription-tag {
        font-size: 13px;
        padding: 4px 6px;
        margin-right: 8px;
    }

    .delete-tag-sub-btn {
        margin-left: 4px;
        width: 16px;
        height: 16px;
    }

    .authors-subscriptions-content, .my-account-sss-content {
        width: 100%;
        margin: 0;
        padding-top: 0;
    }

    .subscription-author {
        margin-bottom: 12px;
    }

    .subscription-author-content {
        padding: 0;
        font-size: 12px;
    }

    .subscription-author-info {
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-start;
    }

    .subscription-author-role {
        font-size: 10px;
    }

    .add-author-subscription svg, .my-account-sss-add-user svg {
        width: 27px;
        height: 27px;
        transform: none;
    }

    .delete-subscription-author, .my-account-delete-sss-user {
        width: auto;
        display: flex;
        justify-content: center;
        align-items: center;
    }
}
</style>