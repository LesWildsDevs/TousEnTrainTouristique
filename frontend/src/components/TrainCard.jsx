import React, { useState } from "react";
import { Rating } from "react-simple-star-rating";
import chevron from "@assets/images/chevron.png";
import "@assets/styles/TrainCard.css";
import { useNavigate } from "react-router-dom";

function TrainCard({ src, title, id }) {
  const [rating, setRating] = useState(0); // valeur initiale de notation
  const [readOnly, setReadOnly] = useState(false); // pour bloquer les étoiles
  const nav = useNavigate();
  const handleRating = (rate) => {
    setRating(rate);
    setReadOnly(true);
  };
  return (
    <div className="traincard_main_div">
      <div className="traincard_background_white_div">
        <img className="traincard_train_image" src={src} alt={title} />
        <div className="traincard_train_title">{title}</div>
        <div className="traincard_subtitle_container">
          <button
            type="button"
            className="traincard_subtitle"
            onClick={() => nav(`/train/${id}`)}
          >
            Lire la suite
          </button>
          <img className="traincard_chevron" src={chevron} alt="chevron" />
        </div>
        <div className="traincard_notation_container">
          <Rating
            onClick={handleRating}
            ratingValue={rating}
            readonly={readOnly}
          />
        </div>
      </div>
    </div>
  );
}

export default TrainCard;
