import { useState } from "react";
import ImageManager from "../components/ImageManager";
import AddImage from "../components/AddImage";
import Header from "../components/Header";
import ReviewsList from "../components/ReviewsList";
import TrainList from "../components/TrainList";
import ContactList from "../components/ContactListForAdmin";
import "../assets/styles/Administrator.css";

const administrator = () => {
  const [reviewBool, setReviewBool] = useState(false);
  const [imageBool, setImageBool] = useState(false);
  const [trainBool, setTrainBool] = useState(false);
  const [messageBool, setMessageBool] = useState(false);

  return (
    <div className="admin_main_div">
      <Header />
      <div className="admin_menu">
        <div className="admin_menu_details">
          <h2 className="administrator_title">Commentaires </h2>
          <button
            type="button"
            className="button-form-admin"
            onClick={() => setReviewBool(!reviewBool)}
          >
            {reviewBool ? "Masquer" : "Afficher"}
          </button>
        </div>
        {reviewBool ? <ReviewsList /> : ""}
        <div className="admin_menu_details">
          <h2 className="administrator_title">Images </h2>
          <button
            type="button"
            className="button-form-admin"
            onClick={() => setImageBool(!imageBool)}
          >
            {imageBool ? "Masquer" : "Afficher"}
          </button>
        </div>
        {imageBool ? (
          <div>
            <ImageManager />
            <AddImage />
          </div>
        ) : (
          ""
        )}
        <div className="admin_menu_details">
          <h2 className="administrator_title">Trains </h2>
          <button
            type="button"
            className="button-form-admin"
            onClick={() => setTrainBool(!trainBool)}
          >
            {trainBool ? "Masquer" : "Afficher"}
          </button>
        </div>
        {trainBool ? <TrainList /> : ""}
        <div className="admin_menu_details">
          <h2 className="administrator_title">Messages </h2>
          <button
            type="button"
            className="button-form-admin"
            onClick={() => setMessageBool(!messageBool)}
          >
            {messageBool ? "Masquer" : "Afficher"}
          </button>
        </div>

        {messageBool ? <ContactList /> : ""}
      </div>
    </div>
  );
};

export default administrator;
