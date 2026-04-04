import { fetchApi } from './api';

const API_URL = import.meta.env.VITE_APP_API_URL;

export const getArticles = async () => {
  return fetchApi('/api/articles');
};

export const getArticleById = async (id) => {
  return fetchApi(`/api/articles/${id}`);
};

export const createArticle = async (articleData, token) => {
  const response = await fetch(`${API_URL}/api/articles`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(articleData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Error al crear el artículo');
  }

  return data;
};

export const updateArticle = async (id, articleData, token) => {
  const response = await fetch(`${API_URL}/api/articles/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(articleData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Error al actualizar el artículo');
  }

  return data;
};

export const deleteArticle = async (id, token) => {
  const response = await fetch(`${API_URL}/api/articles/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.message || 'Error al eliminar el artículo');
  }

  return true;
};