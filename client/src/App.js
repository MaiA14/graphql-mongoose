import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { GRAPHQL_URL } from './config';

// components
import SeriesList from './components/SeriesList';
import AddSeries from './components/AddSeries';

// apollo client setup
const client = new ApolloClient({
  uri: GRAPHQL_URL
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div id="main">
          <h1>Mai's Series List</h1>
          <SeriesList />
          <AddSeries />
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
