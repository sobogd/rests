import { createAsyncThunk } from "@reduxjs/toolkit";
import { request } from "../../shared/api/base";
import { IUser } from "../users";
import { IErrorWithFields } from "../../app/interfaces";

export const getUsersByCompanyLogin = createAsyncThunk<
  any,
  string,
  { rejectValue: IErrorWithFields }
>(
  "auth/getUsersByCompanyLogin",
  async (companyLogin, { rejectWithValue }) =>
    await request(
      rejectWithValue,
      "/companies/getUsersByCompanyLogin",
      "POST",
      {
        companyLogin,
      }
    )
);

export const authUserByLoginAndPassword = createAsyncThunk<
  IUser,
  { login: string; password: string },
  { rejectValue: IErrorWithFields }
>(
  "auth/authUserByLoginAndPassword",
  async (data, { rejectWithValue }) =>
    await request(rejectWithValue, "/user/authorization", "POST", data)
);

export const whoAmI = createAsyncThunk(
  "auth/whoAmI",
  async (_, { rejectWithValue }) =>
    await request(rejectWithValue, "/user/whoami", "GET")
);
