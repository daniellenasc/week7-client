import { useState, useContext } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/api";
import { AuthContext } from "../contexts/authContext";

function LoginPage() {
  const navigate = useNavigate();

  const { setLoggedInUser } = useContext(AuthContext);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  //função que vai rodar quando o botão do formulário for clicado:
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await api.post("/user/login", form);

      //console.log(response.data);

      //guardando o TOKEN no localStorage:
      //response.data é um objeto, mas no localStorage guarda-se JSON
      //setItem -> coloca algo dentro do localStorage, recebe dois parâmetros:
      // 1) a chave de nome loggedInUser (o usuário que está logadi)
      // 2) o valor: response.data (= token e usuário)
      localStorage.setItem("loggedInUser", JSON.stringify(response.data));

      //atualizar o context
      setLoggedInUser({ ...response.data });

      //depois de logar, ir para a página de perfil
      navigate("/profile");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Container
      style={{ height: "100vh" }}
      className="d-flex flex-column align-items-center justify-content-center"
    >
      <Form onSubmit={handleSubmit} className="w-50">
        <Form.Group className="mb-3">
          <Form.Label>Endereço de e-mail</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Insira o endereço de e-mail cadastrado"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Senha</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Insira a senha cadastrada"
          />
        </Form.Group>
        <Button className="my-3" variant="dark" type="submit">
          Entrar no sistema
        </Button>
      </Form>
      <Form.Text>
        Não possui cadastro? Faça já o
        <Link
          className="text-warning fw-bold text-decoration-none"
          to="/sign-up"
        >
          {" "}
          cadastro
        </Link>
        .
      </Form.Text>
    </Container>
  );
}

export default LoginPage;
