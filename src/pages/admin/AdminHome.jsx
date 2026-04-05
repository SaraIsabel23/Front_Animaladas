import { Link } from 'react-router-dom';
import { Package, FileText, Megaphone } from 'lucide-react';
import styles from './AdminHome.module.css';

function AdminHome() {
  const cards = [
    { 
      path: '/admin/productos', 
      label: 'Productos', 
      icon: Package,
      description: 'Gestiona el catálogo de productos'
    },
    { 
      path: '/admin/articulos', 
      label: 'Artículos', 
      icon: FileText,
      description: 'Crea y edita artículos del blog'
    },
    { 
      path: '/admin/posts', 
      label: 'Anuncios', 
      icon: Megaphone,
      description: 'Modera los anuncios del tablón'
    },
  ];

  return (
    <div className={styles.container}>
      <h2>Bienvenido al panel de administración</h2>
      <p className={styles.subtitle}>Selecciona una sección para gestionar</p>

      <div className={styles.grid}>
        {cards.map((card) => (
          <Link key={card.path} to={card.path} className={styles.card}>
            <card.icon size={40} className={styles.icon} />
            <h3>{card.label}</h3>
            <p>{card.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default AdminHome;