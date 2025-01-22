import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home';
import Navbar from './components/NavBar';
import Register from './pages/Register';
import Perfil from './pages/Perfil';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/dashboard/:id' element={<Dashboard />} />
      <Route path='/register' element={<Register />} />
      <Route path='/perfil/:id' element={<Perfil />} />


    </Routes>
  </BrowserRouter>
);

