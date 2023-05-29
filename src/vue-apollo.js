import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core'

const httpLink = createHttpLink({
    uri: 'https://adselina20.fvds.ru/graphql/',
})

const cache = new InMemoryCache()

export const apolloClient = new ApolloClient({
    link: httpLink,
    cache,
})