import { createAsyncThunk } from "@reduxjs/toolkit";
import { IUserEditForm } from "entities/users";
import { request } from "./base";

export const getUsersForCompany = createAsyncThunk(
  "users/getUsersForCompany",
  async (_r, { rejectWithValue }) =>
    await request(rejectWithValue, "/users/get-users-for-company", "GET")
);

export const updateUserData = createAsyncThunk(
  "users/updateUserData",
  async (data: IUserEditForm, { rejectWithValue }) =>
    await request(rejectWithValue, "/users/update-user-data", "POST", data)
);

export const createNewUser = createAsyncThunk(
  "users/createNewUser",
  async (data: IUserEditForm, { rejectWithValue }) =>
    await request(rejectWithValue, "/users/create-new-user", "POST", {
      ...data,
      password: data.newPassword,
      newPassword: undefined,
    })
);

export const removeUser = createAsyncThunk(
  "users/removeUser",
  async (userId: number, { rejectWithValue }) =>
    await request(rejectWithValue, "/users/remove-user", "POST", {
      userId,
    })
);
