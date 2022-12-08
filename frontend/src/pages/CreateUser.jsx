import { useEffect } from "react";
import CreateUserForm from "../components/CreateUserForm";
import Header from "../components/Header";

function CreateUser() {
  useEffect(() => {
    document.title = "Tous en Trains Touristiques | Création de compte";
  }, []);

  return (
    <div>
      <Header />
      <CreateUserForm />
    </div>
  );
}

export default CreateUser;
