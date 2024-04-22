import { createSlice } from "@reduxjs/toolkit";
import { logIn } from "../thunks/user";

const initialState = {
  isLoggingIn: false,
  isLoggedIn: false,
  error: false,
  data: null,
  prices: Array(100)
    .fill()
    .map((v, i) => (i + 1) * 100),
};

const userSlice = createSlice({
  name: "user",
  initialState,
  // 동기 action & 내부 action
  reducers: {
    logOut(state, action) {
      state.data = null;
    },
  },
  // 비동기 action & 외부 action
  extraReducers: (builder) => {
    builder
      .addCase(
        // user/logIn/pending
        logIn.pending,
        (state, action) => {
          state.isLoggingIn = true;
          state.isLoggedIn = false;
          state.error = false;
        }
      )
      .addCase(
        // user/logIn/fulfilled
        logIn.fulfilled,
        (state, action) => {
          state.data = action.payload; // id, username
          state.isLoggingIn = false;
          state.isLoggedIn = true;
          state.error = false;
        }
      )
      .addCase(
        // user/logIn/rejected
        logIn.rejected,
        (state, action) => {
          state.data = null;
          state.isLoggingIn = false;
          state.isLoggedIn = false;
          state.error = action.payload;
        }
      )
      .addMatcher(
        (action) => {},
        (state, action) => {}
      )
      .addDefaultCase((state, action) => {});
  },
});

export const { logOut, setLoginForm } = userSlice.actions;
export default userSlice.reducer;

// const userReducer = (prevState = initialState, action) => {
// 	return produce(prevState, (draft) => {
// 		switch (action.type) {
// 			case "LOG_IN_REQUEST":
// 				draft.data =  null;
// 				draft.isLoggingIn = true;
// 				break;
// 			case "LOG_IN_SUCCESS":
// 				draft.data = action.data;
// 				draft.isLoggingIn = false;
// 				break;
// 			case "LOG_IN_FAILURE":
// 				draft.data = null;
// 				draft.isLoggingIn = false;
// 				break;
// 		}
// 	})
// }
