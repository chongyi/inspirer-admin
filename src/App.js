import React from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';
import { Route, Routes } from 'react-router-dom'
import MainLayout from './MainLayout';
import Home from './pages/Home';

function App() {
  return (
    <Routes>
      <Route path='/' element={<MainLayout />}>
        <Route path='/' element={<Home />} />
      </Route>
    </Routes>
  );
}


export default App;
