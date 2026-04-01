const API_URL = import.meta.env.VITE_APP_API_URL;

export const fetchApi = async (endpoint) => {
  const response = await fetch(`${API_URL}${endpoint}`);
  
  if (!response.ok) {
    throw new Error('Error en la petición');
  }
  
  return response.json();
};