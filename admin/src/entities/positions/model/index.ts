import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  createPosition,
  removePosition,
  searchPositions,
  updatePosition,
} from "shared/api";

export interface IPositionConstructor {
  name: string;
  description?: string;
  price: number;
  composition?: IPositionComposition[];
  categories: IPositionCategory[];
  additional: IPositionAdditional[];
  isAdditional: boolean;
  sort?: number;
}

export interface IPosition extends IPositionConstructor {
  id: number;
}

export interface IPositionForCreate extends IPositionConstructor {
  id?: number;
}

export interface IPositionValues {
  id: string;
  name: string;
  description: string;
  price: string;
}

export interface IPositionComposition {
  element: string;
  weight: string;
}

export interface IPositionCategory {
  categoryId: number;
}

export interface IPositionAdditional {
  positionId: number;
}

export interface IPositionsState {
  items: IPosition[];
  openedPosition?: IPosition;
  isLoading: boolean;
  isOpenForm: boolean;
  isOpenYouSure: boolean;
  error: string;
}

const initialState: IPositionsState = {
  items: [],
  openedPosition: undefined,
  isLoading: false,
  isOpenForm: false,
  isOpenYouSure: false,
  error: "",
};

export const positionsModel = createSlice({
  name: "positions",
  initialState,
  reducers: {
    toggleIsOpenForm: (state) => {
      if (!!state.isOpenForm) {
        state.openedPosition = undefined;
      }
      state.isOpenForm = !state.isOpenForm;
      state.error = "";
    },
    toggleIsOpenYouSure: (state) => {
      state.isOpenYouSure = !state.isOpenYouSure;
      state.error = "";
    },
    startEditItem: (state, { payload }: PayloadAction<IPosition>) => {
      state.openedPosition = payload;
      state.isOpenForm = true;
    },
  },
  extraReducers(builder) {
    builder.addCase(searchPositions.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(searchPositions.rejected, (state) => {
      state.isLoading = false;
      state.error = "Error with request";
    });
    builder.addCase(searchPositions.fulfilled, (state, action) => {
      state.items = action.payload;
      state.isLoading = false;
    });
    builder.addCase(createPosition.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createPosition.rejected, (state) => {
      state.isLoading = false;
      state.error = "Error with request";
    });
    builder.addCase(createPosition.fulfilled, (state) => {
      state.isLoading = false;
      state.openedPosition = initialState.openedPosition;
      state.isOpenForm = false;
      state.error = "";
    });
    builder.addCase(updatePosition.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updatePosition.rejected, (state) => {
      state.isLoading = false;
      state.error = "Error with request";
    });
    builder.addCase(updatePosition.fulfilled, (state) => {
      state.openedPosition = initialState.openedPosition;
      state.isOpenForm = false;
      state.isLoading = false;
      state.error = "";
    });
    builder.addCase(removePosition.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(removePosition.rejected, (state) => {
      state.isLoading = false;
      state.error = "Error with request";
    });
    builder.addCase(removePosition.fulfilled, (state) => {
      state.openedPosition = initialState.openedPosition;
      state.isOpenForm = false;
      state.isOpenYouSure = false;
      state.isLoading = false;
    });
  },
});
