import * as actions from "../actions/index";

export const getResidents = async (residentsLinks, dispatch) => {
  const promises = residentsLinks.map((link) => fetch(link));
  const responses = await Promise.all(promises);
  const jsonDataList = responses.map((response) => response.json());
  const residentsData = await Promise.all(jsonDataList);

  dispatch(getResidentsuccess(residentsData));
};

export const getResidentsuccess = (residents) => {
  return {
    type: actions.GET_RESIDENTS_SUCCESS,
    residents,
  };
};
