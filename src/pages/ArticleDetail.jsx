import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import Loading from '../components/Loading';
import Error from '../components/Error';
import { getArticleById } from '../services/articleService';
import styles from './ArticleDetail.module.css';

function ArticleDetail() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchArticle();
  }, [id]);

  const fetchArticle = async () => {
    try {
      setLoading(true);
      const data = await getArticleById(id);
      setArticle(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
  };

  return (
    <div>
      <Header />
      <main className={styles.main}>
        <div className={styles.container}>
          <Link to="/blog" className={styles.backLink}>
            <ArrowLeft size={20} />
            Volver al blog
          </Link>

          {loading && <Loading message="Cargando articulo..." />}

          {error && <Error message={error} />}

          {!loading && !error && article && (
            <article className={styles.article}>
              {article.image && (
                <div className={styles.imageWrapper}>
                  <img src={article.image} alt={article.title} />
                </div>
              )}

              <div className={styles.content}>
                <span className={styles.date}>{formatDate(article.createdAt)}</span>
                <h1>{article.title}</h1>
                <div className={styles.body}>
                  {article.content.split('\n').map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
              </div>
            </article>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default ArticleDetail;