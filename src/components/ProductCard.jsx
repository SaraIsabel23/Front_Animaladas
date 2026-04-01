import { Link } from 'react-router-dom';
import styles from './ProductCard.module.css';

function ProductCard({ product }) {
  return (
    <Link to={`/catalogo/${product._id}`} className={styles.card}>
      <div className={styles.imageWrapper}>
        {product.image ? (
          <img src={product.image} alt={product.name} />
        ) : (
          <div className={styles.noImage}>Sin imagen</div>
        )}
      </div>
      <div className={styles.info}>
        <span className={styles.category}>{product.category}</span>
        <h3>{product.name}</h3>
        <p className={styles.price}>{product.price.toFixed(2)} €</p>
      </div>
    </Link>
  );
}

export default ProductCard;