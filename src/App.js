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
import ContentEdit from './pages/Content/ContentEdit';

function App() {
  return (
    <Routes>
      <Route path='/' element={<MainLayout />}>
        <Route path='' element={<Home />} />
        <Route path='content' element={<ContentApplication />}>
          <Route path='list' element={<ContentList />} />
          <Route path='create' element={<ContentEdit />} />
          <Route path='edit/:contentId' element={<ContentEdit mode="edit" />} />
        </Route>
        <Route path='system' element={<SystemApplication />} />
      </Route>
      <Route path='/login' element={<Login />} />
    </Routes>
  );
}


export default App;
