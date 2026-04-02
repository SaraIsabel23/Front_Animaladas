import { fetchApi } from './api';

const API_URL = import.meta.env.VITE_APP_API_URL;

export const getPosts = async () => {
  return fetchApi('/api/posts');
};

export const getPostById = async (id) => {
  return fetchApi(`/api/posts/${id}`);
};

export const createPost = async (postData, token) => {
  const response = await fetch(`${API_URL}/api/posts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(postData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Error al crear el anuncio');
  }

  return data;
};