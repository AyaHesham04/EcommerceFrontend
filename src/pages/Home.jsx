import React from 'react';
import { useEffect, useState } from "react";
import { fetchProducts, fetchCustomer } from "../api";
import ProductCard from "../components/ProductCard";
import { addToCartApi } from "../api";

export default function Home({ cart, setCart, customer, setCustomer, loadCart  }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts().then(res => setProducts(res.data));
    fetchCustomer(1).then(res => setCustomer(res.data));
  }, []);

const handleAddToCart = (product, quantityToAdd) => {
  addToCartApi(product.id, quantityToAdd)
    .then(() => {
      loadCart();
    })
    .catch(err => {
      alert(err.response?.data || "Error adding to cart");
    });
};


  return (
    <div className="p-6 space-y-4">
      <h1 className="text-3xl font-bold text-pink-950">Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map(product => (
            <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
        ))}
      </div>
    </div>
  );
}
