import { createAsyncThunk } from "@reduxjs/toolkit";
import { ICategory } from "entities/categories/model";
import { IErrorResponse, request } from "./base";

export const searchCategories = createAsyncThunk<ICategory[], void, IErrorResponse>(
  "categories/search",
  async (_, { rejectWithValue }) => await request(rejectWithValue, "/categories/search", "POST")
);

export const createCategory = createAsyncThunk<ICategory, ICategory, IErrorResponse>(
  "categories/create",
  async (category, { rejectWithValue }) =>
    await request(rejectWithValue, "/categories/create", "POST", { ...category, id: undefined })
);

export const updateCategory = createAsyncThunk<ICategory, ICategory, IErrorResponse>(
  "categories/update",
  async (category: ICategory, { rejectWithValue }) =>
    await request(rejectWithValue, "/categories/update", "POST", category)
);

export const removeCategory = createAsyncThunk<{}, ICategory, IErrorResponse>(
  "categories/remove",
  async (category: ICategory, { rejectWithValue }) =>
    await request(rejectWithValue, "/categories/remove", "POST", category)
);
