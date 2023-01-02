import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contexts/authContext";

function NavBar() {
  const { loggedInUser } = useContext(AuthContext);

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand>IronTasks</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {/* SE O USUÁRIO ESTIVER LOGADO: */}
            {loggedInUser && (
              <>
                <Link className="nav-link" to="/">
                  Página inicial
                </Link>
                <Link className="nav-link" to="/profile">
                  Meu Perfil
                </Link>
                <Link className="nav-link" to="/tasks">
                  Minhas tarefas
                </Link>
                <Link className="nav-link" to="/logs">
                  Notificações
                </Link>
              </>
            )}
            {/* SE O USUÁRIO NÃO ESTIVER LOGADO: */}
            {!loggedInUser && (
              <>
                <Link className="nav-link" to="/">
                  Página inicial
                </Link>
                <Link className="nav-link" to="/login">
                  Login
                </Link>
                <Link className="nav-link" to="/sign-up">
                  Cadastre-se
                </Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
