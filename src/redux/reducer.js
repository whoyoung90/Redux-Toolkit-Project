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
});

export default rootReducer;
