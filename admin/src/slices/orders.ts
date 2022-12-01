import { createSlice } from "@reduxjs/toolkit";
import { EOrderSteps } from "../enums/orders";
import { IOrderState } from "../interfaces/orders";
import { ordersService } from "../services/orders";

const defaultField = { value: "", error: "" };

const initialState: IOrderState = {
  items: [],
  form: { id: defaultField, tableId: defaultField, statusId: defaultField },
  isLoading: false,
  isOpenForm: false,
  isOpenYouSure: false,
  activeStep: EOrderSteps.TABLE,
  selectedTable: undefined,
  error: "",
};

export const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    toggleIsOpenForm: (state) => {
      if (state.isOpenForm && state.form.id.value) {
        state.form = initialState.form;
      }
      state.isOpenForm = !state.isOpenForm;
      state.error = "";
    },
    setActiveStep: (state, { payload }) => {
      state.activeStep = payload;
    },
    setSelectedTable: (state, { payload }) => {
      state.selectedTable = payload;
    },
    toggleIsOpenYouSure: (state) => {
      state.isOpenYouSure = !state.isOpenYouSure;
      state.error = "";
    },
    startEditItem: (state, { payload }) => {
      state.form = {
        id: { value: payload.id, error: "" },
        tableId: { value: payload.tableId, error: "" },
        statusId: { value: payload.statusId, error: "" },
      };
      state.isOpenForm = true;
    },
    setFormValue: (state, { payload: { name, value } }) => {
      state.form = {
        ...state.form,
        [name]: { value, error: "" },
      };
      state.error = "";
    },
    setFormData: (state, { payload }) => {
      state.form = payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(ordersService.search.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(ordersService.search.rejected, (state) => {
      state.isLoading = false;
      state.error = "Error with request";
    });
    builder.addCase(ordersService.search.fulfilled, (state, action) => {
      state.items = action.payload;
      state.isLoading = false;
    });
    builder.addCase(ordersService.create.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(ordersService.create.rejected, (state) => {
      state.isLoading = false;
      state.error = "Error with request";
    });
    builder.addCase(ordersService.create.fulfilled, (state) => {
      state.isLoading = false;
      state.form = initialState.form;
      state.isOpenForm = false;
      state.error = "";
    });
    builder.addCase(ordersService.update.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(ordersService.update.rejected, (state) => {
      state.isLoading = false;
      state.error = "Error with request";
    });
    builder.addCase(ordersService.update.fulfilled, (state) => {
      state.form = initialState.form;
      state.isOpenForm = false;
      state.isLoading = false;
    });
    builder.addCase(ordersService.remove.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(ordersService.remove.rejected, (state) => {
      state.isLoading = false;
      state.error = "Error with request";
    });
    builder.addCase(ordersService.remove.fulfilled, (state) => {
      state.form = initialState.form;
      state.isOpenForm = false;
      state.isOpenYouSure = false;
      state.isLoading = false;
    });
  },
});
