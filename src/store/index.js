import { createStore, applyMiddleware } from "redux";
import reducers from "./reducers";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";
import sagaWatcherPlanets from "./sagas/planets";

const saga = createSagaMiddleware();

export const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(saga))
);

saga.run(sagaWatcherPlanets);
