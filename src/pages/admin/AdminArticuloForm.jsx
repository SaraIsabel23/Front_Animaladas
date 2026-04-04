import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Upload, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { getArticleById, createArticle, updateArticle } from '../../services/articleService';
import { uploadImage } from '../../services/uploadService';
import Loading from '../../components/Loading';
import styles from './AdminArticuloForm.module.css';

function AdminArticuloForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useAuth();
  const isEditing = Boolean(id);

  const [loading, setLoading] = useState(isEditing);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    image: '',
  });

  useEffect(() => {
    if (isEditing) {
      fetchArticle();
    }
  }, [id]);

  const fetchArticle = async () => {
    try {
      const article = await getArticleById(id);
      setFormData({
        title: article.title || '',
        content: article.content || '',
        image: article.image || '',
      });
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
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

    try {
      setSaving(true);

      if (isEditing) {
        await updateArticle(id, formData, token);
      } else {
        await createArticle(formData, token);
      }

      navigate('/admin/articulos');
    } catch (error) {
      setError(error.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <Loading message="Cargando artículo..." />;
  }

  return (
    <div className={styles.container}>
      <button onClick={() => navigate('/admin/articulos')} className={styles.backBtn}>
        <ArrowLeft size={20} />
        Volver a artículos
      </button>

      <div className={styles.formWrapper}>
        <h2>{isEditing ? 'Editar artículo' : 'Nuevo artículo'}</h2>

        {error && <p className={styles.error}>{error}</p>}

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.field}>
            <label htmlFor="title">Título</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="content">Contenido</label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              rows={12}
              required
            />
          </div>

          <div className={styles.field}>
            <label>Imagen</label>
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

          <div className={styles.buttons}>
            <button
              type="button"
              onClick={() => navigate('/admin/articulos')}
              className={styles.cancelBtn}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className={styles.submitBtn}
              disabled={saving || uploading}
            >
              {saving ? 'Guardando...' : isEditing ? 'Actualizar' : 'Crear articulo'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdminArticuloForm;