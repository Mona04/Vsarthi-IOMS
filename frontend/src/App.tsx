// App.tsx
import { useRef } from 'react';
import { Routes, Route } from 'react-router-dom';
import './index.css'; 


import Dashboard from './components/main/Dashboard.tsx';
import Register from './components/main/Register.tsx';
import Login from './components/main/Login.tsx';
import EditCustomer from './components/customer/EditCustomer.tsx';
import Customers from './components/customer/Customers.tsx';
import AddCustomer from './components/customer/AddCustomer.tsx';

import LandingPage from './components/Base/LandingPage';
import AddOrders from './components/orders/AddOrder.tsx';
import Products from './components/product/Products.tsx';
import AddProducts from './components/product/AddProducts.tsx';
import EditProduct from './components/product/EditProduct.tsx';
import OrderDetails from './components/orders/OrderDetails.tsx';

function App() {
  const heroRef = useRef<HTMLDivElement>(null);

  return (

      <Routes>
        <Route
          path="/"
          element={
            <>
              <LandingPage heroRef={heroRef} />
            </>
          }
        />       
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/customer/add" element={<AddCustomer />} />
        <Route path="/customer/edit/:id" element={<EditCustomer />} />
        <Route path="/products" element={<Products />} />
        

        <Route path = "/product/add" element = {<AddProducts />} />
        <Route path = "/product/edit/:id" element = {<EditProduct />} />
        <Route path = "/orders" element = {<OrderDetails />} /> 
        <Route path = "/orders/add" element = {<AddOrders />} />
      </Routes>

  );
}

export default App;
