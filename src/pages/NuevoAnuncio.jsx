import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { useAuth } from '../context/AuthContext';
import { createPost } from '../services/postService';
import styles from './NuevoAnuncio.module.css';

const tipos = ['Perdido', 'Encontrado', 'Adopcion'];
const tiposContacto = ['Telefono', 'Email'];

function NuevoAnuncio() {
  const navigate = useNavigate();
  const { token } = useAuth();
  const [loading, setLoading] = useState(false);
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log('[v0] Token:', token);
    console.log('[v0 User:', localStorage.getItem('user'));
    console.log('[v0] Token localStorage:', localStorage.getItem('token'));

    if(!token) {
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
              Comparte informacion sobre mascotas perdidas, encontradas o en adopcion
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
                  placeholder="Describe la mascota, donde se perdio/encontro, caracteristicas..."
                  rows={5}
                  required
                />
              </div>

              <div className={styles.field}>
                <label htmlFor="image">URL de imagen (opcional)</label>
                <input
                  type="url"
                  id="image"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  placeholder="https://ejemplo.com/imagen.jpg"
                />
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
                disabled={loading}
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