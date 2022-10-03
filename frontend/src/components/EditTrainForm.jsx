import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import jwtDecode from "jwt-decode";
import axios from "axios";
import Select from "react-select";
import { getDate } from "../services/DateManager";
import "../assets/styles/CreateUserForm.css";

export default function EditTrainForm() {
  const [name, setName] = useState("");
  const [selectedArea, setSelectedArea] = useState("");
  const [areas, setAreas] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState("");
  const [types, setTypes] = useState([]);
  const [description, setDescription] = useState("");
  const [information, setInformation] = useState("");
  const [token, setToken] = useState("");
  const [userId, setUserId] = useState("");

  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    setToken(window.localStorage.getItem("token"));

    if (token) {
      const decoded = jwtDecode(token);
      setUserId(decoded.sub);
    }
  }, [token]);
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/areas/`)
      .then((response) => {
        setAreas(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/types/`)
      .then((response) => response.data)
      .then((data) => {
        const newTypes = [];
        data.map((type) =>
          newTypes.push({ value: type.id, label: type.title })
        );
        setTypes(newTypes);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const updateTrain = () => {
    axios
      .put(`${import.meta.env.VITE_BACKEND_URL}/api/trains/${params.id}`, {
        name,
        train_user_id: userId,
        area_id: selectedArea,
        created_on: getDate(),
        updated_on: null,
        types: selectedTypes,
        published: 0,
        description,
        description_info: information,
      })
      .then((res) => console.warn(res));
    setTimeout(() => navigate("/"), 3000);
  };

  return (
    <div className="contact1">
      <div className="Contact">
        <h1>Ajouter un train</h1>
        <form onSubmit={(e) => updateTrain(e)}>
          <input
            className="name"
            type="text"
            id="train"
            value={name}
            placeholder="Nom du train"
            onChange={(e) => setName(e.target.value)}
          />
          <select
            className="area_select"
            value={selectedArea}
            id="area-select"
            onChange={(e) => setSelectedArea(e.target.value)}
          >
            <option value="Partout">Partout</option>
            {areas &&
              areas.map((item) => (
                <option value={item.id} key={item.id}>
                  {item.name}
                </option>
              ))}
          </select>
          <Select
            defaultValue={selectedTypes}
            onChange={setSelectedTypes}
            options={types}
            isMulti
          />
          <textarea
            className="description"
            name="description"
            id="description"
            cols="30"
            rows="10"
            value={description}
            placeholder="Description"
            onChange={(e) => setDescription(e.target.value)}
          />
          <textarea
            className="information"
            name="information"
            id="information"
            cols="30"
            rows="10"
            value={information}
            placeholder="Informations complémentaires"
            onChange={(e) => setInformation(e.target.value)}
          />
          <div className="buttonsContainer">
            <button
              className="buttonForm"
              type="button"
              onClick={() => updateTrain()}
            >
              Ajouter
            </button>
            <button
              className="buttonForm1"
              type="button"
              onClick={() => navigate("/profil")}
            >
              Annuler
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
