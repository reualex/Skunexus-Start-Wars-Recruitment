import * as actions from "../actions/index";

export const getFilmSuccess = (films) => {
  return {
    type: actions.GET_FILMS_SUCCESS,
    films,
  };
};
