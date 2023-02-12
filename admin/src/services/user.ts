import { createAsyncThunk } from "@reduxjs/toolkit";
import { IErrorWithFields } from "../interfaces/common";
import { IUser } from "../interfaces/user";
import { request } from "../utils/request";

export const authorization = createAsyncThunk<
  IUser,
  { login: string; password: string },
  { rejectValue: IErrorWithFields }
>(
  "user/authorization",
  async ({ login, password }, { rejectWithValue }) =>
    await request(rejectWithValue, "/user/authorization", "POST", { login, password })
);

export const whoAmI = createAsyncThunk(
  "user/whoami",
  async (_r, { rejectWithValue }) => await request(rejectWithValue, "/user/whoami", "GET")
);

export const getUsersForCompany = createAsyncThunk(
  "user/getUsersForCompany",
  async (_r, { rejectWithValue }) => await request(rejectWithValue, "/user/get-users-for-company", "GET")
);
