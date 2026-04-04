import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import PostCard from '../components/PostCard';
import Pagination from '../components/Pagination';
import Loading from '../components/Loading';
import Error from '../components/Error';
import { getPosts } from '../services/postService';
import styles from './Tablon.module.css';

const ITEMS_PER_PAGE = 6;
const tipos = ['Perdido', 'Encontrado', 'Adopcion'];

function Tablon() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tipoActivo, setTipoActivo] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [tipoActivo]);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const data = await getPosts();
      setPosts(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const filtrarPosts = () => {
    if (!tipoActivo) {
      return posts;
    }
    return posts.filter((post) => post.type === tipoActivo);
  };

  const handleTipoClick = (tipo) => {
    if (tipo === tipoActivo) {
      setTipoActivo('');
    } else {
      setTipoActivo(tipo);
    }
  };

  const postsFiltrados = filtrarPosts();
  const totalPages = Math.ceil(postsFiltrados.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedPosts = postsFiltrados.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div>
      <Header />
      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.header}>
            <div>
              <h1>Tablon de anuncios</h1>
              <p className={styles.subtitle}>
                Anuncios de mascotas perdidas, encontradas y en adopcion
              </p>
            </div>
            <Link to="/tablon/nuevo" className={styles.btnNuevo}>
              <Plus size={20} />
              Publicar anuncio
            </Link>
          </div>

          <div className={styles.filtros}>
            {tipos.map((tipo) => (
              <button
                key={tipo}
                onClick={() => handleTipoClick(tipo)}
                className={`${styles.filtroBtn} ${
                  tipoActivo === tipo ? styles.activo : ''
                } ${styles[`filtro${tipo}`]}`}
              >
                {tipo}
              </button>
            ))}
          </div>

          {loading && <Loading message="Cargando anuncios..." />}

          {error && <Error message={error} />}

          {!loading && !error && (
            <>
              <p className={styles.resultados}>
                {postsFiltrados.length} anuncios encontrados
              </p>

              {postsFiltrados.length === 0 ? (
                <p className={styles.mensaje}>No hay anuncios publicados</p>
              ) : (
                <>
                  <div className={styles.grid}>
                    {paginatedPosts.map((post) => (
                      <PostCard key={post._id} post={post} />
                    ))}
                  </div>

                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                </>
              )}
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Tablon;