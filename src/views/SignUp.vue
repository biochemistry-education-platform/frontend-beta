<template>
    <div class="initial-page">
        <div v-if="isMobile" class="initial-mobile-menu">
            <div class="language-block" @click="switchLanguage">
                <svg class="menu-switches-svg" xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48"><path d="M480 976q-84 0-157-31.5T196 859q-54-54-85-127.5T80 574q0-84 31-156.5T196 291q54-54 127-84.5T480 176q84 0 157 30.5T764 291q54 54 85 126.5T880 574q0 84-31 157.5T764 859q-54 54-127 85.5T480 976Zm0-58q35-36 58.5-82.5T577 725H384q14 60 37.5 108t58.5 85Zm-85-12q-25-38-43-82t-30-99H172q38 71 88 111.5T395 906Zm171-1q72-23 129.5-69T788 725H639q-13 54-30.5 98T566 905ZM152 665h159q-3-27-3.5-48.5T307 574q0-25 1-44.5t4-43.5H152q-7 24-9.5 43t-2.5 45q0 26 2.5 46.5T152 665Zm221 0h215q4-31 5-50.5t1-40.5q0-20-1-38.5t-5-49.5H373q-4 31-5 49.5t-1 38.5q0 21 1 40.5t5 50.5Zm275 0h160q7-24 9.5-44.5T820 574q0-26-2.5-45t-9.5-43H649q3 35 4 53.5t1 34.5q0 22-1.5 41.5T648 665Zm-10-239h150q-33-69-90.5-115T565 246q25 37 42.5 80T638 426Zm-254 0h194q-11-53-37-102.5T480 236q-32 27-54 71t-42 119Zm-212 0h151q11-54 28-96.5t43-82.5q-75 19-131 64t-91 115Z"/></svg>
                <p v-if="language === 'ru'" class="language-name">RU</p>
                <p v-else class="language-name">EN</p>
            </div>

            <div class="logo-block">
                <img src="@/assets/icons/logo.png">
                <p class="logo-name">plateaumed</p>
            </div>

            <div class="themes-block">
                <input type="checkbox" class="theme-checkbox" :checked="!themeLight">
                <div v-if="theme === 'light'" @click="switchTheme">
                    <svg class="menu-switches-svg" xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48"><path d="M479.765 716Q538 716 579 675.235q41-40.764 41-99Q620 518 579.235 477q-40.764-41-99-41Q422 436 381 476.765q-41 40.764-41 99Q340 634 380.765 675q40.764 41 99 41Zm.235 60q-83 0-141.5-58.5T280 576q0-83 58.5-141.5T480 376q83 0 141.5 58.5T680 576q0 83-58.5 141.5T480 776ZM70 606q-12.75 0-21.375-8.675Q40 588.649 40 575.825 40 563 48.625 554.5T70 546h100q12.75 0 21.375 8.675 8.625 8.676 8.625 21.5 0 12.825-8.625 21.325T170 606H70Zm720 0q-12.75 0-21.375-8.675-8.625-8.676-8.625-21.5 0-12.825 8.625-21.325T790 546h100q12.75 0 21.375 8.675 8.625 8.676 8.625 21.5 0 12.825-8.625 21.325T890 606H790ZM479.825 296Q467 296 458.5 287.375T450 266V166q0-12.75 8.675-21.375 8.676-8.625 21.5-8.625 12.825 0 21.325 8.625T510 166v100q0 12.75-8.675 21.375-8.676 8.625-21.5 8.625Zm0 720q-12.825 0-21.325-8.62-8.5-8.63-8.5-21.38V886q0-12.75 8.675-21.375 8.676-8.625 21.5-8.625 12.825 0 21.325 8.625T510 886v100q0 12.75-8.675 21.38-8.676 8.62-21.5 8.62ZM240 378l-57-56q-9-9-8.629-21.603.37-12.604 8.526-21.5 8.896-8.897 21.5-8.897Q217 270 226 279l56 57q8 9 8 21t-8 20.5q-8 8.5-20.5 8.5t-21.5-8Zm494 495-56-57q-8-9-8-21.375T678.5 774q8.5-9 20.5-9t21 9l57 56q9 9 8.629 21.603-.37 12.604-8.526 21.5-8.896 8.897-21.5 8.897Q743 882 734 873Zm-56-495q-9-9-9-21t9-21l56-57q9-9 21.603-8.629 12.604.37 21.5 8.526 8.897 8.896 8.897 21.5Q786 313 777 322l-57 56q-8 8-20.364 8-12.363 0-21.636-8ZM182.897 873.103q-8.897-8.896-8.897-21.5Q174 839 183 830l57-56q8.8-9 20.9-9 12.1 0 20.709 9Q291 783 291 795t-9 21l-56 57q-9 9-21.603 8.629-12.604-.37-21.5-8.526ZM480 576Z"/></svg>
                </div>
                <div v-else @click="switchTheme">
                    <svg class="menu-switches-svg" xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48"><path d="M480 936q-150 0-255-105T120 576q0-150 105-255t255-105q8 0 17 .5t23 1.5q-36 32-56 79t-20 99q0 90 63 153t153 63q52 0 99-18.5t79-51.5q1 12 1.5 19.5t.5 14.5q0 150-105 255T480 936Zm0-60q109 0 190-67.5T771 650q-25 11-53.667 16.5Q688.667 672 660 672q-114.689 0-195.345-80.655Q384 510.689 384 396q0-24 5-51.5t18-62.5q-98 27-162.5 109.5T180 576q0 125 87.5 212.5T480 876Zm-4-297Z"/></svg>
                </div>
            </div>
        </div>
        <div class="initial-form">
            <h1 class="initial-title">{{ $t('signUp') }}</h1>
            <form @submit.prevent="addUser">
                <div class="initial-field">
                    <label class="initial-field-label">{{ $t('email') }}</label>
                    <input type="email" name="email" class="initial-input" v-model="email" placeholder="example@mail.ru">
                </div>
                <div class="initial-field">
                    <label class="initial-field-label">{{ $t('surname') }}</label>
                    <input type="text" name="surname" class="initial-input" v-model="surname" :placeholder="$t('surnamePlaceholder')">
                </div>
                <div class="initial-field">
                    <label class="initial-field-label">{{ $t('name') }}</label>
                    <input type="text" name="name" class="initial-input" v-model="name" :placeholder="$t('namePlaceholder')">
                </div>
                <div class="initial-field">
                    <label class="initial-field-label">{{ $t('password') }}</label>
                    <input type="password" name="name" class="initial-input" v-model="password" placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;">
                </div>
                <div class="student-field">
                    <input type="checkbox" name="student" id="student" v-model="student" checked>                    
                    <label for="student" class="student-label">{{ $t('student') }}</label>
                </div>
                <button class="initial-btn">{{ $t('toSignUp') }}</button>
                <p class="initial-link">{{ $t('alreadySigned') }}<router-link :to="{name: 'LogIn'}" class="initial-link">{{ $t('toLogIn') }}</router-link></p>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    name: 'SignUp',
}
</script>


<script setup>
import gql from 'graphql-tag'
import { apolloClient } from '@/vue-apollo'
import { ref, defineProps, defineEmits } from 'vue'
import { toast } from 'bulma-toast'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'

const i18n = useI18n()
const router = useRouter()
const userStore = useUserStore()

const props = defineProps({
  isMobile: Boolean
})

const emit = defineEmits(['switchTheme', 'switchLanguage'])

const theme = ref('light')
const language = ref('ru')

function switchTheme () {
    theme.value = theme.value === 'light' ? 'dark' : 'light'
    emit('switchTheme', theme.value)
}

function switchLanguage () {
    language.value = language.value === 'ru' ? 'en' : 'ru'
    emit('switchLanguage', language.value)
}

const CREATE_PROFILE_MUTATION = gql`
    mutation CreateProfile($email: String!, $password: String!, $role: String!, $name: String!, $surname: String!) {
        createProfile(email: $email, password: $password, role: $role, name: $name, surname: $surname) {
            profile {
                id
                user
                role {
                    id
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
    }`

const AUTH_WITH_TOKEN = gql`mutation TokenAuth($username: String!, $password: String!) {
    tokenAuth(username: $username, password: $password) {
        token
        user {
            id
            email
        }
        profile {
            id
            role {
                roleName
            }
            channels
            photo
            name
            surname
            secondname
        }
    }
}`

let email = ref('')
let surname = ref('')
let name = ref('')
let password = ref('')
let student = ref(true)
let role = ref('')

function addUser() {
    student.value == true ? role.value = 'Student' : role.value = 'Teacher'
    apolloClient
        .mutate({
            mutation: CREATE_PROFILE_MUTATION,
            variables: {
                email: email.value,
                password: password.value,
                role: role.value,
                name: name.value,
                surname: surname.value
            },
        })
        .then(result => {
            toast({
                message: i18n.t('registrationSuccess'),
                type: 'notification-success',
                dismissible: true,
                pauseOnHover: true,
                duration: 2000,
                position: 'top-right',
            })
            apolloClient
                .mutate({
                    mutation: AUTH_WITH_TOKEN,
                    variables: {
                        username: email.value,
                        password: password.value,
                    },
                })
                .then(result => {
                    router.push({ name: 'Articles' })
                    let user = {
                        userID: result.data.tokenAuth.user.id,
                        profileID: result.data.tokenAuth.profile.id,
                        email: result.data.tokenAuth.user.email,
                        role: result.data.tokenAuth.profile.role.roleName,
                        name: result.data.tokenAuth.profile.name,
                        patronymic: result.data.tokenAuth.profile.secondname,
                        surname: result.data.tokenAuth.profile.surname,
                        photo: result.data.tokenAuth.profile.photo,
                        channels: result.data.tokenAuth.profile.channels
                    }
                    userStore.setToken(result.data.tokenAuth.token)
                    userStore.setUser(user)
                    router.push({ name: 'Articles' })
                })
                .catch(error => {
                    toast({
                        message: i18n.t('authFailed') + '\n' + error,
                        type: 'notification-danger',
                        dismissible: true,
                        pauseOnHover: true,
                        duration: 2000,
                        position: 'top-right',
                    })
                })
        })
        .catch(error => {
            toast({
                message: i18n.t('registrationFailed') + '\n' + error,
                type: 'notification-danger',
                dismissible: true,
                pauseOnHover: true,
                duration: 2000,
                position: 'top-right',
            })
        })
}
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
</style>