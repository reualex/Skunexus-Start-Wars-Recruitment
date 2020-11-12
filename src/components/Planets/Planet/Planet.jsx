import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { promisifyAction } from "../../../utils";
import * as actionCreator from "../../../store/action-creator";
import Grid from "../../Grid";

const Planet = (props) => {
  const id = props.match.params.id;

  const dispatch = useDispatch();
  const history = useHistory();

  const getCurrentPlanetAsync = promisifyAction(
    dispatch,
    actionCreator.getCurrentPlanet
  );

  const { planet } = useSelector((state) => ({
    planet: state.planetReducer.planet,
  }));

  useEffect(() => {
    const getCurrentPlanet = async () => {
      await getCurrentPlanetAsync(id);
    };
    getCurrentPlanet();
  }, []);

  console.log("planet", planet);

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
    values: [planet],
    actions: [
      {
        label: "Go to Films",
        show: (row) => (row === undefined ? row.films.length : false),
        action: (row) => history.push(`/planets/${row.id}/films/`),
      },
      {
        label: "Go to Residents",
        show: (row) => (row === undefined ? row.residents.length : false),
        action: (row) => history.push(`/planets/${row.id}/residents/`),
      },
    ],
  };

  return (
    <div className="films">
      <Grid data={data} />
    </div>
  );
};

export default Planet;
