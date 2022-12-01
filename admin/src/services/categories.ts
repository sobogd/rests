import { createAsyncThunk } from "@reduxjs/toolkit";
import { ICategory } from "../interfaces/categories";
import { IErrorResponse } from "../interfaces/common";
import { request } from "../utils/request";

const search = createAsyncThunk<ICategory[], void, IErrorResponse>(
  "categories/search",
  async (_, { rejectWithValue }) => await request(rejectWithValue, "/categories/search", "POST")
);

const create = createAsyncThunk<ICategory, ICategory, IErrorResponse>(
  "categories/create",
  async (category, { rejectWithValue }) =>
    await request(rejectWithValue, "/categories/create", "POST", { ...category, id: undefined })
);

const update = createAsyncThunk<ICategory, ICategory, IErrorResponse>(
  "categories/update",
  async (category: ICategory, { rejectWithValue }) =>
    await request(rejectWithValue, "/categories/update", "POST", category)
);

const remove = createAsyncThunk<{}, ICategory, IErrorResponse>(
  "categories/remove",
  async (category: ICategory, { rejectWithValue }) =>
    await request(rejectWithValue, "/categories/remove", "POST", category)
);

export const categoriesService = {
  search,
  create,
  update,
  remove,
};
