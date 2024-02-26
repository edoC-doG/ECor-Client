import React from 'react';
import { Route, Routes } from 'react-router-dom'
import path from './utils/path'
import { Home, Login, PublicPage } from './pages/public'
function App() {
  return (
    <div className="min-h-screen font-main">
      <Routes>
        <Route path={path.PUBLIC} element={<PublicPage />}>
          <Route path={path.HOME} element={<Home />} />
          <Route path={path.LOGIN} element={<Login />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
