import { fetchApi } from './api';

export const getArticles = async () => {
  return fetchApi('/api/articles');
};

export const getArticleById = async (id) => {
  return fetchApi(`/api/articles/${id}`);
};