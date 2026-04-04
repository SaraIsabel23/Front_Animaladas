import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Upload, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { getProductById, createProduct, updateProduct } from '../../services/productService';
import { uploadImage } from '../../services/uploadService';
import Loading from '../../components/Loading';
import styles from './AdminProductoForm.module.css';

const categorias = ['Perros', 'Gatos', 'Pajaros', 'Roedores', 'Tortugas', 'Peces'];

const subcategoriasPorCategoria = {
  Perros:   ['Alimentacion', 'Snacks', 'Juguetes', 'Higiene', 'Antiparasitarios', 'Camas', 'Paseo', 'Complementos'],
  Gatos:    ['Alimentacion', 'Snacks', 'Juguetes', 'Higiene', 'Antiparasitarios', 'Camas', 'Arenas', 'Complementos'],
  Pajaros:  ['Alimentacion', 'Snacks', 'Jaulas', 'Higiene', 'Complementos'],
  Roedores: ['Alimentacion', 'Snacks', 'Jaulas', 'Higiene', 'Complementos'],
  Tortugas: ['Alimentacion', 'Tortugueras', 'Complementos'],
  Peces:    ['Alimentacion', 'Acuarios', 'Complementos'],
};

function AdminProductoForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useAuth();
  const isEditing = Boolean(id);

  const [loading, setLoading] = useState(isEditing);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    size: '',
    category: 'Perros',
    subcategory: '',
    image: '',
    featured: false,
  });

  useEffect(() => {
    if (isEditing) {
      fetchProduct();
    }
  }, [id]);

  const fetchProduct = async () => {
    try {
      const product = await getProductById(id);
      setFormData({
        name: product.name || '',
        description: product.description || '',
        price: product.price || '',
        size: product.size || '',
        category: product.category || 'Perros',
        subcategory: product.subcategory || '',
        image: product.image || '',
        featured: product.featured || false,
      });
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name === 'category') {
      setFormData({
        ...formData,
        category: value,
        subcategory: '',
      });
    } else {
      setFormData({
        ...formData,
        [name]: type === 'checkbox' ? checked : value,
      });
    }
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
      const productData = {
        ...formData,
        price: parseFloat(formData.price),
      };

      if (isEditing) {
        await updateProduct(id, productData, token);
      } else {
        await createProduct(productData, token);
      }

      navigate('/admin/productos');
    } catch (error) {
      setError(error.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <Loading message="Cargando producto..." />;
  }

  return (
    <div className={styles.container}>
      <button onClick={() => navigate('/admin/productos')} className={styles.backBtn}>
        <ArrowLeft size={20} />
        Volver a productos
      </button>

      <div className={styles.formWrapper}>
        <h2>{isEditing ? 'Editar producto' : 'Nuevo producto'}</h2>

        {error && <p className={styles.error}>{error}</p>}

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.field}>
            <label htmlFor="name">Nombre</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="description">Descripción</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              required
            />
          </div>

          <div className={styles.row}>
            <div className={styles.field}>
              <label htmlFor="price">Precio (euros)</label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                step="0.01"
                min="0"
                required
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="size">Tamano</label>
              <input
                type="text"
                id="size"
                name="size"
                value={formData.size}
                onChange={handleChange}
                placeholder="Ej: 500g, 1kg, 2L"
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="category">Categoría</label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              >
                {categorias.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div className={styles.field}>
              <label htmlFor="subcategory">Subcategoría</label>
              <select
                id="subcategory"
                name="subcategory"
                value={formData.subcategory}
                onChange={handleChange}
              >
                <option value="">Sin subcategoría</option>
                {subcategoriasPorCategoria[formData.category]?.map((sub) => (
                  <option key={sub} value={sub}>{sub}</option>
                ))}
              </select>
            </div>
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

          <div className={styles.checkboxField}>
            <input
              type="checkbox"
              id="featured"
              name="featured"
              checked={formData.featured}
              onChange={handleChange}
            />
            <label htmlFor="featured">Producto destacado</label>
          </div>

          <div className={styles.buttons}>
            <button
              type="button"
              onClick={() => navigate('/admin/productos')}
              className={styles.cancelBtn}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className={styles.submitBtn}
              disabled={saving || uploading}
            >
              {saving ? 'Guardando...' : isEditing ? 'Actualizar' : 'Crear producto'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdminProductoForm;