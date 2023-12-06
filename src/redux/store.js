import { configureStore } from "@reduxjs/toolkit";
// import {
//   persistReducer,
//   persistStore,
//   FLUSH,
//   REHYDRATE,
//   PAUSE,
//   PERSIST,
//   PURGE,
//   REGISTER,
// } from "redux-persist";
// import localStorage from "redux-persist/lib/storage";
// import createSagaMiddleware from "redux-saga";
import rootReducer from "./reducer";
// import rootSaga from "./sagas";

// const persistConfig = {
//   key: "root",
//   storage: localStorage,
// };

// const persitedReducer = persistReducer(persistConfig, rootReducer);

// const sagaMiddleware = createSagaMiddleware();

// const store = configureStore({
//   reducer: persitedReducer,
//   middleware: (getDefaultMiddleware) => {
//     const defaultMiddleware = getDefaultMiddleware({
//       serializableCheck: {
//         ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//       },
//     });
//     return [...defaultMiddleware, sagaMiddleware];
//   },
// });
const store = configureStore({
  reducer: rootReducer,
  // redux-toolkit의 기본 middleware를 가져오는 함수 호출 (다른 middleware를 끼워넣기 위해서)
  middleware: (getDefaultMiddleware) => {
    const defaultMiddleware = getDefaultMiddleware();
    return [...defaultMiddleware];
  },
});

// sagaMiddleware.run(rootSaga);

// export const persistor = persistStore(store);

export default store;
