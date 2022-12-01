import { IconButton, List, ListItem, ListItemText } from "@mui/material";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../store";
import Header from "../../shared/header";
import { elementsService } from "../../services/elements";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import { elementsSlice } from "../../slices/elements";

export const ElementsList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items } = useAppSelector((s) => s.elements);

  React.useEffect(() => {
    dispatch(elementsService.search());
  }, []);

  return (
    <>
      <Header
        title="Список элементов"
        onClickAdd={() => dispatch(elementsSlice.actions.toggleIsOpenForm())}
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
                  onClick={() => dispatch(elementsSlice.actions.startEditItem(i))}
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
