import React, { useEffect, useState } from "react";
import Navbar from "../Base/Navbar";
import { Link } from "react-router-dom";
import axios from "axios";

interface Product {
  id: number;
  product_name: string;
  product_price: string;
}

interface OrderItem {
  product: Product;
  quantity: number;
}

interface Order {
  id: string;
  customer: number;
  created_at: string;
  items: OrderItem[];
  status: string;
}

const OrderDetails: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [updatingStatusId, setUpdatingStatusId] = useState<string | null>(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/orders/");
      const data = await res.json();
      setOrders(data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const calculateTotal = (items: OrderItem[]) => {
    return items.reduce((total, item) => {
      const price = parseFloat(item.product.product_price);
      return total + price * item.quantity;
    }, 0);
  };

  const handleStatusChange = (orderId: string, newStatus: string) => {
    setUpdatingStatusId(orderId);

    axios
      .patch(
        `http://localhost:8000/api/orders/${orderId}/`,
        { status: newStatus },
        {
          headers: { Authorization: `Token ${sessionStorage.getItem("token")}` },
        }
      )
      .then(() => {
        alert("Order updated successfully!");
        fetchOrders(); 
      })
      .catch((err) => {
        console.error("Error updating order:", err);
        alert("Failed to update order.");
      })
      .finally(() => {
        setUpdatingStatusId(null);
      });
  };

  const ALL_STATUSES = [
    "PENDING",
    "PROCESSING",
    "SHIPPED",
    "DELIVERED",
    "CANCELED",
  ];

  const getNextStatuses = (currentStatus: string): string[] => {
    const transitions: { [key: string]: string[] } = {
      PENDING: ["PENDING", "PROCESSING", "CANCELED"],
      PROCESSING: ["PROCESSING", "SHIPPED", "DELIVERED", "CANCELED"],
      SHIPPED: ["SHIPPED", "DELIVERED"],
      DELIVERED: ["DELIVERED"],
      CANCELED: ["CANCELED"],
    };
    return transitions[currentStatus] || ALL_STATUSES;
  };

  return (
    <>
      <Navbar />
      <div
        style={{
          backgroundImage: "url('/Images/orders_background.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          minHeight: "100vh",
          padding: "2rem",
        }}
      >
        <div className="p-4 max-w-4xl mx-auto bg-white bg-opacity-90 rounded shadow-lg backdrop-blur">
          <h2 className="text-3xl font-bold mb-4 text-center">All Orders</h2>

          <Link to="/orders/add">
            <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded ml-4">
              Add Order
            </button>
          </Link>

          {orders.length === 0 ? (
            <p className="text-center text-red-600">No orders found.</p>
          ) : (
            orders.map((order) => (
              <div
                key={order.id}
                className="border rounded p-4 mb-4 shadow-md bg-white"
              >
                <div className="mb-2">
                  <strong>Order ID:</strong> {order.id}
                </div>
                <div className="mb-2">
                  <strong>Customer ID:</strong> {order.customer}
                </div>
                <div className="mb-2">
                  <strong>Order Date:</strong>{" "}
                  {new Date(order.created_at).toLocaleString()}
                </div>

                <table className="w-full text-left mt-2 border">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-2 py-1 border">Product</th>
                      <th className="px-2 py-1 border">Price</th>
                      <th className="px-2 py-1 border">Quantity</th>
                      <th className="px-2 py-1 border">Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.items.map((item, idx) => (
                      <tr key={idx}>
                        <td className="px-2 py-1 border">
                          {item.product.product_name}
                        </td>
                        <td className="px-2 py-1 border">
                          ₹{item.product.product_price}
                        </td>
                        <td className="px-2 py-1 border">{item.quantity}</td>
                        <td className="px-2 py-1 border">
                          ₹
                          {(
                            parseFloat(item.product.product_price) *
                            item.quantity
                          ).toFixed(2)}
                        </td>
                      </tr>
                    ))}
                    <tr>
                      <td
                        colSpan={3}
                        className="px-2 py-1 border text-right font-semibold"
                      >
                        Status:
                      </td>
                      <td className="px-2 py-1 border">
                        <select
                          value={order.status}
                          disabled={updatingStatusId === order.id}
                          onChange={(e) => handleStatusChange(order.id, e.target.value)}
                          className="border p-1 rounded"
                        >
                          {getNextStatuses(order.status).map((status) => (
                            <option key={status} value={status}>
                              {status}
                            </option>
                          ))}
                        </select>   
                      </td>
                    </tr>
                  </tbody>
                </table>

                <div className="text-right font-semibold mt-2">
                  Total: ₹{calculateTotal(order.items).toFixed(2)}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default OrderDetails;
