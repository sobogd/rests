import { IconButton, List, ListItem, ListItemText } from "@mui/material";
import React from "react";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import { useAppDispatch, useAppSelector } from "app/store";
import { elementsService } from "shared/api";
import Header from "shared/header";
import { elementModel } from "../model";

export const ElementsList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items } = useAppSelector((s) => s.elements);

  React.useEffect(() => {
    dispatch(elementsService.searchElements());
  }, []);

  return (
    <>
      <Header title="Список элементов" onClickAdd={() => dispatch(elementModel.actions.toggleIsOpenForm())} />
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
                  onClick={() => dispatch(elementModel.actions.startEditItem(i))}
                >
                  <ModeEditOutlineIcon />
                </IconButton>
              }
            >
              <ListItemText primary={i.element} secondary={i.price + " лир"} />
            </ListItem>
          ))}
      </List>
    </>
  );
};
