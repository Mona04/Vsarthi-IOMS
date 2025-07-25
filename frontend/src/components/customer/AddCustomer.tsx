import React, { useState } from "react";
import axios from "axios";
import Navbar from "../Base/Navbar";
import { useNavigate } from "react-router-dom";
const API_BASE = "http://localhost:8000/api";

interface CustomerForm {
  name: string;
  address: string;
  email: string;
  phone: string;
}

const AddCustomer = () => {
  const [form, setForm] = useState<CustomerForm>({
    name: "",
    address: "",
    email: "",
    phone: ""
  });
  const [submitting, setSubmitting] = useState<boolean>(false);
  const navigate = useNavigate()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    axios
      .post(`${API_BASE}/customers/`, form)
      .then(() => {
        alert("Customer added!");
        setForm({
          name: "",
          address: "",
          email: "",
          phone: ""
        });
        navigate('/customers');
      })
      .catch(() => {
        alert("Error adding customer");
      })
      .finally(() => setSubmitting(false));
  };

  return (
    <>
    <Navbar/>
    <div
      style={{
        backgroundImage: "url('/Images/customer_background.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
      }}
    >
      <form
        onSubmit={handleSubmit}
        className="max-w-md w-full p-6 bg-white bg-opacity-90 rounded-xl shadow-2xl backdrop-blur-sm"
      >
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Add Customer</h2>

        <div className="mb-4">
          <label className="block font-medium text-black-700 mb-1">Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter full name"
            value={form.name}
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block font-medium text-black-700 mb-1">Address</label>
          <input
            type="text"
            name="address"
            placeholder="Enter address"
            value={form.address}
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block font-medium text-black-700 mb-1">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter email"
            value={form.email}
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          />
        </div>

        <div className="mb-5">
          <label className="block font-medium text-black-700 mb-1">Phone</label>
          <input
            type="text"
            name="phone"
            placeholder="Enter phone number"
            value={form.phone}
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-green-700 text-white px-4 py-2 rounded w-full hover:bg-green-600 transition duration-200 shadow-md"
          disabled={submitting}
        >
          {submitting ? "Adding..." : "Add Customer"}
        </button>
      </form>
    </div>
    </>
  );
};

export default AddCustomer;
