import { Phone, Mail } from 'lucide-react';
import styles from './PostCard.module.css';

function PostCard({ post }) {
  const formatDate = (dateString) => {
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
  };

  const getTypeClass = (type) => {
    switch (type) {
      case 'Perdido':
        return styles.typePerdido;
      case 'Encontrado':
        return styles.typeEncontrado;
      case 'Adopcion':
        return styles.typeAdopcion;
      default:
        return '';
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        {post.image ? (
          <img src={post.image} alt={post.title} />
        ) : (
          <div className={styles.noImage}>Sin imagen</div>
        )}
        <span className={`${styles.type} ${getTypeClass(post.type)}`}>
          {post.type}
        </span>
      </div>

      <div className={styles.info}>
        <span className={styles.date}>{formatDate(post.createdAt)}</span>
        <h3>{post.title}</h3>
        <p className={styles.description}>{post.description}</p>

        <div className={styles.contact}>
          {post.contact.kind === 'Telefono' ? (
            <a href={`tel:${post.contact.value}`} className={styles.contactLink}>
              <Phone size={16} />
              {post.contact.value}
            </a>
          ) : (
            <a href={`mailto:${post.contact.value}`} className={styles.contactLink}>
              <Mail size={16} />
              {post.contact.value}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default PostCard;