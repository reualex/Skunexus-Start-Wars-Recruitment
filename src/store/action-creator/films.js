import * as actions from "../actions/index";

export const getFilms = async (filmLinks, dispatch) => {
  const promises = filmLinks.map((link) => fetch(link));
  const responses = await Promise.all(promises);
  const jsonDataList = responses.map((response) => response.json());
  const filmsData = await Promise.all(jsonDataList);

  dispatch(getFilmSuccess(filmsData));
};

export const getFilmSuccess = (films) => {
  return {
    type: actions.GET_FILMS_SUCCESS,
    films,
  };
};
