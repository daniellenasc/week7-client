//ROTAS PROTEGIDAS

import { useContext } from "react";
import { AuthContext } from "../contexts/authContext";
import { Navigate } from "react-router-dom";

//um componente que vai verificar se o usuário está logado antes de renderizar página, funcionando como um middleware
//o componente a ser renderizado será recebido por props do App.js
function ProtectRoute({ Component }) {
  const { loggedInUser } = useContext(AuthContext);

  //o usuário está logado??
  if (loggedInUser) {
    //mostra o componente
    return <Component />;
  } else {
    //navega o usuário p/ a página de login
    return <Navigate to="/login" />;
  }
}

export default ProtectRoute;
