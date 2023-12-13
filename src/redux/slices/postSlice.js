import { createSlice } from "@reduxjs/toolkit";
import { addPost } from "../thunks/post";

const initialState = {
  data: [],
};

const postSlice = createSlice({
  name: "post",
  initialState,
  // 동기 action & 내부 action
  reducers: {
    // postSlice.actions.clearPost로 접근
    clearPost(state, action) {
      state.data = [];
    },
  },
  // 비동기 action & 외부 action
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
          return action.type.includes("/pending");
        },
        (state, action) => {
          state.isLoading = true;
        }
      )
      .addDefaultCase((state, action) => {
        // default
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
 * switch() {
 *   case "add_pending":
 *   case "update_pending":
 *     state.isLoading = true;
 *     break;
 * }
 */

// const initialState = [];
// const postReducer = (prevState = initialState, action) => {
//   return produce(prevState, (draft) => {
//     switch (action.type) {
//       case "ADD_POST":
//         draft.push(action.data);
//         break;
//       default:
//         break;
//     }
//   });
// };
