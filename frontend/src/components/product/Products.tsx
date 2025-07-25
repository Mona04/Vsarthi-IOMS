import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './Products.css';
import Navbar from "../Base/Navbar";


const API_BASE = "http://localhost:8000/api";

interface Product {
  id: number;
  product_name: string;
  product_price: number;
  description: string;
  stock_quantity: number;
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
      .get<Product[]>(`${API_BASE}/products/`, {
        headers: {
          Authorization: `Token ${token}`,
        },
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
      .delete(`${API_BASE}/products/${id}/`, {
        headers: {
          Authorization: `Token ${sessionStorage.getItem("token")}`,
        },
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
    <>
    <Navbar/>
    <div className="products-background py-10 px-4">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-4xl font-bold text-center text-black-700 mb-6 shadow hover "><b>📦 All Products</b></h1>
        <div className="text-right mb-4">
          <button
            className="bg-green-600 text-white px-6 py-2 rounded-md shadow hover:bg-green-500 hover:scale-105 transform transition duration-300"
            onClick={() => navigate("/product/add")}
          >
            ➕ Add Product
          </button>
        </div>

        {loading ? (
          <div className="text-center text-gray-400 animate-pulse">Loading products...</div>
        ) : products.length === 0 ? (
          <div className="text-center text-gray-400">No products found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="table-auto w-full border-collapse">
              <thead>
                <tr className="bg-blue-100 text-blue-800">
                  <th className="p-3 border-b text-left">Name</th>
                  <th className="p-3 border-b text-left">Price (₹)</th>
                  <th className="p-3 border-b text-left">Stock</th>
                  <th className="p-3 border-b text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, index) => (
                  <tr
                    key={product.id}
                    className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                  >
                    <td className="p-3">{product.product_name}</td>
                      <td className="p-3">
            ₹
            {product.product_price && !isNaN(Number(product.product_price))
              ? Number(product.product_price).toFixed(2)
              : "N/A"}
          </td>


                    <td className="p-3">{product.stock_quantity}</td>
                    <td className="p-3 space-x-2">
                      <button
                        className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-300 hover:scale-105 transition-all"
                        onClick={() => handleEdit(product.id)}
                      >
                        ✏️ Edit
                      </button>
                      <button
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-300 hover:scale-105 transition-all"
                        onClick={() => handleDelete(product.id)}
                      >
                        🗑️ Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
    </>
  );
};

export default Products;
