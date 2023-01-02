//para esse arquivo, ver a documentação do axios!

//aqui criamos uma instência do axios configurado para estar com o bearer token no cabeçalho (header) em todas as requisições que forem feitas

import axios from "axios";

// APIs para dar get quando estivermos em desenvolvimento (localhost) ou produção (link do deploy) - o axios sabe em qual momento estamos!
const apiURLs = {
  development: "http://localhost:8080",
  production: "https://irontasks-server.cyclic.app",
};

//console.log(process.env) -> o node sabe que está em development

//instancia que sabe qual é a BASEURL QUE DEVE SER USADA NAS REQUISIÇÕES DO AXIOS
const api = axios.create({ baseURL: apiURLs[process.env.NODE_ENV] });

//com a instância do axios criada acima, podemos configurar o token: caso esse token exista no localStorage, podemos enviá-lo junto com a requisição
//inteceptando as requisições, ou seja, para toda requisição feita, seja interceptada e configurado o bearer token com o token do localStorage
//config = as configurações do token
api.interceptors.request.use((config) => {
  //capturar o loggedInUser do localStorage  (lembrando que ele vem em formato de JSON)
  const loggedInUserJSON = localStorage.getItem("loggedInUser");

  //transformando o json em uma OBJETO, ou, caso não haja nenhum json (null), seja transformado em uma string vazia, para que não dê nenhum erro na aplicação
  const parseLoggedInUser = JSON.parse(loggedInUserJSON || '""');

  if (parseLoggedInUser.token) {
    //SE houver um token -> coloca ele no cabeçalho da requisição como um Bearer Token
    config.headers = { Authorization: `Bearer ${parseLoggedInUser.token}` };
  }

  return config;
});

export default api;
