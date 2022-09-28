import React, { useState, useEffect } from "react";
// eslint-disable-next-line import/no-unresolved
import logoblanc from "@assets/images/logo-blanc.png";
// eslint-disable-next-line import/no-unresolved
import { useNavigate, Link } from "react-router-dom";
import "../assets/styles/Header.css";

function Header() {
  const [token, setToken] = useState("");
  const [isLogged, setIsLogged] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    setToken(window.localStorage.getItem("token"));

    if (token) {
      setIsLogged(true);
      // setUserRight(decoded.userRight);
    } else {
      setIsLogged(false);
    }
  }, [token]);

  return (
    <div className="header_main_container">
      <div className="header_logo">
        <Link to="/">
          <img className="header_logo_img" src={logoblanc} alt="logo du site" />
        </Link>
      </div>
      <div className="header_links_title_container">
        {isLogged === false ? (
          <div className="header_links_container">
            <button
              type="button"
              className="header_links"
              onClick={() => navigate("/creation-de-compte")}
            >
              M'inscrire
            </button>
            <button
              type="button"
              className="header_links"
              onClick={() => navigate("/connexion")}
            >
              Me connecter
            </button>
          </div>
        ) : (
          <button
            type="button"
            className="header_links"
            onClick={() => navigate("/profil")}
          >
            Mon Profil
          </button>
        )}
        <div className="header_title">Tous en trains touristiques</div>
      </div>
    </div>
  );
}

export default Header;
