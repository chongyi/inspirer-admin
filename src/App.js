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
import DeletedContentList from './pages/Content/DeletedContentList';
import { withPrefix } from './utils';

function App() {
  console.log(process.env.REACT_APP_PREFIX)
  return (
    <Routes>
      <Route path={withPrefix('/')} element={<MainLayout />}>
        <Route path='' element={<Home />} />
        <Route path='content' element={<ContentApplication />}>
          <Route path='list' element={<ContentList />} />
          <Route path='create' element={<ContentEdit />} />
          <Route path='deleted' element={<DeletedContentList />} />
          <Route path='edit/:contentId' element={<ContentEdit mode="edit" />} />
        </Route>
        <Route path='system' element={<SystemApplication />} />
      </Route>
      <Route path={withPrefix('/login')} element={<Login />} />
    </Routes>
  );
}


export default App;
