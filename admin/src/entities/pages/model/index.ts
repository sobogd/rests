import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CPages } from "app";
import { EPages, IPageActive, IPageState } from "..";

const initialState: IPageState = {
  activePage: CPages.find((p) => p.id === EPages.ACCOUNT),
  isOpenMenu: false,
};

export const pagesModel = createSlice({
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
