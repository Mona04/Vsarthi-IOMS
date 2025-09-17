import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "../Base/Navbar";

const API_BASE = "http://localhost:8000/api";

interface CustomerForm {
  username: string;
  email: string;
  password: string;
}

const Register = () => {
  const [form, setForm] = useState<CustomerForm>({
    username: "",
    email: "",
    password: "",
  });
  const [submitting, setSubmitting] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    axios
      .post(`${API_BASE}/admin-users/`, { user: form })
      .then(() => {
        alert("Registered successfully! Please login.");
        setForm({
          username: "",
          email: "",
          password: "",
        });
      })
      .catch((err: any) => {
        if (err.response?.data?.errors?.user?.username) {
          alert(err.response.data.errors.user.username);
        } else if (err.response?.data) {
          alert(err.response.data);
        } else {
          alert("Something went wrong");
        }
      })
      .finally(() => setSubmitting(false));
  };

  return (
    <>
    < Navbar/>
    <div
      style={{
        backgroundImage: `url('/Images/register_background.png')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          padding: "2rem",
          borderRadius: "12px",
          boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)",
          width: "100%",
          maxWidth: "400px",
        }}
      >
        <h2 className="text-3xl font-bold mb-4 text-center">Register</h2>

        <div className="mb-4">
          <h3 className="font-bold mb-2">Username:</h3>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            required
          />
        </div>

        <div className="mb-4">
          <h3 className="font-bold mb-2">Email:</h3>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            required
          />
        </div>

        <div className="mb-4">
          <h3 className="font-bold mb-2">Password:</h3>
          <input
            type="password"
            name="password"
            placeholder="*****"
            value={form.password}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            required
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="bg-blue-700 text-white px-4 py-2 rounded w-full hover:bg-blue-800 transition"
        >
          {submitting ? "Signing Up..." : "Sign Up"}
        </button>
        <p className="text-center mt-4 text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 font-semibold underline hover:text-blue-800">
            LOGIN
          </Link>
        </p>
      </form>
    </div>
    </>
  );
};

export default Register;
