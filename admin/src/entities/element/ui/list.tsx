import { IconButton, List, ListItem, ListItemText } from "@mui/material";
import React from "react";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import { useAppDispatch, useAppSelector } from "app/store";
import { elementsService } from "api";
import { elementModel } from "../model";
import { useLocation } from "react-router-dom";

export const ElementsList: React.FC = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const { items } = useAppSelector((s) => s.elements);

  React.useEffect(() => {
    dispatch(elementsService.searchElements());
  }, [location.pathname]);

  return (
    <>
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
                  onClick={() =>
                    dispatch(elementModel.actions.startEditItem(i))
                  }
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
