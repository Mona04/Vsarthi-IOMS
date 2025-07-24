import  React,{ useState  } from "react";
import axios from "axios";
 
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
 
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
 
  const handleSubmit = (e :React.FormEvent<HTMLFormElement>) => {
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
      })
      .catch(() => {
        alert("Error adding customer");
      })
      .finally(() => setSubmitting(false));
  };
 
  return (
    <form className="max-w-md mx-auto mt-8 p-4 bg-white rounded shadow" onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={handleChange}
        className="border p-2 rounded w-full mb-2"
        required
      />
      <input
        type="text"
        name="address"
        placeholder="address"
        value={form.address}
        onChange={handleChange}
        className="border p-2 rounded w-full mb-2"
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        className="border p-2 rounded w-full mb-2"
        required
      />
      <input
        type="text"
        name="phone"
        placeholder="Phone Number"
        value={form.phone}
        onChange={handleChange}
        className="border p-2 rounded w-full mb-2"
        required
      />
      <button
        type="submit"
        className="bg-blue-700 text-white px-4 py-2 rounded w-full"
        disabled={submitting}
      >
        {submitting ? "Adding..." : "Add Customer"}
      </button>
    </form>
  );
};
 
export default AddCustomer;
 
