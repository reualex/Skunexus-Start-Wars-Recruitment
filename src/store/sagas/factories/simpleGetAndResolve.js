import { put, call } from "redux-saga/effects";
import { push } from "react-router-redux";
import { resolveAction, rejectAction } from "../wrappers";
import { requester } from "../../../utils";

// Factory creating saga, which does simple get request and resolving promisified action
// Action may contain payload. If it does, it will be converted to query parameters of the request
// If action contains id property, request would be to 'url/id'

export default (makeUrl, actionCreator, serializer) =>
  function* (action) {
    const requestOptions = {
      ...action,
      method: "GET",
      url: makeUrl(action),
      params: action.payload,
    };

    try {
      const response = yield call(requester, requestOptions);
      yield put(actionCreator(serializer ? serializer(response) : response));
      yield resolveAction(action);
    } catch (error) {
      yield put(push("/404"));
      yield rejectAction(action, error);
    }
  };
