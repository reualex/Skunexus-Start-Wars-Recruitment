// @ts-ignore
export default function (dispatch, createAction) {
  return (...args) => {
    const action = createAction(...args);

    return new Promise((resolve, reject) =>
      dispatch({ ...action, defer: { resolve, reject } })
    );
  };
}
