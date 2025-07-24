import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
 
const API_BASE = "http://localhost:8000/api";
 
// Define the shape of a Customer
interface Product {
  id:number,
  name: string;
  price: number;
  description: string;
  stock: number;
}
 
const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();
 
  useEffect(() => {
 
    fetchProducts();
  }, []);
  const fetchProducts = () => {
    const token = sessionStorage.getItem("token");
    axios
      .get<Product[]>(`${API_BASE}/products/`,{
        headers: {
          Authorization: `Token ${token}`
        }
      })
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch products:", err);
        setLoading(false);
      });
  };
 
  const handleDelete = (id: number) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
 
    axios
      .delete(`${API_BASE}/products/${id}/`,{
        headers: {
          Authorization: `Token ${sessionStorage.getItem("token")}`
        }
      })
      .then(() => {
        setProducts(products.filter((c) => c.id !== id));
      })
      .catch((err) => {
        alert("Failed to delete product");
        console.error(err);
      });
  };
 
  const handleEdit = (id: number) => {
    navigate(`/product/edit/${id}`);
  };
 
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-4">All Products</h2>
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded m-2.5 hover:bg-blue-400 hover:text-2xl transition-all duration-500 ease-in-out"
        onClick={() => navigate("/product/add")}
      >
        Add Products
      </button>
 
      <div className="bg-white p-4 rounded-md shadow-md">
        {loading ? (
          <div className="text-gray-400 text-center">Loading...</div>
        ) : products.length === 0 ? (
          <div className="text-gray-400 text-center">No products found.</div>
        ) : (
          <table className="w-full text-left">
            <thead>
              <tr>
                <th className="border-b pb-2">Name</th>
                <th className="border-b pb-2">price</th>
                <th className="border-b pb-2">stocks</th>
                <th className="border-b pb-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td className="py-1">{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.stock}</td>
                  <td className="space-x-2">
                    <button
                      className="bg-green-600 text-white px-2 py-1 rounded text-xs hover:bg-green-400 hover:text-black transition-all duration-300"
                      onClick={() => handleEdit(product.id)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-600 text-white px-2 py-1 rounded text-xs hover:bg-red-400 hover:text-black transition-all duration-300"
                      onClick={() => handleDelete(product.id)}
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
 
export default Products;