import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { User } from "../../types";

export const fetchUsers = createAsyncThunk<
  User[],
  void,
  { rejectValue: string }
>("users/fetchUsers", async (_, thunkAPI) => {
  try {
    const response = await axios.get("/users.json"); // Mock API for users
    if (!response) {
      throw new Error("Failed to Users");
    }
    const data = response.data;
    return data as User[];
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error);
  }
});
