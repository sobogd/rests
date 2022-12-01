import { createAsyncThunk } from "@reduxjs/toolkit";
import { IErrorResponse } from "../interfaces/common";
import { IPosition } from "../interfaces/positions";
import { request } from "../utils/request";

const search = createAsyncThunk<IPosition[], void, IErrorResponse>(
  "positions/search",
  async (_, { rejectWithValue }) => await request(rejectWithValue, "/positions/search", "POST")
);

const create = createAsyncThunk<IPosition, IPosition, IErrorResponse>(
  "positions/create",
  async (element, { rejectWithValue }) =>
    await request(rejectWithValue, "/positions/create", "POST", { ...element, id: undefined })
);

const update = createAsyncThunk<IPosition, IPosition, IErrorResponse>(
  "positions/update",
  async (position: IPosition, { rejectWithValue }) =>
    await request(rejectWithValue, "/positions/update", "POST", position)
);

const remove = createAsyncThunk<{}, { id: string }, IErrorResponse>(
  "positions/remove",
  async (element, { rejectWithValue }) => await request(rejectWithValue, "/positions/remove", "POST", element)
);

export const positionsService = {
  search,
  create,
  update,
  remove,
};
