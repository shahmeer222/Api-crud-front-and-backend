import axios from 'axios';
const API_BASE_URL = 'http://localhost:4000/api';
// Image URLs ke liye: "http://localhost:4000/api" -> "http://localhost:4000"
export const IMAGE_BASE = API_BASE_URL.replace(/\/api$/, '')

// ---------- CATEGORY ----------
export const getCategories = () => axios.get(`${API_BASE_URL}/categories`);
export const getCategory = (id) => axios.get(`${API_BASE_URL}/categories/${id}`);
export const createCategory = (formData) =>
axios.post(`${API_BASE_URL}/categories`, formData, {
headers: { 'Content-Type': 'multipart/form-data' }
});
export const updateCategory = (id, formData) =>
axios.put(`${API_BASE_URL}/categories/${id}`, formData, {
headers: { 'Content-Type': 'multipart/form-data' }
});
export const deleteCategory = (id) => axios.delete(`${API_BASE_URL}/categories/${id}`);

// ---------- PRODUCT ----------
export const getProducts = () => axios.get(`${API_BASE_URL}/products`);
export const getProduct = (id) => axios.get(`${API_BASE_URL}/products/${id}`);
export const createProduct = (formData) =>
axios.post(`${API_BASE_URL}/products`, formData, {
headers: { 'Content-Type': 'multipart/form-data' }
});
export const updateProduct = (id, formData) =>
axios.put(`${API_BASE_URL}/products/${id}`, formData, {
headers: { 'Content-Type': 'multipart/form-data' }
});
export const deleteProduct = (id) => axios.delete(`${API_BASE_URL}/products/${id}`);

// ---------- ORDER ----------
export const getOrders = () => axios.get(`${API_BASE_URL}/orders`);
