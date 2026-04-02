import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { login } from '../services/authService';
import { useAuth } from '../context/AuthContext';
import styles from './Login.module.css';

function Login() {
  const navigate = useNavigate();
  const { saveAuth } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const { user, token } = await login(formData);
      saveAuth(user, token);
      navigate('/');
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
          <div className={styles.formWrapper}>
            <h1>Iniciar sesion</h1>
            <p className={styles.subtitle}>
              Accede a tu cuenta para publicar anuncios
            </p>

            {error && <p className={styles.error}>{error}</p>}

            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.field}>
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className={styles.field}>
                <label htmlFor="password">Contrasena</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>

              <button 
                type="submit" 
                className={styles.submitBtn}
                disabled={loading}
              >
                {loading ? 'Iniciando sesion...' : 'Iniciar sesion'}
              </button>
            </form>

            <p className={styles.registerLink}>
              No tienes cuenta? <Link to="/register">Registrate</Link>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Login;