// App.tsx
import React, { useRef } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css'; 

import Dashboard from './components/Dashboard';
import Register from './components/Register';
import Login from './components/Login';
import EditCustomer from './components/EditCustomer';
import Customers from './components/Customers';
import AddCustomer from './components/AddCustomer';
import Product from './components/Product';
import LandingPage from './components/Base/LandingPage';

function App() {
  const heroRef = useRef<HTMLDivElement>(null);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <LandingPage heroRef={heroRef} />
              {/* <div className="text-center mt-4">
                <button
                  onClick={() =>
                    heroRef.current?.scrollIntoView({ behavior: 'smooth' })
                  }
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Scroll to Hero
                </button>
              </div> */}
            </>
          }
        />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/customer/add" element={<AddCustomer />} />
        <Route path="/customer/edit/:id" element={<EditCustomer />} />
        <Route path="/products" element={<Product />} />
      </Routes>
    </Router>
  );
}

export default App;
