// https://www.apollographql.com/docs/react/get-started/

import React from 'react'
import App from './App.js'
import { ApolloClient, ApolloProvider, createHttpLink, InMemoryCache }  from '@apollo/client'
import { setContext } from 'apollo-link-context'

const httpLink = createHttpLink({
	uri: 'http://localhost:4000'
})

const authLink = setContext(() =>{
	const token = localStorage.getItem('jwtToken'); 
	return {
		headers: {
			Authorization: token ? `Bearer ${token}` : ''
		}
	}
})


const client = new ApolloClient({
	link: authLink.concat(httpLink),
	cache: new InMemoryCache()
})

export default (
	<ApolloProvider client={client}>
		<App/>
	</ApolloProvider>
)