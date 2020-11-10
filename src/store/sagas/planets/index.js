import { takeEvery } from "redux-saga/effects";
import * as actions from "../../actions/";
import * as actionCreators from "../../action-creator";
import simpleGetAndResolve from "../factories/simpleGetAndResolve";

const getPlanets = simpleGetAndResolve(
  (action) => `https://swapi.dev/api/planets/?page=${action.page}`,
  actionCreators.getPlanetsSuccess,
  (response) => response
);

export default function* () {
  yield takeEvery(actions.PLANET_GET_DATA, getPlanets);
}
