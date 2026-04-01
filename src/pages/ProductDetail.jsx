import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import Loading from '../components/Loading';
import Error from '../components/Error';
import { getProductById } from '../services/productService';
import styles from './ProductDetail.module.css';

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const data = await getProductById(id);
      setProduct(data);
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
          <Link to="/catalogo" className={styles.backLink}>
            <ArrowLeft size={20} />
            Volver al catálogo
          </Link>

          {loading && <Loading message="Cargando producto..." />}

          {error && <Error message={error} />}

          {!loading && !error && product && (
            <div className={styles.productGrid}>
              <div className={styles.imageWrapper}>
                {product.image ? (
                  <img src={product.image} alt={product.name} />
                ) : (
                  <div className={styles.noImage}>Sin imagen</div>
                )}
              </div>

              <div className={styles.info}>
                <span className={styles.category}>{product.category}</span>
                {product.subcategory && (
                  <span className={styles.subcategory}>{product.subcategory}</span>
                )}
                <h1>{product.name}</h1>
                <p className={styles.description}>{product.description}</p>

                {product.size && (
                  <p className={styles.size}>Tamano: {product.size}</p>
                )}

                <p className={styles.price}>{product.price.toFixed(2)} €</p>

                <div className={styles.stock}>
                  {product.stock > 0 ? (
                    <span className={styles.inStock}>En stock ({product.stock} disponibles)</span>
                  ) : (
                    <span className={styles.outStock}>Sin stock</span>
                  )}
                </div>

                <div className={styles.contactCta}>
                  <p>Para comprar este producto, visítanos en tienda o contáctanos:</p>
                  <a href="tel:910850848" className={styles.btnPhone}>
                    Llamar al 910 850 848
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default ProductDetail;