import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authServices";
import {toast} from 'react-toastify'
const getUserfromLocalStorage = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;
const initialState = {
  user: getUserfromLocalStorage,
  orders: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};
export const login = createAsyncThunk(
  "auth/login",
  async (userData, thunkAPI) => {
    try {
      return await authService.login(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getProductOrders = createAsyncThunk(
  "order/get-orders",
  async (thunkAPI) => {
    try {
      return await authService.getOrders();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const getSingleOrder = createAsyncThunk(
  "order/get-single-order",
  async (id, thunkAPI) => {
    try {
      return await authService.getSingleOrder(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getMonthlyData = createAsyncThunk(
  "order/monthlydata",
  async (thunkAPI) => {
    try {
      return await authService.getMonthlyOrders();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const getYearlyData = createAsyncThunk(
  "order/yearlydata",
  async (id, thunkAPI) => {
    try {
      return await authService.getYearlySales(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateStatus = createAsyncThunk(
  "order/update-order-status",
  async (id, thunkAPI) => {
    try {
      return await authService.updateStatus(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);


export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {},
  extraReducers: (buildeer) => {
    buildeer
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
        state.message = "success";
      })
      .addCase(login.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        if (state.isError) {
          const errorMessage = action.payload.response.data.message;
          toast.error(errorMessage);
        }
        state.isLoading = false;
      })
      .addCase(getProductOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProductOrders.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.Orders = action.payload;
        state.message = "success";
      })
      .addCase(getProductOrders.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        if (state.isError) {
          const errorMessage = action.payload.response.data.message;
          toast.error(errorMessage);
        }
        state.isLoading = false;
      })
      .addCase(getSingleOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSingleOrder.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.SingleOrder = action.payload;
        state.message = "success";
      })
      .addCase(getSingleOrder.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        if (state.isError) {
          const errorMessage = action.payload.response.data.message;
          toast.error(errorMessage);
        }
        state.isLoading = false;
      }).addCase(updateStatus.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateStatus.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.update = action.payload;
        state.message = "success";
      })
      .addCase(updateStatus.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        if (state.isError) {
          const errorMessage = action.payload.response.data.message;
          toast.error(errorMessage);
        }
        state.isLoading = false;
      }).addCase(getYearlyData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getYearlyData.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.yearlyData = action.payload;
        state.message = "success";
      })
      .addCase(getYearlyData.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        if (state.isError) {
          const errorMessage = action.payload.response.data.message;
          toast.error(errorMessage);
        }
        state.isLoading = false;
      }).addCase(getMonthlyData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMonthlyData.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.monthlyData = action.payload;
        state.message = "success";
      })
      .addCase(getMonthlyData.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        if (state.isError) {
          const errorMessage = action.payload.response.data.message;
          toast.error(errorMessage);
        }
        state.isLoading = false;
      });
  },
});

export default authSlice.reducer;
