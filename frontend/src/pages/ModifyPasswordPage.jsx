import { useEffect } from "react";
import ModifyPassword from "../components/ModifyPassword";
import Header from "../components/Header";

function ModifyPasswordPage() {
  useEffect(() => {
    document.title = "Tous en Trains Touristiques | Modifier mon mot de passe";
  }, []);

  return (
    <div>
      <Header />
      <ModifyPassword />
    </div>
  );
}

export default ModifyPasswordPage;
