import { IconButton, List, ListItem, ListItemText } from "@mui/material";
import React from "react";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import { useAppDispatch, useAppSelector } from "app/store";
import { tablesService } from "api";
import { tablesModel } from "..";

export const TablesList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items } = useAppSelector((s) => s.tables);

  React.useEffect(() => {
    dispatch(tablesService.searchTables());
  }, []);

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
                  onClick={() => dispatch(tablesModel.actions.startEditItem(i))}
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
