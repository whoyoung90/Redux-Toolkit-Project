import { createAsyncThunk } from "@reduxjs/toolkit";
import { deleteBoard, selectBoard } from "../slices/boardSlice";
import { deleteBoardTodos } from "../slices/todoSlice";

/* 여러 Slice에 걸쳐서 action을 dispatch 해야하는 경우 => Thunk */
const deleteBoardThunk = createAsyncThunk(
  "board/deleteBoard",
  async (boardId, thunkApi) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const rootState = thunkApi.getState();
        const { selectedBoardId } = rootState.board;

        if (selectedBoardId === Number(boardId)) {
          thunkApi.dispatch(selectBoard(null));
        }

        // Board와 해당 Board에 속한 BoardTodo가 함께 삭제
        thunkApi.dispatch(deleteBoard(boardId));
        thunkApi.dispatch(deleteBoardTodos(boardId));

        resolve();
      }, 3000);
    });
  }
);

export default deleteBoardThunk;
