import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CPages } from "../app";
import { EPages } from "../enums/pages";
import { IPageActive, IPageState } from "../interfaces/page";

const initialState: IPageState = {
  activePage: CPages.find((p) => p.id === EPages.ACCOUNT),
  isOpenMenu: false,
};

export const pageSlice = createSlice({
  name: "page",
  initialState: initialState,
  reducers: {
    setActivePage: (state: IPageState, action: PayloadAction<IPageActive>) => {
      state.activePage = action.payload;
    },
    toggleMenu: (state: IPageState) => {
      state.isOpenMenu = !state.isOpenMenu;
    },
    setHeaderComponent: (state: IPageState, action: PayloadAction<any>) => {
      if (state.activePage) {
        console.log(action.payload);

        state.activePage.headerComponent = action.payload;
      }
    },
  },
});
