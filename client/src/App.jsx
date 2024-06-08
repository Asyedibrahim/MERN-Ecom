import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Header from './components/Header';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import Cart from './pages/Cart';
import PrivateRoute from './components/PrivateRoute';
import Product from './pages/Product';
import Footer from './components/Footer';
import CategoryProduct from './pages/CategoryProduct';
import { ToastContainer } from 'react-toastify';


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

        <Route element={<PrivateRoute />}>
          <Route path='/dashboard' element={<Dashboard />}></Route>
        </Route>

        <Route path='/product/:productId' element={<Product />}></Route>

        <Route path='/categoryProducts/:categoryId' element={<CategoryProduct />}></Route>

      </Routes>

      <Footer />

      <ToastContainer autoClose={3000} pauseOnHover={false}/>

    </BrowserRouter>
  )
}
