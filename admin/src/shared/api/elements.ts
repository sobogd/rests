import { createAsyncThunk } from "@reduxjs/toolkit";
import { IElement } from "entities/element/model";
import { IErrorResponse, request } from "./base";

export const searchElements = createAsyncThunk<IElement[], void, IErrorResponse>(
  "elements/search",
  async (_, { rejectWithValue }) => await request(rejectWithValue, "/elements/search", "POST")
);

export const createElement = createAsyncThunk<IElement, IElement, IErrorResponse>(
  "elements/create",
  async (element, { rejectWithValue }) =>
    await request(rejectWithValue, "/elements/create", "POST", { ...element, id: undefined })
);

export const updateElement = createAsyncThunk<IElement, IElement, IErrorResponse>(
  "elements/update",
  async (element: IElement, { rejectWithValue }) =>
    await request(rejectWithValue, "/elements/update", "POST", element)
);

export const removeElement = createAsyncThunk<{}, IElement, IErrorResponse>(
  "elements/remove",
  async (element: IElement, { rejectWithValue }) =>
    await request(rejectWithValue, "/elements/remove", "POST", element)
);
