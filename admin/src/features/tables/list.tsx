import { IconButton, List, ListItem, ListItemText } from "@mui/material";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../store";
import Header from "../../shared/header";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import { tablesService } from "../../services/tables";
import { tablesSlice } from "../../slices/tables";

export const TablesList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items } = useAppSelector((s) => s.tables);

  React.useEffect(() => {
    dispatch(tablesService.search());
  }, []);

  return (
    <>
      <Header title="Tables items" onClickAdd={() => dispatch(tablesSlice.actions.toggleIsOpenForm())} />
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
                  onClick={() => dispatch(tablesSlice.actions.startEditItem(i))}
                >
                  <ModeEditOutlineIcon />
                </IconButton>
              }
            >
              <ListItemText primary={i.name} secondary={i.number} />
            </ListItem>
          ))}
      </List>
    </>
  );
};
