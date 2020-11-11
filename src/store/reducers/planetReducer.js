import { createReducer } from "redux-create-reducer";
import * as actions from "../actions";
const initPlanets = {
  planets: [],
  planet: {},
};

const modefyPlanetsArr = (planets) => {
  return planets.map((planet) => {
    planet.id = parseInt(
      planet.url.replace("http://swapi.dev/api/planets/", "")
    );
    return planet;
  });
};

export const getPlanetsSuccess = (state, action) => ({
  ...state,
  planets: modefyPlanetsArr(action.payload.data.results),
  total: action.payload.data.count,
});

export const setCurrentPlanet = (state, action) => ({
  ...state,
  planet: action.payload,
});
export default createReducer(initPlanets, {
  [actions.PLANET_GET_DATA_SUCCESS]: getPlanetsSuccess,
  [actions.SET_CURRENT_PLANET]: setCurrentPlanet,
});
