import { createSlice } from "@reduxjs/toolkit";
import { IPositionsState } from "../interfaces/positions";
import { positionsService } from "../services/positions";

const defaultField = { value: "", error: "" };

const initialState: IPositionsState = {
  items: [],
  form: {
    values: {
      id: defaultField,
      name: defaultField,
      price: defaultField,
      description: defaultField,
    },
    composition: [],
    categories: [],
    additional: [],
    isAdditional: false,
  },
  isLoading: false,
  isOpenForm: false,
  isOpenYouSure: false,
  error: "",
};

export const positionsSlice = createSlice({
  name: "positions",
  initialState,
  reducers: {
    toggleIsOpenForm: (state) => {
      if (state.isOpenForm && state.form.values.id.value) {
        state.form = initialState.form;
      }
      state.isOpenForm = !state.isOpenForm;
      state.error = "";
    },
    toggleIsAdditional: (state) => {
      state.form.isAdditional = !state.form.isAdditional;
      state.error = "";
    },
    toggleIsOpenYouSure: (state) => {
      state.isOpenYouSure = !state.isOpenYouSure;
      state.error = "";
    },
    startEditItem: (state, { payload }) => {
      state.form = {
        ...state.form,
        values: {
          id: { value: payload.id, error: "" },
          name: { value: payload.name, error: "" },
          price: { value: payload.price, error: "" },
          description: { value: payload.description, error: "" },
        },
        composition: payload.composition.map((c: any) => ({
          element: { value: c.element, error: "" },
          weight: { value: c.weight, error: "" },
        })),
        categories: payload.categories.map((c: any) => ({
          categoryId: { value: c.categoryId, error: "" },
        })),
        additional: payload.additional.map((a: any) => ({
          positionId: { value: a.positionId, error: "" },
        })),
        isAdditional: payload.isAdditional,
      };
      state.isOpenForm = true;
    },
    setFormValue: (state, { payload: { name, value } }) => {
      state.form.values = {
        ...state.form.values,
        [name]: { value, error: "" },
      };
      state.error = "";
    },
    setFormData: (state, { payload }) => {
      state.form = payload;
    },
    addComposition: (state) => {
      state.form.composition = [
        ...state.form.composition,
        {
          element: defaultField,
          weight: defaultField,
        },
      ];
    },
    removeComposition: (state, { payload }) => {
      state.form.composition.splice(payload, 1);
    },
    setCompositionValue: (state, { payload: { name, value, index } }) => {
      state.form.composition[index] = {
        ...state.form.composition[index],
        [name]: { value, error: "" },
      };
      state.error = "";
    },
    addCategory: (state) => {
      state.form.categories = [
        ...state.form.categories,
        {
          categoryId: defaultField,
        },
      ];
    },
    removeCategory: (state, { payload }) => {
      state.form.categories.splice(payload, 1);
    },
    setCategoryValue: (state, { payload: { name, value, index } }) => {
      state.form.categories[index] = {
        ...state.form.categories[index],
        [name]: { value, error: "" },
      };
      state.error = "";
    },
    addAdditional: (state) => {
      state.form.additional = [
        ...state.form.additional,
        {
          positionId: defaultField,
        },
      ];
    },
    removeAdditional: (state, { payload }) => {
      state.form.additional.splice(payload, 1);
    },
    setAdditionalValue: (state, { payload: { name, value, index } }) => {
      state.form.additional[index] = {
        ...state.form.additional[index],
        [name]: { value, error: "" },
      };
      state.error = "";
    },
  },
  extraReducers(builder) {
    builder.addCase(positionsService.search.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(positionsService.search.rejected, (state) => {
      state.isLoading = false;
      state.error = "Error with request";
    });
    builder.addCase(positionsService.search.fulfilled, (state, action) => {
      state.items = action.payload;
      state.isLoading = false;
    });
    builder.addCase(positionsService.create.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(positionsService.create.rejected, (state) => {
      state.isLoading = false;
      state.error = "Error with request";
    });
    builder.addCase(positionsService.create.fulfilled, (state) => {
      state.isLoading = false;
      state.form = initialState.form;
      state.isOpenForm = false;
      state.error = "";
    });
    builder.addCase(positionsService.update.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(positionsService.update.rejected, (state) => {
      state.isLoading = false;
      state.error = "Error with request";
    });
    builder.addCase(positionsService.update.fulfilled, (state) => {
      state.form = initialState.form;
      state.isOpenForm = false;
      state.isLoading = false;
    });
    builder.addCase(positionsService.remove.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(positionsService.remove.rejected, (state) => {
      state.isLoading = false;
      state.error = "Error with request";
    });
    builder.addCase(positionsService.remove.fulfilled, (state) => {
      state.form = initialState.form;
      state.isOpenForm = false;
      state.isOpenYouSure = false;
      state.isLoading = false;
    });
  },
});
