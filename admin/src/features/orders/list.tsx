import { IconButton, List, ListItem, ListItemText } from "@mui/material";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../store";
import Header from "../../shared/header";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import { ordersService } from "../../services/orders";
import { ordersSlice } from "../../slices/orders";
import { tablesService } from "../../services/tables";
import Loading from "../../shared/loading";

export const OrdersList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items, isLoading } = useAppSelector((s) => s.orders);
  const { items: tableItems, isLoading: isTableLoading } = useAppSelector((s) => s.tables);

  const handleEditItem = (i: any) => () => {
    dispatch(
      ordersSlice.actions.startEditItem({
        ...i,
        selectedTable: tableItems.find((t) => t.id === i.tableId),
      })
    );
  };

  return (
    <>
      <Loading isLoading={isLoading || isTableLoading} />
      <Header title="Orders" onClickAdd={() => dispatch(ordersSlice.actions.toggleIsOpenForm())} />
      <List disablePadding>
        {items?.map((i) => (
          <ListItem
            divider
            disablePadding
            secondaryAction={
              <IconButton edge="end" style={{ right: -10 }} onClick={handleEditItem(i)}>
                <ModeEditOutlineIcon />
              </IconButton>
            }
          >
            <ListItemText primary={i.id} />
          </ListItem>
        ))}
      </List>
    </>
  );
};
