import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from "../Base/Navbar";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

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

const Dashboard: React.FC = () => {
  const [ordersCount, setOrdersCount] = useState(0);
  const [revenue, setRevenue] = useState(0);
  const [productsCount, setProductsCount] = useState(0);
  const [customersCount, setCustomersCount] = useState(0);
  const [topProducts, setTopProducts] = useState<{ name: string; quantity?: number; sold?: number }[]>([]);
  const [lowStock, setLowStock] = useState<{ name: string; stock_quantity: number }[]>([]);
  const [monthlyRevenue, setMonthlyRevenue] = useState<{ month: string; revenue: number }[]>([]);

  useEffect(() => {
    // Orders
    axios.get('/api/orders').then(res => {
      const data = Array.isArray(res.data) ? res.data : [];
      setOrdersCount(data.length);
      const totalRevenue = data.reduce((sum: number, order: any) => sum + (order.total || 0), 0);
      setRevenue(totalRevenue);
    });

    // Products
    axios.get('/api/products').then(res => {
      const products = Array.isArray(res.data) ? res.data : [];
      setProductsCount(products.length);

      const sorted = [...products].sort((a, b) => (b.sold || 0) - (a.sold || 0));
      setTopProducts(sorted.slice(0, 5));

      const lowStockItems = products.filter(p => p.stock_quantity < 5);
      setLowStock(lowStockItems);
    });

    // Customers
    axios.get('/api/customers').then(res => {
      const data = Array.isArray(res.data) ? res.data : [];
      setCustomersCount(data.length);
    });

    // Monthly Revenue
    axios.get("/api/revenue/monthly").then(res => {
      const data = Array.isArray(res.data) ? res.data : [];
      setMonthlyRevenue(data);
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
        <div className="bg-white bg-opacity-80 p-6 rounded-lg shadow-lg">
          {/* Dashboard Title */}
          <h2 className="text-3xl font-bold mb-6">Dashboard</h2>

          {/* Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <StatCard title="Orders This Month" value={ordersCount} />
            <StatCard title="Revenue This Month" value={`$${revenue.toFixed(2)}`} />
            <StatCard title="Active Products" value={productsCount} />
            <StatCard title="Total Customers" value={customersCount} />
          </div>

          {/* Monthly Revenue Chart */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h3 className="text-xl font-semibold mb-4">Monthly Revenue</h3>
            {monthlyRevenue.length ? (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlyRevenue}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="revenue" fill="#4f46e5" />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="text-center text-gray-400 py-16">No data</div>
            )}
          </div>

          {/* Top Products */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h3 className="text-xl font-semibold mb-4">Top 5 Selling Products</h3>
            <ul className="list-disc list-inside space-y-1">
              {topProducts.map((product, idx) => (
                <li key={idx}>
                  {product.name} – {product.quantity || product.sold || 0} sold
                </li>
              ))}
            </ul>
          </div>

          {/* Low Stock */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4 text-red-600">Low Stock Warnings</h3>
            {lowStock.length ? (
              <ul className="list-disc list-inside space-y-1 text-red-500">
                {lowStock.map((item, idx) => (
                  <li key={idx}>
                    {item.name} – Only {item.stock_quantity} left
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
