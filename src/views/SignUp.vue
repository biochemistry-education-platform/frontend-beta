<template>
    <div class="initial-page">
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
import { ref } from 'vue'
import { toast } from 'bulma-toast'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

const i18n = useI18n()
const router = useRouter()

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

const AUTH_USER_MUTATION = gql`
    mutation AuthUser($email: String!, $password: String!) {
        authUser(email: $email, password: $password) {
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
                    mutation: AUTH_USER_MUTATION,
                    variables: {
                        email: email.value,
                        password: password.value,
                    },
                })
                .then(result => {
                    router.push({ name: 'Articles' })
                    store.state.user.id = result.data.authUser.profile.id
                    store.state.user.role = result.data.authUser.profile.role.roleName
                    store.state.user.name = result.data.authUser.profile.name
                    store.state.user.surname = result.data.authUser.profile.surname
                    store.state.user.email = email.value
                })
                .catch(error => {
                    toast({
                        message: i18n.t('authFailed') + '\n' + error,
                        type: 'notification-danger',
                        dismissible: true,
                        pauseOnHover: true,
                        duration: 20000,
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
                duration: 20000,
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