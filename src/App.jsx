import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Header from './components/Header';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';

export default function App() {
  return (
    <BrowserRouter>

      <Header />

      <Routes>
        <Route path='/' element={<Home />}></Route>

        <Route path='/sign-in' element={<SignIn />}></Route>

        <Route path='/sign-up' element={<SignUp />}></Route>

        <Route path='/dashboard' element={<Dashboard />}></Route>
      </Routes>

    </BrowserRouter>
  )
}
