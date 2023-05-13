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

const CREATE_PROFILE_MUTATION = gql`
    mutation CreateProfile($email: String!, $password: String!, $role: String!, $name: String, $surname: String) {
        createProfile(email: $email, password: $password, role: $role, name: $name, surname: $surname) {
            profile {
                id
                name
                surname
                role
                user {
                    id
                    email
                }
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
    if (student.value == true) {
        role.value = 'Student'
    }
    else {
        role.value = 'Teacher'
    }
    apolloClient
        .mutate({
            mutation: CREATE_PROFILE_MUTATION,
            variables: {
                email: 'example@mail.ru',
                password: 'jsdhsdfj3',
                role: 'Student',
                name: 'Sjdsd',
                surname: 'SDFjsds'
            },
        })
        .then(result => {
            console.log(result)
        })
        .catch(error => {
            console.log(error)
        })
}
</script>