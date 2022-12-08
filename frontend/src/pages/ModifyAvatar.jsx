import { useEffect } from "react";
import Header from "../components/Header";
import ModifyAvatarForm from "../components/ModifyAvatarForm";

function ModifyAvatar() {
  useEffect(() => {
    document.title = "Tous en Trains Touristiques | Changer mon avatar";
  }, []);

  return (
    <div>
      <Header />
      <ModifyAvatarForm />
    </div>
  );
}

export default ModifyAvatar;
