import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/home/home"; // Asegúrate de que la ruta sea correcta
// import logo from "./logo.svg"; // Descomentar si usas el logo
import "./App.css"; // Descomentar si usas estilos de App.css

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
