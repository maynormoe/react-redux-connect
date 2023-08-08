import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchHomeDataAction = createAsyncThunk(
  "fetch/homeData",
  async (extraInfo, { dispatch, getState }) => {
    console.log(extraInfo);
    const res = await axios.get("http://123.207.32.32:8000/home/multidata");

    // dispatch(changeBanners(banners))

    return res.data;
  },
);

const homeSlice = createSlice({
  name: "home",
  initialState: {
    banners: [],
    recommends: [],
  },
  reducers: {
    changeBanners(state, { payload }) {
      state.banners = payload;
    },
    changeRecommends(state, { payload }) {
      state.recommends = payload;
    },
  },
  //   extraReducers: {
  //     [fetchHomeDataAction.fulfilled](state, { payload }) {
  //       state.banners = payload.data.banner.list;
  //       state.recommends = payload.data.recommend.list;
  //     },
  //   },
  // 推荐异步
  extraReducers: (builder) => {
    builder
      .addCase(fetchHomeDataAction.pending, (state, { payload }) => {
        console.log("pending");
      })
      .addCase(fetchHomeDataAction.fulfilled, (state, { payload }) => {
        state.banners = payload.data.banner.list;
        state.recommends = payload.data.recommend.list;
      })
      .addCase(fetchHomeDataAction.rejected, (state, { payload }) => {
        console.log("reject");
      });
  },
});

export const { changeBanners, changeRecommends } = homeSlice.actions;

export default homeSlice.reducer;
