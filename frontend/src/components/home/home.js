import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';

function Home() {
  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#home">EscuelaApp</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#ver-preguntas">Ver Preguntas</Nav.Link>
              <Nav.Link href="#crear-pregunta">Crear Pregunta</Nav.Link>
              <Nav.Link href="#editar-pregunta">Editar Pregunta</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container className="mt-3">
        <h1>Bienvenido a la EscuelaApp</h1>
        {/* Contenido principal aquí */}
      </Container>
    </div>
  );
}

export default Home;
