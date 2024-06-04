import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Swal from "sweetalert2";

// API URL
const productURL = "https://localhost:7182/api/product";



// Async thunk for fetching all data
export const fetchData = createAsyncThunk(
  "data/fetchData",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(productURL);
      return response.data;
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Failed to fetch products",
        text: error.message,
      });
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for posting data
export const postData = createAsyncThunk(
  "data/postData",
  async (newProduct, { rejectWithValue }) => {
    try {
      const response = await axios.post(productURL, newProduct);
      Swal.fire({
        icon: "success",
        title: "Product added successfully!",
        showConfirmButton: false,
        timer: 1500,
      });
      return response.data;
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Failed to add product",
        text: error.message,
      });
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for sorting products by price
export const sortProductByPrice = createAsyncThunk(
  "data/sortProductByPrice",
  async (order, { getState }) => {
    const data = getState().data.searchResults;
    const sortedData = [...data].sort((a, b) => {
      const priceA = parseFloat(a.price);
      const priceB = parseFloat(b.price);
      return order === "asc" ? priceA - priceB : priceB - priceA;
    });
    return sortedData;
  }
);

// Data slice
const dataSlice = createSlice({
  name: "data",
  initialState: {
    data: [],
    searchResults: [],
    searchTerm: "",
    status: "idle",
    error: null,
    pagination: {
      currentPage: 1,
      totalPages: 0,
    },
  },
  reducers: {
    dataFilter: (state, action) => {
      state.searchTerm = action.payload;
      state.searchResults = state.data.filter((product) =>
        product.productName.toLowerCase().includes(action.payload.toLowerCase())
      );
    },
    setCurrentPage(state, action) {
      state.pagination.currentPage = action.payload;
    },
    setTotalPages(state, action) {
      state.pagination.totalPages = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
        state.searchResults = action.payload;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload ?? "Something went wrong";
      })
      .addCase(postData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(postData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = [...state.data, action.payload];
        Swal.fire({
          icon: "success",
          title: "Product loaded from API!",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .addCase(sortProductByPrice.fulfilled, (state, action) => {
        state.searchResults = action.payload;
      });
  },
});

// Exporting the reducer and actions
export default dataSlice.reducer;
export const { dataFilter } = dataSlice.actions;
