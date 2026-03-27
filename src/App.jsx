import { useEffect, useState } from "react";

function App() {
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    fetch(import.meta.env.VITE_API_URL)
      .then(res => res.text())
      .then(data => setMensaje(data))
      .catch(err => console.error("Error:", err));
  }, []);

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>Frontend funcionando</h1>
      <p>Respuesta del backend:</p>
      <strong>{mensaje}</strong>
    </div>
  );
}

export default App;