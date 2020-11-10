import { call } from "redux-saga/effects";

// wrapper around action.defer.resolve. Should be yielded
const resolveAction = (action, value) =>
  action.defer ? call([action.defer, "resolve"], value) : null;

export default resolveAction;
