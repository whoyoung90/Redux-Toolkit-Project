import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: {},
  // global: false,
};

const loadingSlice = createSlice({
  name: "loading",
  initialState,
  reducers: {
    startLoading: (state, { payload: actionType }) => {
      state.loading[actionType] = true;
    },
    finishLoading: (state, { payload: actionType }) => {
      state.loading[actionType] = false;
    },
    // startLoading: (state, action) => {
    //   state.global = true;
    // },
    // finishLoading: (state, action) => {
    //   state.global = false;
    // },
  },
});

export const { startLoading, finishLoading } = loadingSlice.actions;
export default loadingSlice.reducer;
