import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_REGISTER = "https://localhost:7182/api/Login/Register";

export const registerUser = createAsyncThunk(
  "register/registerUser",
  async (userData) => {
    try {
      const response = await axios.post(API_REGISTER, userData);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

const authSlice = createSlice({
  name: "register",
  initialState: {
    loading: false,
    register: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.register = null;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.register = action.payload;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.register = null;
        state.error = action.error.message;
      });
  },
});

export default authSlice.reducer;
