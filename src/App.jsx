import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from './pages/Home';
import Catalogo from './pages/Catalogo';
import ProductDetail from './pages/ProductDetail';
import Blog from './pages/Blog';
import ArticleDetail from './pages/ArticleDetail';
import Tablon from "./pages/Tablon";
import NuevoAnuncio from "./pages/NuevoAnuncio";
import PostDetail from './pages/PostDetail';
import Register from "./pages/Register";
import Login from './pages/Login';
import Contacto from './pages/Contacto';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';
import Dashboard from './pages/admin/Dashboard';
import AdminHome from './pages/admin/AdminHome';
import AdminProductos from './pages/admin/AdminProductos';
import AdminProductoForm from './pages/admin/AdminProductoForm';
import AdminArticulos from './pages/admin/AdminArticulos';
import AdminArticuloForm from './pages/admin/AdminArticuloForm';
import AdminPosts from './pages/admin/AdminPosts';

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalogo" element={<Catalogo />} />
          <Route path="/catalogo/:id" element={<ProductDetail />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<ArticleDetail />} />
          <Route path="/tablon" element={<Tablon />} />
          <Route path="/tablon/:id" element={<PostDetail />} />
          <Route path="/tablon/nuevo" element={
            <ProtectedRoute>
              <NuevoAnuncio />
            </ProtectedRoute>
          } />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/contacto" element={<Contacto />} />

          <Route path="/admin" element={
            <AdminRoute>
              <Dashboard />
            </AdminRoute>
          }>
            <Route index element={<AdminHome />} />
            <Route path="productos" element={<AdminProductos />} />
            <Route parth="productos/nuevo" element={<AdminProductoForm />} />
            <Route path="productos/editar/:id" element={<AdminProductoForm />} />
            <Route path="articulos" element={<AdminArticulos />} />
            <Route path="articulos/nuevo" element={<AdminArticuloForm />} />
            <Route path="articulos/editar/:id" element={<AdminArticuloForm />} />
            <Route path="posts" element={<AdminPosts />} />
          </Route>
        </Routes>
    </BrowserRouter>

  );
};

export default App;
