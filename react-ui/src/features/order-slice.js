import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_ENDPOINT = "https://localhost:7182/api/OrderItem";

// Async action to fetch orders from the API
export const fetchOrders = createAsyncThunk("orders/fetchOrders", async () => {
  try {
    const response = await axios.get(API_ENDPOINT);
    return response.data;
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }
});

export const postOrder = createAsyncThunk("orders/post", async (order) => {
  try {
    const response = await axios.post(API_ENDPOINT, order);
    return response.data;
  } catch (error) {
    console.error("Error posting order:", error);
    throw error;
  }
});

const orderSlice = createSlice({
  name: "orders",
  initialState: {
    items: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = "succeeded";
      })
      .addCase(postOrder.pending, (state) => {
        state.status = "loading";
      })
      .addCase(postOrder.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(postOrder.fulfilled, (state, action) => {
        state.items.push(action.payload);
        state.status = "succeeded";
      });
  },
});

export default orderSlice.reducer;
