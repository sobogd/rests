import { createAsyncThunk } from "@reduxjs/toolkit";
import { IPosition, IPositionForCreate } from "entities/positions";
import { IErrorResponse, request } from "./base";

export const searchPositions = createAsyncThunk<
  IPosition[],
  void,
  IErrorResponse
>(
  "positions/search",
  async (_, { rejectWithValue }) =>
    await request(rejectWithValue, "/positions/search", "POST")
);

export const createPosition = createAsyncThunk<
  IPositionForCreate,
  IPositionForCreate,
  IErrorResponse
>(
  "positions/create",
  async (element, { rejectWithValue }) =>
    await request(rejectWithValue, "/positions/create", "POST", {
      ...element,
      id: undefined,
    })
);

export const updatePosition = createAsyncThunk<
  IPosition,
  IPosition,
  IErrorResponse
>(
  "positions/update",
  async (position: IPosition, { rejectWithValue }) =>
    await request(rejectWithValue, "/positions/update", "POST", position)
);

export const archivePosition = createAsyncThunk<{}, number, IErrorResponse>(
  "positions/archive",
  async (id, { rejectWithValue }) =>
    await request(rejectWithValue, "/positions/archive", "POST", {
      id,
    })
);
