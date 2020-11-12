import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { promisifyAction } from "../../../utils";
import * as actionCreator from "../../../store/action-creator";
import Grid from "../../Grid/Grid";

const Films = (props) => {
  const id = props.match.params.id;

  const dispatch = useDispatch();
  const getCurrentPlanetAsync = promisifyAction(
    dispatch,
    actionCreator.getCurrentPlanet
  );

  const { films_links, films } = useSelector((state) => ({
    films_links: state.planetReducer.planet.films,
    films: state.filmsReducer.films,
  }));

  useEffect(() => {
    const getCurrentPlanet = async () => {
      await getCurrentPlanetAsync(id);
    };
    getCurrentPlanet();
  }, []);

  useEffect(() => {
    let action = actionCreator.getFilmSuccess;
    if (films_links) actionCreator.getData(films_links, dispatch, action);
  }, [films_links]);

  const data = {
    header: [
      "title",
      "episode_id",
      "opening_crawl",
      "director",
      "producer",
      "release_date",
    ],
    values: films,
  };

  return (
    <div className="films">
      <Grid data={data} />
    </div>
  );
};

export default Films;
