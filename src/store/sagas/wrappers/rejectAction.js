import { call } from "redux-saga/effects";

// wrapper around action.defer.resolve. Should be yielded
const rejectAction = (action, value) =>
  action.defer ? call([action.defer, "reject"], value) : null;

export default rejectAction;
