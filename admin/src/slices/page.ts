import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { EPages } from "../enums/pages";
import { IPageState } from "../interfaces/page";
import { pageState } from "../state/page";

export const pageSlice = createSlice({
  name: "page",
  initialState: pageState,
  reducers: {
    setActivePage: (state: IPageState, action: PayloadAction<EPages>) => {
      state.active = action.payload;
    },
  },
});

export const { setActivePage } = pageSlice.actions;
