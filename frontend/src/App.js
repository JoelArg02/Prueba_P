import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/general/header"; // Asegúrate de que la ruta sea correcta
import Footer from "./components/general/footer"; // Asegúrate de que la ruta sea correcta
import Home from "./components/home/home"; // Asegúrate de que la ruta sea correcta
import VerPreguntas from "./components/questions/index";
import CrearPregunta from "./components/questions/create";
import EditarPregunta from "./components/questions/edit";

function App() {
  return (
    <Router>
      <Header />
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/questions/ver" element={<VerPreguntas />} />
          <Route path="/questions/crear" element={<CrearPregunta />} />
          <Route path="/questions/editar" element={<EditarPregunta />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
