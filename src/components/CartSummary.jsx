import React from 'react';

export default function CartSummary({ subtotal, shipping, onCheckout }) {
  
  const total = subtotal + shipping;

  return (
    <div className="bg-white rounded-2xl p-4 shadow-md text-pink-900 w-full space-y-3">
      <h3 className="text-xl font-bold">Checkout Summary</h3>
      <div className="flex justify-between">
        <span>Subtotal</span>
        <span>{subtotal.toFixed(2)} EGP</span>
      </div>
      <div className="flex justify-between">
        <span>Shipping</span>
        <span>{shipping.toFixed(2)} EGP</span>
      </div>
      <hr />
      <div className="flex justify-between font-bold">
        <span>Total</span>
        <span>{total.toFixed(2)} EGP</span>
      </div>
      <button
        onClick={onCheckout}
        className="w-full px-4 py-2 bg-pink-900 text-white rounded-lg hover:bg-pink-800 cursor-pointer transition"
      >
        Checkout
      </button>
    </div>
  );
}
