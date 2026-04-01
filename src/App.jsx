import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from './pages/Home';
import Catalogo from './pages/Catalogo';

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalogo" element={<Catalogo />} />
        </Routes>
    
    </BrowserRouter>

  );
};

export default App;




/*import { useEffect, useState } from "react";


const App = () => {
  const [data, setData] = useState(null)
  const urlApi = import.meta.env.VITE_APP_API_URL || 'http://localhost:3000/'
  const [update, setUpdate] = useState(false)

  const fetchData = async () => {
    try {
      const response = await fetch(urlApi)
      const resData = await response.text()   // ← CAMBIO IMPORTANTE
      setData(resData)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [update])

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>Frontend funcionando</h1>
      <p>Respuesta del backend:</p>
      <strong>{data}</strong>
    </div>
  )
}

export default App*/