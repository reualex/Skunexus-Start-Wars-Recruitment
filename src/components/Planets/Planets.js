import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import Grid from "../Grid";
import { promisifyAction } from "../../utils";
import { getPlanets } from "../../store/action-creator";

import "./Planets.css";

const Planets = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const getPlanetsAsync = promisifyAction(dispatch, getPlanets);

  const [page, setPage] = useState(1);

  const { planets } = useSelector((state) => ({
    planets: state.planetReducer.planets,
  }));

  useEffect(() => {
    const getPlanets = async () => {
      await getPlanetsAsync(page);
    };
    getPlanets();
  }, []);

  const handleClick = (data) => {
    console.log("hirow.residents.lengthst: ", data.residents.length);
    history.push("dff");
  };

  const data = {
    header: [
      "name",
      "rotation_period",
      "orbital_period",
      "diameter",
      "climate",
      "gravity",
      "terrain",
      "surface_water",
      "population",
    ],
    values: planets,
    actions: [
      {
        label: "Go to Films",
        action: (row) => handleClick(row),
      },
      {
        label: "Go to Residents",
        action: (row) => {
          console.log(
            `redirect to grid with ${row.residents.length} Residents`
          );
        },
      },
    ],
  };

  return (
    <div className="App">
      <Grid data={data} />
    </div>
  );
};

export default Planets;
