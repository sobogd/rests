import { createSlice } from "@reduxjs/toolkit";
import { elementsService } from "shared/api";

export interface IElement {
  id: string;
  element: string;
  price: string;
  priceForCount: string;
}

export interface IElementState {
  items: IElement[];
  form: { [Key in keyof IElement]: { value: string; error: string } };
  isLoading: boolean;
  isOpenForm: boolean;
  isOpenYouSure: boolean;
  error: string;
}

const defaultField = { value: "", error: "" };

const initialState: IElementState = {
  items: [],
  form: { id: defaultField, element: defaultField, price: defaultField, priceForCount: defaultField },
  isLoading: false,
  isOpenForm: false,
  isOpenYouSure: false,
  error: "",
};

export const elementModel = createSlice({
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
    builder.addCase(elementsService.searchElements.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(elementsService.searchElements.rejected, (state) => {
      state.isLoading = false;
      state.error = "Error with request";
    });
    builder.addCase(elementsService.searchElements.fulfilled, (state, action) => {
      state.items = action.payload;
      state.isLoading = false;
    });
    builder.addCase(elementsService.createElement.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(elementsService.createElement.rejected, (state) => {
      state.isLoading = false;
      state.error = "Error with request";
    });
    builder.addCase(elementsService.createElement.fulfilled, (state) => {
      state.isLoading = false;
      state.form = initialState.form;
      state.isOpenForm = false;
      state.error = "";
    });
    builder.addCase(elementsService.updateElement.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(elementsService.updateElement.rejected, (state) => {
      state.isLoading = false;
      state.error = "Error with request";
    });
    builder.addCase(elementsService.updateElement.fulfilled, (state) => {
      state.form = initialState.form;
      state.isOpenForm = false;
      state.isLoading = false;
    });
    builder.addCase(elementsService.removeElement.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(elementsService.removeElement.rejected, (state) => {
      state.isLoading = false;
      state.error = "Error with request";
    });
    builder.addCase(elementsService.removeElement.fulfilled, (state) => {
      state.form = initialState.form;
      state.isOpenForm = false;
      state.isOpenYouSure = false;
      state.isLoading = false;
    });
  },
});

export const reducer = elementModel.reducer;
