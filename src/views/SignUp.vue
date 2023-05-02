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
import gql from 'graphql-tag'
import { ApolloClient } from 'apollo-boost'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import VueApollo from 'vue-apollo'

const httpLink = new HttpLink({
  uri: 'https://adselina20.fvds.ru/graphql/',
})

const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
})

const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
})

export default {
  apolloProvider,

  data() {
    return {
      email: '',
      surname: '',
      name: '',
      username: '',
      password: '',
      role: true,
    }
  },

  methods: {
    addUser() {
      this.$apollo
        .mutate({
          mutation: gql`
            mutation AddUser($email: String!, $username: String!, $password: String!, $role: String!) {
              addUser(email: $email, username: $username, password: $password, role: $role) {
                user {
                  email
                  id
                  password
                  username
                }
              }
            }
          `,
          variables: {
            email: this.email,
            username: `${this.surname} ${this.name}`,
            password: this.password,
            role: this.role === true ? 'Student' : 'Teacher',
          },
        })
        .then(result => {
          console.log(result)
        })
        .catch(error => {
          console.log(error)
        })
    },
  },
}
</script>