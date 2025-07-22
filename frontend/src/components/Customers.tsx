import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
 
const API_BASE = "http://localhost:8000/api";
 
// Define the shape of a Customer
interface Customer {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
}
 
const Customers: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();
 
  useEffect(() => {
    fetchCustomers();
  }, []);
 
  const fetchCustomers = () => {
    axios
      .get<Customer[]>(`${API_BASE}/customers/`)
      .then((res) => {
        setCustomers(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch customers:", err);
        setLoading(false);
      });
  };
 
  const handleDelete = (id: number) => {
    if (!window.confirm("Are you sure you want to delete this customer?")) return;
 
    axios
      .delete(`${API_BASE}/customers/${id}/`)
      .then(() => {
        setCustomers(customers.filter((c) => c.id !== id));
      })
      .catch((err) => {
        alert("Failed to delete customer");
        console.error(err);
      });
  };
 
  const handleEdit = (id: number) => {
    navigate(`/customer/edit/${id}`);
  };
 
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-4">All Customers</h2>
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded m-2.5 hover:bg-blue-400 hover:text-2xl transition-all duration-500 ease-in-out"
        onClick={() => navigate("/customer/add")}
      >
        Add Customer
      </button>
 
      <div className="bg-white p-4 rounded-md shadow-md">
        {loading ? (
          <div className="text-gray-400 text-center">Loading...</div>
        ) : customers.length === 0 ? (
          <div className="text-gray-400 text-center">No customers found.</div>
        ) : (
          <table className="w-full text-left">
            <thead>
              <tr>
                <th className="border-b pb-2">Name</th>
                <th className="border-b pb-2">Email</th>
                <th className="border-b pb-2">Phone</th>
                <th className="border-b pb-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer) => (
                <tr key={customer.id}>
                  <td className="py-1">{customer.first_name} {customer.last_name}</td>
                  <td>{customer.email}</td>
                  <td>{customer.phone_number}</td>
                  <td className="space-x-2">
                    <button
                      className="bg-green-600 text-white px-2 py-1 rounded text-xs hover:bg-green-400 hover:text-black transition-all duration-300"
                      onClick={() => handleEdit(customer.id)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-600 text-white px-2 py-1 rounded text-xs hover:bg-red-400 hover:text-black transition-all duration-300"
                      onClick={() => handleDelete(customer.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};
 
export default Customers;
 
 