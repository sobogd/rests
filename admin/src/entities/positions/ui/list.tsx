import { IconButton, List, ListItem, ListItemText } from "@mui/material";
import React from "react";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import { searchPositions } from "shared/api";
import { useAppDispatch, useAppSelector } from "app/store";
import { positionsModel } from "../model";
import Header from "shared/header";

export const PositionsList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items } = useAppSelector((s) => s.positions);

  React.useEffect(() => {
    dispatch(searchPositions());
  }, []);

  return (
    <>
      <Header
        title="Список позиций меню"
        onClickAdd={() => dispatch(positionsModel.actions.toggleIsOpenForm())}
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
                  onClick={() => dispatch(positionsModel.actions.startEditItem(i))}
                >
                  <ModeEditOutlineIcon />
                </IconButton>
              }
            >
              <ListItemText primary={i.name} secondary={i.price + " лир"} />
            </ListItem>
          ))}
      </List>
    </>
  );
};
