import { fetchApi } from './api';

export const getProducts = async () => {
  return fetchApi('/api/products');
};

export const getProductById = async (id) => {
  return fetchApi(`/api/products/${id}`);
};

export const getProductsByCategory = async (category) => {
  return fetchApi(`/api/products?category=${category}`);
};