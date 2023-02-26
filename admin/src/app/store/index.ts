import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { categoryModel } from "entities/categories";
import { elementModel } from "entities/element";
import { tablesModel } from "entities/tables";
import { positionsModel } from "entities/positions";
import { usersModel } from "entities/users";
import { pagesModel } from "entities/pages";
import { ordersModel } from "entities/orders";

export const store = configureStore({
  reducer: {
    categories: categoryModel.reducer,
    elements: elementModel.reducer,
    tables: tablesModel.reducer,
    positions: positionsModel.reducer,
    users: usersModel.reducer,
    pages: pagesModel.reducer,
    orders: ordersModel.reducer,
  },
});

export const useAppDispatch = () => useDispatch<typeof store.dispatch>();

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export type RootState = ReturnType<typeof store.getState>;
