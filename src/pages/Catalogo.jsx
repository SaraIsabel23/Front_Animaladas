import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import ProductCard from '../components/ProductCard';
import Pagination from '../components/Pagination';
import Loading from '../components/Loading';
import Error from '../components/Error';
import { getProducts } from '../services/productService';
import styles from './Catalogo.module.css';

const ITEMS_PER_PAGE = 8;

const subcategoriesByCategory = {
  Perros: ['Alimentacion', 'Snacks', 'Juguetes', 'Higiene', 'Antiparasitarios', 'Camas', 'Paseo', 'Complementos'],
  Gatos: ['Alimentacion', 'Snacks', 'Juguetes', 'Higiene', 'Antiparasitarios', 'Camas', 'Arenas', 'Complementos'],
  Pajaros: ['Alimentacion', 'Snacks', 'Jaulas', 'Higiene', 'Complementos'],
  Roedores: ['Alimentacion', 'Snacks', 'Jaulas', 'Higiene', 'Complementos'],
  Tortugas: ['Alimentacion', 'Tortugueras', 'Complementos'],
  Peces: ['Alimentacion', 'Acuarios', 'Complementos']
};

function Catalogo() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  
  const categoriaActiva = searchParams.get('categoria') || '';
  const subcategoriaActiva = searchParams.get('subcategoria') || '';
  const [busqueda, setBusqueda] = useState('');

  const categorias = ['Perros', 'Gatos', 'Pajaros', 'Roedores', 'Peces', 'Tortugas'];

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [categoriaActiva, subcategoriaActiva, busqueda]);

  useEffect(() => {
    const handleClickOutside = () => setDropdownOpen(null);
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const filtrarProductos = () => {
    let productosFiltrados = products;

    if(!categoriaActiva && !subcategoriaActiva && !busqueda) {
        return productosFiltrados.filter((product) => product.featured === true);
    }

    if (categoriaActiva) {
      productosFiltrados = productosFiltrados.filter(
        (product) => product.category === categoriaActiva
      );
    }

    if (subcategoriaActiva) {
      productosFiltrados = productosFiltrados.filter(
        (product) => product.subcategory === subcategoriaActiva
      );
    }

    if (busqueda) {
      productosFiltrados = productosFiltrados.filter((product) =>
        product.name.toLowerCase().includes(busqueda.toLowerCase())
      );
    }

    return productosFiltrados;
  };

  const handleCategoriaClick = (e, categoria) => {
    e.stopPropagation();
    if (dropdownOpen === categoria) {
      setDropdownOpen(null);
    } else {
      setDropdownOpen(categoria);
    }
  };

  const handleVerTodos = (e, categoria) => {
    e.stopPropagation();
    setSearchParams({ categoria });
    setDropdownOpen(null);
  };

  const handleSubcategoriaClick = (e, categoria, subcategoria) => {
    e.stopPropagation();
    setSearchParams({ categoria, subcategoria });
    setDropdownOpen(null);
  };

  const limpiarFiltros = () => {
    setSearchParams({});
    setBusqueda('');
  };

  const productosFiltrados = filtrarProductos();
  const totalPages = Math.ceil(productosFiltrados.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedProducts = productosFiltrados.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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
                <div key={categoria} className={styles.categoriaWrapper}>
                  <button
                    onClick={(e) => handleCategoriaClick(e, categoria)}
                    className={`${styles.categoriaBtn} ${
                      categoriaActiva === categoria ? styles.activa : ''
                    }`}
                  >
                    {categoria}
                    <ChevronDown size={16} className={`${styles.chevron} ${dropdownOpen === categoria ? styles.chevronOpen : ''}`} />
                  </button>
                  
                  {dropdownOpen === categoria && (
                    <div className={styles.dropdown}>
                      <button 
                        onClick={(e) => handleVerTodos(e, categoria)}
                        className={styles.dropdownItem}
                      >
                        Ver todos
                      </button>
                      {subcategoriesByCategory[categoria].map((sub) => (
                        <button
                          key={sub}
                          onClick={(e) => handleSubcategoriaClick(e, categoria, sub)}
                          className={`${styles.dropdownItem} ${
                            subcategoriaActiva === sub ? styles.dropdownItemActiva : ''
                          }`}
                        >
                          {sub}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {(categoriaActiva || subcategoriaActiva || busqueda) && (
              <button onClick={limpiarFiltros} className={styles.limpiarBtn}>
                Limpiar filtros
              </button>
            )}
          </div>

          {(categoriaActiva || subcategoriaActiva) && (
            <div className={styles.filtrosActivos}>
              {categoriaActiva && <span className={styles.tag}>{categoriaActiva}</span>}
              {subcategoriaActiva && <span className={styles.tag}>{subcategoriaActiva}</span>}
            </div>
          )}

          {loading && <Loading message="Cargando productos..." />}
          
          {error && <Error message={error} />}

          {!loading && !error && (
            <>
              <p className={styles.resultados}>
                {!categoriaActiva && !subcategoriaActiva && !busqueda
                  ? 'Productos destacados'
                  : `${productosFiltrados.length} productos encontrados`
                }
              </p>

              {productosFiltrados.length === 0 ? (
                <p className={styles.mensaje}>No hay productos disponibles</p>
              ) : (
                <>
                  <div className={styles.grid}>
                    {paginatedProducts.map((product) => (
                      <ProductCard key={product._id} product={product} />
                    ))}
                  </div>

                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                </>
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