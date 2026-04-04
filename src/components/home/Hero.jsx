import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import styles from './Hero.module.css';

function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.heroContent}>
        <span className={styles.badge}>Más de 10 años de experiencia</span>
        <h1>Todo lo que tu mascota necesita</h1>
        <p>En Animaladas encontraras alimentación, juguetes, accesorios y mucho mas para perros, gatos, pájaros, roedores, peces y tortugas. Tu tienda de confianza en el barrio.</p>
        
        <div className={styles.heroButtons}>
          <Link to="/catalogo" className={styles.btnPrimary}>
            Ver catalogo
            <ArrowRight size={18} />
          </Link>
          <Link to="/contacto" className={styles.btnSecondary}>
            Contactar
          </Link>
        </div>
      </div>

      <div className={styles.heroImage}>
        <img src="/fachada.jpg" alt="Fachada de Animaladas en Vallecas" />
      </div>
    </section>
  );
}

export default Hero;