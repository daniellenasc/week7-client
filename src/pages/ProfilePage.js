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
    navigate("/");

    //atualizar o context
    setLoggedInUser(null);
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
          <Col>
            <EditUser
              form={form}
              setForm={setForm}
              reload={reload}
              setReload={setReload}
            />
          </Col>
          <Col>
            <Button variant="danger">
              <Link className="nav-link" to="/delete-profile">
                Excluir perfil
              </Link>
            </Button>
          </Col>
          <Col>
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
