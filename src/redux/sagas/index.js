import { all } from "redux-saga/effects";
import { boardSaga } from "./boardSaga";

export default function* rootSaga() {
  yield all([boardSaga()]);
}
