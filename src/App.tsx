import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AboutUs } from './components/pages/AboutUs';
import { Error404 } from './components/pages/Error404';
import { Home } from './components/pages/Home';
import { FormPage } from './components/pages/FormPage';
import { Layout } from './components/Layout';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<AboutUs />} />
        <Route path="form" element={<FormPage />} />
        <Route path="*" element={<Error404 />} />
      </Route>
    </Routes>
  );
}

export default App;
