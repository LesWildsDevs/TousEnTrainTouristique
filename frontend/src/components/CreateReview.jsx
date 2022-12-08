import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Rating } from "react-simple-star-rating";
import { getDate } from "../services/DateManager";
import "../assets/styles/CreateReview.css";
import "../assets/styles/loader.css";

function CreateReview({ id }) {
  const [posted, setPosted] = useState(false);
  const [review, setReview] = useState({
    note: "",
    comment: "",
  });
  const [rating, setRating] = useState(0); // valeur initiale de notation
  const [readOnly, setReadOnly] = useState(false); // pour bloquer les étoiles
  const userId = window.localStorage.getItem("id");

  const navigate = useNavigate();

  const handleRating = (rate) => {
    setRating(rate);
    setReadOnly(true);
  };

  const postReview = () => {
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/api/reviews/`, {
        review_user_id: userId, // récupéré avec localstorage
        review_train_id: id, // récuperé avec useParams
        review_note: rating, // valeur du state mise à jour avec le composant Rating
        review_comment: review.comment, // valeur du state mise à jour avec le formulaire
        created_on: getDate(), // formatage de la date
        updated_on: null, // null par default car il s'agit d'une création de review
        published: 0, // 0 par default car c'est l'administrateur qui valide la publication du review
      })
      .then(() => {
        setPosted(true); // affichage du loader
        setTimeout(() => navigate("/"), 4000); // redirection vers la page d'accueil
      });
  };

  if (posted === false) {
    return (
      <div>
        <div className="review_details_title_box">
          <div>{review.user_name}</div>
          <div>{review.train_name}</div>
        </div>
        <form
          className="review_details_form"
          onSubmit={(e) => {
            e.preventDefault();
            postReview();
          }}
        >
          <div className="create_review_note">
            <Rating
              onClick={handleRating}
              ratingValue={rating}
              readonly={readOnly}
              allowHover={false}
            />
          </div>
          <div className="create_review_comment">
            <label className="create_review_comment_label" htmlFor="comment">
              Ajouter un commentaire
            </label>
            <textarea
              className="create_review_input"
              type="text"
              name="comment"
              id="comment"
              value={review.comment}
              placeholder="commentaire"
              onChange={(e) =>
                setReview({
                  ...review,
                  comment: e.target.value,
                })
              }
            />
          </div>
          <div className="review_details_buttons_box">
            <input
              className="create_review_submit_btn"
              type="submit"
              value="Envoyer"
            />
            {posted ? <input type="submit" value="Modifier" /> : ""}
          </div>
        </form>
      </div>
    );
  }
  if (posted === true) {
    return (
      <div>
        <div className="create_review_send">
          Nous avons bien reçu votre commentaire. Il sera validé dans quelques
          heures.
        </div>
        <div className="lds-ellipsis">
          <div />
          <div />
          <div />
          <div />
        </div>
      </div>
    );
  }
}

export default CreateReview;
