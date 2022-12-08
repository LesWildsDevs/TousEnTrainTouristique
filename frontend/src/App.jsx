/* eslint-disable object-shorthand */
/* eslint-disable react/jsx-no-constructed-context-values */
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import ModifyAvatar from "./pages/ModifyAvatar";
import NotFoundPage from "./components/NotFoundPage";
import EditAccount from "./pages/EditAccount";
import ModifyPasswordPageBis from "./pages/ModifyPasswordPageBis";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import ContactPage from "./pages/ContactPage";
import Administrator from "./pages/Administrator";
import CreateUser from "./pages/CreateUser";
import Train from "./pages/Train";
import UserConnexion from "./pages/UserConnexion";
import ModifyPasswordPage from "./pages/ModifyPasswordPage";
import ProfilPage from "./pages/ProfilPage";
import AdminReview from "./pages/AdminReview";
import UserContext from "./contexts/UserContext";
import CreateTrain from "./pages/CreateTrain";
import AuthAPI from "./services/AuthAPI";
import AuthContext from "./contexts/AuthContext";
import AdminContext from "./contexts/AdminContext";
import PrivateRoute from "./components/PrivateRoute";
import AdminRoute from "./components/AdminRoute";
import AdminTrain from "./pages/AdminTrain";
import AdminContact from "./pages/AdminContact";
import "./App.css";
// eslint-disable-next-line import/no-extraneous-dependencies
import "bootstrap/dist/css/bootstrap.min.css";

// vérifie la présence d'un token et sa date de validité
// si token, execute la méthode isAdmin pour vérifier les userRight
AuthAPI.setup();

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    AuthAPI.isAuthenticated
  ); // état gérant les droits d'accès aux pages utilisateurs
  const [isAdmin, setIsAdmin] = useState(AuthAPI.isAdmin); // état gérant les droits d'accès aux pages admin
  const [refresh, setRefresh] = useState(false);
  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {" "}
      {/* pour les routes réservées aux utilisateurs */}
      <AdminContext.Provider value={{ isAdmin, setIsAdmin }}>
        {" "}
        {/* pour les routes réservées aux administrateurs */}
        <Router>
          <UserContext.Provider
            value={{ refresh: refresh, setRefresh: setRefresh }}
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/contact" element={<ContactPage />} />

              <Route
                path="/administrateur"
                element={
                  <AdminRoute>
                    <Administrator />
                  </AdminRoute>
                }
              />
              <Route
                path="/administrateur/reviews/:id"
                element={
                  <AdminRoute>
                    <AdminReview />
                  </AdminRoute>
                }
              />
              <Route
                path="/administrateur/contact/:id"
                element={
                  <AdminRoute>
                    <AdminContact />
                  </AdminRoute>
                }
              />
              <Route
                path="/administrateur/trains/:id"
                element={
                  <AdminRoute>
                    <AdminTrain />
                  </AdminRoute>
                }
              />
              <Route path="/creation-de-compte" element={<CreateUser />} />
              <Route path="/train/:id" element={<Train />} />
              <Route path="/connexion" element={<UserConnexion />} />
              <Route path="/modification/" element={<ModifyPasswordPage />} />
              <Route
                path="/moncompte/"
                element={
                  <PrivateRoute>
                    <EditAccount />
                  </PrivateRoute>
                }
              />
              <Route
                path="/avatar"
                element={
                  <PrivateRoute>
                    <ModifyAvatar />
                  </PrivateRoute>
                }
              />
              <Route
                path="/modification/:token"
                element={<ModifyPasswordPageBis />}
              />
              <Route
                path="/profil/"
                element={
                  <PrivateRoute>
                    <ProfilPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/creation-de-train"
                element={
                  <PrivateRoute>
                    <CreateTrain />
                  </PrivateRoute>
                }
              />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
            <Footer />
          </UserContext.Provider>
        </Router>
      </AdminContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;
