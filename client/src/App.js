import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import CustomerPortal from './pages/CustomerPortal';



const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>   
        <div className="container">
          <CustomerPortal />
        </div>
    </ApolloProvider>
  );
}

export default App;