import styled from "@emotion/styled";
import React from "react";
import { categoriesService } from "../../services/categories";
import { ordersService } from "../../services/orders";
import { positionsService } from "../../services/positions";
import { tablesService } from "../../services/tables";
import Loading from "../../shared/loading";
import { useAppDispatch, useAppSelector } from "../../store";
import { formatInTimeZone } from "date-fns-tz";
import { format } from "date-fns";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { grey } from "@mui/material/colors";
import { Button } from "@mui/material";

export const Day: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isLoading: isLoadingOrders, items } = useAppSelector((s) => s.orders);

  React.useEffect(() => {
    // dispatch(ordersService.searchForToday());
  }, []);

  return (
    <>
      <Loading isLoading={isLoadingOrders} />
    </>
  );
};
