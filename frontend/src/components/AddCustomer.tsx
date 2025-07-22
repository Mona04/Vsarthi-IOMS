import  React,{ useState  } from "react";
import axios from "axios";
 
const API_BASE = "http://localhost:8000/api";
 
interface CustomerForm {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
}
 
const AddCustomer = () => {
  const [form, setForm] = useState<CustomerForm>({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: ""
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
          first_name: "",
          last_name: "",
          email: "",
          phone_number: ""
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
        name="first_name"
        placeholder="First Name"
        value={form.first_name}
        onChange={handleChange}
        className="border p-2 rounded w-full mb-2"
        required
      />
      <input
        type="text"
        name="last_name"
        placeholder="Last Name"
        value={form.last_name}
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
        name="phone_number"
        placeholder="Phone Number"
        value={form.phone_number}
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
 
