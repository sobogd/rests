import { createSlice } from "@reduxjs/toolkit";
import { tablesService } from "api";

export interface ITableImage {
  filePath?: string;
}

export interface ITable {
  id: string;
  number: string;
  name: string;
  positionX: string;
  positionY: string;
}

export interface ITablesState {
  items: ITable[];
  form: { [Key in keyof ITable]: { value: string; error: string } };
  imageSrc?: string;
  isLoading: boolean;
  isOpenForm: boolean;
  isOpenYouSure: boolean;
  error: string;
}

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

export const tablesModel = createSlice({
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

    builder.addCase(tablesService.searchTables.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(tablesService.searchTables.rejected, (state) => {
      state.isLoading = false;
      state.error = "Error with request";
    });
    builder.addCase(tablesService.searchTables.fulfilled, (state, action) => {
      state.items = action.payload;
      state.isLoading = false;
    });

    builder.addCase(tablesService.createTable.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(tablesService.createTable.rejected, (state) => {
      state.isLoading = false;
      state.error = "Error with request";
    });
    builder.addCase(tablesService.createTable.fulfilled, (state) => {
      state.isLoading = false;
      state.form = initialState.form;
      state.isOpenForm = false;
      state.error = "";
    });

    builder.addCase(tablesService.updateTable.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(tablesService.updateTable.rejected, (state) => {
      state.isLoading = false;
      state.error = "Error with request";
    });
    builder.addCase(tablesService.updateTable.fulfilled, (state) => {
      state.form = initialState.form;
      state.isOpenForm = false;
      state.isLoading = false;
    });

    builder.addCase(tablesService.removeTable.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(tablesService.removeTable.rejected, (state) => {
      state.isLoading = false;
      state.error = "Error with request";
    });
    builder.addCase(tablesService.removeTable.fulfilled, (state) => {
      state.form = initialState.form;
      state.isOpenForm = false;
      state.isOpenYouSure = false;
      state.isLoading = false;
    });
  },
});

export const reducer = tablesModel.reducer;
