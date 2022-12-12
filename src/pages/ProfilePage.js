import { Button, Col, Container, Nav, Navbar, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import api from "../api/api";

function ProfilePage() {
  //pegando os dados do usuário
  useEffect(() => {
    async function fetchUser() {
      try {
        //api é o axios configurado para estar com o bearer token no cabeçalho da requisição
        const response = await api.get("/user/profile");
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    }

    fetchUser();
  }, []);

  return (
    <div>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand>IronRH</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Link className="nav-link" to="/">
                Página inicial
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container className="mt-5">
        <h1 className="text-muted">Nome do usuário</h1>
        <Row>
          <Col>
            <Button variant="primary">
              <Link className="nav-link" to="/edit-profile">
                Editar perfil
              </Link>
            </Button>
          </Col>
          <Col>
            <Button variant="danger">
              <Link className="nav-link" to="/delete-profile">
                Excluir perfil
              </Link>
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default ProfilePage;
