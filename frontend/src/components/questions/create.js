import React, { useState } from "react";
import { Form, Button, Modal, Card } from "react-bootstrap";
import "./create.css";
function CrearPrueba() {
  const [showModal, setShowModal] = useState(false);
  const [numeroPreguntas, setNumeroPreguntas] = useState(0);
  const [preguntas, setPreguntas] = useState([]);
  const [preguntaActual, setPreguntaActual] = useState({
    enunciado: "",
    opciones: [],
    respuestaCorrecta: null,
  });
  const [opcion, setOpcion] = useState("");

  const handleAgregarPregunta = () => {
    if (preguntas.length < numeroPreguntas) {
      setShowModal(true);
    } else {
      alert("Ya has creado el número máximo de preguntas.");
    }
  };

  const handleGuardarPregunta = () => {
    if (preguntaActual.respuestaCorrecta === null) {
      alert("Selecciona una respuesta correcta.");
      return;
    }
    setPreguntas([...preguntas, preguntaActual]);
    setPreguntaActual({ enunciado: "", opciones: [], respuestaCorrecta: null });
    setShowModal(false);
  };

  const handleSeleccionarRespuestaCorrecta = (index) => {
    setPreguntaActual({
      ...preguntaActual,
      respuestaCorrecta: index,
    });
  };

  const handleCrearPrueba = (e) => {
    e.preventDefault();
    console.log("Prueba Creada", preguntas);
  };

  return (
    <>
      <div className="d-flex justify-content-center mt-4">
        <Card style={{ width: "75%" }} className="shadow">
          <Card.Body>
            <Card.Title>Formulario de Creación de Prueba</Card.Title>
            <Form onSubmit={handleCrearPrueba}>
              <Form.Group>
                <Form.Label>Número de Preguntas:</Form.Label>
                <Form.Control
                  type="number"
                  value={numeroPreguntas}
                  onChange={(e) => setNumeroPreguntas(Number(e.target.value))}
                  required
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Duración de la Prueba (en horas):</Form.Label>
                <Form.Control type="number" required />
              </Form.Group>

              <Form.Group>
                <Form.Label>Fecha de Inicio:</Form.Label>
                <Form.Control type="datetime-local" required />
              </Form.Group>

              <div id="preguntas-container">
                {preguntas.map((p, index) => (
                  <Card key={index}>
                    <Card.Body>
                      <Card.Title>{p.enunciado}</Card.Title>
                      <ul>
                        {p.opciones.map((o, i) => (
                          <li
                            key={i}
                            style={{
                              color:
                                i === p.respuestaCorrecta ? "green" : "black",
                            }}
                          >
                            {o}
                          </li>
                        ))}
                      </ul>
                    </Card.Body>
                  </Card>
                ))}
              </div>

              <Button variant="primary" onClick={handleAgregarPregunta}>
                Agregar Pregunta
              </Button>
              <Button variant="success" type="submit">
                Crear Prueba
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </div>
      {/* Modal para agregar preguntas */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Agregar Pregunta</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Enunciado de la Pregunta:</Form.Label>
            <Form.Control
              type="text"
              value={preguntaActual.enunciado}
              onChange={(e) =>
                setPreguntaActual({
                  ...preguntaActual,
                  enunciado: e.target.value,
                })
              }
              required
            />
          </Form.Group>

          <div id="opciones-container">
            {preguntaActual.opciones.map((o, index) => (
              <div
                key={index}
                onClick={() => handleSeleccionarRespuestaCorrecta(index)}
                style={{
                  cursor: "pointer",
                  color:
                    preguntaActual.respuestaCorrecta === index
                      ? "green"
                      : "black",
                }}
              >
                {o}
              </div>
            ))}
          </div>

          <Form.Group>
            <Form.Label>Opción:</Form.Label>
            <Form.Control
              type="text"
              value={opcion}
              onChange={(e) => setOpcion(e.target.value)}
            />
            <Button
              variant="secondary"
              onClick={() => {
                setPreguntaActual({
                  ...preguntaActual,
                  opciones: [...preguntaActual.opciones, opcion],
                });
                setOpcion("");
              }}
            >
              Agregar Opción
            </Button>
          </Form.Group>

          <Button variant="primary" onClick={handleGuardarPregunta}>
            Guardar Pregunta
          </Button>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default CrearPrueba;
