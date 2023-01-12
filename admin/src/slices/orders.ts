import { createSlice } from "@reduxjs/toolkit";
import { EOrderSteps, EPositionFormSteps } from "../enums/orders";
import { IOrderState } from "../interfaces/orders";
import { ordersService } from "../services/orders";

const defaultField = { value: "", error: "" };

const initialState: IOrderState = {
  items: [],
  orderId: undefined,
  isLoading: false,
  isOpenForm: false,
  isOpenYouSure: false,
  activeStep: EOrderSteps.TABLE,
  selectedTable: undefined,
  positionsForm: {
    isOpened: false,
    categoryId: undefined,
    additional: [],
    comment: "",
    step: EPositionFormSteps.CATEGORY,
  },
  selectedPositions: [],
  comment: "",
  error: "",
};

export const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    toggleIsOpenForm: (state) => {
      if (!state.isOpenForm) {
        state.isLoading = initialState.isLoading;
        state.isOpenForm = initialState.isOpenForm;
        state.isOpenYouSure = initialState.isOpenYouSure;
        state.activeStep = initialState.activeStep;
        state.orderId = initialState.orderId;
        state.selectedPositions = initialState.selectedPositions;
        state.selectedTable = initialState.selectedTable;
        state.positionsForm = initialState.positionsForm;
        state.comment = initialState.comment;
      }
      state.isOpenForm = !state.isOpenForm;
      state.error = initialState.error;
    },
    toggleIsOpenPositionForm: (state) => {
      if (state.positionsForm.isOpened) {
        state.positionsForm = initialState.positionsForm;
      } else {
        state.positionsForm.isOpened = !state.positionsForm.isOpened;
      }
      state.error = "";
    },
    setSelectedCategoryId: (state, { payload }) => {
      state.positionsForm.categoryId = payload;
    },
    setSelectedPositionId: (state, { payload }) => {
      state.positionsForm.positionId = payload;
    },
    setPositionFormStep: (state, { payload }) => {
      state.positionsForm.step = payload;
    },
    setPositionFormComment: (state, { payload }) => {
      state.positionsForm.comment = payload;
    },
    setComment: (state, { payload }) => {
      state.comment = payload;
    },
    additionalPlus: (state, { payload: id }) => {
      const foundedAdditional = state.positionsForm.additional?.find((a) => a.id === id);

      if (foundedAdditional) {
        state.positionsForm.additional = state.positionsForm.additional?.map((a) => {
          if (a.id === id) {
            return {
              ...a,
              count: a.count + 1,
            };
          }

          return a;
        });
      } else {
        state.positionsForm.additional = state.positionsForm.additional?.concat([
          {
            id,
            count: 1,
          },
        ]);
      }
    },
    additionalMinus: (state, { payload: id }) => {
      const foundedAdditional = state.positionsForm.additional?.find((a) => a.id === id);

      if (foundedAdditional) {
        state.positionsForm.additional = state.positionsForm.additional
          ?.map((a) => {
            if (a.id === id) {
              return {
                ...a,
                count: a.count - 1,
              };
            }

            return a;
          })
          .filter((a) => a.count > 0);
      }
    },
    savePositionForm: (state, { payload: editIndex }) => {
      const { positionsForm } = state;

      if (editIndex !== undefined) {
        state.selectedPositions[editIndex] = {
          ...state.selectedPositions[editIndex],
          comment: positionsForm.comment,
          additional: positionsForm.additional,
        };
        state.positionsForm = initialState.positionsForm;
      } else {
        state.selectedPositions = [
          ...state.selectedPositions,
          {
            positionId: positionsForm.positionId || "",
            comment: positionsForm.comment,
            additional: positionsForm.additional,
          },
        ];
        state.positionsForm = initialState.positionsForm;
      }
    },
    editPosition: (state, { payload: editIndex }) => {
      const isHaveAdditional = !!state.selectedPositions[editIndex].additional?.length;
      state.positionsForm = {
        ...state.positionsForm,
        editIndex,
        additional: state.selectedPositions[editIndex].additional,
        comment: state.selectedPositions[editIndex].comment,
        positionId: state.selectedPositions[editIndex].positionId,
        step: isHaveAdditional ? EPositionFormSteps.ADDITIONAL : EPositionFormSteps.COMMENT,
        isOpened: true,
      };
    },
    deletePosition: (state, { payload: deleteIndex }) => {
      state.selectedPositions = state.selectedPositions.filter((_, index) => index !== deleteIndex);
    },
    setActiveStep: (state, { payload }) => {
      state.activeStep = payload;
    },
    setSelectedTable: (state, { payload }) => {
      state.selectedTable = payload;
      state.activeStep = EOrderSteps.FILLING;
    },
    toggleIsOpenYouSure: (state) => {
      state.isOpenYouSure = !state.isOpenYouSure;
      state.error = "";
    },
    startEditItem: (state, { payload }) => {
      state.activeStep = EOrderSteps.FILLING;
      state.selectedPositions = payload.ordersPositions.map((p: any) => ({
        id: p.id,
        positionId: Number(p.positionId),
        comment: p.comment,
        additional: p.additional?.split("/").map((a: any) => {
          const splitted = a.split("-");
          return {
            id: Number(splitted[1]),
            count: Number(splitted[0]),
          };
        }),
      }));
      state.orderId = payload.id;
      state.selectedTable = payload.selectedTable;
      state.comment = payload.comment;
      state.isOpenForm = true;
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
      state.isLoading = initialState.isLoading;
      state.isOpenForm = initialState.isOpenForm;
      state.isOpenYouSure = initialState.isOpenYouSure;
      state.error = initialState.error;
      state.activeStep = initialState.activeStep;
      state.orderId = initialState.orderId;
      state.selectedPositions = initialState.selectedPositions;
      state.selectedTable = initialState.selectedTable;
      state.positionsForm = initialState.positionsForm;
      state.comment = initialState.comment;
    });
    builder.addCase(ordersService.update.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(ordersService.update.rejected, (state) => {
      state.isLoading = false;
      state.error = "Error with request";
    });
    builder.addCase(ordersService.update.fulfilled, (state) => {
      state.isLoading = initialState.isLoading;
      state.isOpenForm = initialState.isOpenForm;
      state.isOpenYouSure = initialState.isOpenYouSure;
      state.error = initialState.error;
      state.activeStep = initialState.activeStep;
      state.orderId = initialState.orderId;
      state.selectedPositions = initialState.selectedPositions;
      state.selectedTable = initialState.selectedTable;
      state.positionsForm = initialState.positionsForm;
      state.comment = initialState.comment;
    });
    builder.addCase(ordersService.orderPositionFinish.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(ordersService.orderPositionFinish.rejected, (state) => {
      state.isLoading = false;
      state.error = "Error with request";
    });
    builder.addCase(ordersService.orderPositionFinish.fulfilled, (state) => {
      state.isLoading = false;
    });
  },
});
