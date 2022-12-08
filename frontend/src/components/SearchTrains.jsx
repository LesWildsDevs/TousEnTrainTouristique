/* eslint-disable no-use-before-define */
import axios from "axios";
import { useState, useEffect } from "react";
import TrainCard from "./TrainCard";
import "../assets/styles/SearchTrains.css";
import "../assets/styles/loader.css";

export default function FilterTrainTest() {
  const [areas, setAreas] = useState([]);
  const [areaSelected, setAreaSelected] = useState("*");
  const [types, setTypes] = useState("");
  const [typeSelected, setTypeSelected] = useState("*");
  const [selections, setSelections] = useState("");
  const [results, setResults] = useState([]);

  // Les 3 appels axios nécessaires à notre filtrage
  useEffect(() => {
    // Api Areas
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/areas`)
      .then((response) => response.data)
      .then((data) => setAreas(data));
    // Api Types
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/types`)
      .then((response) => response.data)
      .then((data) => setTypes(data));

    // Api Trains
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/trains/`)
      .then((response) => {
        setSelections(response.data);
        setResults(response.data);
      })
      .catch((error) => {
        console.warn(error);
      });
  }, []);

  // Fonction permettant le filtrage par l'utilisateur
  // utilisant ou pas les options areas et/ou types
  // Object.getOwnPropertyNames(train.types) renvoie un tableau de toutes les propriétés
  // car le name de type est nécessaire pour la méthode forEach
  function handleSearch() {
    const myTrains = [];
    selections.forEach((train) => {
      const { tname } = train;
      let name = "";
      const trainTypes = Object.getOwnPropertyNames(train.types);
      if (areaSelected === "*" && typeSelected === "*") {
        myTrains.push(train);
      } else if (areaSelected === train.areaName && typeSelected === "*") {
        myTrains.push(train);
      } else if (areaSelected === "*" && typeSelected !== "*") {
        trainTypes.forEach((type) => {
          if (type === typeSelected && name !== tname) {
            name = tname;
            myTrains.push(train);
          }
        });
      } else {
        trainTypes.forEach((type) => {
          if (
            type === typeSelected &&
            name !== tname &&
            areaSelected === train.areaName
          ) {
            name = tname;
            myTrains.push(train);
          }
        });
      }
    });
    setResults(myTrains);
  }

  return (
    <div className="train_search_form">
      <div className="train_search">
        <div className="search_train_select">
          <label className="train_search_label" htmlFor="area_select">
            Je vais
            <br />
            <select
              className="area_select"
              value={areaSelected}
              id="area-select"
              onChange={(e) => {
                setAreaSelected(e.target.value);
              }}
              onClick={(e) => {
                setAreaSelected(e.target.value);
                handleSearch();
              }}
            >
              <option value="*">Partout</option>
              {areas &&
                areas.map((area) => (
                  <option value={area.name} key={area.id}>
                    {area.name}
                  </option>
                ))}
            </select>
          </label>{" "}
        </div>
        <div className="search_train_select">
          <label className="train_search_label" htmlFor="type-select">
            Je recherche des idées
            <br />
            <select
              className="type_select"
              value={typeSelected}
              id="type-select"
              onChange={(e) => setTypeSelected(e.target.value)}
              onClick={(e) => {
                setTypeSelected(e.target.value);
                handleSearch();
              }}
            >
              <option value="*">Pour tous les gouts</option>
              {types &&
                types.map((type) => (
                  <option value={type.id} key={type.id}>
                    {type.title}
                  </option>
                ))}
            </select>
          </label>
        </div>
      </div>
      <div className="traincard_box">
        {results.length !== 0 &&
          results.map((train) => (
            <div key={train.id}>
              <TrainCard
                src={Object.values(train.path)[0]}
                title={train.tname}
                id={train.id}
              />
            </div>
          ))}
      </div>

      {results.length === 0 && (
        <div>
          <p className="loader-title">Chargement en cours</p>
          <div className="lds-ellipsis">
            <div />
            <div />
            <div />
            <div />
          </div>
        </div>
      )}
    </div>
  );
}
