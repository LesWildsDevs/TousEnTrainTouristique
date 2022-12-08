import { useEffect } from "react";
import Header from "../components/Header";
import UserConnexionForm from "../components/UserConnexionForm";

function UserConnexion() {
  useEffect(() => {
    document.title = "Tous en Trains Touristiques | Connexion";
  }, []);

  return (
    <div>
      <Header />
      <UserConnexionForm />
    </div>
  );
}

export default UserConnexion;
