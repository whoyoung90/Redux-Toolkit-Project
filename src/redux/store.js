import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import rootReducer from "./reducer";
import rootSaga from "./sagas";

const firstMiddleware = (store) => (next) => (action) => {
  console.log("로깅", action);
  next(action);
};

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    const defaultMiddleware = getDefaultMiddleware();
    return [firstMiddleware, sagaMiddleware, ...defaultMiddleware];
  },
  devTools: process.env.NODE_ENV !== "production",
});

sagaMiddleware.run(rootSaga);

export default store;
