import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Header from './components/Header';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import Cart from './pages/Cart';
import Wishlist from './pages/Wishlist';
import PrivateRoute from './components/PrivateRoute';

export default function App() {
  return (
    <BrowserRouter>

      <Header />

      <Routes>
        <Route path='/' element={<Home />}></Route>

        <Route path='/sign-in' element={<SignIn />}></Route>

        <Route path='/sign-up' element={<SignUp />}></Route>
        
        <Route path='/products' element={<Products />}></Route>

        <Route path='/cart' element={<Cart />}></Route>

        <Route path='/wishlist' element={<Wishlist />}></Route>


        <Route element={<PrivateRoute />}>
          <Route path='/dashboard' element={<Dashboard />}></Route>
        </Route>
      </Routes>

    </BrowserRouter>
  )
}
