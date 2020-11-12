import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { promisifyAction } from "../../../utils";
import * as actionCreator from "../../../store/action-creator";
import Grid from "../../Grid/Grid";

const Residents = (props) => {
  const id = props.match.params.id;

  const dispatch = useDispatch();
  const getCurrentPlanetAsync = promisifyAction(
    dispatch,
    actionCreator.getCurrentPlanet
  );

  const { residents_links, residents } = useSelector((state) => ({
    residents_links: state.planetReducer.planet.residents,
    residents: state.residentsReducer.residents,
  }));

  useEffect(() => {
    const getCurrentPlanet = async () => {
      await getCurrentPlanetAsync(id);
    };
    getCurrentPlanet();
  }, []);

  useEffect(() => {
    let action = actionCreator.getResidentSuccess;
    if (residents_links)
      actionCreator.getData(residents_links, dispatch, action);
  }, [residents_links]);

  const data = {
    header: [
      "name",
      "height",
      "mass",
      "hair_color",
      "skin_color",
      "eye_color",
      "birth_year",
      "gender",
      "created",
    ],
    values: residents,
  };

  return (
    <div className="films">
      <Grid data={data} />
    </div>
  );
};

export default Residents;
