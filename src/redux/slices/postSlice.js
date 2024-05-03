import { createSlice } from "@reduxjs/toolkit";
import { addPost } from "../thunks/post";

const initialState = {
  data: [],
};

const postSlice = createSlice({
  name: "post",
  initialState,
  // 동기 action || postReducer에 종속된 action
  reducers: {
    clearPost(state, action) {
      state.data = [];
    },
  },
  // 비동기 action || 외부 action
  extraReducers: (builder) => {
    builder
      // .addCase(logIn.pending, (state, action) => {}) // 여기서도 사용 가능
      .addCase(addPost.pending, (state, action) => {})
      .addCase(addPost.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })
      .addCase(addPost.rejected, (state, action) => {})
      .addMatcher(
        (action) => {
          // pending, fullfilled, rejected가 계속 쌓여나갈때 공통 처리
          return action.type.includes("/pending"); // 이부분이 true가 되는 action들
        },
        (state, action) => {
          state.isLoading = true;
        }
      )
      .addDefaultCase((state, action) => {
        // switch문 default와 동일
      });
  },
});

export const { clearPost } = postSlice.actions;
export default postSlice.reducer;

/**
 * @description addCase
 * - 기존 state를 통째로 바꾸는 경우(불변성이 깨졌을 때): return state 해주자!
 *
 * builder.addCase(addPost.pending, (state, action) => {
 *   state = 123;
 *   return state;
 * })
 */

/**
 * @description addMatcher
 * - 여러 action들의 공통 상태값 처리 (ex loading)
 *
 * .addCase(action1.pending, (state, action) => {})
 * .addCase(action1.fulfilled, (state, action) => {})
 * .addCase(action1.rejected, (state, action) => {})
 * .addCase(action2.pending, (state, action) => {})
 * .addCase(action2.fulfilled, (state, action) => {})
 * .addCase(action2.rejected, (state, action) => {})
 * .addCase(action3.pending, (state, action) => {})
 * .addCase(action3.fulfilled, (state, action) => {})
 * .addCase(action3.rejected, (state, action) => {})
 *
 * switch() {
 *   case "add_pending":
 *   case "update_pending":
 *     state.isLoading = true;
 *     break;
 * }
 */
