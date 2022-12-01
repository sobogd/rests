import { createSlice } from "@reduxjs/toolkit";
import { IElementState } from "../interfaces/elements";
import { elementsService } from "../services/elements";

const defaultField = { value: "", error: "" };

const initialState: IElementState = {
  items: [],
  form: { id: defaultField, element: defaultField, price: defaultField, priceForCount: defaultField },
  isLoading: false,
  isOpenForm: false,
  isOpenYouSure: false,
  error: "",
};

export const elementsSlice = createSlice({
  name: "elements",
  initialState,
  reducers: {
    toggleIsOpenForm: (state) => {
      if (state.isOpenForm && state.form.id.value) {
        state.form = initialState.form;
      }
      state.isOpenForm = !state.isOpenForm;
      state.error = "";
    },
    toggleIsOpenYouSure: (state) => {
      state.isOpenYouSure = !state.isOpenYouSure;
      state.error = "";
    },
    startEditItem: (state, { payload }) => {
      state.form = {
        id: { value: payload.id, error: "" },
        element: { value: payload.element, error: "" },
        price: { value: payload.price, error: "" },
        priceForCount: { value: payload.priceForCount, error: "" },
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
    builder.addCase(elementsService.search.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(elementsService.search.rejected, (state) => {
      state.isLoading = false;
      state.error = "Error with request";
    });
    builder.addCase(elementsService.search.fulfilled, (state, action) => {
      state.items = action.payload;
      state.isLoading = false;
    });
    builder.addCase(elementsService.create.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(elementsService.create.rejected, (state) => {
      state.isLoading = false;
      state.error = "Error with request";
    });
    builder.addCase(elementsService.create.fulfilled, (state) => {
      state.isLoading = false;
      state.form = initialState.form;
      state.isOpenForm = false;
      state.error = "";
    });
    builder.addCase(elementsService.update.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(elementsService.update.rejected, (state) => {
      state.isLoading = false;
      state.error = "Error with request";
    });
    builder.addCase(elementsService.update.fulfilled, (state) => {
      state.form = initialState.form;
      state.isOpenForm = false;
      state.isLoading = false;
    });
    builder.addCase(elementsService.remove.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(elementsService.remove.rejected, (state) => {
      state.isLoading = false;
      state.error = "Error with request";
    });
    builder.addCase(elementsService.remove.fulfilled, (state) => {
      state.form = initialState.form;
      state.isOpenForm = false;
      state.isOpenYouSure = false;
      state.isLoading = false;
    });
  },
});
