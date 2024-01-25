import React, { useState, useEffect } from "react";
import { Button, Card, Pagination, Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faTrashAlt,
  faToggleOn,
  faToggleOff,
} from "@fortawesome/free-solid-svg-icons";

import {
  getPruebas,
  editPrueba,
  deletePruebaBoolean,
  deletePrueba,
} from "../../api/pruebas";
import { getPreguntasById, getPreguntas } from "../../api/preguntas";

function edit() {
  const [pruebas, setPruebas] = useState([]);
  const [preguntas, setPreguntas] = useState([]);
  const [pruebaSeleccionada, setPruebaSeleccionada] = useState(null);
  const [currentPagePruebas, setCurrentPagePruebas] = useState(1);
  const [currentPagePreguntas, setCurrentPagePreguntas] = useState(1);
  const [selectedPrueba, setSelectedPrueba] = useState(null);
  const itemsPerPage = 5;

  useEffect(() => {
    cargarPruebas();
  }, []);

  useEffect(() => {
    if (pruebaSeleccionada) {
      cargarPreguntasDePrueba(pruebaSeleccionada);
    }
  }, [pruebaSeleccionada]);

  const cargarPruebas = async () => {
    try {
      const data = await getPruebas();
      setPruebas(data);
    } catch (error) {
      console.error("Error al cargar pruebas:", error);
    }
  };

  const cargarPreguntasDePrueba = async (idPrueba) => {
    try {
      const data = await getPreguntas(idPrueba);
      setPreguntas(data);
    } catch (error) {
      console.error("Error al cargar preguntas:", error);
      setPreguntas([]);
    }
  };

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

  const handleEditarPrueba = async (idPrueba) => {
    try {
      const data = await editPrueba(idPrueba);
      setPruebas(data);
    } catch (error) {
      console.error("Error al editar prueba:", error);
    }
  };

  const handleEliminarPrueba = async (idPrueba) => {
    try {
      const data = await deletePruebaBoolean(idPrueba);
      setPruebas(data);
    } catch (error) {
      console.error("Error al eliminar prueba:", error);
    }
  };

  const handleDesactivarPrueba = async (idPrueba) => {
    try {
      const data = await deletePrueba(idPrueba);
      setPruebas(data);
    } catch (error) {
      console.error("Error al desactivar prueba:", error);
    }
  };

  const paginar = (items, pageNumber, itemsPerPage) => {
    const startIndex = (pageNumber - 1) * itemsPerPage;
    return items.slice(startIndex, startIndex + itemsPerPage);
  };

  const crearPaginacion = (
    items,
    currentPage,
    itemsPerPage,
    setCurrentPage
  ) => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(items.length / itemsPerPage); i++) {
      pageNumbers.push(
        <Pagination.Item
          key={i}
          active={i === currentPage}
          onClick={() => setCurrentPage(i)}
        >
          {i}
        </Pagination.Item>
      );
    }

    return <Pagination>{pageNumbers}</Pagination>;
  };

  const pruebasPaginadas = paginar(pruebas, currentPagePruebas, itemsPerPage);
  const preguntasDeLaPruebaSeleccionada = pruebaSeleccionada
    ? preguntas.filter((p) => p.id_prueba === pruebaSeleccionada)
    : [];
  const preguntasPaginadas = paginar(
    preguntas,
    currentPagePreguntas,
    itemsPerPage
  );

  return (
    <Container fluid>
      <Row>
        <Col>
          <h2>Gestión de Pruebas</h2>
          {pruebasPaginadas.map((prueba) => (
            <Card key={prueba.id_prueba} className="mb-3">
              <Card.Body>
                <Card.Title>Prueba #{prueba.id_prueba}</Card.Title>
                <Button
                  variant="info"
                  onClick={() => handleEditarPrueba(prueba.id_prueba)}
                >
                  <FontAwesomeIcon icon={faEdit} /> Editar
                </Button>
                <Button
                  variant="danger"
                  onClick={() => handleEliminarPrueba(prueba.id_prueba)}
                >
                  <FontAwesomeIcon icon={faTrashAlt} /> Eliminar
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => handleDesactivarPrueba(prueba.id_prueba)}
                >
                  {prueba.activo ? (
                    <FontAwesomeIcon icon={faToggleOn} />
                  ) : (
                    <FontAwesomeIcon icon={faToggleOff} />
                  )}{" "}
                  {prueba.activo ? "Desactivar" : "Activar"}
                </Button>
                <p>Estado: {prueba.activo ? "Activo" : "Inactivo"}</p>
              </Card.Body>
            </Card>
          ))}
          {crearPaginacion(
            pruebas,
            currentPagePruebas,
            itemsPerPage,
            setCurrentPagePruebas
          )}
        </Col>

        <Col>
          <h2>Preguntas de la Prueba #{pruebaSeleccionada}</h2>
          {preguntasDeLaPruebaSeleccionada.map((pregunta) => (
            <Card key={pregunta.id_pregunta} className="mb-3">
              <Card.Body>
                <Card.Title>Pregunta #{pregunta.id_pregunta}</Card.Title>
                {/* Más detalles de la pregunta y botones para editar, desactivar y eliminar */}
              </Card.Body>
            </Card>
          ))}
        </Col>
      </Row>
    </Container>
  );
}

export default edit;
