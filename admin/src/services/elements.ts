import { createAsyncThunk } from "@reduxjs/toolkit";
import { IErrorResponse } from "../interfaces/common";
import { IElement } from "../interfaces/elements";
import { request } from "../utils/request";

const search = createAsyncThunk<IElement[], void, IErrorResponse>(
  "elements/search",
  async (_, { rejectWithValue }) => await request(rejectWithValue, "/elements/search", "POST")
);

const create = createAsyncThunk<IElement, IElement, IErrorResponse>(
  "elements/create",
  async (element, { rejectWithValue }) =>
    await request(rejectWithValue, "/elements/create", "POST", { ...element, id: undefined })
);

const update = createAsyncThunk<IElement, IElement, IErrorResponse>(
  "elements/update",
  async (element: IElement, { rejectWithValue }) =>
    await request(rejectWithValue, "/elements/update", "POST", element)
);

const remove = createAsyncThunk<{}, IElement, IErrorResponse>(
  "elements/remove",
  async (element: IElement, { rejectWithValue }) =>
    await request(rejectWithValue, "/elements/remove", "POST", element)
);

export const elementsService = {
  search,
  create,
  update,
  remove,
};
