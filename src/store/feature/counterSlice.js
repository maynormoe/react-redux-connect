import { createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
  name: "counter",
  initialState: {
    counter: 888,
  },
  reducers: {
    addNumber(state, { payload }) {
      console.log(payload);
      state.counter += payload;
    },
    subNumber(state, { payload }) {
      console.log(payload);
      state.counter -= payload;
    },
  },
});

export const { addNumber, subNumber } = counterSlice.actions;
// dispatch(addNumber(num))

export default counterSlice.reducer;
