import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from "../Base/Navbar";

interface StatCardProps {
  title: string;
  value: string | number;
}

const StatCard: React.FC<StatCardProps> = ({ title, value }) => (
  <div className="bg-white p-6 rounded-lg shadow-md w-full sm:w-auto">
    <h4 className="text-gray-500 text-md">{title}</h4>
    <p className="text-2xl font-semibold">{value}</p>
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
  
  const [customersCount, setCustomersCount] = useState(0);
  const [topProducts, setTopProducts] = useState<Product[]>([]);
  const [lowStock, setLowStock] = useState<Product[]>([]);
  
  const API_BASE = "http://localhost:8000/api";
  useEffect(() => {
  
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
    
    axios.get(`${API_BASE}/customers`).then(res => {
      const data = Array.isArray(res.data) ? res.data : [];
      setCustomersCount(data.length);
    });
  }, []);
  const backgroundStyle: React.CSSProperties = {
    backgroundImage: `url('/Images/dashboard_background.webp')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '100vh',
    padding: '24px'
  };

  return (
    <>
      <Navbar />
      <div style={backgroundStyle}>
        <div className="bg-white bg-opacity-8- p-9 rounded-lg shadow-lg">
          
          <h2 className="text-4xl font-bold mb-6">Dashboard</h2>

        
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <StatCard title="Orders This Month" value={ordersCount} />
            <StatCard title="Revenue" value={`₹ ${revenue.toFixed(2)}`} />
            
            <StatCard title="Total Customers" value={customersCount} />
          </div>

          
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h3 className="text-xl font-semibold mb-4">Top 5 Selling Products</h3>
            <ul className="list-disc list-inside space-y-1">
              {topProducts.slice(0, 5).map((product, idx) => (
                <li key={idx}>
                  {product.product_name || "Unnamed Product"} - {product.total_sold ?? 0} sold
                </li>
              ))}
            </ul>
          </div>


          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4 text-red-600">Low Stock Warnings</h3>
            {lowStock.length ? (
              <ul className="list-disc list-inside space-y-1 text-red-500">
                {lowStock.map((item, idx) => (
                  <li key={idx}>
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
