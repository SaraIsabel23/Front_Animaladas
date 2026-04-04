import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { getArticles, deleteArticle } from '../../services/articleService';
import Loading from '../../components/Loading';
import styles from './AdminArticulos.module.css';

function AdminArticulos() {
  const { token } = useAuth();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const data = await getArticles();
      setArticles(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, title) => {
    if (!confirm(`Estás seguro de eliminar "${title}"?`)) {
      return;
    }

    try {
      await deleteArticle(id, token);
      setArticles(articles.filter((a) => a._id !== id));
    } catch (error) {
      alert(error.message);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  if (loading) {
    return <Loading message="Cargando artículos..." />;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Artículos del Blog</h2>
        <Link to="/admin/articulos/nuevo" className={styles.btnNuevo}>
          <Plus size={20} />
          Nuevo artículo
        </Link>
      </div>

      {error && <p className={styles.error}>{error}</p>}

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Imagen</th>
              <th>Título</th>
              <th>Fecha</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {articles.map((article) => (
              <tr key={article._id}>
                <td>
                  <img
                    src={article.image || '/placeholder.jpg'}
                    alt={article.title}
                    className={styles.articleImage}
                  />
                </td>
                <td>
                  <p className={styles.title}>{article.title}</p>
                  <p className={styles.excerpt}>
                    {article.content?.substring(0, 100)}...
                  </p>
                </td>
                <td>{formatDate(article.createdAt)}</td>
                <td>
                  <div className={styles.actions}>
                    <Link
                      to={`/admin/articulos/editar/${article._id}`}
                      className={styles.btnEdit}
                    >
                      <Edit size={18} />
                    </Link>
                    <button
                      onClick={() => handleDelete(article._id, article.title)}
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

        {articles.length === 0 && (
          <p className={styles.empty}>No hay artículos. ¡Crea el primero!</p>
        )}
      </div>
    </div>
  );
}

export default AdminArticulos;