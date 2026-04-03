import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit, Trash2, Star, Search } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { getProducts, deleteProduct } from '../../services/productService';
import Loading from '../../components/Loading';
import styles from './AdminProductos.module.css';

function AdminProductos() {
  const { token } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, name) => {
    if (!confirm(`Estas seguro de eliminar "${name}"?`)) {
      return;
    }

    try {
      await deleteProduct(id, token);
      setProducts(products.filter((p) => p._id !== id));
    } catch (error) {
      alert(error.message);
    }
  };

  const filteredProducts = products.filter((product) => {
    const search = searchTerm.toLowerCase();
    return (
      product.name?.toLowerCase().includes(search) ||
      product.category?.toLowerCase().includes(search) ||
      product.subcategory?.toLowerCase().includes(search) ||
      product.size?.toLowerCase().includes(search)
    );
  });

  if (loading) {
    return <Loading message="Cargando productos..." />;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Productos</h2>
        <Link to="/admin/productos/nuevo" className={styles.btnNuevo}>
          <Plus size={20} />
          Nuevo producto
        </Link>
      </div>

      <div className={styles.searchBar}>
        <Search size={20} className={styles.searchIcon} />
        <input
          type="text"
          placeholder="Buscar por nombre, categoria, subcategoria o tamano..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.searchInput}
        />
        {searchTerm && (
          <span className={styles.resultCount}>
            {filteredProducts.length} resultado{filteredProducts.length !== 1 ? 's' : ''}
          </span>
        )}
      </div>

      {error && <p className={styles.error}>{error}</p>}

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Imagen</th>
              <th>Nombre</th>
              <th>Categoria</th>
              <th>Tamano</th>
              <th>Precio</th>
              <th>Destacado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <tr key={product._id}>
                <td>
                  <img
                    src={product.image || '/placeholder.jpg'}
                    alt={product.name}
                    className={styles.productImage}
                  />
                </td>
                <td>{product.name}</td>
                <td>
                  <span className={styles.category}>{product.category}</span>
                  {product.subcategory && (
                    <span className={styles.subcategory}>{product.subcategory}</span>
                  )}
                </td>
                <td>{product.size || '-'}</td>
                <td>{product.price?.toFixed(2)} euros</td>
                <td>
                  {product.featured && <Star size={18} className={styles.starIcon} />}
                </td>
                <td>
                  <div className={styles.actions}>
                    <Link
                      to={`/admin/productos/editar/${product._id}`}
                      className={styles.btnEdit}
                    >
                      <Edit size={18} />
                    </Link>
                    <button
                      onClick={() => handleDelete(product._id, product.name)}
                      className={styles.btnDelete}
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredProducts.length === 0 && searchTerm && (
          <p className={styles.empty}>No se encontraron productos para "{searchTerm}"</p>
        )}

        {products.length === 0 && !searchTerm && (
          <p className={styles.empty}>No hay productos. Crea el primero!</p>
        )}
      </div>
    </div>
  );
}

export default AdminProductos;