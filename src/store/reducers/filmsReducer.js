import { createReducer } from "redux-create-reducer";
import * as actions from "../actions";

const initFilms = [];

export const getFilmsSuccess = (state, action) => ({
  ...state,
  films: action.films,
});
export default createReducer(initFilms, {
  [actions.GET_FILMS_SUCCESS]: getFilmsSuccess,
});
