import { createAsyncThunk } from "@reduxjs/toolkit";
import { ITable, ITableImage } from "entities/tables";
import { requestFiles } from "utils/requestFiles";
import { IErrorResponse, request } from "./base";

export const findImage = createAsyncThunk<ITableImage, void, IErrorResponse>(
  "tables/findImage",
  async (_, { rejectWithValue }) => await request(rejectWithValue, "/tables/findImage", "POST")
);

export const uploadImage = createAsyncThunk<void, FileList, IErrorResponse>(
  "tables/uploadImage",
  async (files, { rejectWithValue }) => {
    return await requestFiles(rejectWithValue, "/tables/uploadImage", "POST", files);
  }
);

export const searchTables = createAsyncThunk<ITable[], void, IErrorResponse>(
  "tables/search",
  async (_, { rejectWithValue }) => await request(rejectWithValue, "/tables/search", "POST")
);

export const createTable = createAsyncThunk<ITable, ITable, IErrorResponse>(
  "tables/create",
  async (element, { rejectWithValue }) =>
    await request(rejectWithValue, "/tables/create", "POST", { ...element, id: undefined })
);

export const updateTable = createAsyncThunk<ITable, ITable, IErrorResponse>(
  "tables/update",
  async (element: ITable, { rejectWithValue }) =>
    await request(rejectWithValue, "/tables/update", "POST", element)
);

export const removeTable = createAsyncThunk<{}, ITable, IErrorResponse>(
  "tables/remove",
  async (element: ITable, { rejectWithValue }) =>
    await request(rejectWithValue, "/tables/remove", "POST", element)
);
