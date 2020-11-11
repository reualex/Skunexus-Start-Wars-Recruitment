import { createReducer } from "redux-create-reducer";
import * as actions from "../actions";
const initPlanets = {
  planets: [],
  planet: {},
  films: [],
};

const modefyPlanetsArr = (planets) => {
  return planets.map((planet) => {
    planet.id = parseInt(
      planet.url.replace("http://swapi.dev/api/planets/", "")
    );
    return planet;
  });
};

const modefyPlanet = (planet) => {
  planet.id = parseInt(planet.url.replace("http://swapi.dev/api/planets/", ""));
  return planet;
};

export const getPlanetsSuccess = (state, action) => ({
  ...state,
  planets: modefyPlanetsArr(action.payload.data.results),
  total: action.payload.data.count,
});

export const getCurrentPlanetSuccess = (state, action) => ({
  ...state,
  planet: modefyPlanet(action.payload.data),
});

export const getFilmsSuccess = (state, action) => {
  return state.films.concat(action);
};
export default createReducer(initPlanets, {
  [actions.PLANET_GET_DATA_SUCCESS]: getPlanetsSuccess,
  [actions.CURRENT_PLANET_GET_DATA_SUCCESS]: getCurrentPlanetSuccess,
  [actions.FILMS_GET_DATA_SUCCCESS]: getFilmsSuccess,
});
