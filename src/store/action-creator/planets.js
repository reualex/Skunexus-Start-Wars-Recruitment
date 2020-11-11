import * as actions from "../actions/index";

export const getPlanets = (page) => ({
  type: actions.PLANET_GET_DATA,
  page: page,
});

export const getPlanetsSuccess = (payload) => ({
  type: actions.PLANET_GET_DATA_SUCCESS,
  payload,
});

export const getCurrentPlanet = (id) => ({
  type: actions.CURRENT_PLANET_GET_DATA,
  id: id,
});

export const getCurrentPlanetSuccess = (payload) => ({
  type: actions.CURRENT_PLANET_GET_DATA_SUCCESS,
  payload,
});
