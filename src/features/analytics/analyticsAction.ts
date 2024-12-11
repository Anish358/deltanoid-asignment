import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { AnalyticsData } from "../../types";

export const fetchAnalyticsData = createAsyncThunk<
  AnalyticsData,
  void,
  { rejectValue: string }
>("analytics/fetchAnalyticsData", async (_, thunkAPI) => {
  try {
    const response = await axios.get("/analytics.json"); // Mock API for analytics
    if (!response) {
      throw new Error("Failed to fetch analytics data");
    }
    const data = response.data;
    return data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error);
  }
});
