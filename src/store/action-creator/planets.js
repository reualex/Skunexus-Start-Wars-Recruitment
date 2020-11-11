import * as actions from "../actions/index";

export const getPlanets = (page) => ({
  type: actions.PLANET_GET_DATA,
  page: page,
});

export const getPlanetsSuccess = (payload) => ({
  type: actions.PLANET_GET_DATA_SUCCESS,
  payload,
});

export const setCurrentPlanet = (payload, id) => ({
  type: actions.SET_CURRENT_PLANET,
  payload,
  id,
});
