import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Form } from "react-router-dom";
import axios from "axios";
import Navbar from "../Base/Navbar";
 
interface ProductForm {
  product_name: string;
  product_price: number;
  description: string;
  stock_quantity: number;
  sku : string;
  isActive ?: boolean;
}
 
function EditProduct() {
 
    const { id }=useParams();
    const [product, setProducts] = useState<ProductForm>({
        product_name:"",
        product_price: 0,
        description: "",
        stock_quantity: 0,
        sku : "",
        isActive : true,
    });
    const [loading, setLoading] = useState<boolean>(true);
    const navigate = useNavigate();
    const [saving, setSaving] = useState<boolean>(false);
 
    useEffect(() => {
        axios.get(`http://localhost:8000/api/products/${id}/`,{
            headers: {
                Authorization: `Token ${sessionStorage.getItem("token")}`
            }
        })
            .then((res) => {
                setProducts(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching product:", err);
                setLoading(false);
                alert("Failed to load product data.");
                navigate("/products");
            });
    },[id, navigate]);
 
    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setProducts((prev) => ({
            ...prev,
            [name]: value
        }));
    };
 
    const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault ();
        setSaving(true);
        axios.put(`http://localhost:8000/api/products/${id}/`, product ,{
            headers: { Authorization: `Token ${sessionStorage.getItem("token")}` }
        })
            .then(() => {
                alert("Product updated successfully!");
                navigate("/products/");
            })
            .catch((err) => {
                console.error("Error updating customer:", err);
                alert("Failed to update customer.");
            })
            .finally(() => {
                setSaving(false);
            });
    }
 
 
    if (loading) return <div>Loading...</div>;
    return (
        <>
        <Navbar/>
            <div className="p-6 max-w-xl mx-auto bg-white rounded shadow">
                <h2 className="text-2xl font-bold mb-4">Edit Product</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                    <label className="block font-medium">Product Name</label>
                    <input
                        type="text"
                        name="product_name"
                        value={product.product_name}
                        onChange={handleChange}
                        className="w-full border px-3 py-2 rounded"
                        required
                    />
                    </div>
                    <div>
                    <label className="block font-medium">Price</label>
                    <input
                        type="text"
                        name="product_price"
                        value={product.product_price}
                        onChange={handleChange}
                        className="w-full border px-3 py-2 rounded"
                        required
                    />
                    </div>
                    <div>
                    <label className="block font-medium">description</label>
                    <input
                        type="textbox"
                        name="description"
                        value={product.description}
                        onChange={handleChange}
                        className="w-full border px-3 py-2 rounded"
                        required
                    />
                    </div>
                    <div>
                    <label className="block font-medium">Available Stock</label>
                    <input
                        type="text"
                        name="stock_quantity"
                        value={product.stock_quantity}
                        onChange={handleChange}
                        className="w-full border px-3 py-2 rounded"
                        required
                    />
                    </div>
                    <div>
                        <label className="block font-medium">SKU</label>
                        <input
                            type="text"
                            name="sku"
                            placeholder="SKU"
                            value = {product.sku}
                            onChange = {handleChange}
                            className = "w-full border px-3 py-2 rounded"
                            required
                        />

                    </div>
                    <div>
                        <input type = "checkbox" name = "isActive" id = "isActive" checked = {product.isActive} 
                        onChange = {(e) =>
                            setProducts({
                                ...product,
                                isActive: e.target.checked
                            })
                        }/>
                        <label className="ml-2 font-medium">Active</label>
                    </div>
                    <div className="flex justify-between items-center">
                    <button
                        type="submit"
                        disabled={saving}
                        onClick={() => navigate("/products")}
                        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-500"
                    >
                        {saving ? "Saving..." : "Update Product"}
                    </button>
                    <button
                        type="button"
                        onClick={() => navigate("/products")}
                        className="text-gray-600 underline"
                    >
                        Cancel
                    </button>
                    </div>
                </form>
            </div>
            </>
        )
}
 
export default EditProduct;