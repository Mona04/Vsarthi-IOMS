import React from "react";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => (
  <nav className="bg-transparent text-black px-6 py-4 flex justify-between items-center shadow">
    <div className="text-xl font-bold tracking-wide">Veersa IOMS</div>
    <div className="space-x-6 font-medium">
      <Link to="/" className="hover:underline">Home</Link>
      <Link to="/dashboard" className="hover:underline">Dashboard</Link>
      <Link to="/products" className="hover:underline">Products</Link>
      <Link to="/customers" className="hover:underline">Customers</Link>
      
      <Link to="/orders" className="hover:underline">Orders</Link>
      <Link to="/login" className="hover:underline">Login</Link>
      
    </div>
  </nav>
);

export default Navbar;