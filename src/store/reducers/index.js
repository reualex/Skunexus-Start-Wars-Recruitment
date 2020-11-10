import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import planetReducer from "./planetReducer";

const reducers = (history) =>
  combineReducers({
    router: connectRouter(history),
    planetReducer,
  });

export default reducers;
