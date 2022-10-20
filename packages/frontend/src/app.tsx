import React, { Fragment, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Spinner } from './components/atoms/spinner';
import { BookPage } from './components/pages/book-page';
import { FieldsPage } from './components/pages/fields-page';
import { OtherPage } from './components/pages/other-page';

function App() {
  return (
    <Fragment>
      <BrowserRouter>
        <Suspense fallback={<Spinner />}>
          <Routes>
            <Route path="/" element={<BookPage />} />
            <Route path="/fields" element={<FieldsPage />} />
            <Route path="/other" element={<OtherPage />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </Fragment>
  );
}

export default App;
