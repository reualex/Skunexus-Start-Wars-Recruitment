import { createStore, applyMiddleware } from "redux";
import { createBrowserHistory } from "history";
import reducers from "./reducers";
import { composeWithDevTools } from "redux-devtools-extension";
import { routerMiddleware } from "connected-react-router";
import createSagaMiddleware from "redux-saga";
import sagaWatcherPlanets from "./sagas/planets";
import sagaWatcherPlanet from "./sagas/currentPlanet";

const saga = createSagaMiddleware();
export const history = createBrowserHistory();

export const store = createStore(
  reducers(history),
  composeWithDevTools(applyMiddleware(saga, routerMiddleware(history)))
);

saga.run(sagaWatcherPlanets);
saga.run(sagaWatcherPlanet);
