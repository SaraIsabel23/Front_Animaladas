import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Phone, Mail, Calendar } from 'lucide-react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import Loading from '../components/Loading';
import { getPostById } from '../services/postService';
import styles from './PostDetail.module.css';

function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await getPostById(id);
        setPost(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'long',
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

  if (loading) {
    return (
      <div>
        <Header />
        <Loading message="Cargando anuncio..." />
        <Footer />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div>
        <Header />
        <main className={styles.main}>
          <div className={styles.container}>
            <p className={styles.error}>{error || 'Anuncio no encontrado'}</p>
            <Link to="/tablon" className={styles.backLink}>
              <ArrowLeft size={20} />
              Volver al tablón
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Header />
      <main className={styles.main}>
        <div className={styles.container}>
          <Link to="/tablon" className={styles.backLink}>
            <ArrowLeft size={20} />
            Volver al tablón
          </Link>

          <article className={styles.post}>
            <div className={styles.header}>
              <span className={`${styles.type} ${getTypeClass(post.type)}`}>
                {post.type}
              </span>
              <span className={styles.date}>
                <Calendar size={16} />
                {formatDate(post.createdAt)}
              </span>
            </div>

            <h1>{post.title}</h1>

            {post.image && (
              <div className={styles.imageWrapper}>
                <img src={post.image} alt={post.title} />
              </div>
            )}

            <div className={styles.content}>
              <p>{post.description}</p>
            </div>

            <div className={styles.contactCard}>
              <h3>Información de contacto</h3>
              <div className={styles.contactInfo}>
                {post.contact?.kind === 'Telefono' ? (
                  <a href={`tel:${post.contact.value}`} className={styles.contactLink}>
                    <Phone size={20} />
                    {post.contact.value}
                  </a>
                ) : (
                  <a href={`mailto:${post.contact.value}`} className={styles.contactLink}>
                    <Mail size={20} />
                    {post.contact.value}
                  </a>
                )}
              </div>
              {post.user?.name && (
                <p className={styles.author}>Publicado por: {post.user.name}</p>
              )}
            </div>
          </article>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default PostDetail;