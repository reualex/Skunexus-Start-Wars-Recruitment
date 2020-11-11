import { createReducer } from "redux-create-reducer";
import * as actions from "../actions";

const initResidents = [];

export const getResidentsSuccess = (state, action) => ({
  ...state,
  residents: action.residents,
});
export default createReducer(initResidents, {
  [actions.GET_RESIDENTS_SUCCESS]: getResidentsSuccess,
});
