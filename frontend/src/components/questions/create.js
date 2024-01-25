import React, { useState } from "react";
import { Form, Button, Modal, Card } from "react-bootstrap";
import "./create.css";
import { createPrueba } from "../../api/pruebas";
import { crearPreguntas } from "../../api/preguntas";
import LoadingComponent from "../general/loading";

function CrearPrueba() {
  const [showModal, setShowModal] = useState(false);
  const [fechaInicio, setFechaInicio] = useState(getFechaHoraActual());
  const [numeroPreguntas, setNumeroPreguntas] = useState(0);
  const [loading, setLoading] = useState(false);
  const [preguntas, setPreguntas] = useState([]);
  const [duracion, setDuracion] = useState(0);
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

  const handleCrearPrueba = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      console.log(numeroPreguntas, duracion, fechaInicio);
      const pruebaResponse = await createPrueba({
        numero_preguntas: numeroPreguntas,
        duracion: duracion,
        fecha_inicio: fechaInicio,
      });
      console.log(pruebaResponse);
      const pruebaId = pruebaResponse.id_prueba;
      console.log("Se imprime pruebaId", pruebaId);

      for (let pregunta of preguntas) {
        try {
          console.log("Se imprime pregunta", pregunta);
          await crearPreguntas({
            id_prueba: pruebaId,
            enunciado: pregunta.enunciado,
            opciones: pregunta.opciones,
            respuesta_correcta: pregunta.respuestaCorrecta,
          });
        } catch (errorPregunta) {
          console.error("Error al crear pregunta", errorPregunta);
        }
      }
      setLoading(false);
      console.log("Prueba y preguntas creadas con éxito");
    } catch (error) {
      setLoading(false);
      console.error("Error al crear prueba y preguntas", error);
    }
  };

  function getFechaHoraActual() {
    const ahora = new Date();
    const año = ahora.getFullYear();
    const mes = (ahora.getMonth() + 1).toString().padStart(2, "0"); // getMonth() devuelve un índice basado en 0
    const dia = ahora.getDate().toString().padStart(2, "0");
    const horas = ahora.getHours().toString().padStart(2, "0");
    const minutos = ahora.getMinutes().toString().padStart(2, "0");

    return `${año}-${mes}-${dia}T${horas}:${minutos}`;
  }
  if (loading) {
    return <LoadingComponent />;
  }

  return (
    <>
      <div className="crear-prueba-container">
        <Card className="shadow-sm mb-4">
          <Card.Body>
            <Card.Title>Formulario de Creación de Prueba</Card.Title>
            <Form onSubmit={handleCrearPrueba}>
              <Form.Group>
                <Form.Label>Número de Preguntas:</Form.Label>
                <Form.Control
                  type="number"
                  className="input-sin-flechas"
                  value={numeroPreguntas}
                  onChange={(e) => {
                    const valor = e.target.value;
                    setNumeroPreguntas(
                      valor === "" ? "" : Math.max(1, Number(valor))
                    );
                  }}
                  required
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Duración de la Prueba (en horas):</Form.Label>
                <Form.Control
                  type="number"
                  className="input-sin-flechas"
                  value={duracion}
                  onChange={(e) => {
                    const valor = e.target.value;
                    setDuracion(valor === "" ? "" : Math.max(1, Number(valor)));
                  }}
                  required
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Fecha de Inicio:</Form.Label>
                <Form.Control
                  type="datetime-local"
                  value={fechaInicio}
                  onChange={(e) => setFechaInicio(e.target.value)}
                  required
                />
              </Form.Group>

              <div id="preguntas-container">
                {preguntas.map((p, index) => (
                  <Card key={index} className="mb-3">
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

              <div className="botones-formulario">
                <Button
                  variant="primary"
                  className="mr-2"
                  onClick={handleAgregarPregunta}
                >
                  Agregar Pregunta
                </Button>
                <Button variant="success" type="submit">
                  Crear Prueba
                </Button>
              </div>
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
                  padding: "5px",
                  margin: "5px 0",
                  backgroundColor:
                    preguntaActual.respuestaCorrecta === index ? "#28a745" : "",
                  color:
                    preguntaActual.respuestaCorrecta === index
                      ? "white"
                      : "black",
                  border: "1px solid #ddd",
                  boxShadow:
                    preguntaActual.respuestaCorrecta === index
                      ? "0px 0px 10px rgba(0, 0, 0, 0.2)"
                      : "",
                  borderRadius: "4px",
                }}
              >
                {o}
                {preguntaActual.respuestaCorrecta === index && (
                  <span style={{ marginLeft: "10px", fontWeight: "bold" }}>
                    ✔
                  </span>
                )}
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
              className="mr-3"
              onClick={() => {
                if (opcion.trim() === "") {
                  alert("No puedes agregar una opción vacía.");
                  return;
                }
                setPreguntaActual({
                  ...preguntaActual,
                  opciones: [...preguntaActual.opciones, opcion],
                });
                setOpcion("");
              }}
            >
              Agregar Opción
            </Button>

            <Button variant="primary" onClick={handleGuardarPregunta}>
              Guardar Pregunta
            </Button>
          </Form.Group>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default CrearPrueba;
