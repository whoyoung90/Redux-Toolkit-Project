import { createSlice } from "@reduxjs/toolkit";
import { logIn } from "../thunks/user";

const initialState = {
  data: null,
  error: false,
  prices: Array(100)
    .fill()
    .map((v, i) => (i + 1) * 100),
};

const userSlice = createSlice({
  name: "user",
  initialState,
  // 동기 action || userReducer에 종속된 action
  reducers: {
    logOut(state, action) {
      state.data = null;
    },
  },
  // 비동기 action || 외부 action
  extraReducers: (builder) => {
    builder
      .addCase(
        // user/logIn/pending
        logIn.pending,
        (state, action) => {
          state.error = false;
        }
      )
      .addCase(
        // user/logIn/fulfilled
        logIn.fulfilled,
        (state, action) => {
          console.log(action.meta.arg, action.meta.requestId);

          state.data = action.payload; // id, username
          state.error = false;
        }
      )
      .addCase(
        // user/logIn/rejected
        logIn.rejected,
        (state, action) => {
          state.data = null;

          if (action.payload) {
            state.error = action.payload; // rejectWithValue 반환 값
          } else {
            state.error = action.error.message;
          }
        }
      )
      .addMatcher(
        (action) => {},
        (state, action) => {}
      )
      .addDefaultCase((state, action) => {
        // switch문 default와 동일
      });
  },
});

export const { logOut } = userSlice.actions;
export default userSlice.reducer;
