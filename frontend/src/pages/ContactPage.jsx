import { useEffect } from "react";
import Contact from "../components/Contact";
import Header from "../components/Header";

export default function ContactPage() {
  useEffect(() => {
    document.title = "Tous en Trains Touristiques | Contact";
  }, []);

  return (
    <div>
      <Header />
      <Contact />
    </div>
  );
}
