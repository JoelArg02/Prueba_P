import React from "react";
import { Container, Row, Col, ListGroup } from "react-bootstrap";

// Componente para el cuadro de herramientas
function Toolbox() {
  return (
    <ListGroup>
      <ListGroup.Item action href="#crear-prueba">Crear Prueba</ListGroup.Item>
      <ListGroup.Item action href="#revisar-resultados">Revisar Resultados</ListGroup.Item>
      <ListGroup.Item action href="#configuracion-usuario">Configuración de Usuario</ListGroup.Item>
    </ListGroup>
  );
}

// Componente Home actualizado
function Home() {
  return (
    <Container className="mt-3">
      <Row>
        {/* Contenido principal */}
        <Col md={8}>
          <h1>Bienvenido a la EscuelaApp</h1>
          <p>
            Esta es tu plataforma central para la gestión de pruebas y análisis de resultados. 
            Aquí podrás crear nuevas pruebas, revisar los resultados y configurar tus preferencias de usuario.
          </p>
        </Col>

        {/* Cuadro de herramientas */}
        <Col md={4}>
          <Toolbox />
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
