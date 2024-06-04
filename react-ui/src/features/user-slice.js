import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api, { fetchUser } from "../utils/api";
import Swal from "sweetalert2";

const userURL = "Login/GetToken";

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (userCredentials) => {
    const response = await api.post(userURL, userCredentials);
    return response.data;
  }
);

export const updateCart = createAsyncThunk(
  "user/updateCart",
  async ({ itemId, add }, thunkAPI) => {
    const updateURL = "https://localhost:7182/api/Cart/update";
    let { user } = thunkAPI.getState();
    let itemQuantity =
      user.user.cart.orderItems.find((item) => item.product.id === itemId)
        ?.quantity ?? 0;
    if (add) {
      itemQuantity += 1;
    } else {
      if (!itemQuantity) {
        throw new Error("cannot remove item, item not present in cart");
      }
      itemQuantity -= 1;
    }
    if (itemQuantity < 0) {
      itemQuantity = 0;
    }
    const response = await api.put(updateURL, {
      cartId: user.user.cart.cartId,
      productId: itemId,
      quantity: itemQuantity,
    });
    return {
      newCart: response.data, // new cart\
      newQuantity: itemQuantity,
    };
  }
);

function calcTotalCartPrice(cart) {
  return cart.orderItems.reduce((price, orderItem) => {
    return price + orderItem.quantity * orderItem.product.price;
  }, 0);
}

function calcTotalCartItems(cart) {
  return cart.orderItems.reduce((items, orderItem) => {
    return items + orderItem.quantity;
  }, 0);
}

export const me = createAsyncThunk("user/me", async () => {
  const user = await fetchUser();
  return user;
});

const userReducer = createSlice({
  name: "user",
  initialState: {
    loading: false,
    user: null,
    error: null,
    cartItems: [],
    cartTotalQuantity: 0,
    cartTotalPrice: 0,
  },
  reducers: {
    setUser: (state, action) => {
      console.log(state.user?.cart);
      state.user = action.payload;
    },
    logOut: (state) => {
      state.user = null;
      localStorage.removeItem("mywebsite_token");
    },
  },

  extraReducers: (builder) => {
    builder
      // loginUser
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.user = null;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;

        state.cartTotalPrice = calcTotalCartPrice(state.user.cart);
        state.cartTotalQuantity = calcTotalCartItems(state.user.cart);

        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.error = action.error.message; // Set the error message
      })
      // me
      .addCase(me.pending, (state) => {
        state.loading = true;
        state.user = null;
        state.error = null;
      })
      .addCase(me.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;

        state.cartTotalPrice = calcTotalCartPrice(state.user.cart);
        state.cartTotalQuantity = calcTotalCartItems(state.user.cart);

        state.error = null;
      })
      .addCase(me.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        localStorage.removeItem("mywebsite_token");
        state.error = action.error.message; // Set the error message
      })
      // updateCArt
      .addCase(updateCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCart.fulfilled, (state, action) => {
        state.loading = false;
        state.user = {
          ...state.user,
          cart: action.payload.newCart,
        };

        state.cartTotalPrice = calcTotalCartPrice(state.user.cart);
        state.cartTotalQuantity = calcTotalCartItems(state.user.cart);

        if (!action.payload.newQuantity) {
          Swal.fire({
            icon: "success",
            title: "Product Removed from cart",
            showConfirmButton: false,
            timer: 1500,
          });
        } else {
          Swal.fire({
            icon: "success",
            title:
              "Product added to cart, current quantity " +
              action.payload.newQuantity,
            showConfirmButton: false,
            timer: 1500,
          });
        }

        state.error = null;
      })
      .addCase(updateCart.rejected, (state, action) => {
        state.loading = false;
        Swal.fire({
          icon: "error",
          title: action.error.message,
          showConfirmButton: false,
          timer: 1500,
        });
        state.error = action.error.message; // Set the error message
      });
  },
});

export default userReducer.reducer;
export const { setUser, logOut, addToCart } = userReducer.actions;

export const selectCurrentUser = (state) => state.user.user;
export const selectCartItems = (state) => state.user.cartItems;
