import React, { useState, useEffect } from "react";
import { Card, ListGroup, Form } from "react-bootstrap";
import { getPruebas } from "../../api/pruebas";
import { getPreguntasById } from "../../api/preguntas";

function VerPruebas() {
  const [pruebas, setPruebas] = useState([]);
  const [preguntas, setPreguntas] = useState([]);
  const [selectedPrueba, setSelectedPrueba] = useState(null);

  useEffect(() => {
    getPruebas()
      .then((data) => {
        setPruebas(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handlePruebaSelect = async (event) => {
    const selectedId = parseInt(event.target.value);
    setSelectedPrueba(selectedId);

    if (selectedId) {
      try {
        const preguntasDePrueba = await getPreguntasById(selectedId);
        setPreguntas(preguntasDePrueba);
      } catch (error) {
        console.error(error);
        setPreguntas([]);
      }
    } else {
      setPreguntas([]);
    }
  };

  return (
    <div>
      <h1>Pruebas Disponibles</h1>
      <Form.Group>
        <Form.Label>Seleccionar Prueba:</Form.Label>
        <Form.Control
          as="select"
          onChange={handlePruebaSelect}
          value={selectedPrueba}
        >
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
          {preguntas.map((pregunta, index) => (
            <Card key={index} style={{ marginBottom: "10px" }}>
              <Card.Body>
                <Card.Title>{pregunta.enunciado}</Card.Title>
                <ListGroup>
                  {pregunta.opciones.map((opcion, idx) => (
                    <ListGroup.Item
                      key={idx}
                      style={{
                        backgroundColor:
                          idx === pregunta.respuesta_correcta ? "#d1e7dd" : "",
                      }}
                    >
                      {opcion}
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Card.Body>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

export default VerPruebas;
