import { createAsyncThunk } from "@reduxjs/toolkit";
import { IErrorResponse } from "../interfaces/common";
import { IOrder, IOrderForToday } from "../interfaces/orders";
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

const orderPositionFinish = createAsyncThunk<{}, { orderPositionId: number }, IErrorResponse>(
  "orders/orderPositionFinish",
  async (r, { rejectWithValue }) =>
    await request(rejectWithValue, "/orders/order-position-finish", "POST", {
      orderPositionId: r.orderPositionId,
    })
);

const finish = createAsyncThunk<{}, { id: number; type: string }, IErrorResponse>(
  "orders/finish",
  async (r, { rejectWithValue }) =>
    await request(rejectWithValue, "/orders/finish", "POST", {
      id: r.id,
      type: r.type,
    })
);

const getDayReport = createAsyncThunk<IOrderForToday[], {}, IErrorResponse>(
  "orders/getDayReport",
  async (_, { rejectWithValue }) => await request(rejectWithValue, "/orders/get-day-report", "POST", {})
);

export const ordersService = {
  search,
  create,
  update,
  remove,
  orderPositionFinish,
  finish,
  getDayReport,
};
