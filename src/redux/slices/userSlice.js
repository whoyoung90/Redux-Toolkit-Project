import { createSlice } from "@reduxjs/toolkit";
import { logIn } from "../thunks/user";

const initialState = {
  isLoggingIn: false,
  data: null,
  email: "",
  password: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  // 동기 action & 내부 action
  reducers: {
    logOut(state, action) {
      state.data = null;
    },
    setLoginForm(state, action) {
      state.email = action.payload.email;
      state.password = action.payload.password;
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
        }
      )
      .addCase(
        // user/logIn/fulfilled
        logIn.fulfilled,
        (state, action) => {
          state.data = action.payload; // userId, nickname
          state.isLoggingIn = false;
        }
      )
      .addCase(
        // user/logIn/rejected
        logIn.rejected,
        (state, action) => {
          state.data = null;
          state.isLoggingIn = false;
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
