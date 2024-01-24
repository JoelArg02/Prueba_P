import React, { useState, useEffect } from 'react';
import { Card, ListGroup, Form } from 'react-bootstrap';
import { getPruebas } from '../../api/pruebas'; // Importa la función getPruebas
import {getPreguntasById} from '../../api/preguntas.js';
function VerPruebas() {
  const [pruebas, setPruebas] = useState([]);
  const [preguntas, setPreguntas] = useState([]);
  const [selectedPrueba, setSelectedPrueba] = useState(null);

  useEffect(() => {
    // Utiliza la función getPruebas para obtener datos desde la API
    getPruebas()
      .then((data) => {
        setPruebas(data); // Establece las pruebas obtenidas desde la API en el estado
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handlePruebaSelect = async (event) => {
    const selectedId = parseInt(event.target.value);
    setSelectedPrueba(selectedId);

    // Realiza una solicitud a la API para obtener preguntas de la prueba seleccionada
    if (selectedId) {
      try {
        // Supongamos que tienes una función en api.js para obtener preguntas de una prueba específica
        const preguntasDePrueba = await getPreguntasPorPrueba(selectedId);
        setPreguntas(preguntasDePrueba);
      } catch (error) {
        console.error(error);
        setPreguntas([]); // En caso de error, establece las preguntas como vacías
      }
    } else {
      setPreguntas([]);
    }
  };

  const getPreguntasPorPrueba = async (pruebaId) => {
    // Realiza una solicitud a la API para obtener preguntas de una prueba específica
    try {
      const response = await getPruebas(pruebaId);
      if (!response.ok) {
        throw new Error('Error al obtener preguntas');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  };

  return (
    <div>
      <h1>Pruebas Disponibles</h1>
      <Form.Group>
        <Form.Label>Seleccionar Prueba:</Form.Label>
        <Form.Control as="select" onChange={handlePruebaSelect} value={selectedPrueba}>
          <option value="">Seleccionar Prueba</option>
          {pruebas.map((prueba) => (
            <option key={prueba.id_prueba} value={prueba.id_prueba}>
              Prueba #{prueba.id_prueba}
            </option>
          ))}
        </Form.Control>
      </Form.Group>

      {selectedPrueba && (
        <div>
          <h2>Preguntas de la Prueba #{selectedPrueba}</h2>
          <ul>
            {preguntas.map((pregunta, index) => (
              <li key={index}>{pregunta}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default VerPruebas;
