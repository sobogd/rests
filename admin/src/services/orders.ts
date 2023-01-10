import { createAsyncThunk } from "@reduxjs/toolkit";
import { IErrorResponse } from "../interfaces/common";
import { IOrder } from "../interfaces/orders";
import { request } from "../utils/request";

const search = createAsyncThunk<IOrder[], void, IErrorResponse>(
  "orders/search",
  async (_, { rejectWithValue }) => await request(rejectWithValue, "/orders/search", "POST")
);

const create = createAsyncThunk<any, any, IErrorResponse>(
  "orders/create",
  async (order, { rejectWithValue }) => await request(rejectWithValue, "/orders/create", "POST", order)
);

const update = createAsyncThunk<any, any, IErrorResponse>(
  "orders/update",
  async (order, { rejectWithValue }) => await request(rejectWithValue, "/orders/update", "POST", order)
);

const remove = createAsyncThunk<{}, { id: string }, IErrorResponse>(
  "orders/remove",
  async (order, { rejectWithValue }) => await request(rejectWithValue, "/orders/remove", "POST", order)
);

export const ordersService = {
  search,
  create,
  update,
  remove,
};
