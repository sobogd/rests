import { createAsyncThunk } from "@reduxjs/toolkit";
import { IUserEditForm } from "entities/users";
import { request } from "./base";

export const getUsersForCompany = createAsyncThunk(
  "user/getUsersForCompany",
  async (_r, { rejectWithValue }) =>
    await request(rejectWithValue, "/user/get-users-for-company", "GET")
);

export const updateUserData = createAsyncThunk(
  "user/updateUserData",
  async (data: IUserEditForm, { rejectWithValue }) =>
    await request(rejectWithValue, "/user/update-user-data", "POST", data)
);

export const createNewUser = createAsyncThunk(
  "user/createNewUser",
  async (data: IUserEditForm, { rejectWithValue }) =>
    await request(rejectWithValue, "/user/create-new-user", "POST", {
      ...data,
      password: data.newPassword,
      newPassword: undefined,
    })
);

export const removeUser = createAsyncThunk(
  "user/removeUser",
  async (userId: number, { rejectWithValue }) =>
    await request(rejectWithValue, "/user/remove-user", "POST", {
      userId,
    })
);
