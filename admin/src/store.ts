import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./slices/user";
import { pageSlice } from "./slices/page";
import { positionsSlice } from "./slices/positions";
import { elementsSlice } from "./slices/elements";
import { tablesSlice } from "./slices/tables";
import { categoriesSlice } from "./slices/categories";
import { ordersSlice } from "./slices/orders";

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    page: pageSlice.reducer,
    positions: positionsSlice.reducer,
    elements: elementsSlice.reducer,
    tables: tablesSlice.reducer,
    categories: categoriesSlice.reducer,
    orders: ordersSlice.reducer,
  },
});
export const useAppDispatch = () => useDispatch<typeof store.dispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export type RootState = ReturnType<typeof store.getState>;

export default store;
