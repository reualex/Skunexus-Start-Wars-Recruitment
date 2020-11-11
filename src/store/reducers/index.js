import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import planetReducer from "./planetReducer";
import filmsReducer from "./filmsReducer";
import residentsReducer from "./residentsReducer";

const reducers = (history) =>
  combineReducers({
    router: connectRouter(history),
    planetReducer,
    filmsReducer,
    residentsReducer,
  });

export default reducers;
