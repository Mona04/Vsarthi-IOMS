import React, { useEffect, useState } from "react";
import axios from "axios";
 
 
const API_BASE = "http://localhost:8000/api";
 
interface Product {
  id: number;
  name: string;
}
 
interface Customer {
  id: number;
  first_name: string;
}
 
interface OrderItem {
  product_id: number;
  quantity: number;
}
 
interface OrderData {
  customer_id: number;
  items: OrderItem[];
}
 
const AddOrders: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
 
  const [selectedCustomerId, setSelectedCustomerId] = useState<number>(0);
  const [selectedProductId, setSelectedProductId] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(1);
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
 
  useEffect(() => {
    fetchProducts();
    fetchCustomers();
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
            console.log("Products fetched:", res.data);
          })
          .catch((err) => {
            console.error("Failed to fetch products:", err);
          });
      };
 
    const fetchCustomers = () => {
      const token = sessionStorage.getItem("token");
      axios
        .get<Customer[]>(`${API_BASE}/customers/`,{
          headers: {
            Authorization: `Token ${token}`
          }
        })
        .then((res) => {
          setCustomers(res.data);
          console.log("Customers fetched:", res.data);
 
        })
        .catch((err) => {
          console.error("Failed to fetch customers:", err);
        });
    };
 
  const handleAddItem = () => {
    if (selectedProductId === 0 || quantity <= 0) return;
 
    const exists = orderItems.find((item) => item.product_id === selectedProductId);
    if (exists) {
      // Update quantity if product already exists
      setOrderItems((prev) =>
        prev.map((item) =>
          item.product_id === selectedProductId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      );
    } else {
      setOrderItems((prev) => [...prev, { product_id: selectedProductId, quantity }]);
    }
 
    setSelectedProductId(0);
    setQuantity(1);
  };
 
  const handleSubmit = async () => {
    if (selectedCustomerId === 0 || orderItems.length === 0) {
      alert("Please select a customer and add at least one product.");
      return;
    }
 
    const orderData: OrderData = {
      customer_id: selectedCustomerId,
      items: orderItems,
    };
 
    try {
      const response = await fetch("http://localhost:8000/api/orders/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });
 
      if (!response.ok) {
        const error = await response.json();
        console.error("Order submission failed:", error);
        return;
      }
 
      const result = await response.json();
      console.log("Order placed:", result);
 
      // Reset state
      setSelectedCustomerId(0);
      setOrderItems([]);
    } catch (err) {
      console.error("Submit error:", err);
    }
  };
 
  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Place New Order</h2>
 
      {/* Customer Dropdown */}
      <div className="mb-4">
        <label className="block mb-1 font-medium">Select Customer:</label>
        <select
          value={selectedCustomerId}
          onChange={(e) => setSelectedCustomerId(Number(e.target.value))}
          className="w-full p-2 border rounded"
        >
          <option value={0}>-- Choose Customer --</option>
          {customers.map((customer) => (
            <option key={customer.id} value={customer.id}>
              {customer.first_name}
            </option>
          ))}
        </select>
      </div>
 
      {/* Product and Quantity */}
      <div className="flex space-x-4 mb-4">
        <select
          value={selectedProductId}
          onChange={(e) => setSelectedProductId(Number(e.target.value))}
          className="p-2 border rounded w-1/2"
        >
          <option value={0}>Select product</option>
          {products.map((product) => (
            <option key={product.id} value={product.id}>
              {product.name}
            </option>
          ))}
        </select>
 
        <input
          type="number"
          min={1}
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="p-2 border rounded w-1/4"
        />
 
        <button
          onClick={handleAddItem}
          className="bg-green-600 text-white px-3 py-2 rounded"
        >
          Add
        </button>
      </div>
 
      {/* Order Summary */}
      {orderItems.length > 0 && (
        <div className="mb-4">
          <h3 className="font-semibold mb-2">Order Items:</h3>
          <ul className="list-disc pl-5 space-y-1">
            {orderItems.map((item, idx) => {
              const product = products.find((p) => p.id === item.product_id);
              return (
                <li key={idx}>
                  {product?.name || "Product"} — Quantity: {item.quantity}
                </li>
              );
            })}
          </ul>
        </div>
      )}
 
      <button
        onClick={handleSubmit}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
      >
        Submit Order
      </button>
    </div>
  );
};
 
export default AddOrders;