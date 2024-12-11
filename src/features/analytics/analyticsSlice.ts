import { createSlice } from "@reduxjs/toolkit";
import { AnalyticsState } from "../../types";
import { fetchAnalyticsData } from "./analyticsAction";

const initialState: AnalyticsState = {
  data: null,
  status: "idle",
  error: null,
};

const analyticsSlice = createSlice({
  name: "analytics",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAnalyticsData.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchAnalyticsData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchAnalyticsData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Unknown error occurred";
      });
  },
});

export default analyticsSlice.reducer;
