import axios from 'axios';
const API = axios.create({ baseURL: 'http://localhost:8080/api' });

export const fetchProducts = () => API.get('/products');
export const fetchCustomer = (id) => API.get(`/customers/${id}`);
export const addToCartApi = (productId, qty) =>
  API.post(`/cart/add?productId=${productId}&quantity=${qty}`);
export const removeFromCartApi = (productId) =>
  API.delete(`/cart/remove/${productId}`);
export const getCartApi = () => API.get('/cart');
export const checkoutApi = (customerId) =>
  API.post(`/cart/checkout?customerId=${customerId}`);
