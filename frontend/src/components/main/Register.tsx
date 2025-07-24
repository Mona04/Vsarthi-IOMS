 
import  React,{ useState  } from "react";
import axios from "axios";
 
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
    password: ""
  });
  const [submitting, setSubmitting] = useState<boolean>(false);
 
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
 
  const handleSubmit = (e :React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    axios
      .post(`${API_BASE}/admin-users/`, { user: form })
      .then(() => {
        alert("Customer added!");
        setForm({
          username: "",
          email: "",
          password: ""
        });
      })
      .catch((err: any) => {
        if (err.response?.data?.errors?.user?.username) {
            alert(err.response.data.errors.user.username);
        } else if (err.response?.data) {
            alert(err.response.data);
        }else {
            alert("Something went wrong");
        }
      })
      .finally(() => setSubmitting(false));
  };
 
  return (
    <form className="max-w-md mx-auto mt-8 p-4 bg-white rounded shadow" onSubmit={handleSubmit}>
      <input
        type="text"
        name="username"
        placeholder="username"
        value={form.username}
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
        type="password"
        name="password"
        placeholder="*****"
        value={form.password}
        onChange={handleChange}
        className="border p-2 rounded w-full mb-2"
        required
      />
      <button
        type="submit"
        className="bg-blue-700 text-white px-4 py-2 rounded w-full"
        disabled={submitting}
      >
        {submitting ? "Signing Up..." : "Sign Up"}
      </button>
    </form>
  );
};
 
export default Register;