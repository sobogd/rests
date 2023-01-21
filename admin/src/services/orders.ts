import { createAsyncThunk } from "@reduxjs/toolkit";
import { IErrorResponse } from "../interfaces/common";
import { IOrder, IOrderForToday } from "../interfaces/orders";
import { request } from "../utils/request";
import { parseISO, parse } from "date-fns";
import { formatInTimeZone, format } from "date-fns-tz";

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

const finish = createAsyncThunk<{}, { id: string; discount: number }, IErrorResponse>(
  "orders/finish",
  async (r, { rejectWithValue }) =>
    await request(rejectWithValue, "/orders/finish", "POST", {
      id: r.id.toString(),
      discount: r.discount,
    })
);

const getDayReport = createAsyncThunk<IOrderForToday[], string, IErrorResponse>(
  "orders/getDayReport",
  async (date, { rejectWithValue }) => {
    return await request(rejectWithValue, "/orders/get-day-report", "POST", {
      date: format(new Date(date), "yyyy-MM-dd'T'HH:mm:ss'Z'", { timeZone: "UTC" }),
    });
  }
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
