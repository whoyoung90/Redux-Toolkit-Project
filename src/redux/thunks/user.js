import { createAsyncThunk } from "@reduxjs/toolkit";
import { uuidV4, delay } from "../../lib/constant";

/**
 * createAsyncThunk는 try catch로 감싸지 않는게 좋다! => 무조건 성공이라 rejected를 반환하지 않음
 * 그러나 rejectWithValue를 사용하면 rejected로 반환 가능 (+서버에서 에러를 받아올 수 있음)
 *
 * thunkAPI는 dispatch, getState 함수들을 사용할 수 있게 해주는 객체
 * @param { { username, password }, thunkAPI }
 */
export const logIn = createAsyncThunk(
  "user/logIn",
  async (data, { getState, rejectWithValue }) => {
    console.log("payload creator function", data, getState());

    try {
      // const response = await axios.post("/login", data);
      const response = await delay(1000, {
        id: uuidV4(),
        username: data.username,
      });
      return response;
    } catch (err) {
      if (err.response) {
        // action.payload
        return rejectWithValue({
          data: err.response.data,
          status: err.response.status,
          statusText: err.response.statusText,
        });
      } else {
        // action.error
        throw new Error(err);
      }
    }
  }
);
