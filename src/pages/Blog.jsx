import { useState, useEffect } from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import ArticleCard from '../components/ArticleCard';
import Loading from '../components/Loading';
import Error from '../components/Error';
import { getArticles } from '../services/articleService';
import styles from './Blog.module.css';

function Blog() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
                <div className={styles.grid}>
                  {articles.map((article) => (
                    <ArticleCard key={article._id} article={article} />
                  ))}
                </div>
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