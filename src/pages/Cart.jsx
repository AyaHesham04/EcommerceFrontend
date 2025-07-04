import React, { useEffect } from "react";
import { getCartApi, removeFromCartApi, checkoutApi, addToCartApi, fetchCustomer } from "../api";
import CartItem from "../components/CartItem";
import CartSummary from "../components/CartSummary";
import { useNavigate } from 'react-router-dom';

export default function Cart({ cart, setCart, customer, setCustomer, loadCart }) {
  const navigate = useNavigate();

  useEffect(() => {
    loadCart();
  }, [loadCart]);

  const handleRemove = (id) => {
    removeFromCartApi(id)
      .then(() => loadCart())
      .catch(err => alert(err.response?.data || "Error removing item"));
  };

  const handleUpdateQuantity = (id, newQty) => {
    const currentQty = cart.find(i => i.id === id)?.quantity || 0;
    const delta = newQty - currentQty;
    if (delta === 0) return;

    addToCartApi(id, delta)
      .then(() => loadCart())
      .catch(err => alert(err.response?.data || "Error updating quantity"));
  };

  const handleCheckout = () => {
  if (cart.length === 0) return alert("Cart is empty");

  checkoutApi(customer.id)
    .then(() => fetchCustomer(customer.id))
    .then(updatedCustomer => {
      console.log("Updated customer:", updatedCustomer.data);

      if (!updatedCustomer?.data?.id || typeof updatedCustomer.data.balance !== 'number') {
        alert("Failed to load valid customer data after checkout.");
        return;
      }

      setCustomer(updatedCustomer.data);
      setCart([]);

      navigate('/checkout', {
        state: {
          cart: cart.map(({ id, name, price, quantity, shippable, weight }) => ({
            id, name, price, quantity, shippable, weight
          })),
          customer: {
            id: updatedCustomer.data.id,
            balance: updatedCustomer.data.balance,
            name: updatedCustomer.data.name
          }
        }
      });
    })
    .catch(err => {
      console.error("Checkout failed:", err);
      alert(err.response?.data || "Checkout failed");
    });
};


  const subtotal = cart.reduce((s, i) => s + i.price * i.quantity, 0);
  const shipping = cart
    .filter(i => i.shippable)
    .reduce((s, i) => s + i.weight * i.quantity * 5, 0);

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-3xl font-bold text-pink-950">Your Cart</h1>
      {customer && typeof customer?.balance === 'number' ? (
          <p className="text-lg text-pink-900">
            Remaining Balance: {customer.balance.toFixed(2)} EGP
          </p>
        ) : (
          <p className="text-lg text-pink-900">Loading balance...</p>
        )}

      {cart.map(item => (
        <CartItem
          key={item.id}
          item={item}
          updateQuantity={handleUpdateQuantity}
          removeItem={handleRemove}
        />
      ))}
      <CartSummary
        subtotal={subtotal}
        shipping={shipping}
        onCheckout={handleCheckout}
      />
    </div>
  );
}
