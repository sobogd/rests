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
import { Button, List, ListItem, ListItemText } from "@mui/material";

export const Day: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isLoading: isLoadingOrders, ordersForToday } = useAppSelector((s) => s.orders);

  React.useEffect(() => {
    dispatch(ordersService.getDayReport({}));
  }, []);

  const dayTotal = React.useMemo(() => {
    if (ordersForToday?.length) {
      return ordersForToday.reduce((acc, oft) => {
        console.log(Number(oft.discount) / 100);

        acc = acc + (oft.discount ? Number(oft.total) * (1 - Number(oft.discount) / 100) : Number(oft.total));
        return acc;
      }, 0);
    }

    return null;
  }, [ordersForToday]);

  return (
    <>
      <Loading isLoading={isLoadingOrders} />
      <Button fullWidth style={{ marginBottom: 25 }} variant="contained">
        Day total: {dayTotal}
      </Button>
      <List disablePadding>
        {ordersForToday?.map((ot) => (
          <ListItem divider disablePadding>
            <ListItemText
              primary={
                <>
                  Number: #{ot.id}
                  <br></br>
                  Time: {format(Date.parse(ot.date), "dd.MM.yyyy HH:mm")}
                  <br></br>
                  Total: {ot.discount ? Number(ot.total) * (1 - Number(ot.discount) / 100) : ot.total}
                  <br></br>
                  Discount: {ot.discount}%
                </>
              }
              secondary={ot.positions.map((p) => (
                <>
                  {p}
                  <br></br>
                </>
              ))}
            />
          </ListItem>
        ))}
      </List>
    </>
  );
};
