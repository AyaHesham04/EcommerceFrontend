import React, { useState } from 'react';

export default function ProductCard({ product, onAddToCart }) {
  const [quantity, setQuantity] = useState(1);

  const increase = () => {
    if (quantity < product.quantity) {
      setQuantity(quantity + 1);
    }
  };

  const decrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAdd = () => {
  onAddToCart(product, quantity); 
  setQuantity(1);
};
console.log(product)

  return (
    <div className="bg-white rounded-2xl shadow-md p-4 flex flex-col items-start space-y-2 w-full">
      <h2 className="text-xl font-bold text-pink-800">{product.name}</h2>
      <p className="text-gray-600">Price: {product.price} EGP</p>
      <p className="text-gray-600">Available: {product.quantity}</p>
      {/* <p className={product.expired ? "text-red-600" : "text-gray-600"}>
        {product.expired ? "Expired" : product.expiryDate}
      </p>
       <p className={product.shippable ? " text-gray-600" : "text-red-600"}>
        {product.shippable ? `Can be Shipped, Weight: ${product.weight}` : "Not Shipped"}
      </p> */}


      <div>
        <p className="text-gray-600 inline pr-1"> Quanity: </p>
        <div className="flex items-center space-x-2 inline">
          <button
            onClick={decrease}
            className="px-2 py-1 bg-gray-300 rounded hover:bg-gray-400 cursor-pointer"
          >
            −
          </button>
          <span className="px-2">{quantity}</span>
          <button
            onClick={increase}
            className="px-2 py-1 bg-gray-300 rounded hover:bg-gray-400 cursor-pointer"
          >
            +
          </button>
        </div>
      </div>

      <button
        onClick={handleAdd}
        className="w-full mt-auto px-4 py-2 rounded-lg transition bg-pink-900 text-white hover:bg-pink-800 cursor-pointer"
      >
        Add to Cart
      </button>
      
      {/* <button
        onClick={product.expired ? null : handleAdd}
        disabled={product.expired}
        className={`w-full mt-auto px-4 py-2 rounded-lg transition
          ${product.expired 
            ? "bg-gray-400 text-white cursor-not-allowed" 
            : "bg-pink-900 text-white hover:bg-pink-800 cursor-pointer"
          }`}
      >
        {product.expired ? "Unavailable" : "Add to Cart"}
      </button> */}

    </div>
  );
}
