import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const client = new ApolloClient({
  link: new HttpLink({
    uri: import.meta.env.VITE_API_URL
      ? `${import.meta.env.VITE_API_URL}/graphql`
      : '/graphql',
    credentials: 'include', // 🔐 Send cookies with each request
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token') || ''}`,
    }
  }),
  cache: new InMemoryCache(),
});

export default client;
