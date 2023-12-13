import { createAsyncThunk } from "@reduxjs/toolkit";

const delay = (time, value) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(value);
    }, time);
  });

// createAsyncThunk에서는 try catch 안붙이는게 좋다! => 무조건 성공이라 rejected를 반환하지 않음
export const addPost = createAsyncThunk("post/add", async (data, thunkAPI) => {
  console.log(data);

  const result = await delay(500, {
    title: "새 게시글",
    content: "내용내용내용",
  });
  return result;
});
