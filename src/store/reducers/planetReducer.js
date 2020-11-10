import { createReducer } from "redux-create-reducer";
import * as actions from "../actions";
const initPlanet = [];

export const getPlanetsSuccess = (state, action) => ({
  ...state,
  planets: action.payload.data.results,
  total: action.payload.data.count,
});
export default createReducer(initPlanet, {
  [actions.PLANET_GET_DATA_SUCCESS]: getPlanetsSuccess,
});
