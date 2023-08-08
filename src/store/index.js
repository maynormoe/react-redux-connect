import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./feature/counterSlice";
import homeReducer from "./feature/homeSlice";

const store = configureStore({
  reducer: {
    counter: counterReducer,
    home: homeReducer,
  },
  devTools: true,
});

export default store;
