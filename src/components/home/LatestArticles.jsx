import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import ArticleCard from '../ArticleCard';
import { getArticles } from '../../services/articleService';
import styles from './LatestArticles.module.css';

function LatestArticles() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const data = await getArticles();
      setArticles(data.slice(0, 3)); // Solo los 3 ultimos
    } catch (error) {
      console.error('Error cargando articulos:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading || articles.length === 0) {
    return null; // No mostrar nada si no hay articulos
  }

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div>
            <h2>Ultimos articulos</h2>
            <p>Consejos y novedades para el cuidado de tu mascota</p>
          </div>
          <Link to="/blog" className={styles.verTodos}>
            Ver todos
            <ArrowRight size={18} />
          </Link>
        </div>

        <div className={styles.grid}>
          {articles.map((article) => (
            <ArticleCard key={article._id} article={article} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default LatestArticles;