import React, { useEffect, useState } from "react";

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
};

const Product = () => {
  const [products, setProducts] = useState<Product[]>([]);

  // Dummy data for now – replace with API call if needed
  useEffect(() => {
    setProducts([
      {
        id: 1,
        name: "Laptop",
        description: "High-performance laptop with 16GB RAM.",
        price: 75000,
      },
      {
        id: 2,
        name: "Headphones",
        description: "Noise-cancelling over-ear headphones.",
        price: 3500,
      },
      {
        id: 3,
        name: "Monitor",
        description: "24-inch Full HD LED monitor.",
        price: 11000,
      },
    ]);
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Product List</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition"
          >
            <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
            <p className="text-gray-600 mb-4">{product.description}</p>
            <p className="text-lg font-medium text-blue-600">₹{product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Product;
