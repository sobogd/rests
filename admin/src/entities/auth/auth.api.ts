import { createAsyncThunk } from "@reduxjs/toolkit";
import { request } from "../../api/base";
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
  { login: string; password: string; companyLogin: string },
  { rejectValue: IErrorWithFields }
>(
  "auth/authUserByLoginAndPassword",
  async (data, { rejectWithValue }) =>
    await request(rejectWithValue, "/users/authorization", "POST", data)
);

export const whoAmI = createAsyncThunk(
  "auth/whoAmI",
  async (_, { rejectWithValue }) =>
    await request(rejectWithValue, "/users/whoami", "GET")
);
