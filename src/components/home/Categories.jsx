import { Link } from 'react-router-dom';
import styles from './Categories.module.css';

const categories = [
  { name: 'Perros', emoji: '🐕', color: '#8B4513' },
  { name: 'Gatos', emoji: '🐱', color: '#FF8C00' },
  { name: 'Pajaros', emoji: '🦜', color: '#32CD32' },
  { name: 'Roedores', emoji: '🐹', color: '#DEB887' },
  { name: 'Peces', emoji: '🐠', color: '#1E90FF' },
  { name: 'Tortugas', emoji: '🐢', color: '#2E8B57' }
];

function Categories() {
  return (
    <section className={styles.categories}>
      <div className={styles.container}>
        <h2>Nuestras categorías</h2>
        <p className={styles.subtitle}>Encuentra todo lo que necesitas para tu mascota</p>
        
        <div className={styles.grid}>
          {categories.map((category) => (
            <Link 
              to={`/catalogo?categoria=${category.name}`} 
              key={category.name}
              className={styles.card}
            >
              <div 
                className={styles.iconWrapper}
                style={{ backgroundColor: `${category.color}20` }}
              >
                <span className={styles.emoji}>{category.emoji}</span>
              </div>
              <h3>{category.name}</h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Categories;