import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IDailySummaryReport, IReportsState } from "./reports.types";
import { getDailyReport } from "./reports.api";
import { format, addDays } from "date-fns";

const initialState: IReportsState = {
  isLoading: false,
  dailyReports: {
    startDate: format(addDays(new Date(), -7), "yyyy-MM-dd"),
    endDate: format(new Date(), "yyyy-MM-dd"),
    reports: undefined,
  },
};

export const reportsSlice = createSlice({
  name: "reports",
  initialState,
  reducers: {
    setStartDate: (state, { payload }: PayloadAction<string>) => {
      console.log({ payload });
      state.dailyReports.startDate = payload;
    },
    setEndDate: (state, { payload }: PayloadAction<string>) => {
      state.dailyReports.endDate = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getDailyReport.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getDailyReport.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(
      getDailyReport.fulfilled,
      (state, { payload }: PayloadAction<IDailySummaryReport[]>) => {
        state.isLoading = false;
        state.dailyReports.reports = payload;
      }
    );
  },
});
