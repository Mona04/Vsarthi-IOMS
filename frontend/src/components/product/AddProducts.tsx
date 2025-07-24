import  React,{ useState  } from "react";
import axios from "axios";
 
const API_BASE = "http://localhost:8000/api";
 
interface ProductForm {
  name: string;
  price: number;
  description: string;
  stock: number;
}
 
 
const AddProduct = () => {
  const [form, setForm] = useState<ProductForm>({
    name: "",
    price: 0,
    description: "",
    stock: 0
  });
  const [submitting, setSubmitting] = useState<boolean>(false);
 
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
 
  const handleSubmit = (e :React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    const token = sessionStorage.getItem("token");
    axios
      .post(`${API_BASE}/products/`, form ,{
        headers: {
          Authorization: `Token ${token}`
        }
      })
      .then(() => {
        alert("Product added!");
        setForm({
          name: "",
          price: 0,
          description: "",
          stock: 0
        });
      })
      .catch(() => {
        alert("Error adding product");
      })
      .finally(() => setSubmitting(false));
  };
 
  return (
    <form className="max-w-md mx-auto mt-8 p-4 bg-white rounded shadow" onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Product name"
        value={form.name}
        onChange={handleChange}
        className="border p-2 rounded w-full mb-2"
        required
      />
 
      <input
        type="text"
        name="price"
        placeholder="100"
        value={form.price}
        onChange={handleChange}
        className="border p-2 rounded w-full mb-2"
        required
      />
      <input
        type="textbox"
        name="description"
        placeholder="this is a product"
        value={form.description}
        onChange={handleChange}
        className="border p-2 rounded w-full mb-2"
        required
      />
      <input
        type="text"
        name="stock"
        placeholder="6"
        value={form.stock}
        onChange={handleChange}
        className="border p-2 rounded w-full mb-2"
        required
      />
      <button
        type="submit"
        className="bg-blue-700 text-white px-4 py-2 rounded w-full"
        disabled={submitting}
      >
        {submitting ? "Adding..." : "Add Product"}
      </button>
    </form>
  );
};
 
export default AddProduct;