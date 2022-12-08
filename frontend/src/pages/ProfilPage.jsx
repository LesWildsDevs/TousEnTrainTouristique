import { useEffect } from "react";
import Header from "../components/Header";
import Profil from "../components/Profil";

function ProfilPage() {
  useEffect(() => {
    document.title = "Tous en Trains Touristiques | Mon profil";
  }, []);

  return (
    <div>
      <Header />
      <Profil />
    </div>
  );
}

export default ProfilPage;
