import * as actions from "../actions/index";

export const getResidentSuccess = (residents) => {
  return {
    type: actions.GET_RESIDENTS_SUCCESS,
    residents,
  };
};
