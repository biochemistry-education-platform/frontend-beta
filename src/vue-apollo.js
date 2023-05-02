import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core'
import Vue from 'vue'
import VueApollo from 'vue-apollo'

// HTTP connection to the API
const httpLink = createHttpLink({
    // You should use an absolute URL here
    uri: 'https://adselina20.fvds.ru/graphql/',
})

// Cache implementation
const cache = new InMemoryCache()

// Create the apollo client
const apolloClient = new ApolloClient({
    link: httpLink,
    cache,
})

const apolloProvider = new VueApollo({
    defaultClient: apolloClient,
})
  
  // Install the vue plugin
Vue.use(VueApollo)
  
export default apolloProvider