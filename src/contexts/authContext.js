//contexto que vai cuidar da parte da autenticação
import { createContext, useState, useEffect } from "react";

//instanciando o context
const AuthContext = createContext();

function AuthContextComponent(props) {
  //todos os states criados aqui dentro poderão ser compartilhados com os childrens que estiverem dentro do componente AuthContextComponent

  //pegar o loggedInUser que está no localStorage e guardar em um state que possa ser usado em toda a aplicação
  const [loggedInUser, setLoggedInUser] = useState({ token: "", user: {} });

  //pegar as informações do localStorage, tranformar o JSON em um objeto e salvar no state
  useEffect(() => {
    //capturar o loggedInUser do localStorage  (lembrando que ele vem em formato de JSON)
    const loggedInUserJSON = localStorage.getItem("loggedInUser");

    //transformando o json em uma OBJETO, ou, caso não haja nenhum json (null), seja transformado em uma string vazia, para que não dê nenhum erro na aplicação
    const parseLoggedInUser = JSON.parse(loggedInUserJSON || '""');

    //verificando se há um token dentro do parseLoggedInUser
    if (parseLoggedInUser.token) {
      setLoggedInUser(parseLoggedInUser);
    } else {
      setLoggedInUser(null);
    }
  }, []);

  //o contexto retorna um provider
  //props.children é o conteúdo entre as tags de abertura e fechamento
  //tem dois momentos que teremos que atualizar o loggedInUser: no login e no logout
  return (
    <AuthContext.Provider value={{ loggedInUser, setLoggedInUser }}>
      {props.children}
    </AuthContext.Provider>
  );
}

//exportar o contexto e o componente
export { AuthContext, AuthContextComponent };
