import React from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { Box, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "app/store";
import {
  categoriesService,
  ordersService,
  searchPositions,
  tablesService,
} from "shared/api";
import { pagesModel } from "entities/pages";
import { ordersModel } from "entities/orders/model";
import { OrdersForm, OrdersList } from "entities/orders";

export const Orders: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isOpenForm } = useAppSelector((s) => s.orders);

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
        <Box
          display="flex"
          justifyContent="space-between"
          flexGrow={1}
          alignItems="center"
        >
          <Typography variant="h6">
            {!!isOpenForm ? "New order" : "Orders"}
          </Typography>
          {!isOpenForm ? (
            <AddCircleOutlineIcon
              onClick={() => dispatch(ordersModel.actions.toggleIsOpenForm())}
            />
          ) : (
            <HighlightOffIcon
              onClick={() => dispatch(ordersModel.actions.toggleIsOpenForm())}
            />
          )}
        </Box>
      )
    );
  }, [isOpenForm]);

  return <>{isOpenForm ? <OrdersForm /> : <OrdersList />}</>;
};
