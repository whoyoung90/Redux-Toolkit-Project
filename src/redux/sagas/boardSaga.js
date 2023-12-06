import { takeLeading, delay, put } from "redux-saga/effects";
import {
  resetBoard,
  resetBoardSagaRequested,
  resetBoardSagaSucceeded,
  resetBoardSagaFailed,
} from "../slices/boardSlice";
import { resetTodo } from "../slices/todoSlice";

// resetBoardSaga는 제너레이터 boardSaga 함수의 takeLeading 함수를 통해 실행
function* resetBoardSaga() {
  try {
    yield delay(3000);
    yield put(resetBoard());
    yield put(resetTodo());

    yield put(resetBoardSagaSucceeded("succeeded"));
  } catch (error) {
    yield put(resetBoardSagaFailed(error));
  }
}

// resetBoardSagaRequested action이 dispatch 되면 -> resetBoardSaga가 실행!!
export function* boardSaga() {
  yield takeLeading(resetBoardSagaRequested, resetBoardSaga);
}
