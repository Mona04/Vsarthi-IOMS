import  React,{ useState  } from "react";
import axios from "axios";
import Navbar from "../Base/Navbar";


const API_BASE = "http://localhost:8000/api";
 
interface ProductForm {
  product_name: string;
  product_price: number;
  description: string;
  stock_quantity: number;
}
 
 
const AddProduct = () => {
  const [form, setForm] = useState<ProductForm>({
    product_name: "",
    product_price: 0,
    description: "",
    stock_quantity: 0,
    
  });
  const [submitting, setSubmitting] = useState<boolean>(false);
 
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
 
  const handleSubmit = (e :React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    const token = sessionStorage.getItem("token");
    console.log(form)
    axios
      .post(`${API_BASE}/products/`, form ,{
        headers: {
          Authorization: `Token ${token}`
        }
      })
      .then(() => {
        alert("Product added!");
        setForm({
          product_name: "",
          product_price: 0,
          description: "",
          stock_quantity: 0
        });
      })
      .catch(() => {
        alert("Error adding product");
      })
      .finally(() => setSubmitting(false));
  };
 
 return (
  <>
  <Navbar/>
  <div
    style={{
      backgroundImage: "url('/Images/prod_background.jpeg')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "2rem"
    }}
  >
    <form
      className="bg-white bg-opacity-90 backdrop-blur-md p-8 rounded-lg shadow-lg w-full max-w-md"
      onSubmit={handleSubmit}
    >
      <h1 className ="text-4xl font-bold text-center text-black-700 mb-6  "><b> Add Product Details </b></h1>
      
      <div className="mb-4">
        <label className="block mb-1 font-medium">Product Name:</label>
      <input
        type="text"
        name="product_name"
        placeholder="Product name"
        value={form.product_name}
        onChange={handleChange}
        className="border p-2 rounded w-full mb-2"
        required
      />
      </div>


    <div className="mb-4">
      <label className="block mb-1 font-medium">Product Price:</label> 
      <input
        type="text"
        name="product_price"
        placeholder="100"
        value={form.product_price}
        onChange={handleChange}
        className="border p-2 rounded w-full mb-2"
        required
      />
    </div>
    
    <div className="mb-4">
      <label className="block mb-1 font-medium">Product Description:</label>
      <input
        type="textbox"
        name="description"
        placeholder="this is a product"
        value={form.description}
        onChange={handleChange}
        className="border p-2 rounded w-full mb-2"
        required
      />
    </div>
    
    <div className="mb-4">
      <label className="block mb-1 font-medium">Stock:</label>
      <input
        type="text"
        name="stock_quantity"
        placeholder="6"
        value={form.stock_quantity}
        onChange={handleChange}
        className="border p-2 rounded w-full mb-2"
        required
      />
      </div>

      <button
        type="submit"
        className="bg-green-700 text-white px-4 py-2 rounded w-full"
        disabled={submitting}
      >
        {submitting ? "Adding..." : "Add Product"}
      </button>
    </form>
    </div>
    </>
  );
};
 
export default AddProduct;