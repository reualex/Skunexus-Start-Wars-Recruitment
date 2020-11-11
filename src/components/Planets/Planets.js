import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import Grid from "../Grid";
import { promisifyAction } from "../../utils";
import * as actionCreator from "../../store/action-creator";

import "./Planets.css";

const Planets = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const getPlanetsAsync = promisifyAction(dispatch, actionCreator.getPlanets);

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
    history.push(`planets/${data.id}/films/`);
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
        show: (row) => row.films.length,
        action: (row) => history.push(`planets/${row.id}/films/`),
      },
      {
        label: "Go to Residents",
        show: (row) => row.residents.length,
        action: (row) => history.push(`planets/${row.id}/residents/`),
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
