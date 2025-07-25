import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../Base/Navbar";


const API_BASE = "http://localhost:8000/api";

interface CustomerForm {
  username: string;
  password: string;
}

const Login = () => {
  const [form, setForm] = useState<CustomerForm>({
    username: "",
    password: "",
  });
  const [submitting, setSubmitting] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    axios
      .post(`${API_BASE}/login/`, form)
      .then((res) => {
        console.log("Login response:", res);
        const { token } = res.data;
        sessionStorage.setItem("token", token);
        setForm({ username: "", password: "" });
        navigate("/dashboard");
      })
      .catch((err: any) => {
        if (err.response?.data?.errors?.user?.username) {
          alert(err.response.data.errors.user.username);
        } else if (err.response.data) {
          alert(err.response.data);
        } else {
          alert("Something went wrong");
        }
      })
      .finally(() => setSubmitting(false));
  };

  return (
    <>
    <Navbar />
    <div
      style={{
        backgroundImage: `url('/Images/login_background.jpg')`,
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

        <h2 className="text-3xl font-bold mb-4 text-center">Login</h2>
        <div className="mb-4">
        <h3 className="font-bold mb-2">Username:</h3>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          className="border p-2 rounded w-full mb-4"
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
          className="border p-2 rounded w-full mb-4"
          required
        />
        </div>
        <button
          type="submit"
          disabled={submitting}
          className="bg-blue-700 text-white px-4 py-2 rounded w-full hover:bg-blue-800 transition"
        >
          {submitting ? "Verifying..." : "Login"}
        </button>


        <p className="text-sm text-center mt-4">
          Don’t have an account?{" "}
          <a
            href="/register"
            className="text-blue-700 font-semibold hover:underline"
          >
            REGISTER
          </a>
        </p>
      </form>
    </div>
    </>
  );
};

export default Login;
