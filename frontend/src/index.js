import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Teste from './pages/Teste';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route path='/dashboard' element={<Dashboard />} />
      <Route path='/teste' element={<Teste />} />

    </Routes>
  </BrowserRouter>
);

