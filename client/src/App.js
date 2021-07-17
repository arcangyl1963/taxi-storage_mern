import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import CustomerPortal from './pages/CustomerPortal';
import OperationsPortal from './pages/OperationsPortal';
import Navbar from './components/navbar';



const client = new ApolloClient({
  uri: '/graphql',
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