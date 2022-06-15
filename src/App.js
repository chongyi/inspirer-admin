import React from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';
import { Route, Routes, Navigate } from 'react-router-dom'
import MainLayout from './MainLayout';
import Home from './pages/Home';
import Login from './Login';
import ContentApplication from './pages/Content';
import ContentList from './pages/Content/ContentList';
import SystemApplication from './pages/System';

function App() {
  return (
    <Routes>
      <Route path='/' element={<MainLayout />}>
        <Route path='' element={<Navigate to='/content' replace />} />
        <Route path='content' element={<ContentApplication />}>
          <Route path='' element={<ContentList />} />
        </Route>
        <Route path='system' element={<SystemApplication />} />
      </Route>
      <Route path='/login' element={<Login />} />
    </Routes>
  );
}


export default App;
