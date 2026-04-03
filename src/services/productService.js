import { fetchApi } from './api';

const API_URL = import.meta.env.VITE_APP_API_URL;

export const getProducts = async () => {
  return fetchApi('/api/products');
};

export const getProductById = async (id) => {
  return fetchApi(`/api/products/${id}`);
};

export const createProduct = async (productData, token) => {
  const response = await fetch(`${API_URL}/api/products`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(productData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Error al crear el producto');
  }

  return data;
};

export const updateProduct = async (id, productData, token) => {
  const response = await fetch(`${API_URL}/api/products/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(productData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Error al actualizar el producto');
  }

  return data;
};

export const deleteProduct = async (id, token) => {
  const response = await fetch(`${API_URL}/api/products/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.message || 'Error al eliminar el producto');
  }

  return true;
};