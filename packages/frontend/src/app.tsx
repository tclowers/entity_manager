import React, { Fragment, Suspense } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import { client } from './graphql';
import { Spinner } from './components/atoms/spinner';
import { BookPage } from './components/pages/book-page';
import { OtherPage } from './components/pages/other-page';

function App() {
  return (
    <ApolloProvider client={client}>
      <Fragment>
        <BrowserRouter>
          <Suspense fallback={<Spinner />}>
            <Switch>
              <Route exact path="/" component={BookPage} />
              <Route exact path="/other" component={OtherPage} />
            </Switch>
          </Suspense>
        </BrowserRouter>
      </Fragment>
    </ApolloProvider>
  );
}

export default App;
