import React from "react";
import { OrdersForm } from "./form";
import { OrdersList } from "./list";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { Box, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "app/store";
import { categoriesService, ordersService, searchPositions, tablesService } from "shared/api";
import { pagesModel } from "entities/pages";
import { ordersModel } from "../model";
import Loading from "shared/loading";

export const Orders: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isLoading: isLoadingPositions } = useAppSelector((s) => s.positions);
  const { isOpenForm, isLoading: isLoadingOrders } = useAppSelector((s) => s.orders);
  const { isLoading: isLoadingTables } = useAppSelector((s) => s.tables);
  const { isLoading: isLoadingCategories } = useAppSelector((s) => s.categories);

  React.useEffect(() => {
    if (!isOpenForm) {
      dispatch(tablesService.findImage());
      dispatch(searchPositions());
      dispatch(categoriesService.searchCategories());
      dispatch(ordersService.searchOrders());
      dispatch(tablesService.searchTables());
    }
    dispatch(
      pagesModel.actions.setHeaderComponent(
        <Box display="flex" justifyContent="space-between" flexGrow={1} alignItems="center">
          <Typography variant="h6">{!!isOpenForm ? "New order" : "Orders"}</Typography>
          {!isOpenForm ? (
            <AddCircleOutlineIcon onClick={() => dispatch(ordersModel.actions.toggleIsOpenForm())} />
          ) : (
            <HighlightOffIcon onClick={() => dispatch(ordersModel.actions.toggleIsOpenForm())} />
          )}
        </Box>
      )
    );
  }, [isOpenForm]);

  return (
    <Box padding={2}>
      <Loading isLoading={isLoadingPositions || isLoadingOrders || isLoadingTables || isLoadingCategories} />
      {isOpenForm ? <OrdersForm /> : <OrdersList />}
    </Box>
  );
};
