import { useEffect } from "react";
import Header from "../components/Header";
import SearchTrain from "../components/SearchTrains";

export default function Home() {
  useEffect(() => {
    document.title = "Tous en Trains Touristiques | Accueil";
  }, []);
  return (
    <div>
      <Header role="banner" />
      <SearchTrain />
    </div>
  );
}
