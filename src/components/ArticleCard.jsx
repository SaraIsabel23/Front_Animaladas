import { Link } from 'react-router-dom';
import styles from './ArticleCard.module.css';

function ArticleCard({ article }) {
  const formatDate = (dateString) => {
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
  };

  return (
    <Link to={`/blog/${article._id}`} className={styles.card}>
      <div className={styles.imageWrapper}>
        {article.image ? (
          <img src={article.image} alt={article.title} />
        ) : (
          <div className={styles.noImage}>Sin imagen</div>
        )}
      </div>
      <div className={styles.info}>
        <span className={styles.date}>{formatDate(article.createdAt)}</span>
        <h3>{article.title}</h3>
        <p className={styles.excerpt}>
          {article.content.substring(0, 120)}...
        </p>
        <span className={styles.readMore}>Leer más</span>
      </div>
    </Link>
  );
}

export default ArticleCard;