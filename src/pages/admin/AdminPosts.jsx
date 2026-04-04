import { useState, useEffect } from 'react';
import { Trash2, Phone, Mail, Search } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { getPosts, deletePost } from '../../services/postService';
import Loading from '../../components/Loading';
import styles from './AdminPosts.module.css';

function AdminPosts() {
  const { token } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('');

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const data = await getPosts();
      setPosts(data);
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
      await deletePost(id, token);
      setPosts(posts.filter((p) => p._id !== id));
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

  const getTypeClass = (type) => {
    switch (type) {
      case 'Perdido':
        return styles.typePerdido;
      case 'Encontrado':
        return styles.typeEncontrado;
      case 'Adopción':
        return styles.typeAdopcion;
      default:
        return '';
    }
  };

  const filteredPosts = posts.filter((post) => {
    const search = searchTerm.toLowerCase();
    const matchesSearch = 
      post.title?.toLowerCase().includes(search) ||
      post.description?.toLowerCase().includes(search) ||
      post.user?.name?.toLowerCase().includes(search);
    
    const matchesType = filterType === '' || post.type === filterType;

    return matchesSearch && matchesType;
  });

  if (loading) {
    return <Loading message="Cargando anuncios..." />;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Anuncios del Tablón</h2>
        <span className={styles.count}>{posts.length} anuncios</span>
      </div>

      <div className={styles.filters}>
        <div className={styles.searchBar}>
          <Search size={20} className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Buscar por titulo, descripcion o usuario..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchInput}
          />
        </div>

        <div className={styles.filterType}>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className={styles.selectType}
          >
            <option value="">Todos los tipos</option>
            <option value="Perdido">Perdido</option>
            <option value="Encontrado">Encontrado</option>
            <option value="Adopcion">Adopción</option>
          </select>
        </div>
      </div>

      {(searchTerm || filterType) && (
        <p className={styles.resultCount}>
          {filteredPosts.length} resultado{filteredPosts.length !== 1 ? 's' : ''}
          {filterType && ` de tipo "${filterType}"`}
        </p>
      )}

      {error && <p className={styles.error}>{error}</p>}

      <div className={styles.grid}>
        {filteredPosts.map((post) => (
          <div key={post._id} className={styles.card}>
            <div className={styles.cardHeader}>
              <span className={`${styles.type} ${getTypeClass(post.type)}`}>
                {post.type}
              </span>
              <span className={styles.date}>{formatDate(post.createdAt)}</span>
            </div>

            {post.image && (
              <img src={post.image} alt={post.title} className={styles.image} />
            )}

            <h3>{post.title}</h3>
            <p className={styles.description}>{post.description}</p>

            <div className={styles.contact}>
              {post.contact?.kind === 'Telefono' ? (
                <span><Phone size={14} /> {post.contact.value}</span>
              ) : (
                <span><Mail size={14} /> {post.contact.value}</span>
              )}
            </div>

            <div className={styles.cardFooter}>
              <span className={styles.author}>
                Por: {post.user?.name || 'Usuario'}
              </span>
              <button
                onClick={() => handleDelete(post._id, post.title)}
                className={styles.btnDelete}
              >
                <Trash2 size={18} />
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredPosts.length === 0 && (searchTerm || filterType) && (
        <p className={styles.empty}>No se encontraron anuncios con esos filtros.</p>
      )}

      {posts.length === 0 && !searchTerm && !filterType && (
        <p className={styles.empty}>No hay anuncios en el tablón.</p>
      )}
    </div>
  );
}

export default AdminPosts;