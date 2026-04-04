import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, X } from 'lucide-react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { useAuth } from '../context/AuthContext';
import { createPost } from '../services/postService';
import { uploadImage } from '../services/uploadService';
import styles from './NuevoAnuncio.module.css';

const tipos = ['Perdido', 'Encontrado', 'Adopcion'];
const tiposContacto = ['Telefono', 'Email'];

function NuevoAnuncio() {
  const navigate = useNavigate();
  const { token } = useAuth();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'Perdido',
    image: '',
    contactKind: 'Telefono',
    contactValue: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setUploading(true);
      setError('');
      const data = await uploadImage(file, token);
      setFormData({
        ...formData,
        image: data.url,
      });
    } catch (error) {
      setError(error.message);
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveImage = () => {
    setFormData({
      ...formData,
      image: '',
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      setError('No hay sesión activa. Por favor inicia sesión de nuevo.');
      return;
    }

    try {
      setLoading(true);
      await createPost({
        title: formData.title,
        description: formData.description,
        type: formData.type,
        image: formData.image,
        contact: {
          kind: formData.contactKind,
          value: formData.contactValue,
        },
      }, token);
      navigate('/tablon');
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Header />
      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.formWrapper}>
            <h1>Publicar anuncio</h1>
            <p className={styles.subtitle}>
              Comparte información sobre mascotas perdidas, encontradas o en adopción
            </p>

            {error && <p className={styles.error}>{error}</p>}

            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.field}>
                <label htmlFor="type">Tipo de anuncio</label>
                <select
                  id="type"
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  required
                >
                  {tipos.map((tipo) => (
                    <option key={tipo} value={tipo}>{tipo}</option>
                  ))}
                </select>
              </div>

              <div className={styles.field}>
                <label htmlFor="title">Titulo</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Ej: Perro perdido en Vallecas"
                  required
                />
              </div>

              <div className={styles.field}>
                <label htmlFor="description">Descripcion</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe la mascota, donde se perdio/encontró, caracteristicas..."
                  rows={5}
                  required
                />
              </div>

              <div className={styles.field}>
                <label>Imagen (opcional)</label>
                {formData.image ? (
                  <div className={styles.imagePreview}>
                    <img src={formData.image} alt="Preview" />
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className={styles.removeImageBtn}
                    >
                      <X size={20} />
                    </button>
                  </div>
                ) : (
                  <label className={styles.uploadArea}>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      disabled={uploading}
                      className={styles.fileInput}
                    />
                    {uploading ? (
                      <span>Subiendo imagen...</span>
                    ) : (
                      <>
                        <Upload size={32} />
                        <span>Haz click o arrastra una imagen</span>
                      </>
                    )}
                  </label>
                )}
              </div>

              <div className={styles.row}>
                <div className={styles.field}>
                  <label htmlFor="contactKind">Tipo de contacto</label>
                  <select
                    id="contactKind"
                    name="contactKind"
                    value={formData.contactKind}
                    onChange={handleChange}
                    required
                  >
                    {tiposContacto.map((tipo) => (
                      <option key={tipo} value={tipo}>{tipo}</option>
                    ))}
                  </select>
                </div>

                <div className={styles.field}>
                  <label htmlFor="contactValue">
                    {formData.contactKind === 'Telefono' ? 'Numero de telefono' : 'Email'}
                  </label>
                  <input
                    type={formData.contactKind === 'Telefono' ? 'tel' : 'email'}
                    id="contactValue"
                    name="contactValue"
                    value={formData.contactValue}
                    onChange={handleChange}
                    placeholder={formData.contactKind === 'Telefono' ? '612345678' : 'correo@ejemplo.com'}
                    required
                  />
                </div>
              </div>

              <button 
                type="submit" 
                className={styles.submitBtn}
                disabled={loading || uploading}
              >
                {loading ? 'Publicando...' : 'Publicar anuncio'}
              </button>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default NuevoAnuncio;