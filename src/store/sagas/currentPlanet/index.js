import { takeEvery } from "redux-saga/effects";
import * as actions from "../../actions/";
import * as actionCreators from "../../action-creator";
import simpleGetAndResolve from "../factories/simpleGetAndResolve";

const getCurrentPlanet = simpleGetAndResolve(
  (action) => `http://swapi.dev/api/planets/${action.id}`,
  actionCreators.getCurrentPlanetSuccess,
  (response) => response
);

export default function* () {
  yield takeEvery(actions.CURRENT_PLANET_GET_DATA, getCurrentPlanet);
}
