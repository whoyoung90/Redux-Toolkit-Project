import { createAsyncThunk } from "@reduxjs/toolkit";

/* uuid version4 generator */
export const uuidV4 = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    let r = (Math.random() * 16) | 0,
      v = c === "x" ? r : r & (0x3 | 0x8);
    return v.toString(16);
  });
};

const delay = (time, value) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(value);
    }, time);
  });

/**
 * async await은 보통 try catch로 감싸지만
 * createAsyncThunk에서는 try catch로 감싸지 않는게 좋다! => 무조건 성공이라 rejected를 반환하지 않음
 *
 * thunkAPI는 dispatch, getState 함수들을 사용할 수 있게 해주는 객체
 * @param { { id, password }, thunkAPI }
 */
export const logIn = createAsyncThunk("user/logIn", async (data, thunkAPI) => {
  const state = thunkAPI.getState();
  console.log("payload creator function", data, state);

  // throw new Error("비밀번호가 틀렸습니다.");

  // const response = await axios.post("/login", data);
  // 로그인 API POST시 응답 -> id, username
  const result = await delay(1000, {
    id: uuidV4(),
    username: data.username,
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
