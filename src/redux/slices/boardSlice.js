import { createSlice } from "@reduxjs/toolkit";
// import deleteBoardThunk from "../thunks/deleteBoardThunk";

const initialState = {
  boards: [],
  selectedBoardId: null,

  // resetBoardSaga: {
  //   pending: false,
  //   data: null,
  //   error: null,
  // },
};

const boardSlice = createSlice({
  name: "board",
  initialState,
  // Action Types, Action Creators 자동 생성
  reducers: {
    createBoard: (state, action) => {
      const newBoardName = action.payload;
      // 새로운 state를 생성해서 리턴하는 것이 아닌, immer를 사용하는 형태의 Immutable Update
      state.boards.push({
        id: state.boards.length + 1,
        title: newBoardName,
      });
    },
    deleteBoard: (state, action) => {
      const targetBoardId = action.payload;
      // 새로운 state를 생성해서 리턴하는 형태로 Immutable Update
      return {
        ...state,
        boards: state.boards.filter((board) => {
          return board.id !== targetBoardId;
        }),
      };
    },
    selectBoard: (state, action) => {
      state.selectedBoardId = action.payload;
    },
    resetBoard: () => {
      return initialState;
    },
    //   // resetBoardSaga
    //   resetBoardSagaRequested: (state, action) => {
    //     state.resetBoardSaga = {
    //       ...state.resetBoardSaga,
    //       pending: true,
    //       data: null,
    //       error: null,
    //     };
    //   },
    //   resetBoardSagaSucceeded: (state, action) => {
    //     state.resetBoardSaga = {
    //       ...state.resetBoardSaga,
    //       pending: false,
    //       data: action.payload,
    //     };
    //   },
    //   resetBoardSagaFailed: (state, action) => {
    //     state.resetBoardSaga = {
    //       ...state.resetBoardSaga,
    //       pending: false,
    //       error: action.payload,
    //     };
    //   },
    // },
    // extraReducers: (builder) => {
    //   builder
    //     .addCase(deleteBoardThunk.pending, (state, action) => {
    //       console.log(action.type);
    //     })
    //     .addCase(deleteBoardThunk.fulfilled, (state, action) => {
    //       console.log(action.type);
    //     })
    //     .addCase(deleteBoardThunk.rejected, (state, action) => {
    //       console.log(action.type);
    //     });
  },
});

export const {
  createBoard,
  updateBoard,
  deleteBoard,
  selectBoard,
  resetBoard,
  // // resetBoardSaga
  // resetBoardSagaRequested,
  // resetBoardSagaSucceeded,
  // resetBoardSagaFailed,
} = boardSlice.actions;

export default boardSlice.reducer;
