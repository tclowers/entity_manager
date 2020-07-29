import React from 'react';
import logo from './logo.svg';
import './App.css';
import { ApolloProvider } from '@apollo/client';
import { client } from  './graphql';
import { BookList } from './components/book-list';

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <BookList />
        </header>
      </div>
    </ApolloProvider>
  );
}

export default App;
