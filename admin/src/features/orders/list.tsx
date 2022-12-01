import { IconButton, List, ListItem, ListItemText } from "@mui/material";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../store";
import Header from "../../shared/header";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import { ordersService } from "../../services/orders";
import { ordersSlice } from "../../slices/orders";

export const OrdersList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items } = useAppSelector((s) => s.orders);

  React.useEffect(() => {
    dispatch(ordersService.search());
  }, []);

  return (
    <>
      <Header title="Orders" onClickAdd={() => dispatch(ordersSlice.actions.toggleIsOpenForm())} />
      <List disablePadding>
        {items?.map((i) => (
          <ListItem
            divider
            disablePadding
            secondaryAction={
              <IconButton
                edge="end"
                style={{ right: -10 }}
                onClick={() => dispatch(ordersSlice.actions.startEditItem(i))}
              >
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
