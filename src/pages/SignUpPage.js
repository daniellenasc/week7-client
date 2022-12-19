import { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/api";

function SignUpPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  //state para guardar a imagem escolhida pelo usuário
  const [img, setImg] = useState();

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleImage(e) {
    //console.log(e.target.files[0]); //é um array-like object -> são as informações da foto que deverão ser enviadas para a rota de upload do back-end
    setImg(e.target.files[0]);
  }

  // função assíncrona para fazer o upload da foto
  async function handleUpload(e) {
    try {
      const uploadData = new FormData(); //para formatar a imagem -> A interface FormData fornece uma maneira fácil de construir um conjunto de pares chave/valor representando campos de um elemento form e seus valores, os quais podem ser facilmente enviados utilizado o método send() do XMLHttpRequest. Essa interface utiliza o mesmo formato que um form utilizaria se o tipo de codificação estivesse configurado como "multipart/form-data".
      uploadData.append("picture", img); //Acrescenta um novo valor em uma chave existente dentro de um objeto FormData, ou adiciona a chave se ela ainda não existir.
      //"picture" -> vem da rota do backend
      //valor -> state img

      const response = await api.post("/uploadImage/upload", uploadData);

      //console.log(uploadData);

      //a função retorna uma url
      return response.data.url;
    } catch (error) {
      console.log(error);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    //conferir se a senha e a confirmação de senha são iguais
    if (form.password !== form.confirmPassword) {
      alert("Senhas incompatíveis");
      return;
    }

    //chamar a função handleUpload()
    const imgUrl = await handleUpload();

    //disparo a requisição de cadastro para o meu servidor
    try {
      await api.post("/user/sign-up", { ...form, profilePic: imgUrl });

      navigate("/login");
    } catch (error) {
      console.log(error);
    }

    // criar a requisição para enviar este novo usuário
    // requisição método POST
  }

  return (
    <Container
      style={{ height: "100vh" }}
      className="d-flex flex-column align-items-center justify-content-center"
    >
      <Form className="w-50" onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Nome completo</Form.Label>
          <Form.Control
            type="text"
            placeholder="Insira um nome para identificação"
            name="name"
            value={form.name}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Endereço de e-mail</Form.Label>
          <Form.Control
            type="email"
            placeholder="Insira o seu melhor endereço de e-mail"
            name="email"
            value={form.email}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Senha</Form.Label>
          <Form.Control
            type="password"
            placeholder="Insira uma senha válida"
            name="password"
            value={form.password}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Confirmar senha</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirme a senha válida criada anteriormente"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
          />
        </Form.Group>

        {/* o input do tipo 'file' não tem value */}
        <Form.Group className="mb-3">
          <Form.Label>Foto de Perfil</Form.Label>
          <Form.Control type="file" onChange={handleImage} />
        </Form.Group>

        <Button className="my-3" variant="dark" type="submit">
          Cadastrar usuário
        </Button>
      </Form>
      <Form.Text>
        Já possui cadastro? Faça já o
        <Link className="text-warning fw-bold text-decoration-none" to="/login">
          {" "}
          login
        </Link>
        .
      </Form.Text>
    </Container>
  );
}

export default SignUpPage;
