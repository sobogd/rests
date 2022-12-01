import { createSlice } from "@reduxjs/toolkit";
import { getInitialCertificatesState } from "./state";

export const certificatesSlice = createSlice({
  name: "certificates",
  initialState: getInitialCertificatesState,
  reducers: {
    // clearNotification: state => {
    //     state.notification = null;
    // },
    // changeAssortmentsPagination: (state, action: PayloadAction<IChangePaginationProps>) => {
    //     const { pageNumber, pageSize, status } = action.payload;
    //     if (
    //         [ECertificatesStatuses.DATA, ECertificatesStatuses.REJECTED, ECertificatesStatuses.EXPIRING].includes(
    //             status
    //         )
    //     ) {
    //         state.assortments = {
    //             ...state.assortments,
    //             pageNumber,
    //             pageSize
    //         };
    //     } else {
    //         state.certificate = {
    //             ...state.certificate,
    //             pageNumber,
    //             pageSize
    //         };
    //     }
    // }
  },
  extraReducers: (builder) => {
    // builder.addCase(fetchAssortments.pending, (state) => {
    //   state.assortments.isLoading = true;
    // });
    // builder.addCase(fetchAssortments.rejected, (state, action) => {
    //   state.assortments.isLoading = false;
    //   state.notification = {
    //     title: "Произошла ошибка при загрузке ассортимента",
    //     message: action.error.message,
    //   };
    // });
    // builder.addCase(fetchAssortments.fulfilled, (state, action) => {
    //   const { assortments, totalCount, totalUnfilledCount } = action.payload;
    //   state.assortments = {
    //     ...state.assortments,
    //     assortments,
    //     totalCount,
    //     totalUnfilledCount,
    //     isLoading: false,
    //   };
    // });
  },
});

export const {} = certificatesSlice.actions;
