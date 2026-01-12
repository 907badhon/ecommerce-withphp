import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ordersAPI } from "../../services/api";

const initialState = {
  items: [],
  isLoading: false,
  error: null,
};

export const createOrder = createAsyncThunk(
  "orders/create",
  async (orderData, { rejectWithValue }) => {
    try {
      const response = await ordersAPI.create(orderData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchOrders = createAsyncThunk(
  "orders/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await ordersAPI.getAll();
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateOrderStatus = createAsyncThunk(
  "orders/updateStatus",
  async (data, { rejectWithValue }) => {
    try {
      const response = await ordersAPI.updateStatus(data);
      return { ...response.data, order_id: data.order_id, status: data.status };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message || "Failed to create order";
      })
      .addCase(fetchOrders.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message || "Failed to fetch orders";
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        const order = state.items.find((o) => o.id === action.payload.order_id);
        if (order) {
          order.status = action.payload.status;
        }
      });
  },
});

export default ordersSlice.reducer;
