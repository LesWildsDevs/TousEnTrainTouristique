/* eslint-disable no-unused-expressions */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import CreateReview from "../components/CreateReview";
import TrainActivity from "../components/TrainActivity";
import TrainInformations from "../components/TrainInformations";
import TrainImages from "../components/TrainImages";
import ReviewTrainList from "../components/ReviewTrainList";
import { getDate } from "../services/DateManager";
import "../assets/styles/Train.css";
import favoris from "../assets/images/favoris.png";
import favorisVide from "../assets/images/favoris-vide.png";

function Train() {
  const params = useParams();
  const userId = window.localStorage.getItem("id");
  const token = window.localStorage.getItem("token");

  const [isFavorite, setIsFavorite] = useState(false);

  // chargement de l'état de favoris ou non du train pour l'utilisateur
  const getFavorite = () => {
    axios
      .get(
        `${import.meta.env.VITE_BACKEND_URL}/api/trains/${
          params.id
        }/${userId}/favorite`
      )
      .then((response) => {
        response.data.length !== 0 ? setIsFavorite(true) : setIsFavorite(false);
      })
      .catch((err) => console.warn(err));
  };

  // le useEffect se déclenche uniquement s'il y a un token
  // car seul les utilisateurs peuvent avoir des favoris
  token
    ? useEffect(() => {
        getFavorite();
      }, [isFavorite])
    : "";

  const [train, setTrain] = useState(""); // état gérant l'affichage du train, sa description et ses images
  const [activities, setActivities] = useState(""); // état gérant l'affichage des activités de ce même train
  const [reviews, setReviews] = useState(""); // état gérant l'affichage des commentaires liés à ce train
  const [favoriteClass, setFavoriteClass] = useState(
    isFavorite ? "train_favoris_image invisible" : "train_favoris_image"
  ); // état gérant l'affichage de l'image favoris
  const [noFavoriteClass, setNoFavoriteClass] = useState(
    isFavorite ? "train_favoris_image invisible" : "train_favoris_image"
  ); // état gérant l'affichage de l'image non favoris

  // chargement des données du train
  const getTrain = () => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/trains/${params.id}/images`)
      .then((response) => response.data)
      .then((data) => setTrain(data));
  };

  // chargement des activitées liées à ce train
  const getActivities = () => {
    axios
      .get(
        `${import.meta.env.VITE_BACKEND_URL}/api/trains/${params.id}/activities`
      )
      .then((response) => response.data)
      .then((data) => setActivities(data));
  };

  // chargement des commentaires liés à ce train
  const getReviews = () => {
    axios
      .get(
        `${import.meta.env.VITE_BACKEND_URL}/api/trains/${params.id}/reviews`
      )
      .then((response) => response.data)
      .then((data) => setReviews(data));
  };

  useEffect(() => {
    getTrain();
  }, []);

  useEffect(() => {
    getActivities();
  }, []);

  useEffect(() => {
    getReviews();
  }, []);

  useEffect(() => {
    document.title = `Tous en Trains Touristiques | ${train.tname}`;
  }, [train]);

  // ajout en favoris de ce train
  const addFavorite = () => {
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/api/favorites`, {
        user_id: userId,
        train_id: params.id,
        added_on: getDate(),
      })
      .then(() => {
        setFavoriteClass("train_favoris_image");
        setNoFavoriteClass("train_favoris_image invisible");
        setIsFavorite(true);
      });
  };

  // suppression de ce train des favoris
  const deleteFavorite = () => {
    axios
      .delete(`${import.meta.env.VITE_BACKEND_URL}/api/favorites/${params.id}`)
      .then(() => {
        setFavoriteClass("train_favoris_image invisible");
        setNoFavoriteClass("train_favoris_image");
        setIsFavorite(false);
      });
  };

  return (
    <div className="train_main_div">
      <Header />
      <div className="train_name_favoris">
        <div className="train_title_favoris_box">
          <h2 className="train_title">{train.tname}</h2>
        </div>
        {token ? (
          <div className="train_favoris_box">
            {isFavorite && (
              <img
                className={favoriteClass}
                src={favoris}
                onClick={() => deleteFavorite()}
                alt="favoris"
              />
            )}
            {!isFavorite && (
              <img
                className={noFavoriteClass}
                src={favorisVide}
                onClick={() => addFavorite()}
                alt="non favoris"
              />
            )}
          </div>
        ) : (
          ""
        )}
      </div>
      <div className="train_image_div">
        <TrainImages images={train.images} />
      </div>
      <h3 className="train_h3_title">Informations</h3>
      <TrainInformations train={train} />
      {activities.activity ? <h3 className="train_h3_title">Activités</h3> : ""}
      {activities.activity && (
        <TrainActivity activities={activities.activity} />
      )}
      <div className="train_review_title">Commentaires</div>

      <div className="train_review_box">
        {reviews ? <ReviewTrainList reviews={reviews} /> : "Pas de commentaire"}

        {token ? <CreateReview id={params.id} /> : ""}
      </div>
    </div>
  );
}

export default Train;
