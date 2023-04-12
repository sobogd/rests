import { createAsyncThunk } from "@reduxjs/toolkit";
import { format } from "date-fns-tz";
import { IOrder, IOrderForToday } from "entities/orders/model";
import { IErrorResponse, request } from "./base";

export const searchOrders = createAsyncThunk<IOrder[], void, IErrorResponse>(
  "orders/search",
  async (_, { rejectWithValue }) =>
    await request(rejectWithValue, "/orders/search", "POST")
);

export const createOrder = createAsyncThunk<any, any, IErrorResponse>(
  "orders/create",
  async (order, { rejectWithValue }) =>
    await request(rejectWithValue, "/orders/create", "POST", order)
);

export const updateOrder = createAsyncThunk<any, any, IErrorResponse>(
  "orders/update",
  async (order, { rejectWithValue }) =>
    await request(rejectWithValue, "/orders/update", "POST", order)
);

export const archiveOrder = createAsyncThunk<{}, number, IErrorResponse>(
  "orders/archive",
  async (orderId, { rejectWithValue }) =>
    await request(rejectWithValue, "/orders/archive", "POST", { id: orderId })
);

export const orderPositionStart = createAsyncThunk<
  {},
  { orderPositionId: number },
  IErrorResponse
>(
  "orders/orderPositionStart",
  async (r, { rejectWithValue }) =>
    await request(rejectWithValue, "/orders/order-position-start", "POST", {
      orderPositionId: r.orderPositionId,
    })
);

export const orderPositionReady = createAsyncThunk<
  {},
  { orderPositionId: number },
  IErrorResponse
>(
  "orders/orderPositionReady",
  async (r, { rejectWithValue }) =>
    await request(rejectWithValue, "/orders/order-position-ready", "POST", {
      orderPositionId: r.orderPositionId,
    })
);

export const orderPositionGiven = createAsyncThunk<
  {},
  { orderPositionId: number },
  IErrorResponse
>(
  "orders/orderPositionGiven",
  async (r, { rejectWithValue }) =>
    await request(rejectWithValue, "/orders/order-position-given", "POST", {
      orderPositionId: r.orderPositionId,
    })
);

export const orderPositionRestart = createAsyncThunk<
  {},
  { orderPositionId: number },
  IErrorResponse
>(
  "orders/orderPositionRestart",
  async (r, { rejectWithValue }) =>
    await request(rejectWithValue, "/orders/order-position-restart", "POST", {
      orderPositionId: r.orderPositionId,
    })
);

export const finishOrder = createAsyncThunk<
  {},
  { id: string; discount: number; total: number },
  IErrorResponse
>(
  "orders/finish",
  async (r, { rejectWithValue }) =>
    await request(rejectWithValue, "/orders/finish", "POST", {
      id: r.id.toString(),
      discount: r.discount,
      total: r.total,
    })
);

export const getDayReport = createAsyncThunk<
  IOrderForToday[],
  string,
  IErrorResponse
>("orders/getDayReport", async (date, { rejectWithValue }) => {
  return await request(rejectWithValue, "/orders/get-day-report", "POST", {
    date: format(new Date(date), "yyyy-MM-dd'T'HH:mm:ss'Z'", {
      timeZone: "UTC",
    }),
  });
});
