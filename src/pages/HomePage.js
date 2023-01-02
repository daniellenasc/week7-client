import { Button, Container, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contexts/authContext";
import Tasks from "../assets/images/tasks-image.svg";

function HomePage() {
  const { loggedInUser } = useContext(AuthContext);

  //console.log(loggedInUser);

  return (
    <Container
      style={{ height: "100vh" }}
      className="d-flex flex-column justify-content-center align-content-center"
    >
      <Container>
        <img src={Tasks} alt="tasks" width={250} className="m-3" />
      </Container>

      <Container>
        <Container className="m-3">
          <h1 className="m-3">Bem-vindo ao IronTasks</h1>
          <h4>Uma plataforma para gerenciar suas tarefas</h4>
        </Container>

        <Container className="d-flex flex-row align-items-center">
          <Button className="p-4 m-3" variant="dark" size="lg">
            <Link className="nav-link" to="/sign-up">
              Cadastrar no sistema
            </Link>
          </Button>
          <Button className="p-4 m-3" variant="dark" size="lg">
            <Link className="nav-link" to="/login">
              Entrar no sistema
            </Link>
          </Button>

          {loggedInUser && (
            <Button className="p-4 m-3" variant="dark" size="lg">
              <Link className="nav-link" to="/profile">
                Vá para o Perfil
              </Link>
            </Button>
          )}
        </Container>
      </Container>
    </Container>
  );
}

export default HomePage;
