import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ApolloClient,ApolloProvider,HttpLink, InMemoryCache } from '@apollo/client'

const client = new ApolloClient({
  cache:new InMemoryCache(),
  link: new HttpLink({
    uri: "https://graph-hbomax-production.up.railway.app/api",
    credentials: 'include'
  })
})




createRoot(document.getElementById('root')!).render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
)
