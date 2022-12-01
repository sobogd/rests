import { IconButton, List, ListItem, ListItemText } from "@mui/material";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../store";
import Header from "../../shared/header";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import { positionsSlice } from "../../slices/positions";
import { positionsService } from "../../services/positions";

export const PositionsList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items } = useAppSelector((s) => s.positions);

  React.useEffect(() => {
    dispatch(positionsService.search());
  }, []);

  return (
    <>
      <Header
        title="Positions items"
        onClickAdd={() => dispatch(positionsSlice.actions.toggleIsOpenForm())}
      />
      <List disablePadding>
        {!!items.length &&
          items.map((i) => (
            <ListItem
              divider
              disablePadding
              secondaryAction={
                <IconButton
                  edge="end"
                  style={{ right: -10 }}
                  onClick={() => dispatch(positionsSlice.actions.startEditItem(i))}
                >
                  <ModeEditOutlineIcon />
                </IconButton>
              }
            >
              <ListItemText primary={i.name} secondary={i.price + " TL"} />
            </ListItem>
          ))}
      </List>
    </>
  );
};
