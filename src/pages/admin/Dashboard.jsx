import { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Package, FileText, Megaphone, Home, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import styles from './Dashboard.module.css';

function Dashboard() {
  const { user, logout } = useAuth();
  const location = useLocation();

  const menuItems = [
    { path: '/admin/productos', label: 'Productos', icon: Package },
    { path: '/admin/articulos', label: 'Artículos', icon: FileText },
    { path: '/admin/posts', label: 'Anuncios', icon: Megaphone },
  ];

  const isActive = (path) => location.pathname.startsWith(path);

  return (
    <div className={styles.dashboard}>
      <aside className={styles.sidebar}>
        <div className={styles.logo}>
          <Link to="/">ANIMALADAS</Link>
          <span className={styles.adminBadge}>Admin</span>
        </div>

        <nav className={styles.nav}>
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`${styles.navItem} ${isActive(item.path) ? styles.active : ''}`}
            >
              <item.icon size={20} />
              {item.label}
            </Link>
          ))}
        </nav>

        <div className={styles.sidebarFooter}>
          <Link to="/" className={styles.navItem}>
            <Home size={20} />
            Ver tienda
          </Link>
          <button onClick={logout} className={styles.logoutBtn}>
            <LogOut size={20} />
            Cerrar sesión
          </button>
        </div>
      </aside>

      <main className={styles.main}>
        <header className={styles.header}>
          <h1>Panel de Administración</h1>
          <span className={styles.userName}>Hola, {user?.name}</span>
        </header>

        <div className={styles.content}>
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default Dashboard;