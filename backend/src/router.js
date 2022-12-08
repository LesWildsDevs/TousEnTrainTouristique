const express = require("express");

const router = express.Router();

const trainControllers = require("./controllers/trainControllers");
const imageTrainControllers = require("./controllers/imageTrainControllers");
const imageAvatarControllers = require("./controllers/imageAvatarControllers");
const reviewControllers = require("./controllers/reviewControllers");
const contactControllers = require("./controllers/contactControllers");
const areaControllers = require("./controllers/areaControllers");
const typeControllers = require("./controllers/typeControllers");
const userControllers = require("./controllers/userControllers");
const favoriteControllers = require("./controllers/favoriteControllers");
const {
  hashPassword,
  verifyPassword,
  verifyToken,
  verifyAdmin,
  modifyPassword,
  hashPasswordForReset,
} = require("./controllers/auth");

const validator = require("./controllers/validator");

/* --- GET --- */
router.get("/api/trains", trainControllers.getAllJoin); // Tous les trains (avec jointures)
router.get("/api/trains/images/", imageTrainControllers.getAll); // Toutes les images de trains
router.get("/api/trains/:id/images", trainControllers.getAllJoinWithImagesById); // Un train en particulier avec les images et la région
router.get(
  "/api/trains/:id/activities",
  trainControllers.getAllJoinWithActivitiesById
); // Un train en particulier avec les activitées
router.get("/api/trains/:id", trainControllers.readJoin); // Un train en particulier (avec jointures)
router.get(
  "/api/trains/filter/:area/:type",
  trainControllers.readWithAreaAndId
); // Un train avec une région et un type particulier
router.get("/api/trains/images/", imageTrainControllers.getAll); // Toutes les images de trains
router.get("/api/trains/images/:id", imageTrainControllers.read); // Une image de train de particulier
router.get(
  "/api/trains/:id/reviews",
  reviewControllers.getAllJoinPublishedByTrainId
); // Uniquement les commentaires d'un train en particulier
router.get("/api/reviews/notes/:id", reviewControllers.getNote); // Note moyenne d'un train

router.get("/api/areas", areaControllers.getAll); // Toutes les régions
router.get("/api/areas/:id", areaControllers.read); // Une région en particulier
router.get("/api/types", typeControllers.getAll); // Tous les types de trains
router.get("/api/types/:id", typeControllers.read); // Un type de train en particulier

/* --- POST --- */
router.post("/api/contacts", contactControllers.add); // Envoyer un message
router.post("/api/mail", userControllers.getUserByEmail, modifyPassword); // modifier son mot de passe
router.post(
  "/api/users",
  validator.validateUser,
  hashPassword,
  userControllers.postUser
); // Création de compte
router.post(
  "/api/login",
  userControllers.getUserByEmailWithPasswordAndPassToNext,
  verifyPassword
); // connexion

/* --- PUT --- */
router.put("/api/contacts/:id", contactControllers.edit); // Éditer un message
router.put(
  "/api/mail/:token",
  hashPasswordForReset,
  userControllers.updateUserForChangePassword
); // modifier le mot de passe

/* ----------------------*/
/* -----UTILISATEURS-----*/
/* ----------------------*/

router.use(verifyToken);

/* --- GET --- */
router.get("/api/users/:id", userControllers.getUserToUpdate); // Un utilisateur en particulier
router.get("/api/imageavatars/:id", imageAvatarControllers.read); // avatar par user_id
router.get("/api/favorites", favoriteControllers.getAll); // Tous les favoris
router.get("/api/users/:id/favorites", favoriteControllers.readByUser); // affichage des favoris sur la page profil
router.get("/api/trains/:train/:id/favorite", favoriteControllers.readByTrain); // Affichage du favori par train

/* --- POST --- */
router.post("/api/reviews", validator.validateReview, reviewControllers.add); // Ajouter un commentaire
router.post("/api/favorites", favoriteControllers.add); // Ajouter un favoris
router.post("/api/imageavatars", imageAvatarControllers.add); // Ajouter un avatar
router.post("/api/trains/images", imageTrainControllers.add); // Ajouter une image d'un train
router.post("/api/trains", validator.validateTrain, trainControllers.add); // Ajouter un train

/* --- PUT --- */
router.put(
  "/api/users/:id",
  validator.validateUpdateUser,
  userControllers.edit
); // Un utilisateur en particulier

/* --- DELETE --- */
router.delete("/api/favorites/:id", favoriteControllers.destroy); // Supprimer un favoris
router.delete("/api/imageavatars/:id", imageAvatarControllers.destroy); // Supprimer un avatar
router.delete("/api/users/:id", userControllers.deleteUser); // Supprimer un utilisateur

/* ----------------------*/
/* ----ADMINISTRATEURS---*/
/* ----------------------*/

router.use(verifyAdmin);

/* --- GET --- */
router.get("/api/admin/trains", trainControllers.getAllJoinAdmin); // Tous les trains côté Admin (sans images)
router.get("/api/admin/trains/:id", trainControllers.readJoinAdminById); // Un train en particulier côté admin (types dans un arrayagg)
router.get("/api/users", userControllers.getAll); // Tous les utilisateurs
router.get("/api/contacts", contactControllers.getAll); // Tous les messages
router.get("/api/contacts/:id", contactControllers.read); // Un message en particulier
router.get("/api/reviews", reviewControllers.getAllJoin); // Tous les commentaires (publiés ou non)
router.get("/api/reviews/published", reviewControllers.getAllJoinPublished); // Uniquement les commentaires publiés
router.get(
  "/api/reviews/unpublished",
  reviewControllers.getAllJoinNotPublished
); // Uniquement les commentaires non publiés
router.get("/api/imageavatars", imageAvatarControllers.getAll); // tous les avatars
router.get("/api/reviews/:id", reviewControllers.getJoinById); // Un commentaire en particulier

/* --- POST --- */
router.post("/api/types", typeControllers.add); // Créer un type de train
router.post("/api/areas", areaControllers.add); // Créer une région

/* --- PUT --- */
router.put(
  "/api/reviews/:id",
  validator.validateReview,
  reviewControllers.putReview
); // Éditer un commentaire
router.put("/api/types/:id", typeControllers.edit); // Modifier un type de train
router.put("/api/areas/:id", areaControllers.edit); // Modifier une région
router.put("/api/trains/images/:id", imageTrainControllers.edit); // Modifier une image
router.put("/api/trains/:id", validator.validateTrain, trainControllers.update); // Modifier un train

/* --- DELETE --- */
router.delete("/api/reviews/:id", reviewControllers.destroy); // Supprimer un commentaire
router.delete("/api/types/:id", typeControllers.destroy); // Supprimer un type de train
router.delete("/api/areas/:id", areaControllers.destroy); // Supprimer une région
router.delete("/api/contacts/:id", contactControllers.destroy); // Supprimer un message
router.delete("/api/trains/images/:id", imageTrainControllers.destroy); // Supprimer une image d'un train
router.delete("/api/trains/:id", trainControllers.destroy); // Supprimer un train

module.exports = router;
