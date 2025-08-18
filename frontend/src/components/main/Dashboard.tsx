import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from "../Base/Navbar";

interface StatCardProps {
  title: string;
  value: string | number;
}

const StatCard: React.FC<StatCardProps> = ({ title, value }) => (
  <div className="hover:bg-blue-100 text-2xl bg-white m-5 p-6 rounded-lg shadow-md w-full sm:w-auto border">
    <h4 className="text-blue-800 text-md font-bold ">{title}</h4>
    <p className="text-3xl font-bold">{value}</p>
  </div>
);

interface Product {
  id: number | null;
  product_name: string | null;
  product_price: string | number | null;
  stock_quantity: number | null;
  description: string | null;
  total_sold: number | null ;
}

const Dashboard: React.FC = () => {
  const [ordersCount, setOrdersCount] = useState(0);
  const [revenue, setRevenue] = useState(0);
  // const [productsCount, setProductsCount] = useState(0);
  const [customersCount, setCustomersCount] = useState(0);
  const [topProducts, setTopProducts] = useState<Product[]>([]);
  const [lowStock, setLowStock] = useState<Product[]>([]);
  
  const API_BASE = import.meta.env.VITE_API_BASE_URL;
  useEffect(() => {
    // Orders
    axios.get(`${API_BASE}/orders/count-this-month/`)
    .then(res => {
      setOrdersCount(res.data['count']);
    });

    axios.get(`${API_BASE}/orders/total-revenue/`)
    .then(res => {
      setRevenue(res.data['total_revenue']);
    });

    axios.get(`${API_BASE}/products/low-stock/`)
    .then(res => {
      setLowStock(res.data);
    });

    axios.get(`${API_BASE}/products/top-selling/`)
    .then(res => {
      setTopProducts(res.data);
    });
    // Customers
    axios.get(`${API_BASE}/customers`).then(res => {
      const data = Array.isArray(res.data) ? res.data : [];
      setCustomersCount(data.length);
    });
  }, []);
  const backgroundStyle: React.CSSProperties = {
    backgroundImage: "url('/Images/dashboard_background.webp')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '100vh',
    padding: '24px'
  };

  return (
    <>
      <Navbar />
      <div style={backgroundStyle}>
        <div className="hover:bg-gray-500 bg-white bg-opacity-80 p-6 rounded-lg shadow-lg border ">
          {/* Dashboard Title */}
          <h2 className="text-4xl font-bold text-center mb-6">Dashboard</h2>

    
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <StatCard title="Orders This Month" value={ordersCount} />
            <StatCard title="Revenue" value={`$${revenue.toFixed(2)}`} />
            {/* <StatCard title="Active Products" value={productsCount} /> */}
            <StatCard title="Total Customers" value={customersCount} />
          </div>

          {/* Top Products */}
          <div className="hover:bg-blue-100 bg-white p-6 rounded-lg shadow-md mb-6 border ">
            <h3 className="text-2xl font-bold mb-4">Top 5 Selling Products</h3>
            <ul className="list-disc list-inside space-y-1">
              {topProducts.map((product, idx) => (
                <li key={idx}
                className="hover:bg-gray-100 px-3 py-1 rounded transition">
                  {product.product_name} - {product.stock_quantity || product.total_sold || 0} sold
                </li>
              ))}
            </ul>
          </div>

          {/* Low Stock */}
          <div className="hover:bg-blue-100 bg-white p-6 rounded-lg shadow-md border ">
            <h3 className="text-2xl font-bold mb-4 text-red-600">Low Stock Warnings</h3>
            {lowStock.length ? (
              <ul className="list-disc list-inside space-y-1 text-red-500">
                {lowStock.map((item, idx) => (
                  <li key={idx}
                  className="hover:bg-gray-100 px-3 py-1 rounded transition">
                    {item.product_name} - Only {item.stock_quantity} left
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-green-600">All stock levels are healthy.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
