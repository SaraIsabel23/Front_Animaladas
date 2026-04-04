# Front_Animaladas - Tienda de Mascotas

Frontend de la tienda de mascotas Animaladas, desarrolado con React y Vite.

## Demo

- **Web:** https://animaladas.netlify.app/
- **API:** https://back-animaladas-api.onrender.com/

## Tecnologias utilizadas

- React 18
- React Router DOM
- Vite
- CSS Modules
- Lucide React (iconos)


## Instalación

1. Clonar el repositorio:

   git clone https://github.com/SaraIsabel23/Front_Animaladas.git

2. Instalar dependencias:

   npm install

3. Crear archivo .env:
Variables de entorno(URL de la Api backend)
```js
VITE_APP_API_URL=http://localhost:5000
```

4. Ejecutar el servidor:
```bash
npm run dev
```

## Estructura del proyecto
```html
Front_Animaladas/
├── public/
|   ├── _redirects
|   └── fachada.jpg
├── src/
│   ├── components/
│   │   ├── home/
|   |   |   ├── Categories.jsx
│   │   |   ├── Categories.module.css
│   │   |   ├── Hero.jsx
│   │   |   ├── Hero.module.css
|   |   |   ├── LatestArticles.jsx
|   |   |   ├── LatestArticles.module.css
|   |   |   ├── LatestPosts.jsx
|   |   |   └── LatestPosts.module.css
│   │   ├── layout/
|   |   |   ├── Footer.jsx
|   |   |   ├── Footer.module.css
|   |   |   ├── Header.jsx
|   |   |   └── Header.module.css
|   |   ├── AdminRoute.jsx
|   |   ├── ArticleCard.jsx
|   |   ├── ArticleCard.module.css
|   |   ├── Error.jsx
|   |   ├── Error.module.css
|   |   ├── Loading.jsx
|   |   ├── Loading.module.css
|   |   ├── Pagination.jsx
|   |   ├── Pagination.module.css
|   |   ├── PostCard.jsx
|   |   ├── PostCard.module.css
|   |   ├── ProductCard.jsx
|   |   ├── ProductCard.module.css
|   |   └── ProtectedRoute.jsx
│   ├── context/
│   │   └── AuthContext.jsx│   │  
│   ├── pages/
│   │   ├── admin/
|   |   |   ├── AdminArticuloForm.jsx
│   │   |   ├── AdminArticuloFrom.module.css
│   │   |   ├── AdminArticulos.jsx
│   │   |   ├── AdminArticulos.module.css
|   |   |   ├── AdminHome.jsx
|   |   |   ├── AdminHome.module.css
|   |   |   ├── AdminPosts.jsx
|   |   |   ├── AdminPosts.module.css
|   |   |   ├── AdminProductoForm.jsx
|   |   |   ├── AdminProductoForm.module.css
|   |   |   ├── AdminProducto.jsx
|   |   |   ├── AdminProducto.module.css
|   |   |   ├── Dashboard.jsx
|   |   |   └── Dashboard.module.css
│   │   ├── ArticleDetail.jsx
│   │   ├── ArticleDetail.module.css
│   │   ├── Blog.jsx
│   │   ├── Blog.module.css
│   │   ├── Catalogo.jsx
│   │   ├── Catalogo.module.css
│   │   ├── Contacto.jsx
│   │   ├── Contacto.module.css
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── Login.module.css
│   │   ├── NuevoAnuncio.jsx
│   │   ├── NuevoAnuncio.module.css
│   │   ├── PostDetail.jsx
│   │   ├── PostDetail.module.css
│   │   ├── ProductDetail.jsx
│   │   ├── ProductDetail.module.css
│   │   ├── Register.jsx
│   │   ├── Register.module.css
│   │   ├── Tablon.jsx
│   │   └──Tablon.module.css
│   ├── services/
│   │   ├── api.js
│   │   ├── articleService.js
│   │   ├── authService.js
│   │   ├──  postService.js
│   │   ├──  productService.js
│   │   └── uploadService.js
│   ├── styles/
│   |    └── variables.css
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── .env.example
├── .gitignore
├── index.html
└── package.json
```

## Funcionalidades

### Publicas

- Pagina de inicio con productos destacados, articulos y anuncios
- Catalogo de productos con filtros por categoria y subcategoria
- Blog con articulos sobre mascotas
- Tablon de anuncios (perdidos, encontrados, adopcion)
- Pagina de contacto
- Registro e inicio de sesion


### Usuario autenticado

- Publicar anuncios en el tablon
- Subir imagenes


### Administrador

- Panel de administracion
- CRUD completo de productos
- CRUD completo de articulos
- Gestion de anuncios del tablon

#### Demo Admin

Para probar el panel de administracion:
- **Email:** demo@animaladas.com
- **Password:** Demo1234

## Variables de entorno

| Variable           | Descripcion            |
|--------------------|------------------------|
| `VITE_APP_API_URL` | URL de la API backend  |


### Desarrollo

```plaintext
VITE_APP_API_URL=http://localhost:5000
```

### Produccion

```plaintext
VITE_APP_API_URL=https://back-animaladas-api.onrender.com
```

## Despliegue

El frontend esta desplegado en Netlify. El archivo `public/_redirects` maneja las rutas de React Router:

```html
/*    /index.html   200
```

## Autora

Sara Isabel del Sastre Ortega
Desarrollado como proyecto del bootcamp The Bridge.
