import * as actions from "../actions/index";

export const getData = async (linksArr, dispatch, nextActionCreator) => {
  const promises = linksArr.map((link) => fetch(link));
  const responses = await Promise.all(promises);
  const jsonDataList = responses.map((response) => response.json());
  const data = await Promise.all(jsonDataList);

  dispatch(nextActionCreator(data));
};
