import React from "react";
import { categoriesService } from "../../services/categories";
import { ordersService } from "../../services/orders";
import { positionsService } from "../../services/positions";
import { tablesService } from "../../services/tables";
import Header from "../../shared/header";
import Loading from "../../shared/loading";
import { ordersSlice } from "../../slices/orders";
import { pageSlice } from "../../slices/page";
import { useAppDispatch, useAppSelector } from "../../store";
import { textDefaultColor } from "../../styles/theme";
import { OrdersForm } from "./form";
import { OrdersList } from "./list";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { Box, Typography } from "@mui/material";

export const Orders: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isLoading: isLoadingPositions } = useAppSelector((s) => s.positions);
  const { isOpenForm, isLoading: isLoadingOrders } = useAppSelector((s) => s.orders);
  const { isLoading: isLoadingTables } = useAppSelector((s) => s.tables);
  const { isLoading: isLoadingCategories } = useAppSelector((s) => s.categories);
  const { activePage } = useAppSelector((s) => s.page);

  React.useEffect(() => {
    if (!isOpenForm) {
      dispatch(tablesService.findImage());
      dispatch(positionsService.search());
      dispatch(categoriesService.search());
      dispatch(ordersService.search());
      dispatch(tablesService.search());
    }
    dispatch(
      pageSlice.actions.setHeaderComponent(
        <Box display="flex" justifyContent="space-between" flexGrow={1} alignItems="center">
          <Typography variant="h6">{!!isOpenForm ? "New order" : "Orders"}</Typography>
          {!isOpenForm ? (
            <AddCircleOutlineIcon onClick={() => dispatch(ordersSlice.actions.toggleIsOpenForm())} />
          ) : (
            <HighlightOffIcon onClick={() => dispatch(ordersSlice.actions.toggleIsOpenForm())} />
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
