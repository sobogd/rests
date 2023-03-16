import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IPageState } from "..";

const initialState: IPageState = {
  isOpenMenu: false,
  headerComponent: undefined,
};

export const pagesModel = createSlice({
  name: "page",
  initialState: initialState,
  reducers: {
    toggleMenu: (state: IPageState) => {
      state.isOpenMenu = !state.isOpenMenu;
    },
    setHeaderComponent: (state: IPageState, action: PayloadAction<any>) => {
      state.headerComponent = action.payload;
    },
  },
});
