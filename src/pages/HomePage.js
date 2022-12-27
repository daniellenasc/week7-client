import { Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contexts/authContext";

function HomePage() {
  const { loggedInUser } = useContext(AuthContext);

  //console.log(loggedInUser);

  return (
    <Container
      style={{ height: "100vh" }}
      className="d-flex flex-column justify-content-center"
    >
      <div className="m-4">
        <h1 className="mb-2">Bem-vindo ao IronTasks</h1>
        <h4>Uma plataforma para gerenciar suas tarefas</h4>
      </div>

      <div className="m-4">
        <Button className="p-4 me-4" variant="dark" size="lg">
          <Link className="nav-link" to="/sign-up">
            Cadastrar no sistema
          </Link>
        </Button>
        <Button className="p-4" variant="dark" size="lg">
          <Link className="nav-link" to="/login">
            Entrar no sistema
          </Link>
        </Button>

        {loggedInUser && (
          <Button className="p-4 ms-4" variant="dark" size="lg">
            <Link className="nav-link" to="/profile">
              Vá para o Perfil
            </Link>
          </Button>
        )}
      </div>
    </Container>
  );
}

export default HomePage;
