import React, { useEffect, useState } from "react";
import Navbar from "../Base/Navbar";

interface Product {
  id: number;
  name: string;
  price: string; 
}

interface OrderItem {
  product: Product;
  quantity: number;
}

interface Order {
  id: string;
  customer_id: number;
  created_at: string;
  items: OrderItem[];
}

const OrderDetails: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/orders/");
        const data = await res.json();
        setOrders(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  const calculateTotal = (items: OrderItem[]) => {
    return items.reduce((total, item) => {
      const price = parseFloat(item.product.price);
      return total + price * item.quantity;
    }, 0);
  };

  return (
    <>
    <Navbar/>
    <div
      style={{
        backgroundImage: "url('/Images/orders_background.avif')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
        padding: "2rem",
      }}
    >
      <div className="p-4 max-w-4xl mx-auto bg-white bg-opacity-90 rounded shadow-lg backdrop-blur">
        <h2 className="text-3xl font-bold mb-4 text-center">All Orders</h2>

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
                <strong>Customer ID:</strong> {order.customer_id}
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
                      <td className="px-2 py-1 border">{item.product.name}</td>
                      <td className="px-2 py-1 border">₹{item.product.price}</td>
                      <td className="px-2 py-1 border">{item.quantity}</td>
                      <td className="px-2 py-1 border">
                        ₹{(parseFloat(item.product.price) * item.quantity).toFixed(2)}
                      </td>
                    </tr>
                  ))}
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
