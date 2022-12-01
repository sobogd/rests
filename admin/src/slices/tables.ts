import { createSlice } from "@reduxjs/toolkit";
import { ITablesState } from "../interfaces/tables";
import { tablesService } from "../services/tables";

const defaultField = { value: "", error: "" };

const initialState: ITablesState = {
  items: [],
  form: {
    id: defaultField,
    number: defaultField,
    name: defaultField,
    positionX: { ...defaultField, value: "50" },
    positionY: { ...defaultField, value: "50" },
  },
  isLoading: false,
  isOpenForm: false,
  isOpenYouSure: false,
  error: "",
};

export const tablesSlice = createSlice({
  name: "tables",
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
        number: { value: payload.number, error: "" },
        positionX: { value: payload.positionX, error: "" },
        positionY: { value: payload.positionY, error: "" },
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
    builder.addCase(tablesService.findImage.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(tablesService.findImage.rejected, (state) => {
      state.isLoading = false;
      state.error = "Error with request";
    });
    builder.addCase(tablesService.findImage.fulfilled, (state, action) => {
      state.imageSrc = action.payload.filePath;
      state.isLoading = false;
    });

    builder.addCase(tablesService.search.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(tablesService.search.rejected, (state) => {
      state.isLoading = false;
      state.error = "Error with request";
    });
    builder.addCase(tablesService.search.fulfilled, (state, action) => {
      state.items = action.payload;
      state.isLoading = false;
    });

    builder.addCase(tablesService.create.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(tablesService.create.rejected, (state) => {
      state.isLoading = false;
      state.error = "Error with request";
    });
    builder.addCase(tablesService.create.fulfilled, (state) => {
      state.isLoading = false;
      state.form = initialState.form;
      state.isOpenForm = false;
      state.error = "";
    });

    builder.addCase(tablesService.update.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(tablesService.update.rejected, (state) => {
      state.isLoading = false;
      state.error = "Error with request";
    });
    builder.addCase(tablesService.update.fulfilled, (state) => {
      state.form = initialState.form;
      state.isOpenForm = false;
      state.isLoading = false;
    });

    builder.addCase(tablesService.remove.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(tablesService.remove.rejected, (state) => {
      state.isLoading = false;
      state.error = "Error with request";
    });
    builder.addCase(tablesService.remove.fulfilled, (state) => {
      state.form = initialState.form;
      state.isOpenForm = false;
      state.isOpenYouSure = false;
      state.isLoading = false;
    });
  },
});
