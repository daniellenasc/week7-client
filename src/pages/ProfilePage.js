import { Button, Col, Container, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useContext, useState } from "react";
import api from "../api/api";
import { AuthContext } from "../contexts/authContext";
import EditUser from "../components/EditUser";

function ProfilePage() {
  const navigate = useNavigate();

  const { setLoggedInUser } = useContext(AuthContext);

  const [user, setUser] = useState({});

  const [form, setForm] = useState({
    name: "",
  });

  const [reload, setReload] = useState(false);

  //pegando os dados do usuário
  useEffect(() => {
    async function fetchUser() {
      try {
        //api é o axios configurado para estar com o bearer token no cabeçalho da requisição
        //requisição para pegar as informações no backend
        const response = await api.get("/user/profile");
        //console.log(response);
        setUser(response.data);
        setForm({ name: response.data.name });
      } catch (error) {
        console.log(error);
      }
    }

    fetchUser();
  }, [reload]);

  //função para deslogar da aplicação
  function signOut() {
    //remover o loggedInUser do localStorage
    localStorage.removeItem("loggedInUser");

    //atualizar o context
    setLoggedInUser(null);

    navigate("/");
  }

  //função para deletar o perfil do usuário
  async function handleDeleteUser() {
    try {
      //deletar o usuário
      await api.delete("/user/delete");
      //chamar afunção signOut, para retirar o usuário do localStorage, atualizar o contexto (loggedInUser = nul) e navegar para a home
      signOut();
    } catch (error) {
      console.error(error);
      alert("Algo deu errado ao deletar o usuário!");
    }
  }

  return (
    <div>
      <Container className="mt-5">
        <Row className="align-items-center mb-5">
          <Col>
            <h1 className="text-muted">{user.name}</h1>

            <p>{user.email}</p>
          </Col>
          <Col>
            <img
              src={user.profilePic}
              alt="profile"
              width={250}
              className="rounded"
            />{" "}
          </Col>
        </Row>

        <Row>
          <Col className="m-2">
            <EditUser
              form={form}
              setForm={setForm}
              reload={reload}
              setReload={setReload}
            />
          </Col>
          <Col className="m-2">
            <Button variant="danger" onClick={handleDeleteUser}>
              Excluir perfil
            </Button>
          </Col>
          <Col className="m-2">
            <Link to="/tasks">
              <Button variant="success">Minhas Tarefas</Button>
            </Link>
          </Col>

          <Col className="m-2">
            <Link to="/logs">
              <Button variant="success">Minhas Notificações</Button>
            </Link>
          </Col>

          <Col className="m-2">
            <Button variant="dark" onClick={signOut}>
              Sair
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default ProfilePage;
