import { createAsyncThunk } from "@reduxjs/toolkit";
import { delay } from "../../lib/constant";

/**
 * createAsyncThunk에서는 try catch 안붙이는게 좋다! => 무조건 성공이라 rejected를 반환하지 않음
 * @param { { title, content }, thunkAPI }
 */
export const addPost = createAsyncThunk("post/add", async (data, thunkAPI) => {
  console.log(data);

  const result = await delay(1000, data);
  return result;
});
