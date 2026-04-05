import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Phone, Mail, User, LogOut, Settings } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import styles from './Header.module.css';

function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
        setMenuOpen(false);
    };

    return (
        <header className={styles.header}>
            <div className={styles.topBar}>
                <div className={styles.topBarContent}>
                    <ul className={styles.contactInfo}>
                        <li>
                            <Phone size={14} />
                            91 085 08 48
                        </li>
                        <li>
                            <Mail size={14} />
                            animaladas2016@gmail.com
                        </li>
                    </ul>
                    <a
                      href="https://instagram.com/animaladasvallecas"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.instagram}
                    >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                        </svg>
                        @animaladasvallecas
                    </a>
                </div>
            </div>

            <nav className={styles.nav}>
                <div className={styles.navContent}>
                    <Link to="/" className={styles.logo}>
                      ANIMALADAS
                    </Link>

                    <button
                      className={styles.menuButton}
                      onClick={() => setMenuOpen(!menuOpen)}
                    >
                      {menuOpen ? 'X' : '☰'}
                    </button>

                    <ul className={`${styles.navLinks} ${menuOpen ? styles.navLinksOpen : ''}`}>
                        <li><Link to="/" onClick={() => setMenuOpen(false)}>Inicio</Link></li>
                        <li><Link to="/catalogo" onClick={() => setMenuOpen(false)}>Catálogo</Link></li>
                        <li><Link to="/blog" onClick={() => setMenuOpen(false)}>Blog</Link></li>
                        <li><Link to="/tablon" onClick={() => setMenuOpen(false)}>Tablón de anuncios</Link></li>
                        <li><Link to="/contacto" onClick={() => setMenuOpen(false)}>Contacto</Link></li>
                        
                        {user ? (
                          <>
                            {user.role === 'admin' && (
                              <li>
                                <Link 
                                  to="/admin" 
                                  className={styles.adminBtn}
                                  onClick={() => setMenuOpen(false)}
                                >
                                  <Settings size={16} />
                                  Admin
                                </Link>
                              </li>
                            )}
                            <li className={styles.userInfo}>
                              <User size={16} />
                              {user.name}
                            </li>
                            <li>
                              <button onClick={handleLogout} className={styles.logoutBtn}>
                                <LogOut size={16} />
                                Salir
                              </button>
                            </li>
                          </>
                        ) : (
                          <li>
                            <Link 
                              to="/login" 
                              className={styles.loginBtn}
                              onClick={() => setMenuOpen(false)}
                            >
                              Iniciar sesión
                            </Link>
                          </li>
                        )}
                    </ul>
                </div>
            </nav>
        </header>
    );
}

export default Header;