const API_URL = import.meta.env.VITE_APP_API_URL;

export const uploadImage = async (file, token) => {
  const formData = new FormData();
  formData.append('image', file);

  const response = await fetch(`${API_URL}/api/upload`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    body: formData,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Error al subir la imagen');
  }

  return data;
};