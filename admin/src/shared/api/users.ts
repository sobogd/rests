import { createAsyncThunk } from "@reduxjs/toolkit";
import { IErrorWithFields } from "app/interfaces";
import { IUser } from "entities/users";
import { request } from "./base";

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
