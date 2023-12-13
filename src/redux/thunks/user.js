import { createAsyncThunk } from "@reduxjs/toolkit";

const delay = (time, value) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(value);
    }, time);
  });

/**
 * async await은 보통 try catch로 감싸지만
 * createAsyncThunk에서는 try catch로 감싸지 않는게 좋다! => 무조건 성공이라 rejected를 반환하지 않음
 * @param { { id, password }, thunkAPI }
 */
export const logIn = createAsyncThunk("user/logIn", async (data, thunkAPI) => {
  // const state = thunkAPI.getState();
  // console.log(state.user.data);
  console.log(data);

  // throw new Error("비밀번호가 틀렸습니다.");

  // 로그인 API POST시 응답 -> userId, nickname
  const result = await delay(500, {
    userId: 1,
    nickname: "wooyoung",
  });
  return result;
});

// const logIn = (data) => {
//   return (dispatch, getState) => {
//     dispatch(logInRequest(data)); // 동기
//     try {
//       setTimeout(() => {
//         // 비동기
//         dispatch(
//           logInSuccess({
//             // 동기
//             userId: 1,
//             nickname: "wooyoung",
//           })
//         );
//       }, 2000);
//       // axios.post().then().catch() 나중에 대체
//     } catch (e) {
//       dispatch(logInFailure(e));
//     }
//   };
// };
