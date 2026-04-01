import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import ProductCard from '../components/ProductCard';
import styles from './Catalogo.module.css';

const API_URL = import.meta.env.VITE_APP_API_URL;

function Catalogo() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  
  const categoriaActiva = searchParams.get('categoria') || '';
  const [busqueda, setBusqueda] = useState('');

  const categorias = ['Perros', 'Gatos', 'Pájaros', 'Roedores', 'Peces', 'Tortugas'];

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/api/products`);
      if (!response.ok) {
        throw new Error('Error al cargar los productos');
      }
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const filtrarProductos = () => {
    let productosFiltrados = products;

    if (categoriaActiva) {
      productosFiltrados = productosFiltrados.filter(
        (product) => product.category === categoriaActiva
      );
    }

    if (busqueda) {
      productosFiltrados = productosFiltrados.filter((product) =>
        product.name.toLowerCase().includes(busqueda.toLowerCase())
      );
    }

    return productosFiltrados;
  };

  const handleCategoriaClick = (categoria) => {
    if (categoria === categoriaActiva) {
      setSearchParams({});
    } else {
      setSearchParams({ categoria });
    }
  };

  const productosFiltrados = filtrarProductos();

  return (
    <div>
      <Header />
      <main className={styles.main}>
        <div className={styles.container}>
          <h1>Catálogo</h1>

          <div className={styles.filtros}>
            <input
              type="text"
              placeholder="Buscar productos..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className={styles.buscador}
            />

            <div className={styles.categorias}>
              {categorias.map((categoria) => (
                <button
                  key={categoria}
                  onClick={() => handleCategoriaClick(categoria)}
                  className={`${styles.categoriaBtn} ${
                    categoriaActiva === categoria ? styles.activa : ''
                  }`}
                >
                  {categoria}
                </button>
              ))}
            </div>
          </div>

          {loading && <p className={styles.mensaje}>Cargando productos...</p>}
          
          {error && <p className={styles.error}>{error}</p>}

          {!loading && !error && (
            <>
              <p className={styles.resultados}>
                {productosFiltrados.length} productos encontrados
              </p>

              {productosFiltrados.length === 0 ? (
                <p className={styles.mensaje}>No hay productos disponibles</p>
              ) : (
                <div className={styles.grid}>
                  {productosFiltrados.map((product) => (
                    <ProductCard key={product._id} product={product} />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Catalogo;