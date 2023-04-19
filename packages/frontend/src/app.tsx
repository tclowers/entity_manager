import React, { Fragment, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Spinner } from './components/atoms/spinner';
import { EntityPage } from './components/pages/entity-page';
import { OtherPage } from './components/pages/other-page';
import { ResourcePage } from './components/pages/resource-page';
import { CreateEntityPage } from './components/pages/create-entity-page';

function App() {
  return (
    <Fragment>
      <BrowserRouter>
        <Suspense fallback={<Spinner />}>
          <Routes>
            {/* <Route path="/" element={<EntityPage />} /> */}
            <Route path="/entity" element={<EntityPage />} />
            <Route path="/create-entity" element={<CreateEntityPage />} />
            <Route path="/entity/:action" element={<EntityPage />} />
            <Route path="/resource" element={<ResourcePage />} />
            <Route path="/resource/:entityId/:action" element={<ResourcePage />} />
            <Route path="/resource/:entityId/:action/:resourceId" element={<ResourcePage />} />
            <Route path="/other" element={<OtherPage />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </Fragment>
  );
}

export default App;
