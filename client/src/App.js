import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import CustomerPortal from './pages/CustomerPortal';
import OperationsPortal from './pages/OperationsPortal';
import Navbar from './components/navbar';

// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: '/graphql',
  credentials: 'same-origin'
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  // uri: '/graphql',
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  request: operation => {
    const token = localStorage.getItem('id_token');
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : ''
      }
    });
  },
});

function App() {
  return (
    <ApolloProvider client={client}>   
        <Router>
          <>
          <Navbar />
          <Switch>
            <Route exact path='/' component={CustomerPortal} />
            <Route exact path='/OperationsPortal' component={OperationsPortal} />
            <Route render={() => <h1 className='display-2'>Wrong page!</h1>} />
          </Switch>
          </>
        </Router>
    </ApolloProvider>
  );
}

export default App;