import React, { useEffect, useState } from 'react';
import axios from 'axios';

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

  useEffect(() => {
    // Fetch orders
    axios.get('/api/orders').then(res => {
      setOrdersCount(res.data.length);
      // Calculate revenue for the month
      const totalRevenue = res.data.reduce((sum: number, order: any) => sum + (order.total || 0), 0);
      setRevenue(totalRevenue);
    });

    // Fetch products
    axios.get('/api/products').then(res => {
      setProductsCount(res.data.length);
    });

    // Fetch customers
    axios.get('/api/customers').then(res => {
      setCustomersCount(res.data.length);
    });
  }, []);

  const stats = [
    { title: 'Orders This Month', value: ordersCount },
    { title: 'Revenue This Month', value: `$${revenue.toFixed(2)}` },
    { title: 'Active Products', value: productsCount },
    { title: 'Total Customers', value: customersCount },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Navbar */}
      <div className="bg-blue-800 text-white px-6 py-4 flex justify-between items-center shadow">
        <h1 className="text-xl font-bold">IOMS</h1>
        <nav className="space-x-6 text-white font-medium">
          <a href="/dashboard">Dashboard</a>
          <a href="/products">Products</a>
          <a href="/customers">Customers</a>
          <a href="/orders">Orders</a>
          <a href="#">Logout</a>
        </nav>
      </div>

      {/* Dashboard Title */}
      <div className="mt-6 mb-4">
        <h2 className="text-3xl font-bold">Dashboard</h2>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {stats.map((stat, index) => (
          <StatCard key={index} title={stat.title} value={stat.value} />
        ))}
      </div>

      {/* Revenue Chart Placeholder */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">Monthly Revenue</h3>
        <div className="text-center text-gray-400 py-16">No data</div>
      </div>
    </div>
  );
};

export default Dashboard;