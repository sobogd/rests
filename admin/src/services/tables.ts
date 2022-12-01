import { createAsyncThunk } from "@reduxjs/toolkit";
import { IErrorResponse } from "../interfaces/common";
import { ITable, ITableImage } from "../interfaces/tables";
import { request } from "../utils/request";
import { requestFiles } from "../utils/requestFiles";

const findImage = createAsyncThunk<ITableImage, void, IErrorResponse>(
  "tables/findImage",
  async (_, { rejectWithValue }) => await request(rejectWithValue, "/tables/findImage", "POST")
);

const uploadImage = createAsyncThunk<void, FileList, IErrorResponse>(
  "tables/uploadImage",
  async (files, { rejectWithValue }) => {
    return await requestFiles(rejectWithValue, "/tables/uploadImage", "POST", files);
  }
);

const search = createAsyncThunk<ITable[], void, IErrorResponse>(
  "tables/search",
  async (_, { rejectWithValue }) => await request(rejectWithValue, "/tables/search", "POST")
);

const create = createAsyncThunk<ITable, ITable, IErrorResponse>(
  "tables/create",
  async (element, { rejectWithValue }) =>
    await request(rejectWithValue, "/tables/create", "POST", { ...element, id: undefined })
);

const update = createAsyncThunk<ITable, ITable, IErrorResponse>(
  "tables/update",
  async (element: ITable, { rejectWithValue }) =>
    await request(rejectWithValue, "/tables/update", "POST", element)
);

const remove = createAsyncThunk<{}, ITable, IErrorResponse>(
  "tables/remove",
  async (element: ITable, { rejectWithValue }) =>
    await request(rejectWithValue, "/tables/remove", "POST", element)
);

export const tablesService = {
  findImage,
  uploadImage,
  search,
  create,
  update,
  remove,
};
