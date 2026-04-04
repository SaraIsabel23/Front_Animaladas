import { useState, useEffect } from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import ArticleCard from '../components/ArticleCard';
import Pagination from '../components/Pagination';
import Loading from '../components/Loading';
import Error from '../components/Error';
import { getArticles } from '../services/articleService';
import styles from './Blog.module.css';

const ITEMS_PER_PAGE = 6;

function Blog() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      setLoading(true);
      const data = await getArticles();
      setArticles(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const totalPages = Math.ceil(articles.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedArticles = articles.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div>
      <Header />
      <main className={styles.main}>
        <div className={styles.container}>
          <h1>Blog</h1>
          <p className={styles.subtitle}>
            Consejos, noticias y curiosidades sobre el cuidado de tus mascotas
          </p>

          {loading && <Loading message="Cargando articulos..." />}

          {error && <Error message={error} />}

          {!loading && !error && (
            <>
              {articles.length === 0 ? (
                <p className={styles.mensaje}>No hay articulos publicados</p>
              ) : (
                <>
                  <div className={styles.grid}>
                    {paginatedArticles.map((article) => (
                      <ArticleCard key={article._id} article={article} />
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

export default Blog;