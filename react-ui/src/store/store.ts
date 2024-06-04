import { configureStore } from "@reduxjs/toolkit";
import dataReducer from "../features/product-slice";
import userReducer from "../features/user-slice";
import departmentReducer from "../features/departments-slice";
import orderReducer from "../features/order-slice";
import themeReducer from "../features/theme-slice";

const store = configureStore({
  reducer: {
    data: dataReducer,
    user: userReducer,
    departments: departmentReducer,
    orders: orderReducer,
    theme: themeReducer,
  },
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: {
      // Ignore state and actions that are non-serializable
      ignoredActions: ['yourNonSerializableAction'],
      ignoredPaths: ['some.nested.nonSerializableField'],
      // Increase warning threshold
      warnAfter: 100, // Default is 32ms
    },
  }),
});

export type RootState = ReturnType<typeof store.getState>
export default store;
