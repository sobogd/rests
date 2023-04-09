import { createSlice } from "@reduxjs/toolkit";
import { categoriesService } from "shared/api";

const defaultField = { value: "", error: "" };

export interface ICategory {
  id: number;
  name: string;
  description: string;
}

export interface ICategoriesState {
  items: ICategory[];
  form: { [Key in keyof ICategory]: { value: string; error: string } };
  isLoading: boolean;
  isOpenForm: boolean;
  isOpenYouSure: boolean;
  error: string;
}

const initialState: ICategoriesState = {
  items: [],
  form: { id: defaultField, name: defaultField, description: defaultField },
  isLoading: false,
  isOpenForm: false,
  isOpenYouSure: false,
  error: "",
};

export const categoriesModel = createSlice({
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
    builder.addCase(categoriesService.searchCategories.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(categoriesService.searchCategories.rejected, (state) => {
      state.isLoading = false;
      state.error = "Error with request";
    });
    builder.addCase(
      categoriesService.searchCategories.fulfilled,
      (state, action) => {
        state.items = action.payload;
        state.isLoading = false;
      }
    );
    builder.addCase(categoriesService.createCategory.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(categoriesService.createCategory.rejected, (state) => {
      state.isLoading = false;
      state.error = "Error with request";
    });
    builder.addCase(categoriesService.createCategory.fulfilled, (state) => {
      state.isLoading = false;
      state.form = initialState.form;
      state.isOpenForm = false;
      state.error = "";
    });
    builder.addCase(categoriesService.updateCategory.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(categoriesService.updateCategory.rejected, (state) => {
      state.isLoading = false;
      state.error = "Error with request";
    });
    builder.addCase(categoriesService.updateCategory.fulfilled, (state) => {
      state.form = initialState.form;
      state.isOpenForm = false;
      state.isLoading = false;
    });
    builder.addCase(categoriesService.removeCategory.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(categoriesService.removeCategory.rejected, (state) => {
      state.isLoading = false;
      state.error = "Error with request";
    });
    builder.addCase(categoriesService.removeCategory.fulfilled, (state) => {
      state.form = initialState.form;
      state.isOpenForm = false;
      state.isOpenYouSure = false;
      state.isLoading = false;
    });
  },
});

export const reducer = categoriesModel.reducer;
