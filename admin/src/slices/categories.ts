import { createSlice } from "@reduxjs/toolkit";
import { ICategoriesState } from "../interfaces/categories";
import { categoriesService } from "../services/categories";

const defaultField = { value: "", error: "" };

const initialState: ICategoriesState = {
  items: [],
  form: { id: defaultField, name: defaultField, description: defaultField },
  isLoading: false,
  isOpenForm: false,
  isOpenYouSure: false,
  error: "",
};

export const categoriesSlice = createSlice({
  name: "categories",
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
        name: { value: payload.name, error: "" },
        description: { value: payload.description, error: "" },
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
    builder.addCase(categoriesService.search.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(categoriesService.search.rejected, (state) => {
      state.isLoading = false;
      state.error = "Error with request";
    });
    builder.addCase(categoriesService.search.fulfilled, (state, action) => {
      state.items = action.payload;
      state.isLoading = false;
    });
    builder.addCase(categoriesService.create.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(categoriesService.create.rejected, (state) => {
      state.isLoading = false;
      state.error = "Error with request";
    });
    builder.addCase(categoriesService.create.fulfilled, (state) => {
      state.isLoading = false;
      state.form = initialState.form;
      state.isOpenForm = false;
      state.error = "";
    });
    builder.addCase(categoriesService.update.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(categoriesService.update.rejected, (state) => {
      state.isLoading = false;
      state.error = "Error with request";
    });
    builder.addCase(categoriesService.update.fulfilled, (state) => {
      state.form = initialState.form;
      state.isOpenForm = false;
      state.isLoading = false;
    });
    builder.addCase(categoriesService.remove.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(categoriesService.remove.rejected, (state) => {
      state.isLoading = false;
      state.error = "Error with request";
    });
    builder.addCase(categoriesService.remove.fulfilled, (state) => {
      state.form = initialState.form;
      state.isOpenForm = false;
      state.isOpenYouSure = false;
      state.isLoading = false;
    });
  },
});
