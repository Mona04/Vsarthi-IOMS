import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

interface CustomerForm {
  name: string;
  email: string;
  phone: string;
  address: string;
}

function EditCustomer() {
  const { id } = useParams();
  const [customer, setCustomer] = useState<CustomerForm>({
    name: "",
    address: "",
    email: "",
    phone: "",
  });
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const [saving, setSaving] = useState<boolean>(false);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/customers/${id}/`)
      .then((res) => {
        setCustomer(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching customer:", err);
        setLoading(false);
        alert("Failed to load customer data.");
        navigate("/customers");
      });
  }, [id, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCustomer((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);
    axios
      .put(`http://localhost:8000/api/customers/${id}/`, customer)
      .then(() => {
        alert("Customer updated successfully!");
        navigate("/customers");
      })
      .catch((err) => {
        console.error("Error updating customer:", err);
        alert("Failed to update customer.");
      })
      .finally(() => {
        setSaving(false);
      });
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div
      style={{
        backgroundImage: "url('/Images/customer_background.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
        padding: "2rem",
      }}
    >
      <div className="max-w-xl mx-auto bg-white rounded shadow p-6 bg-opacity-80">
        <h2 className="text-3xl text-center font-bold mb-4">Edit Customer</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium">Name</label>
            <input
              type="text"
              name="name"
              value={customer.name}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              required
            />
          </div>
          <div>
            <label className="block font-medium">Address</label>
            <input
              type="text"
              name="address"
              value={customer.address}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              required
            />
          </div>
          <div>
            <label className="block font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={customer.email}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              required
            />
          </div>
          <div>
            <label className="block font-medium">Phone Number</label>
            <input
              type="text"
              name="phone"
              value={customer.phone}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              required
            />
          </div>
          <div className="flex justify-between items-center">
            <button
              type="submit"
              disabled={saving}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-500"
            >
              {saving ? "Saving..." : "Update Customer"}
            </button>
            <button
              type="button"
              onClick={() => navigate("/customers")}
              className="text-red-600 underline"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditCustomer;
