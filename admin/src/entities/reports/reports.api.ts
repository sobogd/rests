import { createAsyncThunk } from "@reduxjs/toolkit";
import { request } from "../../shared/api/base";
import { IErrorWithFields } from "../../app/interfaces";

export const getDailyReport = createAsyncThunk<
  any,
  { startDate: string; endDate: string },
  { rejectValue: IErrorWithFields }
>(
  "auth/getDailyReport",
  async ({ startDate, endDate }, { rejectWithValue }) =>
    await request(rejectWithValue, "/reports/get_report", "POST", {
      startDate,
      endDate,
      type: "DAILY",
    })
);
