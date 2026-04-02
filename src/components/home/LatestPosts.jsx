import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import PostCard from '../PostCard';
import { getPosts } from '../../services/postService';
import styles from './LatestPosts.module.css';

function LatestPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const data = await getPosts();
      setPosts(data.slice(0, 3));
    } catch (error) {
      console.error('Error cargando anuncios:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading || posts.length === 0) {
    return null;
  }

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div>
            <h2>Tablon de anuncios</h2>
            <p>Mascotas perdidas, encontradas y en adopcion</p>
          </div>
          <Link to="/tablon" className={styles.verTodos}>
            Ver todos
            <ArrowRight size={18} />
          </Link>
        </div>

        <div className={styles.grid}>
          {posts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default LatestPosts;