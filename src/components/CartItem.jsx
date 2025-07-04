import React from 'react';

export default function CartItem({ item, updateQuantity, removeItem }) {
  const handleIncrease = () => {
    updateQuantity(item.id, item.quantity + 1);
  };

  const handleDecrease = () => {
    if (item.quantity > 1) {
      updateQuantity(item.id, item.quantity - 1);
    }
  };

  return (
    <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow mb-2">
      <div className="flex flex-col gap-1">
        <h4 className="text-md font-semibold text-pink-800">{item.name}</h4>
        <div className="text-gray-700 font-semibold">
          {item.price * item.quantity} EGP
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleDecrease}
            className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
          >
            -
          </button>
          <span className="text-sm">{item.quantity}</span>
          <button
            onClick={handleIncrease}
            className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
          >
            +
          </button>
        </div>
      </div>

      <button
        onClick={() => removeItem(item.id)}
        className="ml-4 text-red-500 hover:text-red-700"
        title="Remove item"
      >
        <svg xmlns="http://www.w3.org/2000/svg"
             fill="none"
             viewBox="0 0 24 24"
             strokeWidth="1.5"
             stroke="currentColor"
             className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}
