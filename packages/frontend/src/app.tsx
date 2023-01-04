import React, { Fragment, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Spinner } from './components/atoms/spinner';
import { EntityPage } from './components/pages/entity-page';
import { OtherPage } from './components/pages/other-page';

function App() {
  return (
    <Fragment>
      <BrowserRouter>
        <Suspense fallback={<Spinner />}>
          <Routes>
            <Route path="/" element={<EntityPage />} />
            <Route path="/other" element={<OtherPage />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </Fragment>
  );
}

export default App;
