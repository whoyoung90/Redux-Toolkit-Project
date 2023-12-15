import { combineReducers } from "@reduxjs/toolkit";
import boardReducer from "./slices/boardSlice";
import todoReducer from "./slices/todoSlice";
import userSlice from "./slices/userSlice";
import postSlice from "./slices/postSlice";

const rootReducer = combineReducers({
  board: boardReducer,
  todo: todoReducer,
  user: userSlice,
  posts: postSlice,
  // loading: loadingSlice, // 모든 로딩 처리
  // error: errorSlice, // 모든 에러 처리
});

export default rootReducer;
