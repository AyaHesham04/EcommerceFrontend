import React from "react";
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { useEffect } from "react";

export default function Checkout() {
  const location = useLocation();
  const { cart, customer } = location.state || {};

  useEffect(() => {
    if (!customer || !customer.id) {
      console.warn("Customer not passed to Checkout!");
    }
  }, [customer]);

  const subtotal = cart.reduce((s, i) => s + i.price * i.quantity, 0);
  const shipping = cart
    .filter(i => i.shippable)
    .reduce((s, i) => s + i.weight * i.quantity * 5, 0);

    console.log(customer)
  return (
    <div className="p-6 space-y-6 text-center">
      <h1 className="text-3xl font-bold text-green-700">Order Placed Successfully</h1>
      {customer && typeof customer.balance === 'number' ? (
        <p>Remaining Balance: {customer.balance.toFixed(2)} EGP</p>
      ) : (
        <p className="text-red-500">Invalid or missing customer data</p>
      )}


      <h2 className="text-2xl font-semibold text-pink-900">Order Summary</h2>
      {cart.map(i => (
        <div key={i.id} className="flex justify-between text-pink-900">
          <span>{i.quantity}× {i.name}</span>
          <span>{(i.price * i.quantity).toFixed(2)} EGP</span>
        </div>
      ))}

      <div className="bg-white p-4 rounded shadow space-y-1 text-pink-900">
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
          <span>Total Paid</span>
          <span>{(subtotal + shipping).toFixed(2)} EGP</span>
        </div>
      </div>

      <Link to="/" className="text-pink-950 hover:underline">Back to Home</Link>
    </div>
  );
}
